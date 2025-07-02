import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Plus, Trash2, Youtube, Music2 } from 'lucide-react';
import { useState } from 'react';

interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  source: 'youtube' | 'spotify' | 'soundcloud';
  url: string;
  embedUrl?: string;
}

interface SongCardProps {
  song: Song;
  onPlay?: (song: Song) => void;
  onSave?: (song: Song) => void;
  onRemove?: (songId: string) => void;
  showRemove?: boolean;
  isPlaying?: boolean;
}

const SongCard = ({ 
  song, 
  onPlay, 
  onSave, 
  onRemove, 
  showRemove = false,
  isPlaying = false 
}: SongCardProps) => {
  const [imageError, setImageError] = useState(false);

  const getPlatformIcon = (source: string) => {
    switch (source) {
      case 'youtube':
        return <Youtube className="w-3 h-3 text-youtube" />;
      case 'spotify':
        return <Music2 className="w-3 h-3 text-spotify" />;
      case 'soundcloud':
        return <div className="w-3 h-3 bg-soundcloud rounded-full" />;
      default:
        return <Music2 className="w-3 h-3" />;
    }
  };

  const getPlatformColor = (source: string) => {
    switch (source) {
      case 'youtube':
        return 'border-youtube/20 bg-youtube/5';
      case 'spotify':
        return 'border-spotify/20 bg-spotify/5';
      case 'soundcloud':
        return 'border-soundcloud/20 bg-soundcloud/5';
      default:
        return 'border-border';
    }
  };

  return (
    <Card className={`group hover:shadow-brand-lg transition-all duration-300 animate-fade-in h-full ${
      isPlaying ? 'ring-2 ring-primary shadow-glow' : ''
    }`}>
      <CardContent className="p-4 h-full flex flex-col">
        {/* Thumbnail with platform badge */}
        <div className="relative mb-3">
          <div className="w-full aspect-square rounded-lg overflow-hidden bg-muted">
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center bg-gradient-primary">
                <Music2 className="w-8 h-8 text-white" />
              </div>
            ) : (
              <img
                src={song.thumbnail}
                alt={song.title}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            )}
          </div>
          
          {/* Platform badge - small icon in top-left corner */}
          <div className={`absolute top-2 left-2 w-5 h-5 rounded-full flex items-center justify-center border border-background/20 backdrop-blur-sm ${getPlatformColor(song.source)}`}>
            {getPlatformIcon(song.source)}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {song.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1 mb-3 flex-1">
            {song.artist}
          </p>
          
          {/* Actions - horizontal layout */}
          <div className="flex gap-2 items-center">
            {onPlay && (
              <Button
                size="sm"
                onClick={() => onPlay(song)}
                className={`h-8 px-3 flex-1 ${
                  isPlaying 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-gradient-primary text-white hover:opacity-90'
                } transition-all duration-200`}
              >
                <Play className={`w-3 h-3 mr-1 ${isPlaying ? 'animate-pulse' : ''}`} />
                {isPlaying ? 'Playing' : 'Putar'}
              </Button>
            )}
            
            {onSave && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onSave(song)}
                className="h-8 px-3 flex-1 border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-200"
              >
                <Plus className="w-3 h-3 mr-1" />
                Simpan
              </Button>
            )}
            
            {showRemove && onRemove && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onRemove(song.id)}
                className="h-8 px-3 flex-1 border-destructive/20 hover:bg-destructive/10 hover:border-destructive/40 text-destructive transition-all duration-200"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Hapus
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SongCard;