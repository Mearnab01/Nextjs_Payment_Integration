"use client";

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
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Star,
  Users,
  Clock,
  Zap,
  Target,
  Rocket,
  Award,
  ChevronRight,
} from "lucide-react";
import PurchaseButton from "@/components/PurchaseButton";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import AppLoader from "@/components/styled/Loader";

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
      staggerChildren: 0.2,
    },
  },
};

const cardHover = {
  scale: 1.03,
  boxShadow: "0 10px 30px -15px rgba(6, 182, 212, 0.3)",
  transition: { duration: 0.3 },
};

type Course = {
  _id: string;
  _creationTime: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
};

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const convex = new ConvexHttpClient(
          process.env.NEXT_PUBLIC_CONVEX_URL!
        );
        const courseData = await convex.query(api.courses.getCourses);
        setCourses(courseData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    <AppLoader text="Loading courses" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.h1
            className="text-5xl font-bold tracking-tight lg:text-6xl mb-12 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            variants={fadeIn}
          >
            Transform Your Career with Cutting-Edge Tech Skills
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-10"
            variants={fadeIn}
          >
            Dive into immersive, project-based courses taught by industry
            experts. Go from beginner to job-ready with our hands-on learning
            approach.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeIn}
          >
            <Link href="/courses">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 px-8 py-3 text-lg"
              >
                Browse All Courses
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/pro">
              <Button
                variant="outline"
                size="lg"
                className="group border-cyan-500/40 text-cyan-800 hover:bg-cyan-500/10 hover:text-cyan-300 hover:border-cyan-500/60 transition-all duration-300 px-8 py-3 text-lg"
              >
                <Zap className="mr-2 h-5 w-5 fill-amber-400 text-amber-400" />
                Go Pro
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {[
            {
              value: "10K+",
              label: "Students Enrolled",
              icon: <Users className="h-6 w-6 text-cyan-400" />,
            },
            {
              value: "98%",
              label: "Satisfaction Rate",
              icon: <Star className="h-6 w-6 text-amber-400" />,
            },
            {
              value: "200+",
              label: "Hours of Content",
              icon: <Clock className="h-6 w-6 text-purple-400" />,
            },
            {
              value: "15",
              label: "Expert Instructors",
              icon: <Award className="h-6 w-6 text-pink-400" />,
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-gray-800/40 rounded-xl border border-gray-700/50 backdrop-blur-sm"
              variants={fadeIn}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Courses */}
        <motion.div
          className="mb-20"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-white">
              Featured{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Courses
              </span>
            </h2>
            <Link
              href="/courses"
              className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              View all courses <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {courses.slice(0, 3).map((course, index) => (
              <motion.div
                key={course._id}
                variants={fadeIn}
                whileHover={cardHover}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <Card className="flex flex-col bg-gray-800/40 border-gray-700 backdrop-blur-sm overflow-hidden group h-full">
                  <Link
                    href={`/courses/${course._id}`}
                    className="cursor-pointer flex flex-col h-full"
                  >
                    <CardHeader className="p-0 relative overflow-hidden">
                      <div className="relative overflow-hidden">
                        <Image
                          src={course.imageUrl}
                          alt={course.title}
                          width={640}
                          height={360}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-cyan-500/20 text-cyan-300 border-0 backdrop-blur-md">
                            ${course.price.toFixed(2)}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <Badge
                            variant="secondary"
                            className="bg-gray-900/70 text-gray-200 border-0 backdrop-blur-md"
                          >
                            Bestseller
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
                    <SignedOut>
                      <SignInButton mode="modal">
                        <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white transition-all duration-300 w-full">
                          Enroll Now
                        </Button>
                      </SignInButton>
                    </SignedOut>
                    <SignedIn>
                      <PurchaseButton courseId={course._id as Id<"courses">} />
                    </SignedIn>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="mb-20"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Why Learn With{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              CourseFlow
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-12">
            We've reimagined online learning to give you the most effective and
            engaging experience
          </p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {[
              {
                icon: <Target className="h-8 w-8 text-cyan-400" />,
                title: "Industry-Relevant Curriculum",
                description:
                  "Learn skills that employers actually want with content updated regularly based on industry trends",
              },
              {
                icon: <Rocket className="h-8 w-8 text-purple-400" />,
                title: "Project-Based Learning",
                description:
                  "Build real-world projects that you can add to your portfolio and showcase to potential employers",
              },
              {
                icon: <Users className="h-8 w-8 text-pink-400" />,
                title: "Community Support",
                description:
                  "Join a vibrant community of learners, get feedback on your projects, and network with peers",
              },
              {
                icon: <Clock className="h-8 w-8 text-amber-400" />,
                title: "Self-Paced Flexibility",
                description:
                  "Learn on your own schedule with lifetime access to all course materials and future updates",
              },
              {
                icon: <Zap className="h-8 w-8 text-green-400" />,
                title: "Career Services",
                description:
                  "Get resume reviews, interview preparation, and job search guidance from our career coaches",
              },
              {
                icon: <Award className="h-8 w-8 text-blue-400" />,
                title: "Certification",
                description:
                  "Earn certificates that validate your skills and boost your credibility in the job market",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-8 bg-gray-800/40 rounded-2xl border border-gray-700/50 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300"
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
