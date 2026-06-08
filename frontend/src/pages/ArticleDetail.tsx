import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import gsap from 'gsap';

interface ArticleData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  thumbnail: string;
  author: string;
  createdAt: string;
  publishedAt?: string;
}

const MOCK_ARTICLES: ArticleData[] = [
  {
    title: 'Future of AI in Digital Marketing',
    slug: 'future-of-ai-digital-marketing',
    content: `
      <h2>1. Kỷ nguyên của Siêu cá nhân hóa (Hyper-Personalization)</h2>
      <p>Trí tuệ nhân tạo (AI) đang định hình lại cách các doanh nghiệp tương tác với người tiêu dùng. Thông qua việc phân tích lượng lớn dữ liệu hành vi, sở thích và lịch sử mua sắm trực tuyến, các thuật toán học máy có thể dự đoán chính xác nhu cầu của khách hàng vào từng thời điểm cụ thể.</p>
      <p>Nghiên cứu cho thấy các chiến dịch marketing được hỗ trợ bởi các mô hình dự báo AI đạt tỷ lệ chuyển đổi cao hơn gấp 3 lần so với các cách tiếp cận truyền thống nhờ việc tối ưu hóa nội dung hiển thị cho từng cá nhân.</p>
      
      <h2>2. Sáng tạo nội dung với tốc độ ánh sáng</h2>
      <p>Sự trỗi dậy của các mô hình ngôn ngữ lớn (LLM) và Generative AI cho phép các đội ngũ sáng tạo sản xuất hàng loạt bài viết, hình ảnh và video chỉ trong tích tắc. Thay vì mất nhiều ngày để chuẩn bị, giờ đây các nhà tiếp thị có thể thiết lập hàng trăm biến thể quảng cáo A/B test tự động.</p>
      <p>Tuy nhiên, chất lượng và tính nguyên bản của nội dung vẫn là rào cản lớn. Các chuyên gia khuyến nghị doanh nghiệp nên áp dụng quy trình "Human-in-the-loop" - kết hợp sự nhạy bén của con người với hiệu suất của AI.</p>
      
      <h2>3. Thách thức và Đạo đức AI</h2>
      <p>Sự phụ thuộc vào AI cũng mang đến nhiều rủi ro về bảo mật thông tin và quyền riêng tư dữ liệu. Việc tuân thủ các quy định bảo vệ dữ liệu (như GDPR) và xây dựng hệ thống AI có trách nhiệm sẽ là chìa khóa để giữ chân khách hàng trung thành trong thập kỷ tới.</p>
    `,
    excerpt: 'Tương lai của tiếp thị kỹ thuật số sẽ thay đổi thế nào dưới tác động của các mô hình Generative AI?',
    category: 'AI Trends',
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=80',
    author: 'iGen Admin',
    createdAt: '2026-06-08T04:00:00.000Z',
    publishedAt: '2026-06-08T04:00:00.000Z',
  },
  {
    title: 'Tối ưu hóa Database Cluster với Machine Learning',
    slug: 'database-cluster-optimization-ml',
    content: `
      <h2>1. Khái niệm tự động tối ưu hóa (Auto-tuning)</h2>
      <p>Vận hành các cụm cơ sở dữ liệu lớn luôn đòi hỏi sự giám sát chặt chẽ từ các DBA. Việc ứng dụng học máy cho phép hệ thống tự phân tích các query chậm, tự động thiết lập chỉ mục (index) và phân bổ tài nguyên CPU/RAM một cách thông minh.</p>
      
      <h2>2. Dự đoán tải trọng truy vấn</h2>
      <p>Hệ thống tự động hóa sử dụng các mô hình chuỗi thời gian (time-series forecasting) để dự báo thời điểm lượng truy cập tăng đột biến, từ đó tự động nhân bản các read-replicas trước khi server bị quá tải.</p>
    `,
    excerpt: 'Cách các mô hình học máy tự động dự báo tải trọng và cân bằng hiệu suất truy vấn trong cụm cơ sở dữ liệu lớn.',
    category: 'Tech Insights',
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&auto=format&fit=crop&q=80',
    author: 'iGen Admin',
    createdAt: '2026-06-07T04:00:00.000Z',
    publishedAt: '2026-06-07T04:00:00.000Z',
  },
  {
    title: 'Case Study: Chiến dịch Marketing Campaign Alpha',
    slug: 'case-study-marketing-campaign-alpha',
    content: `
      <h2>1. Thử thách ban đầu</h2>
      <p>Doanh nghiệp Alpha muốn tiếp cận nhóm đối tượng Gen Z cho dòng sản phẩm thời trang mới nhưng gặp khó khăn về ngân sách thiết kế sáng tạo nội dung đa dạng.</p>
      
      <h2>2. Giải pháp ứng dụng AI Pillars</h2>
      <p>Tích hợp hệ sinh thái iGen Studio AI và chatbot tự động. Sản xuất hàng ngàn banner, video ngắn với mẫu ảo 3D và tự động hóa chuỗi phản hồi CSKH trực tiếp qua Messenger.</p>
      
      <h2>3. Kết quả vượt mong đợi</h2>
      <p>Chiến dịch đạt hiệu suất CTR tăng 180%, tiết kiệm 70% chi phí sản xuất hình ảnh truyền thống.</p>
    `,
    excerpt: 'Chi tiết bài học thực tiễn ứng dụng trợ lý AI tạo video và chatbot tự động giúp tăng 150% chuyển đổi.',
    category: 'Case Study',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    author: 'iGen Admin',
    createdAt: '2026-06-06T04:00:00.000Z',
    publishedAt: '2026-06-06T04:00:00.000Z',
  },
];

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/articles/${slug}`);
        if (response.data?.success) {
          setArticle(response.data.data);
        }
      } catch {
        console.warn('API Offline - Using mock detail fallback');
        const found = MOCK_ARTICLES.find((a) => a.slug === slug);
        setArticle(found || null);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  useEffect(() => {
    if (article) {
      // Title reveal animation
      gsap.fromTo(
        '.article-title',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
    }
  }, [article]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-32 text-center">
        <span className="material-symbols-outlined text-7xl text-gray-600 mb-6">warning</span>
        <h2 className="text-2xl font-bold text-white mb-4">Bài viết không tồn tại</h2>
        <Link to="/news" className="text-primary hover:underline font-medium">
          Quay lại trang tin tức
        </Link>
      </div>
    );
  }

  return (
    <main className="flex flex-col w-full relative z-10 pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-primary transition-colors">
            Trang chủ
          </Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <Link to="/news" className="hover:text-primary transition-colors">
            Tin tức
          </Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-white truncate max-w-[200px] sm:max-w-none">{article.title}</span>
        </div>

        {/* Thumbnail banner */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden glass-premium mb-12 shadow-card">
          {article.thumbnail ? (
            <img src={article.thumbnail} alt={article.title} className="object-cover w-full h-full" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-primary/30">
              <span className="material-symbols-outlined text-9xl">article</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <span className="absolute bottom-6 left-6 bg-primary text-white text-xs uppercase font-bold tracking-widest px-4 py-1.5 rounded-full shadow-glow">
            {article.category}
          </span>
        </div>

        {/* Article header */}
        <div className="mb-10">
          <h1 className="article-title text-3xl sm:text-5xl font-display font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 border-b border-white/10 pb-6">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-primary">person</span>
              <span>{article.author}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-primary">calendar_month</span>
              <span>
                {article.publishedAt
                  ? new Date(article.publishedAt).toLocaleDateString('vi-VN')
                  : new Date(article.createdAt).toLocaleDateString('vi-VN')}
              </span>
            </div>
          </div>
        </div>

        {/* Article content */}
        <article
          className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6 text-base"
          style={{
            contentVisibility: 'auto',
          }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Back Link */}
        <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
          <Link
            to="/news"
            className="text-primary hover:text-white transition-colors font-bold text-sm inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span> Quay lại danh sách
          </Link>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-gray-400 hover:text-white transition-colors text-sm font-semibold inline-flex items-center gap-1.5"
          >
            Lên đầu trang <span className="material-symbols-outlined text-sm">expand_less</span>
          </button>
        </div>

      </div>
    </main>
  );
};
