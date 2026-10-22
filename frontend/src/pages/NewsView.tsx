import type { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import './NewsView.css';

type ArticleData = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  thumbnail: string;
  author: string;
  createdAt: string;
  publishedAt?: string;
};

type NewsViewProps = {
  articles: ArticleData[];
  loading: boolean;
  search: string;
  selectedCategory: string;
  categories: string[];
  page: number;
  totalPages: number;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCategorySelect: (category: string) => void;
  onPageChange: (page: number) => void;
};

const categoryIcons: Record<string, string> = {
  'Tất cả': 'grid_view',
  'AI Trends': 'memory',
  'Tech Insights': 'bar_chart',
  'Case Study': 'description',
};

const formatDate = (article: ArticleData) =>
  new Date(article.publishedAt || article.createdAt).toLocaleDateString('vi-VN');

export function NewsView({ articles, loading, search, selectedCategory, categories, page, totalPages, onSearchChange, onCategorySelect, onPageChange }: NewsViewProps) {
  return (
    <main className="news-page">
      <section className="news-hero" aria-labelledby="news-title">
        <div className="news-hero__inner">
          <div className="news-hero__copy">
            <span className="news-hero__eyebrow">iGen News</span>
            <h1 id="news-title">Tin tức &amp; <span>Xu hướng</span></h1>
            <p>Cập nhật những chuyển biến và đột phá mới trong thế giới trí tuệ nhân tạo, công nghệ và chuyển đổi số.</p>
            <div className="news-hero__highlights" aria-label="Nội dung tin tức">
              <div><span className="material-symbols-outlined">feed</span><span><strong>Cập nhật nhanh</strong><small>Thông tin mới nhất</small></span></div>
              <div><span className="material-symbols-outlined">lightbulb</span><span><strong>Kiến thức thực tiễn</strong><small>Ứng dụng vào doanh nghiệp</small></span></div>
              <div><span className="material-symbols-outlined">trending_up</span><span><strong>Xu hướng công nghệ</strong><small>Góc nhìn chuyên sâu</small></span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="news-content" aria-label="Danh sách bài viết">
        <div className="news-content__inner">
          <div className="news-toolbar">
            <div className="news-filters" role="group" aria-label="Lọc bài viết theo chủ đề">
              {categories.map((cat) => (
                <button key={cat} type="button" aria-pressed={selectedCategory === cat} onClick={() => onCategorySelect(cat)}>
                  <span className="material-symbols-outlined" aria-hidden="true">{categoryIcons[cat] || 'sell'}</span>{cat}
                </button>
              ))}
            </div>
            <label className="news-search">
              <span className="material-symbols-outlined" aria-hidden="true">search</span>
              <span className="sr-only">Tìm kiếm bài viết</span>
              <input type="search" value={search} onChange={onSearchChange} placeholder="Tìm kiếm bài viết, chủ đề..." />
            </label>
          </div>

          <div className="news-layout">
            <div className="news-main">
              {loading ? (
                <div className="news-state" role="status"><span className="news-spinner" />Đang tải bài viết...</div>
              ) : articles.length === 0 ? (
                <div className="news-state"><span className="material-symbols-outlined">search_off</span><p>Không tìm thấy bài viết nào phù hợp.</p></div>
              ) : (
                <div className="news-grid">
                  {articles.map((art) => (
                    <Link key={art.slug} to={`/news/${art.slug}`} className="news-card">
                      <div className="news-card__image">
                        {art.thumbnail ? <img src={art.thumbnail} alt="" loading="lazy" /> : <span className="material-symbols-outlined news-card__placeholder" aria-hidden="true">article</span>}
                        <span className="news-card__category">{art.category}</span>
                      </div>
                      <div className="news-card__body">
                        <time dateTime={art.publishedAt || art.createdAt}><span className="material-symbols-outlined" aria-hidden="true">calendar_today</span>{formatDate(art)}</time>
                        <h2>{art.title}</h2>
                        <p>{art.excerpt}</p>
                        <div className="news-card__footer"><span className="news-card__author"><span aria-hidden="true">iGen</span>{art.author}</span><span className="news-card__read">Đọc bài viết <span aria-hidden="true">↗</span></span></div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <nav className="news-pagination" aria-label="Phân trang bài viết">
                  <button type="button" disabled={page === 1} onClick={() => onPageChange(page - 1)} aria-label="Trang trước"><span className="material-symbols-outlined">chevron_left</span></button>
                  <span>{page} / {totalPages}</span>
                  <button type="button" disabled={page === totalPages} onClick={() => onPageChange(page + 1)} aria-label="Trang sau"><span className="material-symbols-outlined">chevron_right</span></button>
                </nav>
              )}
            </div>

            <aside className="news-sidebar" aria-label="Khám phá thêm">
              <section className="news-sidebar__panel">
                <h2><span className="material-symbols-outlined" aria-hidden="true">star</span>Bài viết nổi bật</h2>
                <div className="news-sidebar__articles">
                  {articles.slice(0, 3).map((art) => (
                    <Link to={`/news/${art.slug}`} key={art.slug} className="news-sidebar__article">
                      {art.thumbnail ? <img src={art.thumbnail} alt="" loading="lazy" /> : <span className="news-sidebar__thumbnail material-symbols-outlined">article</span>}
                      <span><strong>{art.title}</strong><small>{formatDate(art)}</small></span>
                      <span className="material-symbols-outlined news-sidebar__arrow" aria-hidden="true">chevron_right</span>
                    </Link>
                  ))}
                </div>
              </section>
              <section className="news-sidebar__panel news-sidebar__topics">
                <h2><span className="material-symbols-outlined" aria-hidden="true">explore</span>Khám phá chủ đề</h2>
                <p>Chọn lĩnh vực bạn quan tâm để xem những bài viết phù hợp.</p>
                <div>{categories.filter((cat) => cat !== 'Tất cả').map((cat) => <button key={cat} type="button" onClick={() => onCategorySelect(cat)}>{cat}<span aria-hidden="true">↗</span></button>)}</div>
              </section>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
