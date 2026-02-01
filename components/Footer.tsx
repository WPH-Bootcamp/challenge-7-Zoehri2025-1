import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="bg-[#0a0d12] text-white py-8 sm:py-10 lg:py-16 pb-safe">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 text-center md:text-left">
          {/* Left Column - About Foody & Social Media */}
          <div className="space-y-3 sm:space-y-4 lg:space-y-6 flex flex-col items-center md:items-start">
            <Logo variant="white" />
            <p className="text-sm lg:text-base font-medium leading-relaxed text-gray-300 max-w-sm">
              Enjoy homemade flavors & chef&apos;s signature dishes, freshly
              prepared every day. Order online or visit our nearest branch.
            </p>
            <div className="space-y-3">
              <h4 className="text-base lg:text-lg font-bold text-white">
                Follow on Social Media
              </h4>
              <div className="flex items-center justify-center md:justify-start gap-3">
                {[
                  "facebook",
                  "instagram",
                  "linkedin",
                  "tiktok",
                ].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#1a1d24] flex items-center justify-center hover:bg-[#2a2d34] active:bg-[#2a2d34] transition-colors min-h-[44px] min-w-[44px]"
                    aria-label={social}
                  >
                    <span className="text-white text-sm font-bold">
                      {social[0].toUpperCase()}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column - Explore Links */}
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            <h4 className="text-base lg:text-lg font-bold text-white">
              Explore
            </h4>
            <ul className="space-y-2 lg:space-y-3">
              {[
                "All Food",
                "Nearby",
                "Discount",
                "Best Seller",
                "Delivery",
                "Lunch",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm lg:text-base font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Help Links */}
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            <h4 className="text-base lg:text-lg font-bold text-white">Help</h4>
            <ul className="space-y-2 lg:space-y-3">
              {[
                "How to Order",
                "Payment Methods",
                "Track My Order",
                "FAQ",
                "Contact Us",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm lg:text-base font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
