"use client";

import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { PRO_PLANS } from "@/constants";
import ProHeaderSection from "@/components/shared/proPageDetails/ProHeaderSection";
import ActiveSubscriptionMessage from "@/components/shared/proPageDetails/ActiveSubscriptionMessage";
import SubscriptionFooterNote from "@/components/shared/proPageDetails/SubscriptionFooterNote";
import PlanCard from "@/components/shared/proPageDetails/PlanCard";

const ProPage = () => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const [loadingPlan, setLoadingPlan] = useState("");

  // Fetch user data
  const userData = useQuery(
    api.users.getUserByClerkId,
    user ? { clerkId: user.id } : "skip"
  );

  // Fetch user subscription
  const userSubscription = useQuery(
    api.subscriptions.getUserSubscription,
    userData ? { userId: userData._id } : "skip"
  );

  const isYearlySubscriptionActive =
    userSubscription?.status === "active" &&
    userSubscription?.planType === "year";

  const createProPlanCheckoutSession = useAction(
    api.stripe.createProPlanCheckoutSession
  );

  // Handle plan selection
  const handlePlanSelection = async (planId: "month" | "year") => {
    if (!user) {
      return toast.error("Please sign in to select a plan.", {
        id: "login-error",
        duration: 4000,
        position: "top-center",
      });
    }

    setLoadingPlan(planId);
    try {
      const result = await createProPlanCheckoutSession({ planId });
      if (result?.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      } else {
        toast.error("Failed to initiate checkout. Please try again.", {
          id: "checkout-error",
          duration: 4000,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Something went wrong. Please try again.", {
        id: "checkout-error",
        duration: 4000,
        position: "top-center",
      });
      setLoadingPlan("");
    }
  };

  return (
    <div className="min-h-screen text-white px-4 py-16">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <ProHeaderSection />

        {/* Active Subscription */}
        {isUserLoaded && userSubscription?.status === "active" && (
          <ActiveSubscriptionMessage planType={userSubscription.planType} />
        )}

        {/* Plans Grid */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8 items-stretch"
        >
          {PRO_PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              loadingPlan={loadingPlan}
              userSubscription={userSubscription}
              isYearlySubscriptionActive={isYearlySubscriptionActive}
              handlePlanSelection={handlePlanSelection}
            />
          ))}
        </motion.div>

        {/* Footer Note */}
        <SubscriptionFooterNote />
      </div>
    </div>
  );
};

export default ProPage;
