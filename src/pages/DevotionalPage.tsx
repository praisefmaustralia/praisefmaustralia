import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, RefreshCw } from 'lucide-react';

interface Verse {
  reference: string;
  text: string;
  translation: string;
}

interface Devotional {
  verse: Verse;
  reflection: string;
}

// Versículos curados para rotação diária
const VERSE_SEEDS = [
  'John 3:16', 'Psalm 23:1', 'Philippians 4:13', 'Romans 8:28',
  'Jeremiah 29:11', 'Isaiah 40:31', 'Proverbs 3:5', 'Matthew 11:28',
  'Joshua 1:9', 'Psalm 46:1', '2 Timothy 1:7', 'Romans 5:8',
  'Psalm 121:1', 'John 14:6', 'Galatians 5:22', 'Hebrews 11:1',
  'Psalm 27:1', 'Matthew 5:9', '1 Corinthians 13:4', 'Ephesians 2:8',
  'Romans 12:2', 'Psalm 34:8', 'Isaiah 41:10', 'Matthew 6:33',
  'John 15:5', 'Psalm 119:105', 'Colossians 3:23', 'James 1:17',
  'Micah 6:8', 'Lamentations 3:22', '1 John 4:19', 'Philippians 4:6',
];

const getDailyVerseRef = () => {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return VERSE_SEEDS[dayOfYear % VERSE_SEEDS.length];
};

const fetchVerse = async (ref: string): Promise<Verse> => {
  const encoded = encodeURIComponent(ref);
  const res = await fetch(`https://bible-api.com/${encoded}?translation=web`);
  if (!res.ok) throw new Error('Failed to fetch verse');
  const data = await res.json();
  return {
    reference: data.reference,
    text: data.text.trim().replace(/\n/g, ' '),
    translation: 'World English Bible',
  };
};

const fetchReflection = async (verse: Verse): Promise<string> => {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `You are a warm Christian devotional writer for Praise FM Australia, a Christian radio station.

Write a short devotional reflection (3–4 paragraphs) for the following Bible verse.
Be encouraging, personal, and grounded in faith. Speak directly to the listener as if they are starting their day.
End with a short one-sentence prayer.

Verse: ${verse.reference} — "${verse.text}"

Return only the reflection text, no titles or labels.`,
        },
      ],
    }),
  });

  if (!res.ok) throw new Error('Failed to fetch reflection');
  const data = await res.json();
  return data.content?.[0]?.text ?? '';
};

const DevotionalPage: React.FC = () => {
  const navigate = useNavigate();
  const [devotional, setDevotional] = useState<Devotional | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'verse' | 'reflection'>('verse');

  const today = new Date().toLocaleDateString('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const load = async () => {
    setLoading(true);
    setError(null);
    setDevotional(null);
    setStep('verse');

    try {
      const ref = getDailyVerseRef();
      const verse = await fetchVerse(ref);
      setStep('reflection');
      const reflection = await fetchReflection(verse);
      setDevotional({ verse, reflection });
    } catch {
      setError("Could not load today's devotional. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="relative min-h-screen bg-white dark:bg-[#000] overflow-hidden">

      {/* Linha laranja no topo */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#ff6600]" />

      {/* Texto decorativo de fundo */}
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   text-[clamp(60px,15vw,160px)] font-black tracking-tighter leading-none
                   text-black/[0.03] dark:text-white/[0.03]
                   select-none pointer-events-none whitespace-nowrap"
      >
        DEVOTIONAL
      </span>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-20">

        {/* Voltar */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-[#ff6600]
                     transition-colors mb-16 text-xs font-medium uppercase tracking-widest w-fit"
        >
          <ArrowLeft className="w-4 h-4" /> Back Home
        </button>

        {/* Header */}
        <div className="border-b-4 border-black dark:border-white pb-6 mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff6600]" />
            <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#ff6600]">
              Daily Devotional
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold uppercase tracking-tight leading-none
                         text-gray-900 dark:text-white">
            Verse of<br />
            <span className="text-[#ff6600]">the Day.</span>
          </h1>
          <p className="mt-4 text-sm text-gray-400 uppercase tracking-widest">{today}</p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-gray-400">
              <RefreshCw className="w-4 h-4 animate-spin text-[#ff6600]" />
              <span className="text-sm uppercase tracking-widest">
                {step === 'verse' ? 'Loading verse...' : 'Writing reflection...'}
              </span>
            </div>
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-gray-100 dark:bg-white/5 rounded w-1/3" />
              <div className="h-8 bg-gray-100 dark:bg-white/5 rounded w-full" />
              <div className="h-8 bg-gray-100 dark:bg-white/5 rounded w-4/5" />
            </div>
            <div className="space-y-2 animate-pulse mt-8">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`h-4 bg-gray-100 dark:bg-white/5 rounded ${i === 3 ? 'w-2/3' : 'w-full'}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="space-y-4">
            <p className="text-gray-500 dark:text-gray-400">{error}</p>
            <button
              onClick={load}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff6600] text-white
                         text-[13px] font-bold tracking-[0.12em] uppercase hover:bg-orange-600 transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Try again
            </button>
          </div>
        )}

        {/* Conteúdo */}
        {devotional && !loading && (
          <div className="space-y-10">

            {/* Versículo */}
            <div className="border-l-4 border-[#ff6600] pl-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-[#ff6600]" />
                <span className="text-sm font-bold uppercase tracking-widest text-[#ff6600]">
                  {devotional.verse.reference}
                </span>
              </div>
              <blockquote className="text-2xl md:text-3xl font-bold leading-snug
                                     text-gray-900 dark:text-white tracking-tight">
                "{devotional.verse.text}"
              </blockquote>
              <p className="mt-3 text-xs text-gray-400 uppercase tracking-widest">
                {devotional.verse.translation}
              </p>
            </div>

            {/* Divisor */}
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-100 dark:bg-white/10" />
              <span className="text-xs text-gray-400 uppercase tracking-widest">Reflection</span>
              <div className="h-px flex-1 bg-gray-100 dark:bg-white/10" />
            </div>

            {/* Reflexão — último parágrafo é a oração em laranja */}
            <div className="space-y-5">
              {devotional.reflection.split('\n\n').map((paragraph, i, arr) => (
                <p
                  key={i}
                  className={`leading-relaxed ${
                    i === arr.length - 1
                      ? 'text-[#ff6600] font-medium italic text-base'
                      : 'text-gray-600 dark:text-gray-300 text-base'
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Rodapé */}
            <div className="pt-10 border-t border-gray-100 dark:border-white/[0.06]
                            flex items-center justify-between flex-wrap gap-4">
              <button
                onClick={load}
                className="inline-flex items-center gap-2 text-[13px] font-medium
                           tracking-[0.06em] uppercase text-gray-400
                           hover:text-[#ff6600] transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </button>
              <span className="text-xs text-gray-300 dark:text-white/20 uppercase tracking-widest">
                Praise FM Australia
              </span>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default DevotionalPage;