'use client';

import {useEffect, useMemo, useState} from 'react';
import LocaleLink from './LocaleLink';
import Button from './ui/Button';
import {useI18n} from './I18nProvider';

export default function HeroSlider({slides = []}) {
  const {locale} = useI18n();
  const enabled = useMemo(
    () => slides.filter(s => s.enabled === true || s.enabled === 'true').sort((a,b) => Number(a.order||0)-Number(b.order||0)),
    [slides]
  );
  const [i, setI] = useState(0);
  const n = enabled.length;

  useEffect(() => {
    if (n <= 1) return;
    const t = setInterval(() => setI(p => (p + 1) % n), 6000);
    return () => clearInterval(t);
  }, [n]);

  if (n === 0) return null;
  const s = enabled[i];
  const title = locale === 'ja' && s.title_ja ? s.title_ja : s.title;
  const subtitle = locale === 'ja' && s.subtitle_ja ? s.subtitle_ja : s.subtitle;

  return (
    <section className="relative">
      <div className="relative h-[420px] md:h-[540px] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{backgroundImage:`url(${s.image})`, backgroundSize:'cover', backgroundPosition:'center'}}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/20" />
        <div className="container relative h-full flex flex-col justify-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold max-w-3xl leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,.4)]">
            {title}
          </h1>
          {subtitle && <p className="mt-3 max-w-2xl text-white/90">{subtitle}</p>}
          <div className="mt-6 flex gap-3">
            {s.link && (
              <LocaleLink href={s.link}>
                <Button>Explore</Button>
              </LocaleLink>
            )}
            {n > 1 && (
              <>
                <Button variant="secondary" onClick={() => setI((i - 1 + n) % n)}>◀</Button>
                <Button variant="secondary" onClick={() => setI((i + 1) % n)}>▶</Button>
              </>
            )}
          </div>
        </div>
        {n > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {enabled.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={`h-2.5 w-2.5 rounded-full border ${i===idx?'bg-white border-white':'bg-white/50 border-white/70 hover:bg-white/80'}`}
                aria-label={`slide ${idx+1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}