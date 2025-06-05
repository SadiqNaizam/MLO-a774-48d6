import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlayCircle } from 'lucide-react'; // Play icon for hover effect

interface ContentCardProps {
  imageUrl: string;
  title: string;
  description?: string;
  onClick?: () => void;
  // Doraemon theme styling would be applied via Tailwind classes or a theme provider
  // Example: Doraemon blue accent -> 'border-blue-500' or custom theme variable
  themeAccentColor?: string; // e.g., 'blue-500'
}

const ContentCard: React.FC<ContentCardProps> = ({
  imageUrl,
  title,
  description,
  onClick,
  themeAccentColor = 'blue-500', // Default placeholder for Doraemon blue
}) => {
  console.log("Rendering ContentCard:", title);

  return (
    <Card
      className={`w-full max-w-[220px] overflow-hidden transition-all duration-300 hover:shadow-xl group cursor-pointer
                  rounded-lg border-2 border-transparent hover:border-${themeAccentColor}`} // Rounded corners and themed hover border
      onClick={onClick}
    >
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={1 / 1}>
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={title}
            className="object-cover w-full h-full rounded-t-md"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <PlayCircle className={`h-12 w-12 text-white text-${themeAccentColor} opacity-80`} />
        </div>
      </CardHeader>
      <CardContent className={`p-3 bg-card text-card-foreground`}> {/* Doraemon blue background can be set here if needed */}
        <CardTitle className="text-md font-semibold truncate">{title}</CardTitle>
        {description && (
          <CardDescription className="text-xs text-muted-foreground truncate">{description}</CardDescription>
        )}
      </CardContent>
    </Card>
  );
};

export default ContentCard;