'use client';
import Image from 'next/image';
import {useI18n} from './I18nProvider';

export default function ServiceCard({item}) {
  const {locale} = useI18n();
  const title = locale === 'ja' && item.title_ja ? item.title_ja : item.title;
  const description = locale === 'ja' && item.description_ja ? item.description_ja : item.description;

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:shadow-lg transition bg-white">
      <div className="relative aspect-[4/3]">
        {item.image ? <Image src={item.image} alt={title} fill className="object-cover" /> : <div className="w-full h-full bg-gray-100" />}
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-3">{description}</p>
        {item.priceFrom && <p className="mt-2 text-sm text-[var(--brand)]">From {item.currency || 'USD'} {Number(item.priceFrom).toLocaleString()}</p>}
      </div>
    </div>
  );
}