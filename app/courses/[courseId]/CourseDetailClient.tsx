"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { ConvexReactClient, useQuery } from "convex/react";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Download,
  FileText,
  Lock,
  PlayCircle,
  Clock,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Target,
} from "lucide-react";
import PurchaseButton from "@/components/PurchaseButton";
import { motion } from "framer-motion";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const pulse = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

interface CourseDetailClientProps {
  courseId: Id<"courses">;
}

const CourseDetailPage = ({ courseId }: CourseDetailClientProps) => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const userData = useQuery(api.users.getUserByClerkId, {
    clerkId: user?.id ?? "",
  });
  const courseData = useQuery(api.courses.getCourseById, {
    courseId: courseId,
  });

  const userAccess = useQuery(
    api.users.getUserAccess,
    userData
      ? {
          userId: userData._id,
          courseId: courseId,
        }
      : "skip"
  ) || { hasAccess: false };

  if (!isUserLoaded || courseData === undefined) {
    return <CourseDetailSkeleton />;
  }

  if (courseData === null) return notFound();

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-6xl mx-auto"
      >
        {/* Hero Section */}
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
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <motion.h1
                className="text-3xl md:text-4xl font-bold mb-2"
                variants={fadeIn}
              >
                {courseData.title}
              </motion.h1>

              <motion.div
                className="flex flex-wrap gap-4 mb-4"
                variants={staggerContainer}
              >
                <div className="flex items-center text-sm bg-cyan-500/20 px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>12 hours</span>
                </div>
                <div className="flex items-center text-sm bg-purple-500/20 px-3 py-1 rounded-full">
                  <Users className="h-4 w-4 mr-1" />
                  <span>1.2k students</span>
                </div>
                <div className="flex items-center text-sm bg-amber-500/20 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 mr-1 fill-amber-400" />
                  <span>4.8 (240 reviews)</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              variants={fadeIn}
              className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 mb-8"
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-cyan-400" />
                Course Description
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {courseData.description ||
                  "This comprehensive course will take you from beginner to advanced level with hands-on projects and real-world applications."}
              </p>
            </motion.div>

            {userAccess.hasAccess ? (
              <motion.div variants={fadeIn}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="w-full h-14 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white text-lg">
                      <PlayCircle className="w-5 h-5 mr-2" />
                      Start Learning
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full h-14 border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/60 text-lg"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Resources
                    </Button>
                  </motion.div>
                </div>

                <motion.div
                  className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50"
                  variants={fadeIn}
                >
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <Target className="h-5 w-5 mr-2 text-cyan-400" />
                    Course Curriculum
                  </h3>
                  <motion.ul className="space-y-4" variants={staggerContainer}>
                    {[
                      {
                        title: "Introduction to Advanced Patterns",
                        duration: "45 min",
                      },
                      {
                        title: "Hooks and Custom Hooks",
                        duration: "1.5 hours",
                      },
                      {
                        title: "State Management Solutions",
                        duration: "2 hours",
                      },
                      {
                        title: "Performance Optimization",
                        duration: "1.5 hours",
                      },
                      { title: "Testing Strategies", duration: "1 hour" },
                      {
                        title: "Deployment Best Practices",
                        duration: "45 min",
                      },
                      { title: "Final Project", duration: "4 hours" },
                    ].map((module, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors cursor-pointer"
                        variants={fadeIn}
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
                  </motion.ul>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                className="text-center bg-gray-800/40 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50"
                variants={fadeIn}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                  className="flex justify-center mb-6"
                >
                  <div className="relative">
                    <Lock className="w-16 h-16 text-cyan-400" />
                    <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl"></div>
                  </div>
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  Unlock Premium Content
                </h3>
                <p className="text-gray-300 mb-6 max-w-md mx-auto">
                  Enroll in this course to access all modules, exercises, and
                  resources designed to accelerate your learning journey.
                </p>

                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    ${courseData.price.toFixed(2)}
                  </span>
                  <span className="text-gray-400 ml-2">one-time payment</span>
                </motion.div>

                {/*    <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PurchaseButton courseId={params.courseId} />
                </motion.div> */}

                <motion.ul
                  className="mt-8 space-y-2 text-sm text-gray-400 max-w-md mx-auto"
                  variants={staggerContainer}
                >
                  {[
                    "Full lifetime access",
                    "Certificate of completion",
                    "Downloadable resources",
                    "Q&A support",
                    "Mobile and TV access",
                  ].map((benefit, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center justify-center"
                      variants={fadeIn}
                    >
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                      {benefit}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 sticky top-24"
              variants={fadeIn}
            >
              <h3 className="text-lg font-semibold mb-4">What You'll Learn</h3>
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
                    variants={fadeIn}
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight className="h-4 w-4 text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-700/50">
                <h3 className="text-lg font-semibold mb-3">
                  This Course Includes
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-cyan-400" />
                    12 hours on-demand video
                  </li>
                  <li className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-cyan-400" />
                    15 articles and resources
                  </li>
                  <li className="flex items-center">
                    <Download className="h-4 w-4 mr-2 text-cyan-400" />
                    Downloadable code samples
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-cyan-400" />
                    Certificate of completion
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

function CourseDetailSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <Skeleton className="w-full h-64 md:h-96 rounded-2xl" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Skeleton className="h-40 w-full rounded-2xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-14 w-full rounded-xl" />
              <Skeleton className="h-14 w-full rounded-xl" />
            </div>
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>

          <div className="lg:col-span-1">
            <Skeleton className="h-80 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailPage;
