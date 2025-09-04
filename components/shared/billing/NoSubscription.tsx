"use client";

import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, CreditCard, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const NoSubscription = () => {
  return (
    <>
      <div className="h-2 bg-gradient-to-r from-gray-600 to-gray-700"></div>

      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-3">
          <CreditCard className="h-7 w-7 text-gray-400" />
          <p className="text-cyan-400"> No Active Subscription</p>
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
          Get access to exclusive content and features with our Pro plan.
          Transform your learning experience today!
        </p>

        <Link href="/pro">
          <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg group">
            <Crown className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Explore Pro Plans
          </Button>
        </Link>
      </CardContent>
    </>
  );
};

export default NoSubscription;
