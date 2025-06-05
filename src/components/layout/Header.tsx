import React from 'react';
import { ChevronLeft, ChevronRight, User } from 'lucide-react'; // Example icons
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // For user avatar

interface HeaderProps {
  title?: string;
  showNavigation?: boolean;
  // children prop can be used for more complex headers (e.g. on AlbumPlaylistViewPage)
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, showNavigation = true, children }) => {
  console.log("Rendering Header with title:", title);

  // Placeholder for history navigation, actual implementation would use react-router or similar
  const goBack = () => console.log("Navigate back");
  const goForward = () => console.log("Navigate forward");

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        {showNavigation && (
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={goBack} aria-label="Go back">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={goForward} aria-label="Go forward">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}
        {title && <h1 className="text-xl font-semibold">{title}</h1>}
      </div>
      {children && <div className="flex-1 flex justify-center items-center px-4">{children}</div>}
      <div className="flex items-center gap-4">
        {/* User avatar and menu - placeholder */}
        <Button variant="outline">Upgrade</Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;