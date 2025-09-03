// app/courses/page.tsx
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import PurchaseButton from "@/components/PurchaseButton";
import {
  Star,
  Clock,
  Users,
  BookOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const CoursesPage = async () => {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

  // Fetch courses
  const courses = await convex.query(api.courses.getCourses);

  return (
    <div className="courses-page">
      <div className="container mx-auto">
        <div className="text-center mb-12 relative">
          <div className="absolute -top-10 left-1/4 opacity-20">
            <Sparkles size={48} className="text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 mb-4">
            Explore Our Courses
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover a world of knowledge with our expertly crafted courses
            designed to boost your skills
          </p>
        </div>

        {/* Courses grid */}
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course._id} className="course-card group">
              <Card className="course-card-body group-hover:border-cyan-500/30 group-hover:shadow-lg group-hover:shadow-cyan-500/10">
                <Link
                  href={`/courses/${course._id}`}
                  className="cursor-pointer"
                >
                  <CardHeader className="p-0 relative overflow-hidden">
                    <div className="course-image-wrapper">
                      <Image
                        src={course.imageUrl}
                        alt={course.title}
                        fill
                        className="course-image"
                      />
                      <div className="image-gradient-overlay"></div>

                      {/* Course badges */}
                      <div className="course-badges">
                        <Badge variant="secondary" className="badge-cyan">
                          <Star
                            size={14}
                            className="mr-1 fill-amber-400 text-amber-400"
                          />
                          4.8
                        </Badge>
                        <Badge variant="secondary" className="badge-purple">
                          <Users size={14} className="mr-1" />
                          120+
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-grow p-5">
                    <CardTitle className="course-title">
                      {course.title}
                    </CardTitle>
                    <p className="course-description">
                      {course.description
                        ? course.description.length > 50
                          ? `${course.description.substring(0, 50)}...`
                          : course.description
                        : "Master this topic with our comprehensive course designed for all skill levels."}
                    </p>

                    {/* Course metadata */}
                    <div className="course-meta">
                      <div className="meta-item">
                        <BookOpen size={14} className="mr-1" />
                        <span>12 Lessons</span>
                      </div>
                      <div className="meta-item">
                        <Clock size={14} className="mr-1" />
                        <span>6h 30m</span>
                      </div>
                    </div>
                  </CardContent>
                </Link>

                <CardFooter className="flex justify-between items-center p-5 pt-0">
                  <Badge variant="default" className="price-badge">
                    ${course.price.toFixed(2)}
                  </Badge>
                  <div className="flex items-center">
                    <SignedIn>
                      <PurchaseButton courseId={course._id} />
                    </SignedIn>
                    <SignedOut>
                      <SignInButton mode="modal">
                        <Button
                          variant="outline"
                          className="enroll-btn group/btn"
                        >
                          Enroll Now
                          <ArrowRight size={16} className="ml-2 btn-arrow" />
                        </Button>
                      </SignInButton>
                    </SignedOut>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
