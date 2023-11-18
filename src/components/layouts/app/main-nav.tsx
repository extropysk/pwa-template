import { cn } from "@/utils/ui";
import { Link } from "@tanstack/react-router";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        to="/app"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        to="/app/appearance"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Appearance
      </Link>
    </nav>
  );
}
