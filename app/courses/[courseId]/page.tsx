import { Id } from "@/convex/_generated/dataModel";
import CourseDetailClient from "./CourseDetailClient";

interface CourseDetailPageProps {
  params: { courseId: Id<"courses"> };
}

const CourseDetailPage = async ({ params }: CourseDetailPageProps) => {
  const { courseId } = await params;

  return <CourseDetailClient courseId={courseId} />;
};

export default CourseDetailPage;
