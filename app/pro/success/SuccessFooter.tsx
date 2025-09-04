import { CardFooter } from "@/components/ui/card";
import React from "react";
import { Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const SuccessFooter = () => {
  const router = useRouter();
  return (
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
  );
};

export default SuccessFooter;
