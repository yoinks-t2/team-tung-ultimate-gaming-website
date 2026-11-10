import { useEffect, useState, type FormEvent } from 'react';
import { AlertTriangle, CheckCircle2, Loader2, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Game } from '@/types';

interface GameRequestModalProps {
  game: Game;
  onClose: () => void;
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const timeOptions = ['Weeknights', 'Weekends', 'Anytime'];

const inputClass =
  'w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 placeholder-zinc-600 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30';

const labelClass = 'mb-2 block text-sm font-medium text-zinc-300';

export default function GameRequestModal({ game, onClose }: GameRequestModalProps) {
  const [playerName, setPlayerName] = useState('');
  const [contact, setContact] = useState('');
  const [preferredTime, setPreferredTime] = useState(timeOptions[0]);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<SubmitState>('idle');

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = playerName.trim();
    const trimmedContact = contact.trim();
    if (!trimmedName || !trimmedContact) {
      setStatus('error');
      return;
    }

    setStatus('submitting');

    const { error } = await supabase.from('game_requests').insert({
      game_id: game.id,
      player_name: trimmedName,
      contact: trimmedContact,
      preferred_time: preferredTime,
      message: message.trim() || null,
    });

    setStatus(error ? 'error' : 'success');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-request-title"
        className="animate-fade-up relative w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
        >
          <X className="h-5 w-5" />
        </button>

        {status === 'success' ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle2 className="h-14 w-14 text-emerald-400" aria-hidden="true" />
            <h3 id="game-request-title" className="font-display mt-5 text-4xl uppercase text-zinc-50">
              You're on the list
            </h3>
            <p className="mt-3 max-w-sm text-zinc-300">
              Thanks for requesting a {game.name} game with Team Tung. We will reach out using the
              contact info you shared.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-md bg-emerald-500 px-6 py-3 font-semibold text-zinc-950 transition-colors hover:bg-emerald-400"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">Play Request</p>
              <h3 id="game-request-title" className="font-display mt-2 pr-10 text-4xl uppercase text-zinc-50">
                Play {game.name}
              </h3>
              <p className="mt-2 text-sm text-zinc-400">Tell us who you are and when you are free to play.</p>
            </div>

            <div>
              <label htmlFor="request-name" className={labelClass}>Your name</label>
              <input
                id="request-name"
                type="text"
                maxLength={80}
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Alex Morgan"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="request-contact" className={labelClass}>Contact (email or Discord)</label>
              <input
                id="request-contact"
                type="text"
                maxLength={120}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="you@example.com or Discord username"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="request-time" className={labelClass}>When are you free?</label>
              <select
                id="request-time"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className={inputClass}
              >
                {timeOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="request-message" className={labelClass}>Message (optional)</label>
              <textarea
                id="request-message"
                rows={3}
                maxLength={500}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your rank, playstyle, or anything else we should know."
                className={`${inputClass} resize-none`}
              />
            </div>

            {status === 'error' && (
              <div role="alert" className="flex items-start gap-3 rounded-md border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-300">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  Your request could not be sent. Please check your name and contact info, then try again.
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-500 px-6 py-3.5 font-semibold text-zinc-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {status === 'submitting' ? 'Sending...' : 'Send Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
