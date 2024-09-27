import * as React from "react";
import { cn } from "@/lib/utils";

// Layout component with customizable properties
interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  fadedBelow?: boolean;
  fixedHeight?: boolean;
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, fadedBelow = false, fixedHeight = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex h-full w-full flex-col", // Base styles
        fadedBelow &&
          "after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:hidden after:h-32 after:w-full after:bg-[linear-gradient(180deg,_transparent_10%,_hsl(var(--background))_70%)] after:md:block", // Faded effect
        fixedHeight && "md:h-svh", // Fixed height on medium screens
        className // Custom class names
      )}
      {...props}
    />
  )
);
Layout.displayName = "Layout";

// LayoutHeader component for the header section
const LayoutHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-[var(--header-height)] flex-none items-center gap-4 bg-background p-4 md:px-8", // Header styles
      className // Custom class names
    )}
    {...props}
  />
));
LayoutHeader.displayName = "LayoutHeader";

// LayoutBody component with customizable properties
interface LayoutBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  fixedHeight?: boolean;
}

const LayoutBody = React.forwardRef<HTMLDivElement, LayoutBodyProps>(
  ({ className, fixedHeight, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex-1 overflow-hidden px-4 py-6 md:px-8", // Base styles
        fixedHeight && "h-[calc(100%-var(--header-height))]", // Fixed height calculation
        className // Custom class names
      )}
      {...props}
    />
  )
);
LayoutBody.displayName = "LayoutBody";

export { Layout, LayoutHeader, LayoutBody };
