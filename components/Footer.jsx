'use client';

import Image from 'next/image';
import LocaleLink from './LocaleLink';
import {Facebook, Mail, Phone, MessageSquare, Store, Headset} from 'lucide-react';
import {useI18n} from './I18nProvider';

export default function Footer() {
  const {t} = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t bg-gradient-to-br from-slate-50 to-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <CompanyInfo t={t} />
          <ContactInfo t={t} />
          <ShopLinks t={t} />
          <ServiceLinks t={t} />
        </div>
      </div>
      <BottomBar year={currentYear} t={t} />
    </footer>
  );
}

/* -------------------
   Subcomponents
------------------- */

function CompanyInfo({t}) {
  const logoSrc = '/uploads/logo/logo.jpeg'; // Put your logo under public/uploads/logo/logo.jpeg

  return (
    <div className="lg:col-span-2">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-[140px] h-[48px]">
          <Image
            src={logoSrc}
            alt="Sakura Lanka Logo"
            fill
            className="object-contain"
            sizes="140px"
            priority
          />
        </div>
      </div>
      <p className="text-slate-600 leading-relaxed mb-4 pl-2">
        {t('Footer.companyDesc') || 'Your trusted partner for vehicles, bikes, electronics, and professional visa & job consulting services. Quality products and expert guidance for your success.'}
      </p>
    </div>
  );
}

function ContactInfo({t}) {
  const colorCls = {
    green: { text: 'text-green-500', hover: 'hover:text-green-600' },
    blue:  { text: 'text-blue-500',  hover: 'hover:text-blue-600'  },
    red:   { text: 'text-red-500',   hover: 'hover:text-red-600'   }
  };

  const contacts = [
    {
      href: 'https://line.me/ti/p/Yu5_8ER02M',
      label: t('Footer.contact.line') || 'LINE',
      color: 'green',
      icon: <MessageSquare className="w-4 h-4" />
    },
    {
      href: 'https://wa.me/818096609191',
      label: t('Footer.contact.whatsapp') || 'WhatsApp',
      color: 'green',
      icon: <Phone className="w-4 h-4" />
    },
    {
      href: 'https://www.facebook.com/share/1FcCNwbiNj/?mibextid=wwXIfr',
      label: t('Footer.contact.facebook') || 'Facebook',
      color: 'blue',
      icon: <Facebook className="w-4 h-4" />
    },
    {
      href: 'mailto:sakuralanka123@gmail.com',
      label: t('Footer.contact.gmail') || 'Gmail',
      color: 'red',
      icon: <Mail className="w-4 h-4" />
    }
  ];

  return (
    <div className="space-y-3">
      <h5 className="font-semibold text-slate-900 flex items-center gap-2">
        <Headset className="w-4 h-4 text-blue-600" />
        {t('Footer.contactTitle') || 'Contact Us'}
      </h5>

      <div className="grid grid-cols-2 gap-4">
        {contacts.map((c, i) => (
          <a
            key={i}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-sm text-slate-600 ${colorCls[c.color].hover} transition-colors duration-200 group`}
          >
            <span className={colorCls[c.color].text}>{c.icon}</span>
            {c.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function ShopLinks({t}) {
  const links = [
    { href: '/vehicles',    label: t('Nav.vehicles') || 'Vehicles' },
    { href: '/bikes',       label: t('Nav.bikes') || 'Bikes' },
    { href: '/electronics', label: t('Nav.electronics') || 'Computers & Phones' }
  ];

  return (
    <div>
      <h5 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <Store className="w-4 h-4 text-blue-600" />
        {t('Footer.shopTitle') || 'Shop'}
      </h5>
      <ul className="space-y-3">
        {links.map((l, i) => (
          <li key={i}>
            <LocaleLink
              href={l.href}
              className="text-slate-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
            >
              <span className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-blue-600 transition-colors"></span>
              {l.label}
            </LocaleLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ServiceLinks({t}) {
  const services = [
    { href: '/visa', label: t('Pages.visaTitle') || 'Visa Consulting' },
    { href: '/jobs', label: t('Pages.jobsTitle') || 'Job Consulting' }
  ];

  return (
    <div>
      <h5 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <Headset className="w-4 h-4 text-blue-600" />
        {t('Footer.servicesTitle') || 'Services'}
      </h5>
      <ul className="space-y-3">
        {services.map((s, i) => (
          <li key={i}>
            <LocaleLink
              href={s.href}
              className="text-slate-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
            >
              <span className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-blue-600 transition-colors"></span>
              {s.label}
            </LocaleLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BottomBar({year, t}) {
  return (
    <div className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:items-center sm:justify-between">
          <span className="text-sm text-slate-600">
            {t('Footer.rights', {year}) || `© ${year} Sakura Lanka Co.,Ltd. All rights reserved.`}
          </span>

          <a
            href="https://wa.me/94765772504"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            {t('Footer.poweredBy') || 'Powered by Modulavers Systems'}
          </a>
        </div>
      </div>
    </div>
  );
}