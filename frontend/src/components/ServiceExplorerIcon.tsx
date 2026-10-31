import type { ReactNode } from 'react';

export type ServiceExplorerIconName =
  | 'software' | 'enterprise' | 'outsourcing' | 'website' | 'mobile' | 'automation'
  | 'blockchain' | 'data' | 'transformation' | 'marketing' | 'aiPlatform' | 'aiEnterprise';

const drawings: Record<ServiceExplorerIconName, ReactNode> = {
  software: <>
    <rect x="6" y="9" width="43" height="38" rx="4" /><path d="M6 18h43M12 14h2m4 0h2m4 0h2M17 27l-5 5 5 5m14-10 5 5-5 5m-5-13-5 16" />
    <circle cx="49" cy="46" r="9" /><circle cx="49" cy="46" r="3" /><path d="M49 34v3m0 18v3m-12-12h3m18 0h3m-20.5-8.5 2.2 2.2m12.6 12.6 2.2 2.2m0-17-2.2 2.2M42.7 52.3l-2.2 2.2" />
    <path d="M13 42h19" strokeWidth="1.2" opacity=".6" />
  </>,
  enterprise: <>
    <rect x="7" y="10" width="32" height="43" rx="4" /><path d="M7 20h32M13 15h5m5 0h5M14 27h7v7h-7zm12 0h7v7h-7zM14 39h7v7h-7zm12 0h7v7h-7z" />
    <path d="M40 31h9v-8m0 8v7m0-15h7M40 46h9m0 0v7m0-7h7" /><circle cx="56" cy="23" r="3" /><circle cx="56" cy="38" r="3" /><circle cx="56" cy="53" r="3" />
  </>,
  outsourcing: <>
    <rect x="14" y="24" width="37" height="25" rx="3" /><path d="M12 53h41l-3-4H15l-3 4ZM20 30h25M20 35h15m-15 5h21" />
    <circle cx="14" cy="14" r="5" /><circle cx="32" cy="11" r="5" /><circle cx="50" cy="14" r="5" /><path d="M4 26c0-5 4-8 10-8m36 0c6 0 10 3 10 8M23 21c1-5 4-7 9-7s8 2 9 7" />
  </>,
  website: <>
    <rect x="6" y="10" width="52" height="42" rx="4" /><path d="M6 19h52M12 15h2m4 0h2m4 0h2" />
    <circle cx="32" cy="35" r="12" /><path d="M20 35h24M32 23c-5 5-5 19 0 24m0-24c5 5 5 19 0 24M9 56h46" />
    <path d="m47 42 5 4-3 1-1 4-3-9Z" fill="currentColor" stroke="none" />
  </>,
  mobile: <>
    <rect x="17" y="5" width="30" height="54" rx="6" /><path d="M26 10h12M29 53h6M22 16h20v14H22zM22 35h8v8h-8zm12 0h8v8h-8z" />
    <path d="M8 26c2-3 4-5 7-6m-5 13 5-4m34-9c3 1 5 3 7 6m-7 3 5 4M10 49l5-5m34 0 5 5" strokeWidth="1.3" opacity=".7" />
  </>,
  automation: <>
    <rect x="13" y="16" width="38" height="32" rx="8" /><path d="M32 16V9m-4 0h8M13 29H7m44 0h6M21 48v6m22-6v6M22 39c5 4 15 4 20 0" />
    <circle cx="24" cy="29" r="3" /><circle cx="40" cy="29" r="3" /><circle cx="32" cy="8" r="2" />
    <path d="M7 44h6m38 0h6M4 40l3 4-3 4m56-8-3 4 3 4" strokeWidth="1.3" />
  </>,
  blockchain: <>
    <path d="m14 15 10-6 10 6-10 6-10-6Zm0 0v12l10 6 10-6V15M24 21v12m16 4 10-6 10 6-10 6-10-6Zm0 0v12l10 6 10-6V37M50 43v12" />
    <path d="M34 21h9l7 10M24 33v9l16 7M7 31l7-4m-7 4 7 5m-7-5v12l10 6 10-6V33" /><circle cx="7" cy="31" r="2" /><circle cx="24" cy="52" r="2" />
  </>,
  data: <>
    <ellipse cx="20" cy="14" rx="12" ry="5" /><path d="M8 14v29c0 7 24 7 24 0V14M8 24c0 7 24 7 24 0M8 34c0 7 24 7 24 0" />
    <rect x="37" y="35" width="5" height="15" rx="1" /><rect x="46" y="27" width="5" height="23" rx="1" /><rect x="55" y="19" width="5" height="31" rx="1" /><path d="M36 54h25M37 24l8-5 7 3 7-10m-5 0h5v5" />
  </>,
  transformation: <>
    <path d="M7 50V14m0 36h50M14 42l12-11 9 5 17-18m-8 0h8v8" /><circle cx="14" cy="42" r="2" /><circle cx="26" cy="31" r="2" /><circle cx="35" cy="36" r="2" />
    <path d="M16 13h15m-15 5h9M43 47a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" /><path d="m43 34 1.5 4 4 1.5-4 1.5L43 45l-1.5-4-4-1.5 4-1.5L43 34Z" />
  </>,
  marketing: <>
    <path d="M8 28h13l25-12v32L21 36H8a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3ZM19 37l4 15h10l-7-13M46 22c6 1 10 5 10 10s-4 9-10 10" />
    <path d="m52 13 3-5m3 17 5-2M54 51l4 5M11 23v-7m5 7v-9" strokeWidth="1.3" /><circle cx="56" cy="32" r="2" />
  </>,
  aiPlatform: <>
    <rect x="14" y="14" width="36" height="36" rx="5" /><rect x="21" y="21" width="22" height="22" rx="3" /><path d="M22 7v7m10-7v7m10-7v7M22 50v7m10-7v7m10-7v7M7 22h7M7 32h7M7 42h7m36-20h7m-7 10h7m-7 10h7" />
    <circle cx="27" cy="28" r="2" /><circle cx="38" cy="27" r="2" /><circle cx="33" cy="37" r="2" /><path d="m29 29 3 6m4-7-2 7" />
  </>,
  aiEnterprise: <>
    <path d="M8 52V19l15-7 15 7v33M8 25l15-7 15 7M13 30h5m9 0h5m-19 7h5m9 0h5M19 52V42h8v10" />
    <rect x="41" y="29" width="17" height="17" rx="3" /><path d="M45 25v4m9-4v4m-9 17v4m9-4v4m-13-17h-4m4 9h-4m21-9h4m-4 9h4" /><path d="m49 34 2 4 2-4m-4 7h4" />
  </>,
};

export function ServiceExplorerIcon({ name }: { name: ServiceExplorerIconName }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {drawings[name]}
    </svg>
  );
}
