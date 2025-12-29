import { Editor } from '@tiptap/react';
import { Level } from '@tiptap/extension-heading';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  CodepenIcon,
  Undo,
  Redo,
} from 'lucide-react';

const TipTapMenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) return null;

  const toggleHeading = (level: Level) => editor.chain().focus().toggleHeading({ level }).run();

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      <button onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().toggleBold()}>
        <Bold className="w-6 h-6" />
      </button>

      <button onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().toggleItalic()}>
        <Italic className="w-6 h-6" />
      </button>

      <button onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().toggleStrike()}>
        <Strikethrough className="w-6 h-6" />
      </button>

      <button onClick={() => editor.chain().focus().toggleCode().run()} disabled={!editor.can().toggleCode()}>
        <Code className="w-6 h-6" />
      </button>

      {/* Headings H1-H6 */}
      {[1, 2, 3, 4, 5, 6].map((level) => (
        <button
          key={level}
          onClick={() => toggleHeading(level as Level)}
          disabled={!editor.can().toggleHeading({ level: level as Level })}
          className={editor.isActive('heading', { level: level as Level }) ? 'is-active' : ''}
        >
          H{level}
        </button>
      ))}

      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''}>
        <List className="w-6 h-6" />
      </button>

      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'is-active' : ''}>
        <ListOrdered className="w-6 h-6" />
      </button>

      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active' : ''}>
        <CodepenIcon className="w-6 h-6" />
      </button>

      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'is-active' : ''}>
        <Quote className="w-6 h-6" />
      </button>

      <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
        <Undo className="w-6 h-6" />
      </button>

      <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
        <Redo className="w-6 h-6" />
      </button>
    </div>
  );
};

export default TipTapMenuBar;
