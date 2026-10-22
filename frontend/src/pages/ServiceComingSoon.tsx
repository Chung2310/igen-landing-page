import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import './IndustryComingSoon.css';

const upcomingServices: Record<string, string> = {
  blockchain: 'Blockchain',
  'data-analytics': 'Data & Analytics',
  'machine-learning-data-analytics': 'Machine Learning & Data Analytics',
};

export function ServiceComingSoon() {
  const { slug } = useParams();
  const name = slug ? upcomingServices[slug] : undefined;

  useEffect(() => {
    if (name) document.title = `${name} – Sắp ra mắt | iGen Technology`;
  }, [name]);

  if (!name) return <Navigate to="/solutions" replace />;

  return (
    <main className="industry-coming-soon">
      <section className="industry-coming-soon__card" aria-labelledby="service-coming-soon-title">
        <div className="industry-coming-soon__art">
          <svg className="industry-coming-soon__envelope" viewBox="0 0 160 150" aria-hidden="true">
            <path d="M20 65 80 26l60 39v58H20V65Z" fill="#007FC2" />
            <rect x="38" y="19" width="84" height="89" rx="4" fill="#ECF7FD" />
            <path d="M38 19h84v17H38z" fill="#F8FCFF" />
            <circle cx="80" cy="65" r="25" fill="#7567FF" />
            <path d="m67 65 9 9 18-19" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 67 80 108l60-41v56H20V67Z" fill="#55C8FF" />
            <path d="m20 123 48-38 12 23-60 15Z" fill="#00ADFC" />
            <path d="m140 123-48-38-12 23 60 15Z" fill="#00ADFC" />
          </svg>
        </div>
        <h1 id="service-coming-soon-title">SẮP RA MẮT</h1>
        <p className="industry-coming-soon__name">{name}</p>
        <Link to={`/contact?service=${encodeURIComponent(name)}`} className="industry-coming-soon__contact">
          Liên hệ để biết thêm thông tin <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
