import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import {
  BookOpenIcon,
  CreditCardIcon,
  GraduationCap,
  LogOutIcon,
  ZapIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-gray-900/80 border-b border-gray-700/50 supports-backdrop-blur:bg-gray-900/60">
      <div className="flex justify-between items-center py-3 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href={"/"} className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg ring-1 ring-gray-700">
              <GraduationCap className="size-6 text-cyan-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                CourseFlow
              </span>
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-1 md:space-x-2">
          <Link
            href={"/courses"}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-gray-800 transition-all duration-200 group"
          >
            <BookOpenIcon className="size-4 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline font-medium">Courses</span>
          </Link>

          <Link
            href={"/pro"}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-gray-300 hover:text-purple-400 hover:bg-gray-800 transition-all duration-200 group"
          >
            <div className="relative">
              <ZapIcon className="size-4 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-purple-500 rounded-full animate-pulse"></span>
            </div>
            <span className="hidden sm:inline font-medium">Pro</span>
          </Link>

          <SignedIn>
            <Link href={"/billing"}>
              <Button
                variant={"outline"}
                size={"sm"}
                className="flex items-center gap-2 text-gray-900  border-gray-600 hover:border-cyan-500 hover:bg-gray-800 hover:text-cyan-400 transition-all"
              >
                <CreditCardIcon className="size-4" />
                <span className="hidden sm:inline font-medium">Billing</span>
              </Button>
            </Link>
          </SignedIn>

          {/* User Actions */}
          <div className="flex items-center space-x-1 md:space-x-2 ml-2">
            {/* User button with custom styling */}
            <div className="border-l pl-2 md:pl-3 ml-1 border-gray-700">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-8 h-8 ring-2 ring-cyan-500/30 hover:ring-cyan-500/50 transition-all",
                  },
                }}
              />
            </div>

            <SignedIn>
              <SignOutButton>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex items-center gap-2 text-gray-900 border-gray-600 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 transition-all"
                >
                  <LogOutIcon className="h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </SignOutButton>
            </SignedIn>

            <SignedOut>
              <div className="flex items-center gap-2">
                <SignInButton mode="modal">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-200 border-gray-600 hover:border-cyan-500 hover:bg-gray-800 hover:text-cyan-400 transition-all"
                  >
                    Log in
                  </Button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <Button
                    size={"sm"}
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-cyan-500/20"
                  >
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
