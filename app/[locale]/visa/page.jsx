import SectionTitle from '../../../components/SectionTitle';
import ServiceCard from '../../../components/ServiceCard';
import {readJSON} from '../../../lib/fsdb';
import {getDictionary} from '../../../lib/dictionary';

export const dynamic = 'force-dynamic';

export default async function VisaPage(context) {
  const {locale} = await context.params; // Next 15: await params

  const [visas, dict] = await Promise.all([
    readJSON('visas'),
    getDictionary(locale)
  ]);

  const t = dict?.Pages || {};

  return (
    <section className="container mt-8">
      <SectionTitle
        title={t.visaTitle || 'Visa Consulting'}
        subtitle={t.visaSub || 'Job Visa, Student Visa, Tourist Visa'}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visas.map((v) => (
          <ServiceCard key={v.id} item={v} />
        ))}
      </div>
    </section>
  );
}