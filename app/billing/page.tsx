"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { toast } from "sonner";

import ActiveSubscription from "@/components/shared/billing/ActiveSubscription";
import NoSubscription from "@/components/shared/billing/NoSubscription";
import BillingLoader from "@/components/shared/billing/BillingLoader";

const BillingPage = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const userData = useQuery(
    api.users.getUserByClerkId,
    user ? { clerkId: user?.id } : "skip"
  );

  const subscription = useQuery(
    api.subscriptions.getUserSubscription,
    userData ? { userId: userData?._id } : "skip"
  );

  const handleManageBilling = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/create-billing-portal", {
        method: "POST",
      });
      const { url } = await response.json();
      if (url) window.location.href = url;
      else throw new Error("Failed to create billing portal");
    } catch (error: any) {
      toast.error(
        error.message || "Something went wrong. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!userData || subscription === undefined) {
    return <BillingLoader />;
  }

  return (
    <div className="min-h-screen text-white py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            Billing Management
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your subscription and billing details
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full bg-gray-800/70 backdrop-blur-md border-gray-700/50 overflow-hidden">
            {subscription ? (
              <ActiveSubscription
                subscription={subscription}
                formatDate={formatDate}
                isLoading={isLoading}
                handleManageBilling={handleManageBilling}
              />
            ) : (
              <NoSubscription />
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BillingPage;
