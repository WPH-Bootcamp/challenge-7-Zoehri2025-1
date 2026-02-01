// Logo assets from Figma
const logoIcon = "https://www.figma.com/api/mcp/asset/2fb63164-defe-4c91-85c7-04876c979e80";

interface LogoProps {
  variant?: "default" | "white";
}

export function Logo({ variant = "default" }: LogoProps) {
  const textColor = variant === "white" ? "text-white" : "text-[#0a0d12]";
  
  return (
    <div className="flex items-center gap-[11.429px] lg:gap-[15px]">
      <div className="relative h-[32px] w-[32px] lg:h-[42px] lg:w-[42px] shrink-0 overflow-hidden">
        {/* Logo icon from Figma */}
        <img
          src={logoIcon}
          alt="Foody Logo"
          className="h-full w-full object-contain"
        />
      </div>
      <p className={`font-display text-[24.381px] lg:text-[32px] font-extrabold leading-[32px] lg:leading-[42px] ${textColor}`}>
        Foody
      </p>
    </div>
  );
}
