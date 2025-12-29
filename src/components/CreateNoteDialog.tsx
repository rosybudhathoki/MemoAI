"use client"
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import React from 'react';
import { Axis3DIcon, Loader2, Plus } from "lucide-react";
import { DialogHeader, DialogFooter } from './ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { DialogContent, DialogDescription, DialogTitle, } from './ui/dialog';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Props = {}

const CreateNoteDialog = (props: Props) => {
  const router = useRouter();
  const [input, setInput] = React.useState('')
  const CreateNoteBook = useMutation({
    mutationFn: async () => {
      const respose = await axios.post('/api/createNoteBook',{
        name: input
      })
      return respose.data
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement >) => {
     e.preventDefault();

     if (input === ""){
      window.alert("Please enter a name for your notebook")
      return;
     }
     
     CreateNoteBook.mutate(undefined, {
      onSuccess: (data) => {
        const noteId = data?.note_id;
        if (typeof noteId !== "number") {
          console.error("Invalid note_id returned:", data);
          window.alert("Failed to create notebook.");
          return;
        }
        router.push(`/notebook/${noteId}`);
      },
      onError: (error) => {
        console.error("Error creating notebook");
        window.alert("Failed to create new notebook.");
      },
    }); 
  };
  
  return (
    <Dialog>
      <DialogTrigger>
        <div className="border-dashed border-2 flex border-green-600 rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition-transform hover:-translate-y-1 p-4 cursor-pointer">
          <Plus className="w-6 h-6 text-green-600" strokeWidth={3} />
          <h2 className="font-semibold text-green-600 sm:mt-2">
            New Note Book
          </h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Notebook</DialogTitle>
          <DialogDescription>
            You can create a new note by entering a name below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input value={input} onChange={(e=>setInput(e.target.value))} placeholder="Name..." />
          <div className="h-4"></div>
          <div className="flex items-center gap-2">
            <Button type="reset" variant="secondary">Cancel</Button>
            <Button type="submit" className='bg-green-600' disabled={CreateNoteBook.isPending || !input.trim()}>
              {
                CreateNoteBook.isPending && (<Loader2 className='w-4 h-4 mr-2 animate-spin'/>
                )}Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNoteDialog;
