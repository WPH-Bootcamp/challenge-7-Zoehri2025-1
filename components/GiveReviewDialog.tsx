"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GiveReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId?: string;
  restaurantName?: string;
}

function StarIcon({
  filled,
  className,
}: {
  filled: boolean;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function GiveReviewDialog({
  open,
  onOpenChange,
  orderId,
  restaurantName,
}: GiveReviewDialogProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const displayRating = hoverRating || rating;

  const handleSend = () => {
    // TODO: Submit review to API
    setRating(0);
    setHoverRating(0);
    setComment("");
    onOpenChange(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setRating(0);
      setHoverRating(0);
      setComment("");
    }
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[calc(100vw-32px)] max-w-md rounded-2xl border border-gray-100 p-0 gap-0 overflow-hidden bg-white shadow-xl sm:max-w-[420px] sm:w-full">
        <DialogHeader className="px-4 pt-4 pb-3 sm:px-6 sm:pt-6 sm:pb-4 border-b border-gray-100 pr-11 sm:pr-12">
          <DialogTitle className="text-lg sm:text-xl font-display font-bold text-[#0a0d12]">
            Give Review
          </DialogTitle>
        </DialogHeader>

        <div className="px-4 py-4 space-y-4 sm:px-6 sm:py-6 sm:space-y-6">
          {/* Give Rating - Figma 37421-11978 mobile */}
          <div>
            <h4 className="text-sm font-semibold text-[#0a0d12] mb-2 sm:mb-3">
              Give Rating
            </h4>
            <div className="flex items-center gap-0.5 sm:gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1.5 -m-1.5 sm:p-1 sm:-m-1 rounded transition-colors hover:bg-gray-50 active:bg-gray-100 touch-manipulation"
                  aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                >
                  <StarIcon
                    filled={value <= displayRating}
                    className={cn(
                      "w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 transition-colors",
                      value <= displayRating ? "text-[#FF6B35]" : "text-gray-200"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <h4 className="text-sm font-semibold text-[#0a0d12] mb-2">
              Comment
            </h4>
            <textarea
              placeholder="Please share your thoughts about our service!"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full px-3 py-3 sm:px-4 sm:py-3 rounded-xl border border-gray-200 text-[#0a0d12] placeholder:text-[#717680] focus:outline-none focus:ring-2 focus:ring-[#c12116] focus:border-transparent resize-none text-sm min-h-[80px] sm:min-h-0 sm:rows-4"
            />
          </div>

          <Button
            onClick={handleSend}
            className="w-full h-11 sm:h-12 rounded-2xl sm:rounded-xl font-bold text-sm sm:text-base bg-[#c12116] hover:bg-[#a01a12]"
          >
            Send
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
