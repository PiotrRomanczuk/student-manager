"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Song, Student } from "@/lib/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student;
  availableSongs: Song[];
  onAssign: (studentId: string, songIds: string[]) => void;
};

export default function SongAssignmentDialog({
  open,
  onOpenChange,
  student,
  availableSongs,
  onAssign,
}: Props) {
  const [selectedSongs, setSelectedSongs] = useState<string[]>(
    student.assignedSongs
  );
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleSubmit = () => {
    onAssign(student.id, selectedSongs);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Songs to {student.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={popoverOpen}
                className="justify-between"
              >
                Select songs...
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
              <Command>
                <CommandInput placeholder="Search songs..." />
                <CommandEmpty>No songs found.</CommandEmpty>
                <CommandGroup className="max-h-[300px] overflow-y-auto">
                  {availableSongs.map((song) => (
                    <CommandItem
                      key={song.id}
                      value={song.title}
                      onSelect={() => {
                        setSelectedSongs((prev) =>
                          prev.includes(song.title)
                            ? prev.filter((id) => id !== song.title)
                            : [...prev, song.title]
                        );
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedSongs.includes(song.title)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {song.title}
                      <span className="ml-auto text-sm text-muted-foreground">
                        {song.difficulty}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Selected Songs:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedSongs.map((songTitle) => (
                <div
                  key={songTitle}
                  className="flex items-center gap-2 rounded-md bg-secondary px-2 py-1 text-sm"
                >
                  {songTitle}
                  <button
                    onClick={() =>
                      setSelectedSongs((prev) =>
                        prev.filter((title) => title !== songTitle)
                      )
                    }
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save Assignments</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}