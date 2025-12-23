"use client";
import React from 'react';
import Link from "next/link";
import { Button } from '@/src/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { UserButton } from '@clerk/clerk-react';
import { Separator } from '@radix-ui/react-separator';
import CreateNoteDialog from '@/src/components/CreateNoteDialog';

type Props = {}

const DashboardPage = (props: Props) => {
  return (
    <>
    <div className="grainy min-h-screen">
        <div className="max-w-7xl mx-auto p-10">
            <div className='h-14'>
                <div className='flex justify-between items-center md:flex-row flex-col'>
                    <div className='flex items-center'>
                        <Link href="/">
                            <Button className='bg-green-600'>
                                <ArrowLeft className='mr-1 w-4 h-4' size="sm" />
                                Back
                            </Button>
                        </Link>
                        <div className='w-4'></div>
                        <h1 className='text-3x; font-bold text-gray-900'>My Notes</h1>
                        <div className='w-4'></div>
                        <UserButton />
                    </div>
                </div>
                <div className='h-8'></div>
                <Separator />
                <div className='h-8'></div>
                {/* add conditions later*/}
                <div className='text-center'>
                    <h2 className='text-xl text-gray-500'> You have no notes yet.</h2>
                </div>
                {/* add conditions later*/}
                <div className='grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3'>
                   <CreateNoteDialog />
                </div>

            </div>
        </div>
    </div>
    </>
  )
};

export default DashboardPage;