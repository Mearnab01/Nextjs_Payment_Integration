import { auth } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import stripe from "@/lib/stripe";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST() {
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://courseflow-by-arnab.vercel.app";

  // Ensure NEXT_PUBLIC_APP_URL is set
  if (!process.env.NEXT_PUBLIC_APP_URL) {
    throw new Error(
      "NEXT_PUBLIC_APP_URL is not defined in environment variables."
    );
  }

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    // Fetch user data from Convex
    const user = await convex.query(api.users.getUserByClerkId, {
      clerkId: userId,
    });

    if (!user?.stripeCustomerId) {
      return NextResponse.json(
        { error: "User not found or missing Stripe customer ID" },
        { status: 404 }
      );
    }

    // Create billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${appUrl}/billing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error("Error creating billing portal session:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      {
        error: errorMessage,
        details: error,
      },
      { status: 500 }
    );
  }
}
