"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import AddSongDialog from './add-song-dialog';
import { Song } from '@/lib/types';
import { determineKey } from '@/lib/utils';

const initialSongs: Song[] = [
  {
    id: '1',
    title: 'Wonderwall',
    difficulty: 'Beginner',
    chords: ['Em', 'G', 'D', 'A7'],
    key: 'Em',
  },
  {
    id: '2',
    title: 'Hotel California',
    difficulty: 'Advanced',
    chords: ['Bm', 'F#7', 'A', 'E', 'G', 'D', 'Em', 'F#'],
    key: 'Bm',
  },
];

export default function SongList() {
  const [songs, setSongs] = useState<Song[]>(initialSongs);
  const [dialogOpen, setDialogOpen] = useState(false);

  const addSong = (song: Omit<Song, 'id' | 'key'>) => {
    const key = determineKey(song.chords[0]);
    const newSong = {
      ...song,
      id: (songs.length + 1).toString(),
      key,
    };
    setSongs([...songs, newSong]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Song
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Key</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Chords</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song) => (
            <TableRow key={song.id}>
              <TableCell className="font-medium">{song.title}</TableCell>
              <TableCell>
                <Badge variant="secondary" className="font-mono">
                  {song.key}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={
                  song.difficulty === 'Beginner' ? 'default' :
                  song.difficulty === 'Intermediate' ? 'secondary' : 'destructive'
                }>
                  {song.difficulty}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {song.chords.map((chord) => (
                    <Badge key={chord} variant="outline">
                      {chord}
                    </Badge>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddSongDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={addSong}
      />
    </div>
  );
}