import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  FileText,
  Download,
  CheckCircle,
} from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const CourseSidebar = () => (
  <motion.div
    className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 sticky top-24"
    variants={fadeIn}
  >
    <h3 className="text-lg font-semibold mb-4">What You will Learn</h3>
    <ul className="space-y-3">
      {[
        "Master advanced development patterns",
        "Build scalable applications",
        "Implement best practices",
        "Optimize performance",
        "Deploy with confidence",
      ].map((item, index) => (
        <motion.li
          key={index}
          className="flex items-start"
          whileHover={{ x: 5 }}
        >
          <ArrowRight className="h-4 w-4 text-cyan-400 mr-2 mt-1 flex-shrink-0" />
          <span className="text-gray-300 text-sm">{item}</span>
        </motion.li>
      ))}
    </ul>

    <div className="mt-6 pt-6 border-t border-gray-700/50">
      <h3 className="text-lg font-semibold mb-3">This Course Includes</h3>
      <ul className="space-y-2 text-sm text-gray-400">
        <SidebarItem icon={<Clock />} text="12 hours on-demand video" />
        <SidebarItem icon={<FileText />} text="15 articles and resources" />
        <SidebarItem icon={<Download />} text="Downloadable code samples" />
        <SidebarItem icon={<CheckCircle />} text="Certificate of completion" />
      </ul>
    </div>
  </motion.div>
);

const SidebarItem = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <li className="flex items-center">
    {icon}
    <span className="ml-2">{text}</span>
  </li>
);

export default CourseSidebar;
