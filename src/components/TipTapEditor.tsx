'use client';

import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TipTapMenuBar from './TipTapMenuBar';
import { Button } from './ui/button';
import { useDebounce } from '@/lib/useDebounce';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { NoteType } from '@/lib/db/schema';
import { Text } from '@tiptap/extension-text'

type Props = { note: NoteType };

const TipTapEditor = ({ note }: Props) => {
  const [isSaving, setIsSaving] = React.useState(false);
  const [editorState, setEditorState] = React.useState(note.editorState || `<h1>${note.name}</h1>`);

  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/saveNote', {
        noteId: note.id,
        editorState,
      });
      return response.data;
    },
    onMutate: () => {
      setIsSaving(true);
    },
    onSettled: () => {
      setIsSaving(false); 
    },
  });

  const CustomText = Text.extend({
  addKeyboardShortcuts() {
    return {
      "Shift-A": () => {
        console.log("ACTIVATE AI");
        return true; // prevent default
      },
    };
  },
});

  const editor = useEditor({
    extensions: [StarterKit, CustomText],
    content: editorState,
    onUpdate: ({ editor }) => setEditorState(editor.getHTML()),
    immediatelyRender: false,
  });

  const debounceEditorState = useDebounce(editorState, 500);

  React.useEffect(() => {
    if (!debounceEditorState) return;

    saveNote.mutate(undefined, {
      onSuccess: data => console.log('Saved!', data),
      onError: err => console.error(err),
    });
  }, [debounceEditorState]);

  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        {editor && <TipTapMenuBar editor={editor} />}
        <Button disabled variant="outline">
          {isSaving ? "Saving..." : "Saved"}
        </Button>

      </div>

      <div className="prose">
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default TipTapEditor;
