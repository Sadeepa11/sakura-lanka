'use client';
import Link from 'next/link';
import {useI18n} from './I18nProvider';

export default function LocaleLink({href, locale, children, ...props}) {
  const {locale: current} = useI18n();
  // When locale={false}, don't prefix (e.g. /admin)
  const loc = locale === false ? '' : `/${locale || current}`;
  const url =
    typeof href === 'string' && href.startsWith('/')
      ? `${loc}${href}`
      : href;
  return (
    <Link href={url} {...props}>
      {children}
    </Link>
  );
}