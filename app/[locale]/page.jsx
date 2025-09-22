import HeroSlider from '../../components/HeroSlider';
import SectionTitle from '../../components/SectionTitle';
import CategoryCard from '../../components/CategoryCard';
import ProductCard from '../../components/ProductCard';
import ServiceCard from '../../components/ServiceCard';
import {readJSON} from '../../lib/fsdb';
import {getDictionary} from '../../lib/dictionary';

export const dynamic = 'force-dynamic';

export default async function HomePage(context) {
  const {locale} = await context.params;

  const [products, visas, categories, banners, dict] = await Promise.all([
    readJSON('products'),
    readJSON('visas'),
    readJSON('categories'),
    readJSON('banners'),
    getDictionary(locale)
  ]);

  const featured = products.slice(0, 8);
  const tHome = dict?.Home || {};
  const enabledCats = (categories || [])
    .filter((c) => c.enabled === true || c.enabled === 'true')
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
  const label = (c) => (locale === 'ja' && c.title_ja ? c.title_ja : c.title);

  return (
    <>
      <HeroSlider slides={banners} />
      <section className="container mt-10">
        <SectionTitle
          title={tHome.shopByCategory || 'Shop by Category'}
          subtitle={tHome.shopByCategorySub || 'Vehicles, bikes, computers & phones'}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {enabledCats.map((c) => (
            <CategoryCard
              key={c.id}
              title={label(c)}
              href={`/${c.slug}`}
              image={c.image || 'https://picsum.photos/seed/cat/800/600'}
              caption={tHome.explore || 'Explore now'}
            />
          ))}
        </div>
      </section>

      <section className="container mt-12">
        <SectionTitle title={tHome.featured || 'Featured Items'} subtitle={tHome.featuredSub || 'Hand‑picked from vehicles, bikes, and electronics'} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="container mt-12">
        <SectionTitle title={tHome.services || 'Consulting Services'} subtitle={tHome.servicesSub || 'Visa consulting and job placements'} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visas.map((v) => (
            <ServiceCard key={v.id} item={v} />
          ))}
        </div>
      </section>
    </>
  );
}