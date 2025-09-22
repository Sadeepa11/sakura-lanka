'use client';
import {useI18n} from '@/components/I18nProvider';
import LocaleLink from '@/components/LocaleLink';
import Button from './ui/Button';

export default function Hero() {
  const {t} = useI18n();
  return (
    <section className="relative">
      <div className="relative h-[380px] md:h-[480px] w-full overflow-hidden rounded-b-3xl" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1600&q=60)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative h-full flex flex-col justify-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold max-w-3xl">{t('Hero.title')}</h1>
          <p className="mt-3 max-w-2xl text-white/90">{t('Hero.subtitle')}</p>
          <div className="mt-6 flex gap-3">
            <LocaleLink href="/vehicles"><Button>{t('Hero.ctaBrowseVehicles')}</Button></LocaleLink>
            <LocaleLink href="/visa"><Button variant="secondary">{t('Hero.ctaVisaServices')}</Button></LocaleLink>
          </div>
        </div>
      </div>
    </section>
  );
}