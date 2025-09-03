"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useQuery, useAction } from "convex/react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import AppLoader from "./styled/Loader";
import { Check, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const PurchaseButton = ({ courseId }: { courseId: Id<"courses"> }) => {
  const { user } = useUser();
  const userData = useQuery(
    api.users.getUserByClerkId,
    user ? { clerkId: user.id } : "skip"
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const createCheckoutSession = useAction(api.stripe.createCheckoutSession);
  const userAccess = useQuery(
    api.users.getUserAccess,
    userData
      ? {
          userId: userData._id,
          courseId,
        }
      : "skip"
  ) || { hasAccess: false };

  const handlePurchase = async () => {
    setIsLoading(true);
    if (!user) {
      alert("Please sign in to purchase the course.");
      setIsLoading(false);
      return;
    }
    try {
      const { checkoutUrl } = await createCheckoutSession({ courseId });
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error: any) {
      if (error.message.includes("Rate limit exceeded")) {
        toast.error(
          error.message || "Too many requests. Please try again later."
        );
      } else {
        toast.error(error.message || "An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <AppLoader text="Processing Payment" />;

  if (userAccess.hasAccess) {
    return (
      <Button className="purchase-enrolled-btn" disabled>
        <div className="flex items-center">
          <Check className="h-5 w-5 mr-2" />
          <span>Enrolled</span>
        </div>
        <div className="ping-wrapper">
          <div className="ping-dot"></div>
        </div>
      </Button>
    );
  }

  return (
    <Button
      onClick={handlePurchase}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="purchase-btn group"
    >
      {/* Animated background */}
      <div className="purchase-hover-bg"></div>

      {/* Sparkles */}
      {isHovered && (
        <>
          <div className="sparkle sparkle-1"></div>
          <div className="sparkle sparkle-2"></div>
          <div className="sparkle sparkle-3"></div>
        </>
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center">
        <ShoppingCart className="cart-icon" />
        <span className="font-semibold">Enroll Now</span>
      </div>

      {/* Shine effect */}
      <div className="shine-effect"></div>
    </Button>
  );
};

export default PurchaseButton;
