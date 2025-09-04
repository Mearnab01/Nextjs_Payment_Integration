"use client";

import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Crown,
  Loader2,
  Receipt,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

interface ActiveSubscriptionProps {
  subscription: any;
  formatDate: (timestamp: number) => string;
  isLoading: boolean;
  handleManageBilling: () => void;
}

const ActiveSubscription = ({
  subscription,
  formatDate,
  isLoading,
  handleManageBilling,
}: ActiveSubscriptionProps) => {
  return (
    <>
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
              <span className="text-sm font-medium">Next billing date</span>
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
              Your subscription will be cancelled at the end of the current
              billing period.
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
  );
};

export default ActiveSubscription;
