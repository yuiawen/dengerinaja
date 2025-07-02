import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Home, Music, TrendingUp, Music2, Search, Youtube } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  source: 'youtube' | 'spotify' | 'soundcloud';
  url: string;
  embedUrl?: string;
}

interface SidebarProps {
  playlist: Song[];
  onPlay: (song: Song) => void;
  onRemove: (songId: string) => void;
  currentPlaying?: string;
}

const Sidebar = ({ playlist, onPlay, onRemove, currentPlaying }: SidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSource, setSearchSource] = useState('youtube');
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}&source=${searchSource}`;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'youtube':
        return <Youtube className="w-4 h-4 text-youtube" />;
      case 'spotify':
        return <Music2 className="w-4 h-4 text-spotify" />;
      case 'soundcloud':
        return <div className="w-4 h-4 bg-soundcloud rounded-full" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/playlist', icon: Music, label: 'Playlist Saya' },
    { path: '/trending', icon: TrendingUp, label: 'Lagu Trending' },
    { path: '/genres', icon: Music2, label: 'Genre Populer' },
  ];

  return (
    <div className="h-full bg-muted/20 border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
            <Music className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            DengerinAja+
          </h1>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="space-y-3">
          <Input
            type="text"
            placeholder="Cari lagu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 text-sm"
          />
          <div className="flex gap-2">
            <Select value={searchSource} onValueChange={setSearchSource}>
              <SelectTrigger className="h-8 text-xs bg-background hover:bg-accent/10 border-border">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border shadow-lg">
                <SelectItem value="youtube" className="cursor-pointer hover:bg-accent/10">
                  <div className="flex items-center gap-2">
                    <Youtube className="w-3 h-3 text-youtube" />
                    <span>YouTube</span>
                  </div>
                </SelectItem>
                <SelectItem value="spotify" className="cursor-pointer hover:bg-accent/10">
                  <div className="flex items-center gap-2">
                    <Music2 className="w-3 h-3 text-spotify" />
                    <span>Spotify</span>
                  </div>
                </SelectItem>
                <SelectItem value="soundcloud" className="cursor-pointer hover:bg-accent/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-soundcloud rounded-full" />
                    <span>SoundCloud</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" size="sm" className="h-8 px-3 bg-gradient-primary text-white hover:opacity-90">
              <Search className="w-3 h-3" />
            </Button>
          </div>
        </form>
      </div>

      {/* Navigation */}
      <div className="p-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <Separator />

      {/* Playlist Section */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Playlist Saya</h3>
            <span className="text-xs text-muted-foreground">
              {playlist.length} lagu
            </span>
          </div>
        </div>

        <ScrollArea className="flex-1 px-4">
          {playlist.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Music className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs">Belum ada lagu tersimpan</p>
            </div>
          ) : (
            <div className="space-y-2 pb-4">
              {playlist.map((song) => (
                <div
                  key={song.id}
                  className={`group p-2 rounded-lg hover:bg-accent/20 cursor-pointer transition-colors ${
                    currentPlaying === song.id ? 'bg-accent/30' : ''
                  }`}
                  onClick={() => onPlay(song)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={song.thumbnail}
                        alt={song.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden w-full h-full bg-gradient-primary flex items-center justify-center">
                        <Music2 className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">
                        {song.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {song.artist}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Sidebar;