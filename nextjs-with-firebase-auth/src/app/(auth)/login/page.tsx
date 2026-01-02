import { Suspense } from "react";
import AuthCardSkeleton from "@/components/Skeletons/AuthCardSkeleton";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="text-center">
            <div className="flex items-center gap-2 justify-center">
              <span className="text-gray-700 font-bold text-xl tracking-wider">
                BROWSE
              </span>
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🍽️</span>
              </div>
              <span className="text-gray-700 font-bold text-xl tracking-wider">
                BITE
              </span>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <Suspense fallback={<AuthCardSkeleton />}>
            <LoginForm />
          </Suspense>
        </div>

        {/* Language Selector */}
        <div className="flex justify-center mt-6">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
