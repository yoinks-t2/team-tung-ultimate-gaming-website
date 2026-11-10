import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Roster from '@/components/Roster';
import Matches from '@/components/Matches';
import PlayGames from '@/components/PlayGames';
import JoinForm from '@/components/JoinForm';
import Footer from '@/components/Footer';
import { useTeamData } from '@/hooks/useTeamData';

function App() {
  const { players, matches, games, loading, error } = useTeamData();

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased">
      <Navbar />
      <main>
        <Hero />
        {error && (
          <div role="alert" className="mx-auto max-w-6xl px-6 pt-10">
            <p className="rounded-md border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-300">{error}</p>
          </div>
        )}
        <Roster players={players} loading={loading} />
        <Matches matches={matches} loading={loading} />
        <PlayGames games={games} loading={loading} />
        <section id="join" className="scroll-mt-16 border-t border-zinc-900 bg-zinc-950 py-24">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Recruitment</p>
              <h2 className="font-display mt-3 text-5xl uppercase leading-[1.05] text-zinc-50 sm:text-6xl">
                Think You Can Play?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-zinc-400">
                We are always looking for players who communicate, improve, and want to win as a unit.
                Send us your details and we will be in touch.
              </p>
            </div>
            <div className="mt-12">
              <JoinForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
