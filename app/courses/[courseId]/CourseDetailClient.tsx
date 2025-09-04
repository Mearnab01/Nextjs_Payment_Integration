"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { notFound } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import CourseCurriculum from "@/components/shared/courseDetailsPage/CourseCurriculum";
import CourseDescription from "@/components/shared/courseDetailsPage/CourseDescription";
import CourseHero from "@/components/shared/courseDetailsPage/CourseHero";
import LockedContent from "@/components/shared/courseDetailsPage/LockedContent";
import CourseDetailSkeleton from "@/components/styled/CourseDetailSkeleton";
import CourseSidebar from "@/components/shared/courseDetailsPage/courseSidebar";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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

  const courseData = useQuery(api.courses.getCourseById, { courseId });

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
        <CourseHero
          courseData={courseData}
          setIsImageLoaded={setIsImageLoaded}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <CourseDescription description={courseData.description} />

            {userAccess.hasAccess ? (
              <CourseCurriculum />
            ) : (
              <LockedContent price={courseData.price} courseId={courseId} />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <CourseSidebar />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseDetailPage;
