'use client';

import Image from 'next/image';
import ConfirmButton from '../ui/ConfirmButton';
import Button from '../ui/Button';

export default function AdminHeader({tabs, activeKey, onChangeTab, onLogout}) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Logo" width={26} height={26} />
          <span className="font-semibold">Admin</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <ConfirmButton onConfirm={onLogout} label="Logout" confirmLabel="Confirm Logout" />
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1200px] px-2 sm:px-6 lg:px-8">
        <nav className="flex gap-2 overflow-x-auto no-scrollbar py-2">
          {tabs.map(t => (
            <Button
              key={t.key}
              variant={activeKey === t.key ? 'primary' : 'secondary'}
              className="whitespace-nowrap"
              onClick={() => onChangeTab(t.key)}
            >
              {t.label}
            </Button>
          ))}
          <div className="sm:hidden ml-auto">
            <ConfirmButton onConfirm={onLogout} label="Logout" confirmLabel="Confirm" />
          </div>
        </nav>
      </div>
    </header>
  );
}