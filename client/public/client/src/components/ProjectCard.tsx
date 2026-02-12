import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
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
}: ProjectCardProps) {
  return (
    <Link href={`/portfolio/${id}`}>
      <a className={cn("group block h-full", className)}>
        <div className="relative h-full bg-card border border-border/50 rounded-xl overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_-10px_rgba(75,120,216,0.15)] hover:-translate-y-2 flex flex-col">
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 opacity-60 transition-opacity group-hover:opacity-40" />
            <img
              src={image}
              alt={title}
              className={cn(
                "block w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
                imageClassName
              )}
            />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-20">
              <Badge variant="secondary" className="bg-background/80 backdrop-blur-md border-primary/20 text-xs font-medium uppercase tracking-wider">
                {category}
              </Badge>
            </div>
            
            {/* Hover Overlay Icon */}
            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center text-primary-foreground transform scale-50 group-hover:scale-100 transition-transform duration-300">
                <ArrowUpRight size={32} />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm mb-6 line-clamp-2 flex-grow">
              {description}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag} 
                  className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md border border-border/50"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-xs text-muted-foreground px-2 py-1">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
