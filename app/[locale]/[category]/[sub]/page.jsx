import SectionTitle from '../../../../components/SectionTitle';
import ProductGrid from '../../../../components/ProductGrid';
import {readJSON} from '../../../../lib/fsdb';

export const dynamic = 'force-dynamic';

export default async function SubcategoryPage(context) {
  const {locale, category, sub} = await context.params; // Next 15: await params

  const [categories, subcategories, products] = await Promise.all([
    readJSON('categories'),
    readJSON('subcategories'),
    readJSON('products')
  ]);

  const cat = (categories || []).find(c => c.slug === category);
  const sc = (subcategories || []).find(s => s.category === category && s.slug === sub);

  const catTitle = cat ? (locale === 'ja' && cat.title_ja ? cat.title_ja : cat.title) : category;
  const subTitle = sc ? (locale === 'ja' && sc.title_ja ? sc.title_ja : sc.title) : sub;

  const items = (products || []).filter(p => p.category === category && p.subCategory === sub);

  return (
    <section className="container mt-8">
      <SectionTitle title={`${catTitle} — ${subTitle}`} />
      <ProductGrid items={items} showSubFilter={false} />
    </section>
  );
}