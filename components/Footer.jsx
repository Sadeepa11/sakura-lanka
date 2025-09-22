import LocaleLink from './LocaleLink';

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-gradient-to-br from-slate-50 to-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-bold text-xl text-slate-900">Sakura Lanka</h4>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">
              Your trusted partner for vehicles, bikes, electronics, and professional visa & job consulting services. Quality products and expert guidance for your success.
            </p>
            
           
          </div>

          {/* Shop Links */}
          <div>
            <h5 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Shop
            </h5>
            <ul className="space-y-3">
              <li>
                <LocaleLink 
                  href="/vehicles" 
                  className="text-slate-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <svg className="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Vehicles
                </LocaleLink>
              </li>
              <li>
                <LocaleLink 
                  href="/bikes" 
                  className="text-slate-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <svg className="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Bikes
                </LocaleLink>
              </li>
              <li>
                <LocaleLink 
                  href="/electronics" 
                  className="text-slate-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <svg className="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Computers & Phones
                </LocaleLink>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h5 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v6a2 2 0 01-2 2H10a2 2 0 01-2-2V6" />
              </svg>
              Services
            </h5>
            <ul className="space-y-3">
              <li>
                <LocaleLink 
                  href="/visa" 
                  className="text-slate-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <svg className="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Visa Consulting
                </LocaleLink>
              </li>
              <li>
                <LocaleLink 
                  href="/jobs" 
                  className="text-slate-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <svg className="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Job Consulting
                </LocaleLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">
                © {new Date().getFullYear()} Sakura Lanka. All rights reserved.
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Powered by</span>
              <a 
                href="https://wa.me/94765772504" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 group"
              >
                <span>Modulavers Systems</span>
                <svg className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}