'use client';

import React, {createContext, useContext, useMemo} from 'react';

const I18nCtx = createContext({locale: 'en', t: (k) => k});

function get(obj, path) {
  return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
}

function format(str, vars) {
  return String(str).replace(/\{(\w+)\}/g, (_, k) => (vars && vars[k] != null ? vars[k] : ''));
}

export default function I18nProvider({locale, messages, children}) {
  const value = useMemo(() => {
    const t = (key, vars) => {
      const val = get(messages, key);
      return typeof val === 'string' ? format(val, vars) : val ?? key;
    };
    return {locale, t, messages};
  }, [locale, messages]);

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  return useContext(I18nCtx);
}