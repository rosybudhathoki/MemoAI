import { db } from '@/lib/db'
import { $notes } from '@/lib/db/schema'
import { auth } from '@clerk/nextjs/server'
import { and, eq } from 'drizzle-orm'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { clerk } from '@/lib/clerk-server'
import { Button } from '@/src/components/ui/button'
import TipTapEditor from '@/src/components/TipTapEditor'

type Props = {
  params: Promise<{ noteId: string }>
}

export default async function NotebookPage({ params }: Props) {
  const { noteId } = await params;
  const { userId } = await auth();
  if (!userId) redirect("/dashboard");

  const numericNoteId = Number(noteId);
  if (!noteId || Number.isNaN(numericNoteId)) notFound();

  const notes = await db
    .select()
    .from($notes)
    .where(
      and(
        eq($notes.id, numericNoteId),
        eq($notes.userId, userId)
      )
    );

  if (notes.length !== 1) notFound();

  const user = await clerk.users.getUser(userId)
  const note = notes[0];

  return (
    <div className="min-h-screen grainy p-8">
      <div className="max-w-4xl mx-auto">
        <div className="border shadow-xl border-stone-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button className="bg-green-600" size="sm">
                Back
              </Button>
            </Link>

            <span className="font-semibold">
              {user.firstName} {user.lastName}
            </span>
            <span className="inline-block mx-1">
             /
            </span>
            <span className="text-stone-500 font-semibold">
              {note.name}
            </span>
            <div className='ml-auto'>
              DELETE BUTTON
            </div>
          </div>
        </div>
        <div className='h4'></div>
        <div className='border-stone-200 shadow-xl border rounded-lg px-16 py-8 w-full'>
            <TipTapEditor note={note}/>
        </div>
      </div>
    </div>
  );
}
