"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { Checkbox } from "@/components/ui/checkbox";
import { RegisterSuccessDialog } from "@/components/RegisterSuccessDialog";
import { cn } from "@/lib/utils";

// Image from Figma design (same as login)
const registerImage =
  "https://www.figma.com/api/mcp/asset/9855b6b9-ebc9-4618-82db-b4f0cba1a1fe";

export default function RegisterPage() {
  const router = useRouter();
  // Always show Sign Up tab as active on register page
  const [isSignIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    confirmPassword?: string;
    agreeToTerms?: string;
    general?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({});
    setIsSubmitting(true);

    // Basic validation
    const newErrors: {
      name?: string;
      email?: string;
      phoneNumber?: string;
      password?: string;
      confirmPassword?: string;
      agreeToTerms?: string;
    } = {};

    if (!name) {
      newErrors.name = "Name is required";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[0-9+\-\s()]+$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone number is invalid";
    } else if (phoneNumber.replace(/\D/g, "").length < 10) {
      newErrors.phoneNumber = "Phone number must be at least 10 digits";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // TODO: Replace with actual API call
      // Example:
      // const response = await apiClient.post("/auth/register", { name, email, phoneNumber, password });
      // if (response.data.success) {
      //   // Handle successful registration (redirect to login, etc.)
      //   router.push("/login");
      // }

      // Simulate API call for demo
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate error for demo - remove this in production
      // Common registration errors:
      // - Email already exists
      // - Invalid email format
      // - Password too weak
      // - Network error
      
      // Uncomment to test error state:
      // throw new Error("Email already exists");
      
      // Show success dialog instead of redirecting immediately
      setShowSuccessDialog(true);
    } catch (error: any) {
      // Handle API errors according to Figma design
      const errorMessage = error.response?.data?.message || error.message || "An error occurred. Please try again.";
      
      // Check if it's an email-related error
      if (errorMessage.toLowerCase().includes("email") || error.response?.status === 409) {
        setErrors({
          email: errorMessage.includes("already") || error.response?.status === 409
            ? "This email is already registered. Please use a different email or sign in."
            : errorMessage,
        });
      } 
      // Check if it's a phone-related error
      else if (errorMessage.toLowerCase().includes("phone") || errorMessage.toLowerCase().includes("number")) {
        setErrors({
          phoneNumber: errorMessage,
        });
      }
      // Check if it's a password-related error
      else if (errorMessage.toLowerCase().includes("password")) {
        setErrors({
          password: errorMessage,
        });
      }
      // Check if it's a name-related error
      else if (errorMessage.toLowerCase().includes("name")) {
        setErrors({
          name: errorMessage,
        });
      }
      // General error - show on email field as primary error location
      else {
        setErrors({
          email: errorMessage,
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
              src={registerImage}
              alt="Food background"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Right Section - Register Form */}
        <div className="flex h-full w-full items-start justify-center bg-white px-4 pt-[204px] lg:items-center lg:pt-0 lg:w-1/2 lg:px-0">
          <div className="w-full max-w-[345px] lg:max-w-[374px] space-y-4 lg:space-y-5">
            {/* Logo */}
            <Logo />

            {/* Welcome Text */}
            <div className="space-y-1">
              <h1 className="font-display text-[24px] lg:text-[28px] font-extrabold leading-[36px] lg:leading-[38px] text-[#0a0d12]">
                Create Account
              </h1>
              <p className="font-body text-sm lg:text-base font-medium leading-[28px] lg:leading-[30px] tracking-[-0.28px] lg:tracking-[-0.48px] text-[#0a0d12]">
                Join us and start your culinary journey
              </p>
            </div>

            {/* Sign In/Sign Up Tabs */}
            <div className="flex gap-2 rounded-2xl bg-[#f5f5f5] p-2 h-[48px] lg:h-auto">
              <button
                onClick={() => router.push("/login")}
                className="flex-1 rounded-lg lg:rounded-xl px-3 py-2 text-center text-sm lg:text-base font-medium leading-[28px] lg:leading-[30px] tracking-[-0.28px] lg:tracking-[-0.48px] transition-all h-[36px] lg:h-auto text-[#535862] hover:text-[#0a0d12]"
              >
                Sign in
              </button>
              <button
                className="flex-1 rounded-lg lg:rounded-xl px-3 py-2 text-center text-sm lg:text-base font-bold leading-[28px] lg:leading-[30px] tracking-[-0.28px] lg:tracking-[-0.32px] transition-all h-[36px] lg:h-auto bg-white text-[#0a0d12] shadow-[0px_0px_20px_0px_rgba(203,202,202,0.25)]"
              >
                Sign up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
              {/* Name Input */}
              <InputField
                type="text"
                label="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) {
                    setErrors((prev) => ({ ...prev, name: undefined }));
                  }
                }}
                error={errors.name}
              />

              {/* Email Input */}
              <InputField
                type="email"
                label="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
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

              {/* Phone Number Input */}
              <InputField
                type="tel"
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => {
                  // Allow only numbers, +, -, spaces, and parentheses
                  const value = e.target.value.replace(/[^\d+\-\s()]/g, "");
                  setPhoneNumber(value);
                  if (errors.phoneNumber) {
                    setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
                  }
                }}
                error={errors.phoneNumber}
                placeholder="+62 812 3456 7890"
              />

              {/* Password Input */}
              <InputField
                type={showPassword ? "text" : "password"}
                label="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
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

              {/* Confirm Password Input */}
              <InputField
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) {
                    setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                  }
                }}
                error={errors.confirmPassword}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-[#0a0d12] hover:opacity-70 transition-opacity"
                  >
                    {showConfirmPassword ? (
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

              {/* Terms and Conditions Checkbox */}
              <div className="space-y-1">
                <div className={`flex items-start gap-2 ${errors.agreeToTerms ? 'items-start' : ''}`}>
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onChange={(e) => {
                      setAgreeToTerms(e.target.checked);
                      if (errors.agreeToTerms) {
                        setErrors((prev) => ({ ...prev, agreeToTerms: undefined }));
                      }
                    }}
                    className={cn(
                      "mt-1",
                      errors.agreeToTerms && "border-[#c12116]"
                    )}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm lg:text-base font-medium leading-[28px] lg:leading-[30px] tracking-[-0.28px] lg:tracking-[-0.48px] text-[#0a0d12] cursor-pointer flex-1"
                  >
                    I agree to the{" "}
                    <a href="#" className="text-[#c12116] hover:underline">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#c12116] hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                {errors.agreeToTerms && (
                  <div className="flex items-start gap-1.5 ml-6">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-[#c12116] mt-0.5 shrink-0"
                    >
                      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                      <path
                        d="M7 3.5V7M7 10.5H7.01"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <p className="text-sm font-semibold text-[#c12116] leading-[20px] tracking-[-0.28px]">
                      {errors.agreeToTerms}
                    </p>
                  </div>
                )}
              </div>

              {/* General Error Message (if any) */}
              {errors.general && (
                <div className="rounded-xl bg-[#FEF2F2] border border-[#FECACA] p-4 flex items-start gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#c12116] shrink-0 mt-0.5"
                  >
                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M10 5V10M10 15H10.01"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p className="text-sm font-semibold text-[#c12116] flex-1 leading-relaxed">
                    {errors.general}
                  </p>
                </div>
              )}

              {/* Register Button */}
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
            </form>

            {/* Sign In Link */}
            <p className="text-center text-sm lg:text-base font-medium text-[#535862]">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-[#c12116] font-bold hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <RegisterSuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        email={email}
      />
    </div>
  );
}
