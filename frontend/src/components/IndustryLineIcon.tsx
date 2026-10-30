type IndustryLineIconProps = {
  type: 'retail' | 'manufacturing' | 'education' | 'hospitality' | 'property' | 'logistics' | 'finance' | 'healthcare';
};

export function IndustryLineIcon({ type }: IndustryLineIconProps) {
  const drawings = {
    retail: <>
      <path d="M3 10h18l-1.5-5h-15L3 10Z" />
      <path d="M4.5 10v9h15v-9M8 19v-5h5v5M15.5 14h2" />
      <path d="M4 10c0 1.4 1.7 2.2 3 1.1.7 1.2 1.9 1.2 3 0 .9-1.2 2.2-1.2 3 0 1.3 1.1 3 .3 3-1.1" />
      <path d="M6 7.5h12M6 21h12M15.5 17h2" />
    </>,
    manufacturing: <>
      <path d="M3 20V9l6 4V9l6 4V5h5v15H3Z" />
      <path d="M17 5V3h3v2M6.5 16.5h1M11.5 16.5h1M16.5 16.5h1" />
      <path d="M2 20h20M17 8h1M17 11h1M17 14h1" />
    </>,
    education: <>
      <path d="m2 9 10-5 10 5-10 5L2 9ZM6 11v5c2.7 2.4 9.3 2.4 12 0v-5M21 10v6" />
      <circle cx="21" cy="17.5" r="1" />
      <path d="M9 18.2V20c2 .8 4 .8 6 0v-1.8M8 9h8" />
    </>,
    hospitality: <>
      <path d="M4 20V9l8-5 8 5v11H4ZM4 10h16M9 20v-6h6v6" />
      <path d="M7 7V4M17 7V4M11 10v2M14 10v2" />
      <path d="M2 20h20M6.5 13h1M16.5 13h1M6.5 16h1M16.5 16h1" />
    </>,
    property: <>
      <path d="m3 11 9-7 9 7v9H3v-9ZM9 20v-6h6v6" />
      <path d="M6 12h1M17 12h1M6 16h1M17 16h1" />
      <path d="M2 11 12 3l10 8M2 21h20M11 17h.5" />
    </>,
    logistics: <>
      <path d="M2.5 7h11v11h-11V7ZM13.5 10h4l3 3v5h-7v-8ZM16 10v3h4" />
      <circle cx="6.5" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
      <path d="M5 10h6M5 12.5h4M3 21h18" />
    </>,
    finance: <>
      <path d="m3 9 9-5 9 5H3ZM4 20h16M6 18v-7M10 18v-7M14 18v-7M18 18v-7" />
      <circle cx="12" cy="7.3" r=".7" />
      <path d="M3 21.5h18M5 11h14M5 18h14" />
    </>,
    healthcare: <>
      <path d="M4 8h16v12H4V8ZM9 8V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
      <path d="M12 11v6M9 14h6" />
      <path d="M4 10h16M7 20v1M17 20v1M10 6.5h4" />
    </>,
  };

  return (
    <svg className="industries-marquee__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {drawings[type]}
    </svg>
  );
}
