"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  Clock,
  Rocket,
  Star,
  Sparkles,
  Zap,
  Crown,
  CheckCircle,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isYearly = searchParams.get("year") === "true";
  const [confettiActive, setConfettiActive] = useState(true);

  useEffect(() => {
    // Auto-dismiss confetti after 5 seconds
    const timer = setTimeout(() => {
      setConfettiActive(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const benefits = isYearly
    ? [
        "Unlock unlimited learning with a full year of premium courses",
        "Enjoy massive savings with our best-value yearly plan",
        "Get VIP-level support whenever you need help",
        "Exclusive access to members-only events and workshops",
        "Be the first to try out upcoming features and courses",
      ]
    : [
        "Explore all premium courses without limits",
        "Priority help whenever you run into issues",
        "Connect with learners in a private community",
        "Join monthly live sessions with top instructors",
      ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-4">
      {/* Confetti effect */}
      {confettiActive && (
        <div className="fixed inset-0 pointer-events-none z-50 flex justify-center items-start overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{ y: -100, opacity: 1, rotate: 0 }}
              animate={{
                y: window.innerHeight,
                opacity: 0,
                rotate: 360,
                x: Math.sin(i * 36) * 200,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: "easeOut",
              }}
            >
              <Sparkles
                className={isYearly ? "text-amber-400" : "text-cyan-400"}
                size={20}
              />
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="w-full overflow-hidden bg-gray-800/70 backdrop-blur-md border-0 relative">
          {/* Gradient top bar */}
          <div
            className={`w-full h-3 ${
              isYearly
                ? "bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600"
                : "bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600"
            }`}
          />

          {/* Decorative corner elements */}
          <div className="absolute top-4 right-4 opacity-20">
            <Crown
              size={32}
              className={isYearly ? "text-amber-400" : "text-cyan-400"}
            />
          </div>
          <div className="absolute bottom-4 left-4 opacity-20">
            <Zap
              size={32}
              className={isYearly ? "text-amber-400" : "text-cyan-400"}
            />
          </div>

          <CardHeader className="text-center pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              {isYearly ? (
                <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-700 border-0">
                  <Star className="mr-2 h-5 w-5 text-white fill-white" />
                  Yearly Pro
                </Badge>
              ) : (
                <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-700 border-0">
                  <Clock className="mr-2 h-5 w-5 text-white" />
                  Monthly Pro
                </Badge>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <CardTitle className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                Welcome to Pro!
              </CardTitle>
              <CardDescription className="text-lg md:text-xl text-gray-300">
                You've successfully subscribed to our{" "}
                {isYearly ? "Yearly" : "Monthly"} Pro plan.
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="pb-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.h3
                variants={itemVariants}
                className="text-xl md:text-2xl font-semibold text-center flex items-center justify-center text-cyan-300"
              >
                <Sparkles className="mr-2 h-5 w-5 text-amber-400" />
                Your Pro Benefits:
              </motion.h3>

              <motion.ul variants={containerVariants} className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="flex items-start space-x-4 text-base md:text-lg p-3 rounded-lg bg-gray-700/50 backdrop-blur-sm"
                  >
                    <CheckCircle
                      className={`flex-shrink-0 h-6 w-6 mt-0.5 ${
                        isYearly ? "text-amber-400" : "text-cyan-400"
                      }`}
                    />
                    <span className="text-gray-200">{benefit}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="w-full"
            >
              <Button
                className="w-full text-lg py-6 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 border-0 transition-all duration-300 group"
                size="lg"
                onClick={() => router.push("/courses")}
              >
                <Rocket className="mr-2 h-5 w-5 group-hover:translate-y-[-2px] transition-transform" />
                Start Your Pro Journey
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-sm text-gray-400 text-center"
            >
              Excited to get started? Explore your new Pro features now!
            </motion.p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};
export default SuccessPage;
