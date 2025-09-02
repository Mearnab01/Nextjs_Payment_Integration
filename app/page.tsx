import { ConvexHttpClient } from "convex/browser";
// import { api } from "../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Users, Clock } from "lucide-react";
import PurchaseButton from "@/components/PurchaseButton";
import { courses } from "@/courseData";

export default async function Home() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  // const courses = await convex.query(api.courses.getCourses);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Forge Your Path in Modern Development
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Master fullstack skills through engaging, project-based learning.
            Unlock your potential with CourseFlow.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {courses.slice(0, 3).map((course) => (
            <Card
              key={course._id}
              className="flex flex-col bg-gray-800/50 border-gray-700 backdrop-blur-sm overflow-hidden group hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
            >
              <Link href={`/courses/${course._id}`} className="cursor-pointer">
                <CardHeader className="p-0 relative overflow-hidden">
                  <div className="relative overflow-hidden">
                    <Image
                      src={course.imageUrl}
                      alt={course.title}
                      width={640}
                      height={360}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant="secondary"
                        className="bg-cyan-500/20 text-cyan-300 border-0"
                      >
                        ${course.price.toFixed(2)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-6">
                  <CardTitle className="text-xl mb-3 text-white group-hover:text-cyan-400 transition-colors">
                    {course.title}
                  </CardTitle>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {course.description ||
                      "Master this technology with hands-on projects and expert guidance."}
                  </p>

                  {/* Course Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>12h</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>1.2k</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                      <span>4.8</span>
                    </div>
                  </div>
                </CardContent>
              </Link>

              <CardFooter className="flex justify-between items-center p-6 pt-0">
                {/*   <SignedIn>
                  <PurchaseButton courseId={course._id} />
                </SignedIn> */}

                <SignedOut>
                  <SignInButton mode="modal">
                    <Button
                      variant={"outline"}
                      className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-colors"
                    >
                      Enroll Now
                    </Button>
                  </SignInButton>
                </SignedOut>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link href="/pro">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
            >
              Explore Pro Plans
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50 backdrop-blur-sm">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Expert Instructors
            </h3>
            <p className="text-gray-400">
              Learn from industry professionals with real-world experience
            </p>
          </div>

          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50 backdrop-blur-sm">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Self-Paced Learning
            </h3>
            <p className="text-gray-400">
              Study at your own pace with lifetime access to course materials
            </p>
          </div>

          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50 backdrop-blur-sm">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Project-Based
            </h3>
            <p className="text-gray-400">
              Build portfolio-worthy projects that demonstrate your skills
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
