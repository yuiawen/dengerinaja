import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Moon, Sun, Music, Bell, User, Settings, LogOut } from 'lucide-react';

const Header = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const isDarkMode = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <Music className="w-5 h-5 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            DengerinAja
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full hover:bg-accent/20 transition-all duration-200"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-accent transition-transform rotate-0 scale-100" />
            ) : (
              <Moon className="w-5 h-5 text-accent transition-transform rotate-0 scale-100" />
            )}
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full hover:bg-accent/20 transition-all duration-200"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
          </Button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback className="bg-gradient-primary text-white">
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-popover border-border shadow-lg" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium text-foreground">User</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    user@example.com
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-accent/10">
                <User className="mr-2 h-4 w-4" />
                <span>Akun Saya</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-accent/10">
                <Settings className="mr-2 h-4 w-4" />
                <span>Pengaturan</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-accent/10 text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Keluar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;