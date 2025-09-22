import Image from 'next/image';
import LocaleLink from '@/components/LocaleLink';

export default function CategoryCard({title, href, image, caption}) {
  return (
    <LocaleLink href={href} className="group block rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:shadow-lg transition">
      <div className="relative aspect-[4/3]">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-[1.02] transition-transform" />
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 to-transparent text-white">
          <h3 className="font-semibold">{title}</h3>
          {caption && <p className="text-xs text-white/85">{caption}</p>}
        </div>
      </div>
    </LocaleLink>
  );
}