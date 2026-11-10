import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, AlertTriangle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { TryoutApplication } from '@/types';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const emptyForm = {
  full_name: '',
  handle: '',
  game: 'Valorant',
  rank: '',
  contact: '',
  message: '',
};

const inputClass =
  'w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 placeholder-zinc-600 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30';

const labelClass = 'mb-2 block text-sm font-medium text-zinc-300';

export default function JoinForm() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateField = (field: keyof typeof emptyForm) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: TryoutApplication = {
      full_name: form.full_name.trim(),
      handle: form.handle.trim(),
      game: form.game.trim(),
      rank: form.rank.trim() || null,
      contact: form.contact.trim(),
      message: form.message.trim() || null,
    };

    if (!payload.full_name || !payload.handle || !payload.contact) {
      setErrorMessage('Please fill in your name, in-game handle, and contact info.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage(null);

    const { error } = await supabase.from('tryout_applications').insert(payload);

    if (error) {
      setErrorMessage('Your application could not be sent. Please try again in a moment.');
      setStatus('error');
      return;
    }

    setForm(emptyForm);
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-10 text-center">
        <CheckCircle2 className="h-14 w-14 text-emerald-400" aria-hidden="true" />
        <h3 className="font-display mt-5 text-4xl uppercase text-zinc-50">Application Received</h3>
        <p className="mt-3 max-w-md text-zinc-300">
          Thanks for trying out for Team Tung. We review every application and will reach out to
          you through the contact info you provided.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-8 rounded-md border border-zinc-600 px-5 py-2.5 text-sm font-semibold text-zinc-100 transition-colors hover:border-emerald-400 hover:text-emerald-400"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-6 rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 sm:grid-cols-2 sm:p-10">
      <div>
        <label htmlFor="full_name" className={labelClass}>Full name</label>
        <input
          id="full_name"
          type="text"
          maxLength={120}
          value={form.full_name}
          onChange={(e) => updateField('full_name')(e.target.value)}
          placeholder="Alex Morgan"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="handle" className={labelClass}>In-game handle</label>
        <input
          id="handle"
          type="text"
          maxLength={40}
          value={form.handle}
          onChange={(e) => updateField('handle')(e.target.value)}
          placeholder="ShadowFox"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="game" className={labelClass}>Main game</label>
        <select
          id="game"
          value={form.game}
          onChange={(e) => updateField('game')(e.target.value)}
          className={inputClass}
        >
          <option>Valorant</option>
          <option>League of Legends</option>
          <option>Counter-Strike 2</option>
          <option>Overwatch 2</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="rank" className={labelClass}>Current rank</label>
        <input
          id="rank"
          type="text"
          maxLength={40}
          value={form.rank}
          onChange={(e) => updateField('rank')(e.target.value)}
          placeholder="Immortal 1"
          className={inputClass}
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="contact" className={labelClass}>Contact (email or Discord)</label>
        <input
          id="contact"
          type="text"
          maxLength={120}
          value={form.contact}
          onChange={(e) => updateField('contact')(e.target.value)}
          placeholder="you@example.com or Discord username"
          className={inputClass}
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className={labelClass}>Why Team Tung? (optional)</label>
        <textarea
          id="message"
          rows={4}
          maxLength={1000}
          value={form.message}
          onChange={(e) => updateField('message')(e.target.value)}
          placeholder="Tell us about your playstyle, goals, and availability."
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === 'error' && errorMessage && (
        <div role="alert" className="flex items-start gap-3 rounded-md border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-300 sm:col-span-2">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-zinc-500">Applications are reviewed by the coaching staff.</p>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-500 px-7 py-3 font-semibold text-zinc-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {status === 'submitting' ? 'Sending...' : 'Submit Application'}
        </button>
      </div>
    </form>
  );
}
