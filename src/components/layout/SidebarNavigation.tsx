import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, Music2, Radio } from 'lucide-react'; // Example icons

// Define a type for navigation items
interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/library', label: 'Your Library', icon: Library },
  // Add more specific navigation items as needed
  // { href: '/playlists', label: 'Playlists', icon: ListMusic },
  // { href: '/artists', label: 'Artists', icon: Mic2 },
];

const SidebarNavigation: React.FC = () => {
  console.log("Rendering SidebarNavigation");
  const location = useLocation();

  // Placeholder for Doraemon-themed blue. Replace with actual theme color from tailwind.config.ts
  const activeLinkClass = "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200";
  const inactiveLinkClass = "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white";
  const linkBaseClass = "flex items-center p-3 rounded-lg space-x-3 transition-colors duration-150";

  return (
    <aside className="w-64 h-screen bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 space-y-6 fixed top-0 left-0 overflow-y-auto">
      <div className="flex items-center space-x-2 p-2 mb-4">
        <Music2 className="h-8 w-8 text-blue-600 dark:text-blue-400" /> {/* Themed App Icon */}
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">MusicApp</h1> {/* App Name */}
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`${linkBaseClass} ${location.pathname === item.href ? activeLinkClass : inactiveLinkClass}`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
        {/* Example: "Made for You" section or other custom sections */}
        <h2 className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
          Discover
        </h2>
        <Link
            to="/discover/radio"
            className={`${linkBaseClass} ${location.pathname === '/discover/radio' ? activeLinkClass : inactiveLinkClass}`}
          >
            <Radio className="h-5 w-5" />
            <span>Radio</span>
        </Link>
        {/* Add more links or components here */}
      </div>
    </aside>
  );
};

export default SidebarNavigation;