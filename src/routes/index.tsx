import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import f40 from "@/assets/f40.jpeg";

const SOUND_THEMES = [
  { id: "timeless", label: "Timeless", artist: "The Weeknd", src: "/audio/timeless.mp3" },
  { id: "stars", label: "All The Stars", artist: "Kendrick & SZA", src: "/audio/all-the-stars.mp3" },
  { id: "die", label: "Die For You", artist: "The Weeknd", src: "/audio/die-for-you.mp3" },
  { id: "double", label: "Double Fantasy", artist: "The Weeknd & Future", src: "/audio/double-fantasy.mp3" },
];

let sharedAudio: HTMLAudioElement | null = null;
function getAudio() {
  if (typeof window === "undefined") return null;
  if (!sharedAudio) {
    sharedAudio = new Audio();
    sharedAudio.loop = true;
    sharedAudio.volume = 0.5;
  }
  return sharedAudio;
}
import tshirtBack from "@/assets/tshirt-back.jpg";
import tshirtFront from "@/assets/tshirt-front.jpg";
import tshirtSize from "@/assets/tshirt-size.png";
import look2a from "@/assets/custom-front.png";
import look2b from "@/assets/custom-back.png";
import look2c from "@/assets/custom-size.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "mauvais.fashion" },
      { name: "description", content: "mauvais.fashion — private showcase" },
    ],
  }),
  component: Index,
});

function Index() {
  const [unlocked, setUnlocked] = useState(false);
  return unlocked ? <Showcase /> : <Lock onUnlock={() => setUnlocked(true)} />;
}

function Lock({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [theme, setTheme] = useState<string | null>(null);

  const pickTheme = (id: string, src: string) => {
    const audio = getAudio();
    if (!audio) return;
    if (theme === id) {
      audio.pause();
      setTheme(null);
      return;
    }
    audio.src = src;
    audio.muted = false;
    audio.play().catch(() => {});
    setTheme(id);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().toUpperCase() === "F40") {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1200);
    }
  };


  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
      style={{
        backgroundImage: `url(${f40})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute top-0 left-0 right-0 px-8 py-6 flex justify-between items-center z-10">
        <span className="text-xs tracking-[0.4em] text-white/70 uppercase">est. MMXXVI</span>
        <span className="text-xs tracking-[0.4em] text-white/70 uppercase">members only</span>
      </div>

      <div className="relative z-10 w-full max-w-md text-center">
        <h1 className="font-serif text-5xl md:text-6xl tracking-tight text-white italic">
          mauvais<span className="text-[oklch(0.55_0.22_27)]">.</span>fashion
        </h1>
        <p className="mt-3 text-[10px] tracking-[0.5em] text-white/60 uppercase">
          enter code to access
        </p>

        <div className="mt-12 border-t border-b border-white/30 py-5">
          <p className="text-[10px] tracking-[0.45em] text-white/50 uppercase mb-2">Clue</p>
          <p className="font-serif text-lg italic text-white">
            the best car ferrari ever made
          </p>
        </div>

        <form onSubmit={submit} className="mt-10 space-y-4">
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="• • •"
            className={`w-full bg-transparent border-b ${
              error ? "border-[oklch(0.55_0.22_27)] animate-pulse" : "border-white/40"
            } text-center text-2xl tracking-[0.5em] text-white py-3 focus:outline-none focus:border-white placeholder:text-white/30`}
          />
          <button
            type="submit"
            className="w-full border border-white/80 text-white py-3 text-[11px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-colors"
          >
            Unlock
          </button>
        </form>

        <div className="mt-10">
          <p className="text-[10px] tracking-[0.45em] text-white/50 uppercase mb-3">Sound Theme</p>
          <div className="grid grid-cols-2 gap-2">
            {SOUND_THEMES.map((t) => {
              const active = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => pickTheme(t.id, t.src)}
                  className={`text-left px-3 py-2 border text-[10px] tracking-[0.15em] uppercase transition-colors ${
                    active
                      ? "bg-white text-black border-white"
                      : "border-white/30 text-white/80 hover:border-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`inline-block w-1.5 h-1.5 rounded-full ${active ? "bg-black animate-pulse" : "bg-white/40"}`} />
                    <span className="truncate">{t.label}</span>
                  </div>
                  <div className={`mt-1 text-[9px] tracking-[0.1em] normal-case ${active ? "text-black/60" : "text-white/40"}`}>
                    {t.artist}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      <div className="absolute bottom-6 text-[10px] tracking-[0.4em] text-white/40 uppercase z-10">
        © mauvais.fashion
      </div>
    </main>
  );
}

function Showcase() {
  const [muted, setMuted] = useState(() => {
    const a = getAudio();
    return a ? a.muted : false;
  });

  const toggleMute = () => {
    const a = getAudio();
    if (!a) return;
    a.muted = !a.muted;
    setMuted(a.muted);
  };

  const showcases = [
    {
      title: "Chapitre I — F40",
      subtitle: "authentic ferrari F40 t-shirt from mauvais.fashion",
      slides: [tshirtBack, tshirtFront, tshirtSize],
    },
    {
      title: "Chapitre II — Custom",
      subtitle: "costumize your own favorite car t-shirt with our quality",
      slides: [look2a, look2b, look2c],
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white animate-in fade-in-0 duration-700">
      <header className="flex justify-between items-center px-8 py-6 border-b border-white/10 animate-in fade-in-0 slide-in-from-top-4 duration-700">
        <span className="font-serif italic text-2xl">
          mauvais<span className="text-[oklch(0.55_0.22_27)]">.</span>fashion
        </span>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleMute}
            className="border border-white/30 px-3 py-1.5 text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all hover:scale-105"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? "♪ off" : "♪ on"}
          </button>
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/60 hidden sm:inline">
            SS / FW · 2026
          </span>
        </div>
      </header>




      <section className="px-8 py-20 text-center border-b border-white/10 animate-in fade-in-0 slide-in-from-bottom-6 duration-1000">
        <p className="text-[10px] tracking-[0.5em] uppercase text-white/50">The Archive</p>
        <h1 className="mt-4 font-serif text-6xl md:text-8xl italic tracking-tight">
          Two Showcases.
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-sm text-white/60 leading-relaxed">
          A private dispatch from the atelier — two chapters, six images, one quiet rebellion against the obvious.
        </p>
      </section>

      <div className="divide-y divide-white/10">
        {showcases.map((s, i) => (
          <ShowcaseBlock key={i} {...s} index={i + 1} />
        ))}
      </div>

      <footer className="px-8 py-12 border-t border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/40">
            © mauvais.fashion — all looks reserved
          </span>
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/mauvais.etny?igsh=MnlzOXg3eTVhNmMz&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/30 px-4 py-2 text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all hover:scale-105"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@mauvais.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/30 px-4 py-2 text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all hover:scale-105"
            >
              TikTok
            </a>
            <a
              href="https://wa.me/6283169344133"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[oklch(0.55_0.22_27)] bg-[oklch(0.55_0.22_27)] text-white px-4 py-2 text-[10px] tracking-[0.3em] uppercase hover:bg-transparent transition-all hover:scale-105"
            >
              Demand Us
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ShowcaseBlock({
  title,
  subtitle,
  slides,
  index,
}: {
  title: string;
  subtitle: string;
  slides: string[];
  index: number;
}) {
  const [i, setI] = useState(0);
  const next = () => setI((p) => (p + 1) % slides.length);
  const prev = () => setI((p) => (p - 1 + slides.length) % slides.length);

  return (
    <section className="px-8 py-20 md:py-28">
      <div className="grid md:grid-cols-[1fr_2fr] gap-10 items-center max-w-7xl mx-auto">
        <div>
          <p className="text-[10px] tracking-[0.5em] uppercase text-white/50">
            0{index} / 02
          </p>
          <h2 className="mt-4 font-serif italic text-4xl md:text-5xl tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-sm text-white/60">{subtitle}</p>

          <div className="mt-10 flex items-center gap-4">
            <button
              onClick={prev}
              className="border border-white/40 w-12 h-12 hover:bg-white hover:text-black transition-colors"
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              onClick={next}
              className="border border-white/40 w-12 h-12 hover:bg-white hover:text-black transition-colors"
              aria-label="Next slide"
            >
              →
            </button>
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/50 ml-2">
              {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
          {slides.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`${title} look ${idx + 1}`}
              loading="lazy"
              width={1024}
              height={1280}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                idx === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
