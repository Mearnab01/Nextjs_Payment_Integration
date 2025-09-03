"use client";

import { ClerkProvider, useAuth as useClerkAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function useAuth() {
  const clerkAuth = useClerkAuth();

  return {
    ...clerkAuth,
    async getToken() {
      // IMPORTANT: tell Clerk to use the "convex" JWT template
      return await clerkAuth.getToken({ template: "convex" });
    },
  };
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
