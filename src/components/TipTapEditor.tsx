'use client';
import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import TipTapMenuBar from './TipTapMenuBar';

const TipTapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }), // ← make sure all levels are enabled
    ],
    content: '<p>Start typing...</p>',
    autofocus: true,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg m-5 focus:outline-none',
      },
    },
    immediatelyRender: false, // SSR safe
  });

  return (
    <div>
      {editor && <TipTapMenuBar editor={editor} />}
      <div className="prose prose-sm sm:prose lg:prose-lg border p-4 rounded-md bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TipTapEditor;
