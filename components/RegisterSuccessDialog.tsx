"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface RegisterSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email?: string;
}

export function RegisterSuccessDialog({
  open,
  onOpenChange,
  email,
}: RegisterSuccessDialogProps) {
  const router = useRouter();

  const handleContinue = () => {
    onOpenChange(false);
    router.push("/login");
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent 
        className="sm:max-w-[425px] rounded-2xl lg:rounded-3xl p-6 lg:p-8 border-0 shadow-xl [&>button]:hidden"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center space-y-4 lg:space-y-6">
          {/* Success Icon - Green checkmark circle */}
          <div className="flex justify-center">
            <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-[#10B981] flex items-center justify-center shadow-lg">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="24" cy="24" r="24" fill="#10B981" />
                <path
                  d="M16 24L21 29L32 18"
                  stroke="white"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Success Title */}
          <DialogTitle className="font-display text-2xl lg:text-3xl font-extrabold text-[#0a0d12] pt-2">
            Registration Successful!
          </DialogTitle>

          {/* Success Description */}
          <DialogDescription className="text-sm lg:text-base font-medium text-[#535862] leading-relaxed px-2">
            {email ? (
              <>
                Your account has been created successfully. We&apos;ve sent a
                verification email to{" "}
                <span className="font-bold text-[#0a0d12]">{email}</span>.
                Please check your inbox to verify your account.
              </>
            ) : (
              <>
                Your account has been created successfully! You can now sign
                in to start your culinary journey.
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        {/* Action Button */}
        <div className="mt-6 lg:mt-8">
          <Button
            onClick={handleContinue}
            className="w-full h-12 lg:h-14 text-base lg:text-lg font-bold rounded-xl lg:rounded-2xl"
          >
            Continue to Sign In
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
