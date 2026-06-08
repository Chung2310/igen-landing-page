import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import gsap from 'gsap';

interface ArticleData {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  thumbnail: string;
  author: string;
  status: string;
  createdAt: string;
  publishedAt?: string;
}

// Pre-seeded Mock articles in case the API is offline
const MOCK_ARTICLES: ArticleData[] = [
  {
    title: 'Future of AI in Digital Marketing',
    slug: 'future-of-ai-digital-marketing',
    content: 'Nội dung chi tiết...',
    excerpt: 'Tương lai của tiếp thị kỹ thuật số sẽ thay đổi thế nào dưới tác động của các mô hình Generative AI?',
    category: 'AI Trends',
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60',
    author: 'iGen Admin',
    status: 'published',
    createdAt: '2026-06-08T04:00:00.000Z',
    publishedAt: '2026-06-08T04:00:00.000Z',
  },
  {
    title: 'Tối ưu hóa Database Cluster với Machine Learning',
    slug: 'database-cluster-optimization-ml',
    content: 'Nội dung chi tiết...',
    excerpt: 'Cách các mô hình học máy tự động dự báo tải trọng và cân bằng hiệu suất truy vấn trong cụm cơ sở dữ liệu lớn.',
    category: 'Tech Insights',
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=60',
    author: 'iGen Admin',
    status: 'published',
    createdAt: '2026-06-07T04:00:00.000Z',
    publishedAt: '2026-06-07T04:00:00.000Z',
  },
  {
    title: 'Case Study: Chiến dịch Marketing Campaign Alpha',
    slug: 'case-study-marketing-campaign-alpha',
    content: 'Nội dung chi tiết...',
    excerpt: 'Chi tiết bài học thực tiễn ứng dụng trợ lý AI tạo video và chatbot tự động giúp tăng 150% chuyển đổi.',
    category: 'Case Study',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    author: 'iGen Admin',
    status: 'published',
    createdAt: '2026-06-06T04:00:00.000Z',
    publishedAt: '2026-06-06T04:00:00.000Z',
  },
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const News: React.FC = () => {
  const [articles, setArticles] = useState<ArticleData[]>(MOCK_ARTICLES);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = ['Tất cả', 'AI Trends', 'Tech Insights', 'Case Study'];

  useEffect(() => {
    // Reveal main page title
    gsap.to('.reveal-hero-text', {
      y: 0,
      duration: 1.4,
      ease: 'power4.out',
      delay: 0.2,
    });
  }, []);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const categoryParam = selectedCategory !== 'Tất cả' ? selectedCategory : '';
      const response = await axios.get(`${API_URL}/articles`, {
        params: {
          page,
          limit: 6,
          status: 'published',
          category: categoryParam,
          search: search,
        },
      });

      if (response.data?.success) {
        setArticles(response.data.data.docs);
        setTotalPages(response.data.data.totalPages);
      }
    } catch (error) {
      console.warn('API Offline - Using mock articles fallback:', error);
      // Fallback filter locally
      let filtered = MOCK_ARTICLES;
      if (selectedCategory !== 'Tất cả') {
        filtered = filtered.filter((a) => a.category === selectedCategory);
      }
      if (search) {
        filtered = filtered.filter(
          (a) =>
            a.title.toLowerCase().includes(search.toLowerCase()) ||
            a.excerpt.toLowerCase().includes(search.toLowerCase())
        );
      }
      setArticles(filtered);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [page, selectedCategory, search]);

  useEffect(() => {
    let active = true;
    const fetchAsync = async () => {
      await Promise.resolve();
      if (active) {
        fetchArticles();
      }
    };
    fetchAsync();
    return () => {
      active = false;
    };
  }, [fetchArticles]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // reset to first page on new search
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setPage(1); // reset to first page on new category
  };

  return (
    <main className="flex flex-col w-full relative z-10">
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[50vh] overflow-hidden pt-32 dof-target-section">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/10 via-transparent to-transparent z-0"></div>
        <div className="absolute inset-0 grid-bg-dark opacity-20 z-0"></div>
        
        <div className="relative z-20 max-w-4xl mx-auto text-center px-4 flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">
            <div className="overflow-hidden">
              <span className="block translate-y-full reveal-hero-text bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent">
                Tin Tức & Xu Hướng
              </span>
            </div>
          </h1>
          <p className="text-lg text-gray-400 font-light max-w-2xl">
            Cập nhật những chuyển biến và đột phá mới nhất trong thế giới trí tuệ nhân tạo.
          </p>
        </div>
      </section>

      {/* Articles Grid & Controls Section */}
      <section className="py-20 relative z-20 section-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filters and Search toolbar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
            
            {/* Category Selectors */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all interactable border ${
                    selectedCategory === cat
                      ? 'bg-primary text-white border-primary shadow-glow'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search inputs */}
            <div className="relative w-full md:w-80 group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                search
              </span>
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Tìm kiếm bài viết..."
                className="w-full bg-white/5 border border-white/10 text-white rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-500 text-sm interactable"
              />
            </div>

          </div>

          {/* Grid display */}
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-32">
              <span className="material-symbols-outlined text-6xl text-gray-600 mb-4">search_off</span>
              <p className="text-gray-400">Không tìm thấy bài viết nào phù hợp.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((art) => (
                <div
                  key={art.slug}
                  className="glass-premium rounded-3xl overflow-hidden flex flex-col justify-between tilt-card interactable group"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="aspect-video relative overflow-hidden bg-white/5">
                      {art.thumbnail ? (
                        <img
                          src={art.thumbnail}
                          alt={art.title}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary/30">
                          <span className="material-symbols-outlined text-6xl">article</span>
                        </div>
                      )}
                      <span className="absolute top-4 left-4 bg-primary/20 backdrop-blur-md text-primary text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-primary/25">
                        {art.category}
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="p-8">
                      <div className="text-gray-500 text-xs mb-3 flex items-center gap-2">
                        <span>{art.author}</span>
                        <span>•</span>
                        <span>
                          {art.publishedAt
                            ? new Date(art.publishedAt).toLocaleDateString('vi-VN')
                            : new Date(art.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                      <h3 className="text-xl font-display font-bold text-white mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                        {art.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-8 pt-0">
                    <Link
                      to={`/news/${art.slug}`}
                      className="text-sm font-bold text-primary group-hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      Đọc tiếp <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-16">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:scale-110 transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 disabled:scale-100 interactable bg-white/5"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <span className="flex items-center text-sm font-bold tracking-widest text-gray-400">
                {page} / {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:scale-110 transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 disabled:scale-100 interactable bg-white/5"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          )}

        </div>
      </section>
      
    </main>
  );
};
