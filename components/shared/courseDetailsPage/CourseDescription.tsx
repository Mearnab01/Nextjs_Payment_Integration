import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

interface CourseDescriptionProps {
  description?: string;
}

const CourseDescription = ({ description }: CourseDescriptionProps) => (
  <motion.div
    variants={fadeIn}
    className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 mb-8"
  >
    <h2 className="text-2xl font-bold mb-4 flex items-center">
      <BookOpen className="h-6 w-6 mr-2 text-cyan-400" />
      Course Description
    </h2>
    <p className="text-gray-300 leading-relaxed">
      {description ||
        "This comprehensive course will take you from beginner to advanced level with hands-on projects and real-world applications."}
    </p>
  </motion.div>
);

export default CourseDescription;
