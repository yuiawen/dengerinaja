import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Music } from 'lucide-react';
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

interface SearchResultsProps {
  results: Song[];
  onPlay: (song: Song) => void;
  onSave: (song: Song) => void;
  currentPlaying?: string;
  isLoading?: boolean;
  query?: string;
}

const SearchResults = ({ 
  results, 
  onPlay, 
  onSave, 
  currentPlaying, 
  isLoading = false, 
  query 
}: SearchResultsProps) => {
  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto shadow-brand-md animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Mencari "{query}"...
          </CardTitle>
        </CardHeader>
        <CardContent className="py-12">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Sedang mencari lagu...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (results.length === 0 && query) {
    return (
      <Card className="w-full max-w-4xl mx-auto shadow-brand-md animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Hasil Pencarian
          </CardTitle>
        </CardHeader>
        <CardContent className="py-12">
          <div className="text-center text-muted-foreground">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Tidak ada hasil untuk "{query}"</p>
            <p className="text-sm">Coba gunakan kata kunci yang berbeda atau pilih sumber lain</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-brand-md animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Hasil Pencarian
            {query && (
              <span className="text-sm font-normal text-muted-foreground">
                untuk "{query}"
              </span>
            )}
          </div>
          <span className="text-sm font-normal text-muted-foreground">
            {results.length} hasil
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-3 max-h-96 overflow-y-auto">
          {results.map((song, index) => (
            <div
              key={song.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <SongCard
                song={song}
                onPlay={onPlay}
                onSave={onSave}
                isPlaying={currentPlaying === song.id}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchResults;