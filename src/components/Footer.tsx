import { Swords } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="flex items-center gap-2 text-zinc-300">
          <Swords className="h-5 w-5 text-emerald-400" aria-hidden="true" />
          <span className="font-display text-xl uppercase tracking-wide">Team Tung</span>
        </div>
        <p className="text-sm text-zinc-500">© {new Date().getFullYear()} Team Tung. Play hard, play together.</p>
      </div>
    </footer>
  );
}
