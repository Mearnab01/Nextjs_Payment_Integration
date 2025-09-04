import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Zap, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import PlanFeaturesList from "./PlanFeaturesList";
import AppLoader from "@/components/styled/Loader";

const PlanCard = ({
  plan,
  loadingPlan,
  userSubscription,
  isYearlySubscriptionActive,
  handlePlanSelection,
}: any) => {
  const isUserActive = userSubscription?.status === "active";
  const currentPlanType = userSubscription?.planType?.toLowerCase();
  const selectedPlanId = plan.id.toLowerCase();

  const isCurrentPlan = isUserActive && currentPlanType === selectedPlanId;
  const isYearlyAndMonthlyConflict =
    isUserActive && plan.id === "month" && isYearlySubscriptionActive;

  const isButtonDisabled =
    isUserActive && (isCurrentPlan || isYearlySubscriptionActive);
  const isProcessing = loadingPlan === plan.id;

  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 100 },
        },
      }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card
        className={`h-full flex flex-col border-2 transition-all duration-300 overflow-hidden relative ${
          plan.highlighted
            ? "border-amber-500/40 shadow-2xl shadow-amber-500/20 bg-gradient-to-br from-gray-800 to-gray-900"
            : "border-purple-500/20 hover:border-purple-400/40 bg-gray-800/60"
        }`}
      >
        {plan.highlighted && (
          <>
            <div className="absolute -top-4 -right-4">
              <div className="bg-amber-500 text-gray-900 font-bold text-xs px-4 py-1 rounded-full rotate-12 shadow-lg">
                POPULAR
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
          </>
        )}

        <CardHeader className="pb-4 relative">
          {plan.highlighted && (
            <div className="absolute -top-2 -left-2 opacity-20">
              <Star className="h-16 w-16 text-amber-400" fill="currentColor" />
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
            <span className="text-3xl font-bold text-white">{plan.price}</span>
            <span className="text-gray-400 ml-2">{plan.period}</span>
          </CardDescription>
        </CardHeader>

        {/* Features */}
        <CardContent className="pb-6">
          <PlanFeaturesList plan={plan} />
        </CardContent>

        {/* CTA Button */}
        <CardFooter className="mt-auto pt-0">
          <Button
            size="lg"
            onClick={() => handlePlanSelection(plan.id as "month" | "year")}
            disabled={isButtonDisabled}
            className={`w-full py-6 text-lg font-semibold transition-all duration-300 ${
              plan.highlighted
                ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-amber-500/30"
                : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-purple-500/20"
            }`}
          >
            {isProcessing ? (
              <AppLoader text="Processing..." />
            ) : isCurrentPlan ? (
              "Current Plan"
            ) : isYearlyAndMonthlyConflict ? (
              "Yearly Plan Active"
            ) : (
              plan.ctaText
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PlanCard;
