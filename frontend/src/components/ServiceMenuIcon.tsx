import type { ReactNode } from 'react';

type IconName = 'mobile' | 'web' | 'testing' | 'design' | 'office' | 'team' | 'server' | 'erp' | 'crm' | 'marketing' | 'ai' | 'vision' | 'chat' | 'analytics';

const icons: Record<IconName, ReactNode> = {
  mobile: <><rect x="22" y="12" width="24" height="44" rx="5" fill="white"/><rect x="26" y="18" width="16" height="29" rx="2" fill="#BCEEFF"/><circle cx="34" cy="51" r="2" fill="#20A6D9"/></>,
  web: <><rect x="13" y="16" width="42" height="32" rx="5" fill="white"/><rect x="18" y="21" width="32" height="21" rx="2" fill="#D8F2FF"/><path d="M28 53h12m-6-5v5" stroke="white" strokeWidth="4" strokeLinecap="round"/><circle cx="23" cy="25" r="2" fill="#64B8E8"/></>,
  testing: <><path d="M34 12 52 19v13c0 12-8 20-18 25-10-5-18-13-18-25V19l18-7Z" fill="white"/><path d="M34 18 46 23v9c0 8-5 14-12 18V18Z" fill="#DDFBEA"/><path d="m26 33 6 6 11-13" fill="none" stroke="#42B986" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></>,
  design: <><path d="m18 44 4-14 23-18 10 10-18 23-14 4-5-5Z" fill="white"/><path d="m21 44 6-5 5 5-9 5-2-5Z" fill="#DCCEFF"/><path d="m39 17 11 11" stroke="#8F70E8" strokeWidth="3"/><circle cx="19" cy="19" r="4" fill="#FFE4A5"/></>,
  office: <><rect x="17" y="16" width="34" height="37" rx="4" fill="white"/><path d="M23 24h6m10 0h6M23 32h6m10 0h6M23 40h6m10 0h6" stroke="#E99B48" strokeWidth="3" strokeLinecap="round"/><path d="M30 53V43h8v10" fill="#FFEBC5"/></>,
  team: <><circle cx="26" cy="27" r="8" fill="white"/><circle cx="44" cy="27" r="7" fill="#FFF0F5"/><path d="M12 50c1-10 6-15 14-15s13 5 14 15m-1 0c1-8 4-13 9-13 6 0 9 5 9 13" fill="white"/></>,
  server: <><rect x="16" y="15" width="36" height="38" rx="5" fill="white"/><rect x="21" y="21" width="26" height="9" rx="2" fill="#CDEEFF"/><rect x="21" y="34" width="26" height="9" rx="2" fill="#CDEEFF"/><circle cx="26" cy="25.5" r="2" fill="#369AD1"/><circle cx="26" cy="38.5" r="2" fill="#369AD1"/></>,
  erp: <><rect x="15" y="15" width="38" height="38" rx="6" fill="white"/><rect x="20" y="21" width="12" height="12" rx="2" fill="#AEEBFF"/><rect x="36" y="21" width="12" height="12" rx="2" fill="#DDF7FF"/><rect x="20" y="37" width="12" height="11" rx="2" fill="#DDF7FF"/><rect x="36" y="37" width="12" height="11" rx="2" fill="#AEEBFF"/></>,
  crm: <><rect x="16" y="16" width="36" height="37" rx="5" fill="white"/><circle cx="30" cy="30" r="6" fill="#BBEDCF"/><path d="M21 45c1-7 4-10 9-10s8 3 9 10H21Z" fill="#BBEDCF"/><path d="M41 28h6m-6 7h6m-6 7h6" stroke="#52B883" strokeWidth="2.5" strokeLinecap="round"/></>,
  marketing: <><path d="M15 29h11l24-11v31L26 38H15a4 4 0 0 1-4-4v-1a4 4 0 0 1 4-4Z" fill="white"/><path d="m23 39 4 13h9l-6-11" fill="#FFE9A6"/><path d="M46 22v23l5 3V19l-5 3Z" fill="#FFF0D4"/><path d="m53 14 4-4m-3 23h6m-7 16 4 4" stroke="white" strokeWidth="3" strokeLinecap="round"/></>,
  ai: <><path d="m34 12 5 15 15 5-15 5-5 15-5-15-15-5 15-5 5-15Z" fill="white"/><path d="m49 13 2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" fill="#FFE4A5"/></>,
  vision: <><path d="M10 34c6-10 14-16 24-16s18 6 24 16c-6 10-14 16-24 16S16 44 10 34Z" fill="white"/><circle cx="34" cy="34" r="11" fill="#FFE3A8"/><circle cx="34" cy="34" r="6" fill="#C5843D"/><circle cx="31" cy="31" r="2" fill="white"/></>,
  chat: <><rect x="14" y="20" width="40" height="31" rx="8" fill="white"/><rect x="19" y="25" width="30" height="21" rx="6" fill="#EFE2FF"/><circle cx="28" cy="35" r="3" fill="#7950CF"/><circle cx="40" cy="35" r="3" fill="#7950CF"/><path d="M30 41c3 2 6 2 9 0M34 20v-6" stroke="#7950CF" strokeWidth="2.5" strokeLinecap="round"/><circle cx="34" cy="13" r="3" fill="#FFE4A5"/></>,
  analytics: <><rect x="15" y="14" width="38" height="39" rx="6" fill="white"/><path d="M24 44V35m10 9V28m10 16V22" stroke="#32A682" strokeWidth="5" strokeLinecap="round"/><path d="M22 22h6" stroke="#9FDDCC" strokeWidth="3" strokeLinecap="round"/></>,
};

const palette: Record<IconName, [string, string, string]> = {
  mobile: ['#00ADFC', '#52DBDE', '#006EA9'], web: ['#61B7FF', '#ADE8FF', '#2A67B9'],
  testing: ['#5CCB9A', '#B5E77A', '#267A68'], design: ['#9D73F4', '#D1ACFF', '#6040B3'],
  office: ['#FFAE55', '#FFE1A5', '#B26B26'], team: ['#FF739C', '#FFC2D3', '#A54567'],
  server: ['#55B8F1', '#A8E8F8', '#2479B4'], erp: ['#00ADFC', '#52DBDE', '#006EA9'],
  crm: ['#5CCB9A', '#B5E77A', '#267A68'], marketing: ['#FF6B89', '#FFC45C', '#A54864'],
  ai: ['#9D73F4', '#D1ACFF', '#6040B3'], vision: ['#FFAE55', '#FFE1A5', '#B26B26'],
  chat: ['#9D73F4', '#D1ACFF', '#6040B3'], analytics: ['#5CCB9A', '#B5E77A', '#267A68'],
};

export function ServiceMenuIcon({ name, compact = false }: { name: IconName; compact?: boolean }) {
  const [base, light, dark] = palette[name];
  return (
    <svg className={`service-menu-icon${compact ? ' service-menu-icon--compact' : ''}`} viewBox="0 0 68 68" aria-hidden="true" focusable="false">
      <rect x="2" y="2" width="64" height="64" rx="18" fill={base} />
      <path d="M10 13C22 1 45 0 59 14v10C46 18 28 17 10 31V13Z" fill={light} opacity=".72" />
      <circle cx="54" cy="54" r="18" fill={dark} opacity=".14" />
      <circle cx="11" cy="55" r="8" fill="white" opacity=".15" />
      {icons[name]}
    </svg>
  );
}
