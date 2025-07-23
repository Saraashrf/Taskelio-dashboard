"use client";
import { login } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      dispatch(login(data)); // store user and token
      router.push("/dashboard"); // go to dashboard
    } else {
      setError(data.error || "Login failed");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen w-full">
        {/* Image section */}
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage: "url('/books.jpg')",
          }}
        >
          <div className="flex items-center h-full px-20 bg-[rgba(0,0,0,0.1)]">
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Taskelio
              </h2>
              <p className="text-xl sm:text-2xl max-w-xl mt-3 text-gray-300">
                Manage your daily tasks in one place with elegance and ease.
              </p>
            </div>
          </div>
        </div>

        {/* Form section */}
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center flex items-center flex-col">
              <img src="/logo.svg" alt="Taskelio Logo" className="w-16 h-16" />
              <p className="text-xl sm:text-2xl mt-3 text-gray-500 dark:text-gray-300">
                Sign in to access your account
              </p>
            </div>

            <div className="mt-10">
              <form onSubmit={handleLogin}>
                {/* Error */}
                {error && (
                  <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded">
                    {error}
                  </div>
                )}

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2  text-sm sm:text-lg text-gray-600 dark:text-gray-200"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring focus:ring-blue-400 focus:outline-none focus:ring-opacity-40"
                    placeholder="example@example.com"
                  />
                </div>

                {/* Password */}
                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm sm:text-lg text-gray-600 dark:text-gray-200"
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-sm sm:text-base text-orange-800 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring focus:ring-blue-400 focus:outline-none focus:ring-opacity-40"
                    placeholder="Your Password"
                  />
                </div>

                {/* Submit button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-black rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:ring focus:ring-gray-600 focus:ring-opacity-50 text-sm sm:text-lg"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="text-orange-800 hover:underline focus:outline-none"
                >
                  Sign up
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
