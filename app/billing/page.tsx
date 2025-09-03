"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  Loader2,
  Zap,
  Crown,
  Sparkles,
  Calendar,
  Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { motion } from "framer-motion";

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
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  if (!userData || subscription === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-10 h-10 text-cyan-400" />
        </motion.div>
      </div>
    );
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
              <>
                {/* Active Subscription */}
                <div className="h-2 bg-gradient-to-r from-cyan-500 to-purple-600"></div>

                <CardHeader className="pb-0">
                  <CardTitle className="text-2xl text-cyan-200 flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <CheckCircle2 className="h-7 w-7 text-green-400" />
                    </motion.div>
                    Active Subscription
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage your subscription details below
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-700/50 p-6 rounded-xl backdrop-blur-sm">
                    <div className="flex flex-col space-y-2 p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center text-gray-400">
                        <Crown className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">Plan</span>
                      </div>
                      <p className="text-lg font-semibold text-cyan-300 capitalize">
                        {subscription.planType}
                      </p>
                    </div>

                    <div className="flex flex-col space-y-2 p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center text-gray-400">
                        <Sparkles className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">Status</span>
                      </div>
                      <p className="text-lg font-semibold text-green-400 capitalize">
                        {subscription.status}
                      </p>
                    </div>

                    <div className="md:col-span-2 flex flex-col space-y-2 p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center text-gray-400">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">
                          Next billing date
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-purple-300">
                        {formatDate(subscription.currentPeriodEnd)}
                      </p>
                    </div>
                  </div>

                  {subscription.cancelAtPeriodEnd && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center bg-amber-900/30 p-4 rounded-lg text-amber-200 border border-amber-700/30"
                    >
                      <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0 text-amber-400" />
                      <p className="text-sm">
                        Your subscription will be cancelled at the end of the
                        current billing period.
                      </p>
                    </motion.div>
                  )}
                </CardContent>

                <CardFooter className="flex justify-end bg-gray-800/30 mt-6 p-6">
                  <Button
                    onClick={handleManageBilling}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg transition-all duration-300 group"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Receipt className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                        Manage Billing
                      </>
                    )}
                  </Button>
                </CardFooter>
              </>
            ) : (
              <>
                {/* No Active Subscription */}
                <div className="h-2 bg-gradient-to-r from-gray-600 to-gray-700"></div>

                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <CreditCard className="h-7 w-7 text-gray-400" />
                    No Active Subscription
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Upgrade to Pro to unlock premium features
                  </CardDescription>
                </CardHeader>

                <CardContent className="text-center py-12">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-6"
                  >
                    <Zap className="h-16 w-16 text-amber-400 mx-auto" />
                  </motion.div>

                  <p className="text-lg mb-8 text-gray-300 max-w-md mx-auto">
                    Get access to exclusive content and features with our Pro
                    plan. Transform your learning experience today!
                  </p>

                  <Link href="/pro">
                    <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg group">
                      <Crown className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      Explore Pro Plans
                    </Button>
                  </Link>
                </CardContent>
              </>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
export default BillingPage;
