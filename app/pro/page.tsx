"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Crown, Zap, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRO_PLANS } from "@/constants";
import { motion } from "framer-motion";

const ProPage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <div className="min-h-screen text-white px-4 py-16">
      <div className="container mx-auto max-w-6xl">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 relative"
        >
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-30">
            <Crown size={60} className="text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Upgrade Your Learning Experience
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Unlock premium features and accelerate your journey to mastery
          </p>
        </motion.div>

        {/* Active subscription message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30 p-4 mb-10 rounded-xl backdrop-blur-sm flex items-center justify-center"
        >
          <div className="flex items-center">
            <Sparkles className="h-5 w-5 text-amber-400 mr-2" />
            <p className="text-purple-200">
              You have an active{" "}
              <span className="font-semibold text-amber-300">year</span>{" "}
              subscription. Thank you for your support!
            </p>
          </div>
        </motion.div>

        {/* Plans grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8 items-stretch"
        >
          {PRO_PLANS.map((plan) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <Card
                className={`h-full flex flex-col transition-all duration-300 border-2 overflow-hidden relative ${
                  plan.highlighted
                    ? "border-amber-500/40 shadow-2xl shadow-amber-500/20 bg-gradient-to-br from-gray-800 to-gray-900"
                    : "border-purple-500/20 hover:border-purple-400/40 bg-gray-800/60"
                }`}
              >
                {/* Decorative elements */}
                {plan.highlighted && (
                  <>
                    <div className="absolute -top-4 -right-4">
                      <div className="bg-amber-500 text-gray-900 font-bold text-xs px-4 py-1 rounded-full rotate-12 shadow-lg">
                        POPULAR
                      </div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
                  </>
                )}

                <CardHeader className="flex-grow pb-4 relative">
                  {plan.highlighted && (
                    <div className="absolute -top-2 -left-2 opacity-20">
                      <Star
                        className="h-16 w-16 text-amber-400"
                        fill="currentColor"
                      />
                    </div>
                  )}

                  <CardTitle
                    className={`text-2xl flex items-center ${
                      plan.highlighted ? "text-amber-300" : "text-purple-300"
                    }`}
                  >
                    {plan.highlighted && (
                      <Zap className="h-5 w-5 mr-2" fill="currentColor" />
                    )}
                    {plan.title}
                  </CardTitle>

                  <CardDescription className="mt-4">
                    <span className="text-3xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-400 ml-2">{plan.period}</span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-6">
                  <ul className="space-y-4">
                    {plan.features.map((feature, fIdx) => (
                      <motion.li
                        key={fIdx}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + fIdx * 0.1 }}
                      >
                        <Check
                          className={`h-5 w-5 mt-0.5 ${
                            plan.highlighted
                              ? "text-amber-400"
                              : "text-green-400"
                          } mr-3 flex-shrink-0`}
                        />
                        <span className="text-gray-300">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="mt-auto pt-0">
                  <Button
                    className={`w-full py-6 text-lg font-semibold transition-all duration-300 ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-amber-500/30"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 shadow-md hover:shadow-purple-500/20"
                    }`}
                    size="lg"
                  >
                    {plan.ctaText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center text-gray-400 text-sm"
        >
          <p>
            All plans include a 14-day money-back guarantee • Cancel anytime
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ProPage;
