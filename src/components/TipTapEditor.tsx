'use client';

import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TipTapMenuBar from "./TipTapMenuBar";
import { Button } from "./ui/button";
import { useDebounce } from "@/lib/useDebounce";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useCompletion } from "@ai-sdk/react";
import Text from "@tiptap/extension-text";

type Props = {
  note: {
    id: string;
    name: string;
    editorState: string;
  };
};

const TipTapEditor = ({ note }: Props) => {
  const [editorState, setEditorState] = React.useState(
    note.editorState || `<h1>${note.name}</h1><p></p>`
  );

  const { complete, completion } = useCompletion({ api: "/api/completion" });

  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/saveNote", {
        noteId: note.id,
        editorState,
      });
      return response.data;
    },
  });

  const lastCompletion = React.useRef("");

  // ⭐ Function to trigger AI autocomplete
  const handleAIAction = React.useCallback(() => {
    if (!editor) return;
    const prompt = editor.getText().split(" ").slice(-30).join(" ");
    complete(prompt);
  }, [complete, editorState]);

  // Custom Tab shortcut using a separate extension
  const customText = Text.extend({ addKeyboardShortcuts() 
    { return { "Tab": () => { console.log("Tab selected"); 
      const prompt = this.editor.getText().split(" ").slice(-30).join(" "); 
      console.log("CLIENT PROMPT:", prompt); complete(prompt); 
      return true; }, }; }, });
      
  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, customText],
    content: editorState,
    onUpdate: ({ editor }) => setEditorState(editor.getHTML()),
    immediatelyRender: false,
  });

  React.useEffect(() => {
    if (!completion || !editor) return;
    const diff = completion.slice(lastCompletion.current.length);
    lastCompletion.current = completion;
    const cleanDiff = diff.replace(/^#+\s.*$/gm, "");
    editor.commands.insertContent(cleanDiff);
  }, [completion, editor]);

  const debouncedEditorState = useDebounce(editorState, 500);

  React.useEffect(() => {
    if (!debouncedEditorState) return;
    saveNote.mutate(undefined, {
      onSuccess: (data) => console.log("Saved!", data),
      onError: (err) => console.error(err),
    });
  }, [debouncedEditorState]);

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Toolbar */}
        <div className="flex gap-4 items-center">
          {editor && <TipTapMenuBar editor={editor} />}
          <Button disabled variant="outline">
            {saveNote.isPending ? "Saving..." : "Saved"}
          </Button>
        </div>

        <div className="prose prose-sm mt-4">
          <EditorContent
            editor={editor}
            className="bg-transparent rounded-lg p-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
            style={{ outline: "none" }}
          />
        </div>

        {/* AI autocomplete button above tip */}
        <div className="mt-4 flex flex-col items-start gap-4">
          <Button
            onClick={handleAIAction}
            variant="outline"
            className="bg-green-100 hover:bg-green-200 text-green-800"
          >
            Autocomplete
          </Button>
          <span className="text-sm">
            <span className="font-semibold">Tip: </span>
            Click <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
              Autocomplete
            </kbd>{" "}
            or press{" "}
            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
              Tab
            </kbd>{" "}
            for AI suggestions
          </span>
        </div>
      </div>
    </>
  );
};

export default TipTapEditor;
