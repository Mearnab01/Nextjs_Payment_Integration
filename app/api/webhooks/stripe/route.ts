import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import stripe from "@/lib/stripe";
import { ConvexHttpClient } from "convex/browser";
import Stripe from "stripe";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("Stripe-Signature") as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.log(`Webhook signature verification failed.`, error.message);
    return new Response("Webhook signature verification failed.", {
      status: 400,
    });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session
        );
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionUpsert(
          event.data.object as Stripe.Subscription,
          event.type
        );
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription
        );
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
        break;
    }
  } catch (error) {
    console.error(`Error handling webhook event: ${event.type}`, error);
    return new Response("Error handling webhook event.", { status: 500 });
  }

  return new Response("Webhook received.", { status: 200 });
}

// Handle the checkout.session.completed event
async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  const courseId = session.metadata?.courseId;
  const stripeCustomerId = session.customer as string;

  if (!courseId || !stripeCustomerId) {
    throw new Error("Missing courseId or customerId in session metadata");
  }

  const user = await convex.query(api.users.getUserByStripeCustomerId, {
    stripeCustomerId,
  });
  if (!user) {
    throw new Error(
      `No user found with Stripe customer ID: ${stripeCustomerId}`
    );
  }

  await convex.mutation(api.purchases.recordPurchase, {
    userId: user._id,
    courseId: courseId as Id<"courses">,
    amount: session.amount_total as number,
    stripePurchaseId: session.id,
  });
}

// Handle subscription creation and updates
async function handleSubscriptionUpsert(
  subscription: Stripe.Subscription,
  eventType: string
) {
  if (subscription.status !== "active" || !subscription.latest_invoice) {
    console.log(
      `Skipping subscription ${subscription.id} - Status: ${subscription.status}`
    );
    return;
  }

  const stripeCustomerId = subscription.customer as string;
  const user = await convex.query(api.users.getUserByStripeCustomerId, {
    stripeCustomerId,
  });

  if (!user) {
    throw new Error(
      `User not found for stripe customer id: ${stripeCustomerId}`
    );
  }

  try {
    await convex.mutation(api.subscriptions.upsertSubscription, {
      userId: user._id,
      stripeSubscriptionId: subscription.id,
      status: subscription.status,
      planType: subscription.items.data[0].plan.interval as "month" | "year",
      currentPeriodStart: (subscription as any).current_period_start,
      currentPeriodEnd: (subscription as any).current_period_end,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    });
    console.log(
      `Successfully processed ${eventType} for subscription ${subscription.id}`
    );

    const isCreation = eventType === "customer.subscription.created";
  } catch (error) {
    console.error(
      `Error processing ${eventType} for subscription ${subscription.id}:`,
      error
    );
  }
}

// Handle subscription deletions
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    await convex.mutation(api.subscriptions.removeSubscription, {
      stripeSubscriptionId: subscription.id,
    });
    console.log(`Successfully deleted subscription ${subscription.id}`);
  } catch (error) {
    console.error(`Error deleting subscription ${subscription.id}:`, error);
  }
}
