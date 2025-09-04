"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle,
  Rocket,
  Star,
  Zap,
  Award,
  Sparkles,
  Gift,
  Clock,
} from "lucide-react";
import Link from "next/link";

import ConfettiWrapper from "@/components/styled/ConfettiWrapper";
import AnimatedBackground from "@/components/styled/AnimatedBackground";
import BenifitFooter from "@/components/styled/BenifitFooter";
import BenefitsGrid from "@/components/styled/BenifitGrid";
import { useUser } from "@clerk/nextjs";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const SuccessPage = ({
  params,
  searchParams,
}: {
  params: { courseId: string };
  searchParams: { session_id: string };
}) => {
  const { courseId } = params;
  const { session_id } = searchParams;
  const { user } = useUser();

  return (
    <div className="success-bg">
      <ConfettiWrapper />
      <AnimatedBackground />

      <motion.div
        className="max-w-4xl mx-auto relative z-10 px-4 py-12"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Title */}
        <motion.div variants={fadeIn} className="text-center mb-8">
          <h1 className="text-5xl font-bold gradient-text mb-6 p-2">
            Congratulations, {user?.firstName || "Learner"}!
          </h1>
          <p className="text-xl text-gray-300">
            You've successfully enrolled in the course
          </p>
        </motion.div>

        <Card className="card-blur">
          <div className="gradient-bar" />

          <CardHeader className="text-center pt-12 pb-8">
            <motion.div variants={fadeIn} className="relative inline-block">
              <div className="absolute inset-0 bg-green-500/30 rounded-full blur-xl"></div>
              <CheckCircle className="size-20 text-green-400 mx-auto mb-4" />
            </motion.div>

            <motion.div variants={fadeIn}>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Enrollment Complete!
              </CardTitle>
            </motion.div>
          </CardHeader>

          <CardContent className="text-center space-y-8 pb-10">
            {/* Welcome message */}
            <motion.p
              className="text-lg text-gray-300 leading-relaxed"
              variants={fadeIn}
            >
              Welcome to your learning journey! Your course is now unlocked.
              <span className="mt-3 text-cyan-300 font-medium flex items-center justify-center">
                <Sparkles className="h-5 w-5 mr-2" />
                Your path to mastery starts now!
              </span>
            </motion.p>

            {/* Transaction info */}
            <motion.div
              className="bg-gray-700/50 p-6 rounded-xl border border-gray-600/30"
              variants={fadeIn}
            >
              <div className="flex items-center justify-center mb-3">
                <Award className="h-5 w-5 text-amber-400 mr-2" />
                <span className="text-sm font-medium text-amber-300">
                  Transaction Verified
                </span>
              </div>
              <p className="text-sm text-gray-400 font-mono bg-gray-900/50 p-3 rounded-lg">
                ID: {session_id}
              </p>
              <p className="text-sm font-light text-gray-300 mt-2">
                Course ID: {courseId}
              </p>
            </motion.div>

            {/* Benefits */}
            <BenefitsGrid />

            {/* Buttons */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={fadeIn}
            >
              <Link href={`/courses/${courseId}`}>
                <Button className="primary-btn group">
                  <Rocket className="mr-2 h-5 w-5 group-hover:rotate-45 transition-transform" />
                  Start Learning
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline" className="secondary-btn">
                  <Zap className="mr-2 h-5 w-5" />
                  Explore More
                </Button>
              </Link>
            </motion.div>

            {/* Footer note */}
            <BenifitFooter />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
