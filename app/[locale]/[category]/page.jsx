import SectionTitle from '@/components/SectionTitle';
import CategoryCard from '@/components/CategoryCard';
import ProductGrid from '@/components/ProductGrid';
import {readJSON} from '@/lib/fsdb';

export const dynamic = 'force-dynamic';

export default async function CategoryPage(context) {
  const {locale, category} = await context.params; // await params

  const [categories, subcategories, products] = await Promise.all([
    readJSON('categories'),
    readJSON('subcategories'),
    readJSON('products')
  ]);

  const cat = (categories || []).find(c => c.slug === category);
  if (!cat) {
    return (
      <section className="container mt-8">
        <SectionTitle title="Not found" />
        <p className="text-sm text-gray-600">Category "{category}" not found.</p>
      </section>
    );
  }

  const subs = (subcategories || [])
    .filter(s => s.category === category && (s.enabled === true || s.enabled === 'true'))
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0));

  const items = (products || []).filter(p => p.category === category);

  const title = locale === 'ja' && cat.title_ja ? cat.title_ja : cat.title;

  return (
    <section className="container mt-8">
      <SectionTitle title={title} />

      {subs.length > 0 && (
        <div className="mb-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {subs.map(s => (
            <CategoryCard
              key={s.id}
              title={locale === 'ja' && s.title_ja ? s.title_ja : s.title}
              href={`/${category}/${s.slug}`}
              image={s.image || 'https://picsum.photos/seed/sub/800/600'}
            />
          ))}
        </div>
      )}

      <ProductGrid items={items} />
    </section>
  );
}