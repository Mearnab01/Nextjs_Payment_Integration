import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PlanFeaturesList = ({ plan }: any) => {
  return (
    <ul className="space-y-4">
      {plan.features.map((feature: string, index: number) => (
        <motion.li
          key={index}
          className="flex items-start"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          <Check
            className={`h-5 w-5 mt-0.5 ${
              plan.highlighted ? "text-amber-400" : "text-green-400"
            } mr-3 flex-shrink-0`}
          />
          <span className="text-gray-300">{feature}</span>
        </motion.li>
      ))}
    </ul>
  );
};

export default PlanFeaturesList;
