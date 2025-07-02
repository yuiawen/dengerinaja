import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, Trash2 } from 'lucide-react';
import SongCard from './SongCard';

interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  source: 'youtube' | 'spotify' | 'soundcloud';
  url: string;
  embedUrl?: string;
}

interface PlaylistSectionProps {
  playlist: Song[];
  onPlay: (song: Song) => void;
  onRemove: (songId: string) => void;
  currentPlaying?: string;
}

const PlaylistSection = ({ playlist, onPlay, onRemove, currentPlaying }: PlaylistSectionProps) => {
  if (playlist.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto shadow-brand-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="w-5 h-5 text-primary" />
            Playlist Saya
          </CardTitle>
        </CardHeader>
        <CardContent className="py-12">
          <div className="text-center text-muted-foreground">
            <Music className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Playlist masih kosong</p>
            <p className="text-sm">Cari dan simpan lagu favoritmu untuk mulai membangun playlist</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-brand-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5 text-primary" />
            Playlist Saya
            <span className="text-sm font-normal text-muted-foreground">
              ({playlist.length} lagu)
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-3 max-h-96 overflow-y-auto">
          {playlist.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onPlay={onPlay}
              onRemove={onRemove}
              showRemove={true}
              isPlaying={currentPlaying === song.id}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaylistSection;