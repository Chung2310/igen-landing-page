import type { ReactNode } from 'react';

export type ServiceIconName =
  | 'mobile' | 'web' | 'testing' | 'design' | 'office' | 'team' | 'server'
  | 'erp' | 'crm' | 'marketing' | 'ai' | 'vision' | 'chat' | 'analytics';

const drawings: Record<ServiceIconName, ReactNode> = {
  mobile: <>
    <rect x="16" y="7" width="16" height="34" rx="3" /><path d="M21 11h6M21 36h6" />
    <rect x="20" y="17" width="8" height="9" rx="1.5" /><path d="M22 30h4" />
  </>,
  web: <>
    <rect x="7" y="10" width="34" height="27" rx="3" /><path d="M7 17h34M19 41h10m-5-4v4M12 14h1m4 0h1" />
    <path d="m20 23-4 4 4 4m8-8 4 4-4 4m-3-9-2 10" />
  </>,
  testing: <>
    <path d="M24 6 38 12v11c0 9-5 15-14 19C15 38 10 32 10 23V12L24 6Z" />
    <path d="m17 24 5 5 9-10M17 14h4m6 0h4" />
  </>,
  design: <>
    <path d="m10 35 2-8L32 8a4 4 0 0 1 6 6L18 34l-8 1Zm3-7 5 5m14-22 5 5" />
    <path d="M25 37h14M31 32v10m-8-22 5 5" />
  </>,
  office: <>
    <path d="M10 41V12l14-5 14 5v29M7 41h34M20 41v-9h8v9" />
    <path d="M15 16h4m10 0h4m-18 7h4m10 0h4m-18 7h4m10 0h4" />
  </>,
  team: <>
    <circle cx="18" cy="17" r="5" /><circle cx="32" cy="18" r="4" />
    <path d="M8 37v-3c0-6 4-10 10-10s10 4 10 10v3H8Zm22-11c5 0 9 4 9 9v2h-8M14 14l2-2" />
  </>,
  server: <>
    <rect x="9" y="8" width="30" height="32" rx="3" /><path d="M9 19h30M9 30h30M15 14h2m5 0h10M15 25h2m5 0h10M15 35h2m5 0h10" />
  </>,
  erp: <>
    <rect x="8" y="8" width="32" height="32" rx="3" /><path d="M8 18h32M18 18v22M18 29h22M14 13h1m8 0h9M13 24h1m10 0h10m-10 10h10" />
  </>,
  crm: <>
    <rect x="8" y="9" width="32" height="30" rx="3" /><circle cx="19" cy="21" r="4" />
    <path d="M12 32c0-4 3-7 7-7s7 3 7 7H12Zm17-11h6m-6 6h6m-6 6h6" />
  </>,
  marketing: <>
    <path d="M9 20h8l18-8v24l-18-8H9v-8Zm8 8 3 11h7l-4-9M35 17l5-3m-5 17 5 3M12 24h5" />
  </>,
  ai: <>
    <path d="m23 8 3.6 11.4L38 23l-11.4 3.6L23 38l-3.6-11.4L8 23l11.4-3.6L23 8Z" />
    <path d="m37 7 1.2 3.8L42 12l-3.8 1.2L37 17l-1.2-3.8L32 12l3.8-1.2L37 7ZM8 36h5m-2.5-2.5v5" />
  </>,
  vision: <>
    <path d="M6 24c5-7 11-11 18-11s13 4 18 11c-5 7-11 11-18 11S11 31 6 24Z" />
    <circle cx="24" cy="24" r="7" /><circle cx="24" cy="24" r="2" /><path d="M10 10h5m-5 0v5m28-5h-5m5 0v5" />
  </>,
  chat: <>
    <path d="M10 16h28a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H20l-8 5v-5h-2a4 4 0 0 1-4-4V20a4 4 0 0 1 4-4Z" />
    <path d="M24 16v-5m-3-3h6M16 25h4m8 0h4m-13 6c3 3 7 3 10 0" />
  </>,
  analytics: <>
    <rect x="8" y="8" width="32" height="32" rx="3" /><path d="M15 33v-7m7 7V20m7 13v-9m6 9V15M14 15l7 3 7-6 7 2" />
  </>,
};

export function OutlineServiceIcon({ name, compact = false }: { name: ServiceIconName; compact?: boolean }) {
  return (
    <svg
      className={`outline-service-icon${compact ? ' outline-service-icon--compact' : ''}`}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect className="outline-service-icon__frame" x="1" y="1" width="46" height="46" rx="11" />
      {drawings[name]}
    </svg>
  );
}
