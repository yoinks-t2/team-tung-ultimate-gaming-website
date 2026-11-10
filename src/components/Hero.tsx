import { ArrowRight, ChevronDown } from 'lucide-react';

const heroImage =
  'https://images.pexels.com/photos/14266493/pexels-photo-14266493.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden bg-zinc-950">
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/70 to-zinc-950" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-32">
        <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
          Competitive Gaming Team
        </p>
        <h1 className="animate-fade-up font-display mt-4 text-7xl uppercase leading-[0.95] text-zinc-50 sm:text-8xl lg:text-9xl [animation-delay:120ms]">
          Team <span className="text-emerald-400">Tung</span>
        </h1>
        <p className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-zinc-300 [animation-delay:240ms]">
          Five players. One mission. We train daily, scrim hard, and show up ready to win every
          match on the ladder and at the regional stage.
        </p>

        <div className="animate-fade-up mt-10 flex flex-col gap-4 sm:flex-row [animation-delay:360ms]">
          <a
            href="#matches"
            className="group inline-flex items-center justify-center gap-2 rounded-md bg-emerald-500 px-6 py-3.5 font-semibold text-zinc-950 transition-colors hover:bg-emerald-400"
          >
            See Our Matches
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#roster"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-600 px-6 py-3.5 font-semibold text-zinc-100 transition-colors hover:border-emerald-400 hover:text-emerald-400"
          >
            Meet the Roster
          </a>
        </div>
      </div>

      <a
        href="#roster"
        aria-label="Scroll to roster"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-400 transition-colors hover:text-emerald-400"
      >
        <ChevronDown className="h-7 w-7 animate-bounce" />
      </a>
    </section>
  );
}
