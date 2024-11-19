import { Music, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SongList from '@/components/songs/song-list';
import StudentList from '@/components/students/student-list';

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Music Student Manager</h1>
      
      <Tabs defaultValue="songs" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="songs" className="space-x-2">
            <Music className="h-4 w-4" />
            <span>Songs</span>
          </TabsTrigger>
          <TabsTrigger value="students" className="space-x-2">
            <Users className="h-4 w-4" />
            <span>Students</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="songs">
          <Card>
            <CardHeader>
              <CardTitle>Song Library</CardTitle>
              <CardDescription>
                Manage your collection of songs and their difficulty levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SongList />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student Management</CardTitle>
              <CardDescription>
                View and manage student progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StudentList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}