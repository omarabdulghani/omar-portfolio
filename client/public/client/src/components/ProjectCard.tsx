import { Link } from "wouter";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  image: string;
  imageClassName?: string;
  description: string;
  tags: string[];
  className?: string;
  analyticsContext?: string;
}

export default function ProjectCard({
  id,
  title,
  category,
  image,
  imageClassName,
  description,
  tags,
  className,
  analyticsContext,
}: ProjectCardProps) {
  return (
    <Link href={`/portfolio/${id}`}>
      <a
        className={cn("group block h-full", className)}
        onClick={() => trackEvent("project_card_click", { project_id: id, location: analyticsContext ?? "project_grid" })}
      >
        <div className="relative h-full rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(var(--primary),0.15)] overflow-hidden flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative aspect-[4/3] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 opacity-60 transition-opacity group-hover:opacity-40" />
            <img
              src={image}
              alt={title}
              className={cn(
                "block w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105",
                imageClassName
              )}
            />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-20">
              <Badge variant="secondary" className="bg-background/80 backdrop-blur-md border-primary/20 text-xs font-medium uppercase tracking-wider">
                {category}
              </Badge>
            </div>
            

          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-grow">
              {description}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {tags.map((tag) => (
                <span 
                  key={tag} 
                  className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md border border-border/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
