import { Link, useLocation } from 'react-router-dom';
import { Home, Music, TrendingUp, Music2 } from 'lucide-react';

const MobileNavigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/playlist', icon: Music, label: 'Playlist' },
    { path: '/trending', icon: TrendingUp, label: 'Trending' },
    { path: '/genres', icon: Music2, label: 'Genre' },
  ];

  return (
    <div className="bg-muted/30 border-t border-border">
      <div className="flex">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex-1 flex flex-col items-center py-3 px-2 text-xs transition-colors ${
              location.pathname === item.path
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <item.icon className="w-5 h-5 mb-1" />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;