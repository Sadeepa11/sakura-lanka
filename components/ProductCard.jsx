'use client';
import Image from 'next/image';
import Badge from './ui/Badge';
import LocaleLink from './LocaleLink';
import {useI18n} from './I18nProvider';

export default function ProductCard({item}) {
  const {locale} = useI18n();
  const title = locale === 'ja' && item.title_ja ? item.title_ja : item.title;
  const typeColor = item.type === 'new' ? 'green' : item.type === 'used' ? 'blue' : 'yellow';

  return (
    <LocaleLink href={`/products/${item.id}`} className="group rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:shadow-lg transition bg-white">
      <div className="relative aspect-[4/3]">
        {item.image
          ? <Image src={item.image} alt={title} fill className="object-cover group-hover:scale-[1.02] transition-transform" />
          : <div className="w-full h-full bg-gray-100" />
        }
        <div className="absolute left-2 top-2"><Badge color={typeColor}>{String(item.type).toUpperCase()}</Badge></div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold line-clamp-1">{title}</h3>
        <p className="text-xs text-gray-500 capitalize">{item.subCategory}</p>
        <p className="mt-2 font-semibold text-[var(--brand)]">{item.currency || 'USD'} {Number(item.price || 0).toLocaleString()}</p>
      </div>
    </LocaleLink>
  );
}