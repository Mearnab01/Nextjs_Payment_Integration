import { Skeleton } from "@/components/ui/skeleton";

const CourseDetailSkeleton = () => (
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

export default CourseDetailSkeleton;
