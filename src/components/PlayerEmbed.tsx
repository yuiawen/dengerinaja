import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ExternalLink } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  source: 'youtube' | 'spotify' | 'soundcloud';
  url: string;
  embedUrl?: string;
}

interface PlayerEmbedProps {
  song: Song | null;
  onClose: () => void;
}

const PlayerEmbed = ({ song, onClose }: PlayerEmbedProps) => {
  const [isLoading, setIsLoading] = useState(true);

  if (!song) return null;

  const getEmbedUrl = (song: Song) => {
    if (song.embedUrl) return song.embedUrl;
    
    switch (song.source) {
      case 'youtube':
        // Extract video ID from YouTube URL
        const videoId = song.url.includes('v=') 
          ? song.url.split('v=')[1]?.split('&')[0]
          : song.url.split('/').pop();
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      
      case 'spotify':
        // Extract track ID from Spotify URL
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

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-brand-lg animate-scale-in">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">
                {song.title}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {song.artist}
              </p>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(song.url, '_blank')}
                className="h-8 px-3"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Buka
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Player */}
          <div className="relative bg-black">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            
            <iframe
              src={getEmbedUrl(song)}
              width="100%"
              height="400"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              onLoad={() => setIsLoading(false)}
              className="w-full h-[400px]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerEmbed;