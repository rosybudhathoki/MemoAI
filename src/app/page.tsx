import TypewriterTitle from "@/src/components/TypewriterTitle";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import {ArrowRight} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center grainy bg-gradient-to-r from-rose-100 to-teal-100">
      <h1 className="font-semibold text-7xl text-center">
        AI <span className="text-green-600 font-bold"> note taking </span> assistant.
      </h1>

      <h2 className="mt-4 font-semibold text-3xl text-center text-slate-700">
        AI Powered
      </h2>

      <div className="mt-4 text-3xl text-center text-slate-700">
        <TypewriterTitle />
      </div>

      <div className="mt-8"></div>

      <div className="flex justify-center">
        <Link href='/dashboard'>
          <Button className="bg-green-600">Get Started
            <ArrowRight className="m1-2 w-5 h-5 strokeWidth={3}" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
