import { motion } from "framer-motion";
import { Clock, PlayCircle, Download, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const modules = [
  { title: "Introduction to Advanced Patterns", duration: "45 min" },
  { title: "Hooks and Custom Hooks", duration: "1.5 hours" },
  { title: "State Management Solutions", duration: "2 hours" },
  { title: "Performance Optimization", duration: "1.5 hours" },
  { title: "Testing Strategies", duration: "1 hour" },
  { title: "Deployment Best Practices", duration: "45 min" },
  { title: "Final Project", duration: "4 hours" },
];

const CourseCurriculum = () => (
  <motion.div variants={fadeIn}>
    {/* CTA Buttons */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <ActionButton
        label="Start Learning"
        icon={<PlayCircle className="w-5 h-5 mr-2" />}
        gradient
      />
      <ActionButton
        label="Download Resources"
        icon={<Download className="w-5 h-5 mr-2" />}
        outline
      />
    </div>

    {/* Curriculum */}
    <motion.div
      className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50"
      variants={fadeIn}
    >
      <h3 className="text-xl font-semibold mb-6 flex items-center">
        <Target className="h-5 w-5 mr-2 text-cyan-400" />
        Course Curriculum
      </h3>
      <ul className="space-y-4">
        {modules.map((module, index) => (
          <motion.li
            key={index}
            className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors cursor-pointer"
            whileHover={{ x: 5 }}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center mr-3">
                <span className="text-cyan-400 text-sm font-medium">
                  {index + 1}
                </span>
              </div>
              <span className="text-gray-200">{module.title}</span>
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              {module.duration}
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  </motion.div>
);

const ActionButton = ({
  label,
  icon,
  gradient,
  outline,
}: {
  label: string;
  icon: React.ReactNode;
  gradient?: boolean;
  outline?: boolean;
}) => (
  <Button
    className={`w-full h-14 text-lg ${
      gradient
        ? "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
        : outline
          ? "border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/60"
          : ""
    }`}
    variant={outline ? "outline" : "default"}
  >
    {icon}
    {label}
  </Button>
);

export default CourseCurriculum;
