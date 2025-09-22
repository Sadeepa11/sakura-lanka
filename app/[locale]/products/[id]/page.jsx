import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import Button from '../../../../components/ui/Button';
import Badge from '../../../../components/ui/Badge';
import {readJSON} from '../../../../lib/fsdb';
import {getDictionary} from '../../../../lib/dictionary';

export const dynamic = 'force-dynamic';

export default async function ProductDetail(context) {
  const {id, locale} = await context.params; // Next 15: await params

  const all = await readJSON('products');
  const product = all.find(p => p.id === id);
  if (!product) return notFound();

  const dict = await getDictionary(locale);
  const labels = dict.Labels || {};
  const subMap = labels.sub || {};
  const catMap = labels.categories || {};
  const subLabel = subMap[product.subCategory] || product.subCategory;
  const catLabel = catMap[product.category] || product.category;

  const title = locale === 'ja' && product.title_ja ? product.title_ja : product.title;
  const description = locale === 'ja' && product.description_ja ? product.description_ja : product.description;
  const typeColor = product.type === 'new' ? 'green' : product.type === 'used' ? 'blue' : 'yellow';

  return (
    <section className="container mt-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative w-full h-72 md:h-[420px] rounded-xl overflow-hidden border border-gray-100">
          {product.image ? (
            <Image src={product.image} alt={title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-100" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Badge color={typeColor}>{String(product.type).toUpperCase()}</Badge>
            <span className="text-sm capitalize text-gray-600">{subLabel}</span>
          </div>
          <h1 className="text-2xl font-semibold mt-2">{title}</h1>
          <p className="mt-2 text-gray-700">{description}</p>
          <p className="mt-4 text-xl font-semibold">
            {product.currency || 'USD'} {Number(product.price || 0).toLocaleString()}
          </p>
          <div className="mt-6 flex gap-3">
            <Link href={`/${locale}/${product.category}`}>
              <Button variant="secondary">Back to {catLabel}</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}