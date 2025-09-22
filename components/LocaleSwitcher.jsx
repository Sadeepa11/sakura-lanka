'use client';
import {usePathname, useRouter} from 'next/navigation';
import {useI18n} from './I18nProvider';

const locales = ['en', 'ja'];
function replaceLocale(pathname, newLocale) {
  const segs = pathname.split('/');
  if (locales.includes(segs[1])) { segs[1] = newLocale; return segs.join('/'); }
  return `/${newLocale}${pathname === '/' ? '' : pathname}`;
}

export default function LocaleSwitcher() {
  const {locale} = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const btn = 'px-2 py-1 text-xs rounded border'; const active = 'bg-blue-600 text-white border-blue-600'; const idle = 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50';
  return (
    <div className="flex gap-2">
      <button className={`${btn} ${locale === 'en' ? active : idle}`} onClick={() => router.push(replaceLocale(pathname, 'en'))}>EN</button>
      <button className={`${btn} ${locale === 'ja' ? active : idle}`} onClick={() => router.push(replaceLocale(pathname, 'ja'))}>日本語</button>
    </div>
  );
}