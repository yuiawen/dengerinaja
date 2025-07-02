import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import MusicPlayer from './MusicPlayer';
import MobileNavigation from './MobileNavigation';

interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  source: 'youtube' | 'spotify' | 'soundcloud';
  url: string;
  embedUrl?: string;
}

const Layout = () => {
  const [currentPlaying, setCurrentPlaying] = useState<Song | null>(null);
  const [playlist, setPlaylist] = useState<Song[]>([]);

  const handlePlay = (song: Song) => {
    setCurrentPlaying(song);
  };

  const handleSave = (song: Song) => {
    if (!playlist.some(p => p.id === song.id)) {
      setPlaylist(prev => [...prev, song]);
    }
  };

  const handleRemove = (songId: string) => {
    setPlaylist(prev => prev.filter(p => p.id !== songId));
    if (currentPlaying?.id === songId) {
      setCurrentPlaying(null);
    }
  };

  const handleClosePlayer = () => {
    setCurrentPlaying(null);
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 flex-shrink-0">
          <Sidebar 
            playlist={playlist}
            onPlay={handlePlay}
            onRemove={handleRemove}
            currentPlaying={currentPlaying?.id}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <Outlet context={{ 
            onPlay: handlePlay, 
            onSave: handleSave, 
            currentPlaying: currentPlaying?.id,
            playlist 
          }} />
        </div>

        {/* Right Music Player */}
        <div className="w-80 flex-shrink-0 border-l border-border">
          <MusicPlayer 
            song={currentPlaying} 
            onClose={handleClosePlayer}
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col flex-1">
        {/* Mobile Music Player (Top) */}
        {currentPlaying && (
          <div className="flex-shrink-0">
            <MusicPlayer 
              song={currentPlaying} 
              onClose={handleClosePlayer}
              isMobile={true}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <Outlet context={{ 
            onPlay: handlePlay, 
            onSave: handleSave, 
            currentPlaying: currentPlaying?.id,
            playlist 
          }} />
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="flex-shrink-0">
          <MobileNavigation />
        </div>
      </div>

      {/* Footer */}
      <footer className="hidden md:block bg-muted/30 border-t border-border py-4 px-6">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex gap-4">
            <span>Tentang</span>
            <span>Kontak</span>
            <span>Kebijakan</span>
          </div>
          <div>
            © 2024 DengerinAja+. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;