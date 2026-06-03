'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    const trackPageView = () => {
      if (typeof window !== 'undefined') {
        // Google Analytics placeholder - replace with your GA4 measurement ID
        // window.gtag('config', 'G-XXXXXXXXXX', { page_path: pathname });

        // Console log for development
        console.log(`[Analytics] Page view: ${pathname}`);
      }
    };

    trackPageView();
  }, [pathname]);

  return null;
}
