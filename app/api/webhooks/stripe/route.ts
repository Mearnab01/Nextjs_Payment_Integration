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
