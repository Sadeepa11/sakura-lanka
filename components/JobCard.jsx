'use client';
import {useI18n} from '@/components/I18nProvider';

export default function JobCard({job}) {
  const {locale} = useI18n();
  const title = locale === 'ja' && job.title_ja ? job.title_ja : job.title;
  const description = locale === 'ja' && job.description_ja ? job.description_ja : job.description;
  const location = locale === 'ja' && job.location_ja ? job.location_ja : job.location;

  return (
    <div className="rounded-2xl border border-gray-100 shadow-card bg-white p-4 hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-xs rounded-full px-2.5 py-1 bg-gray-100">{job.type}</span>
      </div>
      <p className="text-sm text-gray-600">{location} • {job.salary || 'Negotiable'}</p>
      <p className="text-sm mt-2 line-clamp-3">{description}</p>
    </div>
  );
}