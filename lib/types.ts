export type Song = {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  chords: string[];
  key: string;
};

export type Student = {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  assignedSongs: string[];
};