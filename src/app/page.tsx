import TypewriterTitle from "@/src/components/TypewriterTitle";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center grainy bg-gradient-to-r from-rose-100 to-teal-100 px-4">
      
      <h1 className="font-extrabold text-6xl md:text-7xl text-center leading-tight">
        AI <span className="text-green-600">note-taking</span> assistant
      </h1>

      <h2 className="mt-6 font-semibold text-2xl md:text-3xl text-center text-slate-700">
        AI Powered
      </h2>

      <div className="mt-4 text-xl md:text-3xl text-center text-slate-700">
        <TypewriterTitle />
      </div>

      <div className="mt-12 flex justify-center">
        <Link href='/dashboard'>
          <Button className="bg-green-600 px-6 py-3 flex items-center gap-2 text-lg md:text-xl">
            Get Started
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </Button>
        </Link>
      </div>
      
    </div>
  );
}
