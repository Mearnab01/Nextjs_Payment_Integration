import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Users, Star } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

interface CourseHeroProps {
  courseData: {
    title: string;
    imageUrl: string;
  };
  setIsImageLoaded: (value: boolean) => void;
}

const CourseHero = ({ courseData, setIsImageLoaded }: CourseHeroProps) => (
  <motion.div
    className="relative rounded-2xl overflow-hidden mb-8 shadow-xl"
    variants={fadeIn}
  >
    <div className="relative h-64 md:h-96 w-full">
      <Image
        src={courseData.imageUrl}
        alt={courseData.title}
        fill
        className="object-cover"
        onLoad={() => setIsImageLoaded(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

      <div className="absolute bottom-6 left-6 right-6 text-white">
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-2"
          variants={fadeIn}
        >
          {courseData.title}
        </motion.h1>

        <div className="flex flex-wrap gap-4">
          <Badge icon={<Clock />} text="12 hours" color="bg-cyan-500/20" />
          <Badge
            icon={<Users />}
            text="1.2k students"
            color="bg-purple-500/20"
          />
          <Badge
            icon={<Star className="fill-amber-400" />}
            text="4.8 (240 reviews)"
            color="bg-amber-500/20"
          />
        </div>
      </div>
    </div>
  </motion.div>
);

const Badge = ({
  icon,
  text,
  color,
}: {
  icon: React.ReactNode;
  text: string;
  color: string;
}) => (
  <div className={`flex items-center text-sm px-3 py-1 rounded-full ${color}`}>
    {icon}
    <span className="ml-1">{text}</span>
  </div>
);

export default CourseHero;
