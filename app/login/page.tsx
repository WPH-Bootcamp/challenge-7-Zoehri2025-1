"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { Checkbox } from "@/components/ui/checkbox";
import { apiClient } from "@/services/api/axios";

// Image from Figma design (filled state)
const loginImage =
  "https://www.figma.com/api/mcp/asset/9855b6b9-ebc9-4618-82db-b4f0cba1a1fe";

export default function LoginPage() {
  const router = useRouter();
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});
    setIsSubmitting(true);

    // Basic validation
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // API call untuk login
      console.log("Attempting login with:", { email, apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL });
      
      // Coba endpoint yang paling umum digunakan
      const response = await apiClient.post("/auth/login", { 
        email, 
        password 
      });
      
      console.log("Login response:", response.data);
      
      // Handle successful login - support berbagai format response
      if (response.data) {
        const data = response.data;
        
        // Simpan token - support berbagai format
        const token = data.token || data.data?.token || data.access_token || data.accessToken;
        if (token) {
          localStorage.setItem("token", token);
        }
        
        // Simpan user data - support berbagai format
        const user = data.user || data.data?.user || data.data;
        if (user && typeof user === 'object') {
          localStorage.setItem("user", JSON.stringify(user));
        }
        
        // Redirect ke home setelah login berhasil
        router.push("/");
        return;
      }
      
      // Jika response tidak sesuai format yang diharapkan
      throw new Error("Invalid response from server");
      
    } catch (error: any) {
      console.error("Login error:", error);
      console.error("Error response:", error.response);
      console.error("Error config:", error.config);
      
      // Handle API errors
      if (error.response?.status === 401) {
        setErrors({
          email: "Invalid email or password",
          password: "Invalid email or password",
        });
      } else if (error.response?.status === 404) {
        const attemptedUrl = error.config?.url || "unknown";
        const baseUrl = error.config?.baseURL || "unknown";
        setErrors({
          email: `Endpoint not found (404). Tried: ${baseUrl}${attemptedUrl}. Please check API documentation for correct endpoint.`,
          password: `Endpoint not found (404). Please check your API configuration.`,
        });
      } else if (error.response?.status === 500) {
        setErrors({
          email: "Server error. Please try again later.",
          password: "Server error. Please try again later.",
        });
      } else if (error.response?.data?.message) {
        const errorMessage = error.response.data.message;
        setErrors({
          email: errorMessage,
          password: errorMessage,
        });
      } else if (error.message) {
        setErrors({
          email: error.message,
          password: error.message,
        });
      } else {
        setErrors({
          email: "An error occurred. Please try again.",
          password: "An error occurred. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">
      <div className="flex h-full w-full">
        {/* Left Section - Image (Desktop only) */}
        <div className="relative hidden h-full w-1/2 overflow-hidden lg:block">
          <div className="absolute inset-0">
            <img
              src={loginImage}
              alt="Food background"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="flex h-full w-full items-start justify-center bg-white px-4 pt-[204px] lg:items-center lg:pt-0 lg:w-1/2 lg:px-0">
          <div className="w-full max-w-[345px] lg:max-w-[374px] space-y-4 lg:space-y-5">
            {/* Logo */}
            <Logo />

            {/* Welcome Text */}
            <div className="space-y-1">
              <h1 className="font-display text-[24px] lg:text-[28px] font-extrabold leading-[36px] lg:leading-[38px] text-[#0a0d12]">
                Welcome Back
              </h1>
              <p className="font-body text-sm lg:text-base font-medium leading-[28px] lg:leading-[30px] tracking-[-0.28px] lg:tracking-[-0.48px] text-[#0a0d12]">
                Good to see you again! Let&apos;s eat
              </p>
            </div>

            {/* Sign In/Sign Up Tabs */}
            <div className="flex gap-2 rounded-2xl bg-[#f5f5f5] p-2 h-[48px] lg:h-auto">
              <button
                onClick={() => setIsSignIn(true)}
                className={`flex-1 rounded-lg lg:rounded-xl px-3 py-2 text-center text-sm lg:text-base font-bold leading-[28px] lg:leading-[30px] tracking-[-0.28px] lg:tracking-[-0.32px] transition-all h-[36px] lg:h-auto ${
                  isSignIn
                    ? "bg-white text-[#0a0d12] shadow-[0px_0px_20px_0px_rgba(203,202,202,0.25)]"
                    : "text-[#535862]"
                }`}
              >
                Sign in
              </button>
              <button
                onClick={() => setIsSignIn(false)}
                className={`flex-1 rounded-lg lg:rounded-xl px-3 py-2 text-center text-sm lg:text-base font-medium leading-[28px] lg:leading-[30px] tracking-[-0.28px] lg:tracking-[-0.48px] transition-all h-[36px] lg:h-auto ${
                  !isSignIn
                    ? "bg-white text-[#0a0d12] shadow-[0px_0px_20px_0px_rgba(203,202,202,0.25)]"
                    : "text-[#535862]"
                }`}
              >
                Sign up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
              {/* Email Input */}
              <InputField
                type="email"
                label="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  // Clear error when user starts typing
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }
                }}
                error={errors.email}
                rightIcon={
                  <svg
                    width="11"
                    height="7"
                    viewBox="0 0 11 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#717680]"
                  >
                    <path
                      d="M1 1L5.5 5.5L10 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />

              {/* Password Input */}
              <InputField
                type={showPassword ? "text" : "password"}
                label="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  // Clear error when user starts typing
                  if (errors.password) {
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }
                }}
                error={errors.password}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#0a0d12] hover:opacity-70 transition-opacity"
                  >
                    {showPassword ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 3C4.667 3 2.073 5.133 1 8C2.073 10.867 4.667 13 8 13C11.333 13 13.927 10.867 15 8C13.927 5.133 11.333 3 8 3Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1L15 15M6.333 6.333C5.933 6.733 5.667 7.267 5.667 8C5.667 9.1 6.567 10 7.667 10C8.4 10 8.933 9.733 9.333 9.333M13.133 13.133C11.933 13.933 10.067 14.333 8 14.333C4.667 14.333 2.067 12.2 1 9.333C1.667 7.667 2.933 6.2 4.533 5.2M10.667 4.667C9.467 3.867 7.6 3.467 5.533 3.467C2.2 3.467 -0.4 5.6 -1.467 8.467"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                }
              />

              {/* Remember Me Checkbox */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm lg:text-base font-medium leading-[28px] lg:leading-[30px] tracking-[-0.28px] lg:tracking-[-0.48px] text-[#0a0d12] cursor-pointer"
                >
                  Remember Me
                </label>
              </div>

              {/* Login Button */}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
