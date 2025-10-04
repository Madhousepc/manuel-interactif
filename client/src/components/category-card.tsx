import { LucideIcon } from "lucide-react";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  className?: string;
}

export function CategoryCard({ id, title, description, icon: Icon, href, className }: CategoryCardProps) {
  return (
    <Link href={href}>
      <Card
        className={cn(
          "transition-all duration-200 cursor-pointer hover-elevate active-elevate-2 hover:shadow-md h-full",
          className
        )}
        data-testid={`card-category-${id}`}
      >
        <CardHeader className="flex flex-row items-start gap-4 space-y-0">
          <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg mb-1">{title}</CardTitle>
            <CardDescription className="text-sm line-clamp-2">
              {description}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
