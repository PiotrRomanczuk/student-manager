"use client";

import { useState } from 'react';
import { Plus, BookOpen } from 'lucide-react';
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
import AddStudentDialog from './add-student-dialog';
import SongAssignmentDialog from '../admin/song-assignment-dialog';
import { Student, Song } from '@/lib/types';

const initialStudents: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    level: 'Beginner',
    assignedSongs: ['Wonderwall'],
  },
  {
    id: '2',
    name: 'Jane Smith',
    level: 'Advanced',
    assignedSongs: ['Hotel California'],
  },
];

const availableSongs: Song[] = [
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
  {
    id: '3',
    title: 'Let It Be',
    difficulty: 'Intermediate',
    chords: ['C', 'G', 'Am', 'F'],
    key: 'C',
  },
  {
    id: '4',
    title: 'Sweet Home Alabama',
    difficulty: 'Intermediate',
    chords: ['D', 'C', 'G'],
    key: 'D',
  },
];

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const addStudent = (student: Omit<Student, 'id'>) => {
    const newStudent = {
      ...student,
      id: (students.length + 1).toString(),
    };
    setStudents([...students, newStudent]);
  };

  const handleAssignSongs = (studentId: string, songTitles: string[]) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? { ...student, assignedSongs: songTitles }
          : student
      )
    );
  };

  const openAssignDialog = (student: Student) => {
    setSelectedStudent(student);
    setAssignDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Assigned Songs</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>
                <Badge variant={
                  student.level === 'Beginner' ? 'default' :
                  student.level === 'Intermediate' ? 'secondary' : 'destructive'
                }>
                  {student.level}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {student.assignedSongs.map((song) => (
                    <Badge key={song} variant="outline">
                      {song}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openAssignDialog(student)}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Assign Songs
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddStudentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={addStudent}
      />

      {selectedStudent && (
        <SongAssignmentDialog
          open={assignDialogOpen}
          onOpenChange={setAssignDialogOpen}
          student={selectedStudent}
          availableSongs={availableSongs}
          onAssign={handleAssignSongs}
        />
      )}
    </div>
  );
}