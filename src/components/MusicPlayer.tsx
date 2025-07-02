import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { X, ExternalLink, Play, Pause, SkipForward, Volume2 } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  source: 'youtube' | 'spotify' | 'soundcloud';
  url: string;
  embedUrl?: string;
}

interface MusicPlayerProps {
  song: Song | null;
  onClose: () => void;
  isMobile?: boolean;
}

const MusicPlayer = ({ song, onClose, isMobile = false }: MusicPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);

  if (!song) {
    return (
      <div className={`bg-muted/30 border-l border-border flex items-center justify-center ${
        isMobile ? 'h-20' : 'h-full'
      }`}>
        <div className="text-center text-muted-foreground">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
            <Play className="w-6 h-6" />
          </div>
          <p className="text-sm">Pilih lagu untuk diputar</p>
        </div>
      </div>
    );
  }

  const getEmbedUrl = (song: Song) => {
    if (song.embedUrl) return song.embedUrl;
    
    switch (song.source) {
      case 'youtube':
        const videoId = song.url.includes('v=') 
          ? song.url.split('v=')[1]?.split('&')[0]
          : song.url.split('/').pop();
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      
      case 'spotify':
        const trackId = song.url.includes('/track/')
          ? song.url.split('/track/')[1]?.split('?')[0]
          : '';
        return `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
      
      case 'soundcloud':
        return `https://w.soundcloud.com/player/?url=${encodeURIComponent(song.url)}&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`;
      
      default:
        return song.url;
    }
  };

  if (isMobile) {
    return (
      <div className="bg-muted/30 border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded overflow-hidden bg-muted flex-shrink-0">
            <img
              src={song.thumbnail}
              alt={song.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-foreground truncate">
              {song.title}
            </h4>
            <p className="text-xs text-muted-foreground truncate">
              {song.artist}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Play className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={onClose} className="h-8 w-8 p-0">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-muted/30 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Now Playing</h3>
          <Button size="sm" variant="ghost" onClick={onClose} className="h-8 w-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Song Info */}
      <div className="p-4 text-center">
        <div className="w-48 h-48 mx-auto rounded-lg overflow-hidden bg-muted mb-4 shadow-brand-md">
          <img
            src={song.thumbnail}
            alt={song.title}
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="font-semibold text-foreground mb-1 line-clamp-2">
          {song.title}
        </h4>
        <p className="text-sm text-muted-foreground mb-4">
          {song.artist}
        </p>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button size="sm" variant="ghost" className="h-10 w-10 p-0">
            <SkipForward className="w-5 h-5 rotate-180" />
          </Button>
          <Button 
            size="lg" 
            className="h-12 w-12 p-0 bg-gradient-primary text-white rounded-full shadow-glow"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </Button>
          <Button size="sm" variant="ghost" className="h-10 w-10 p-0">
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 mb-4">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="flex-1"
          />
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => window.open(song.url, '_blank')}
          className="w-full"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Buka di {song.source}
        </Button>
      </div>

      {/* Embed Player */}
      <div className="flex-1 p-4">
        <div className="relative bg-black rounded-lg overflow-hidden h-full">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          
          <iframe
            src={getEmbedUrl(song)}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;