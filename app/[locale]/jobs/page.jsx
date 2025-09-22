import SectionTitle from '../../../components/SectionTitle';
import JobCard from '../../../components/JobCard';
import {readJSON} from '../../../lib/fsdb';
import {getDictionary} from '../../../lib/dictionary';

export const dynamic = 'force-dynamic';

export default async function JobsPage(context) {
  const {locale} = await context.params; // Next 15: await params

  const [jobs, dict] = await Promise.all([
    readJSON('jobs'),
    getDictionary(locale)
  ]);

  const t = dict?.Pages || {};

  return (
    <section className="container mt-8">
      <SectionTitle
        title={t.jobsTitle || 'Job Consulting'}
        subtitle={t.jobsSub || 'Full-time and Part-time jobs'}
      />
      <div className="grid gap-4">
        {jobs.map(job => <JobCard key={job.id} job={job} />)}
      </div>
    </section>
  );
}