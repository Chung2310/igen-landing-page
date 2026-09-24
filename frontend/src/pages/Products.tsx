import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useRevealAnimations } from '../hooks/useRevealAnimations';

import erpImg from '../assets/product/erp.png';
import luxcareImg from '../assets/product/luxcare.png';
import marketingImg from '../assets/product/marketing.png';
import banHangImg from '../assets/product/ban-hang.png';
import ptImg from '../assets/product/pt.png';

interface ProductItem {
  id: string;
  name: string;
  category: string;
  headline: string;
  tagline: string;
  description: string;
  image: string;
  accent: {
    text: string;
    bg: string;
    border: string;
    gradient: string;
    glow: string;
  };
  features: { icon: string; title: string; desc: string }[];
  stats: { value: string; label: string }[];
  targetAudience: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'igen-erp',
    name: 'iGen ERP',
    category: 'Enterprise Hub',
    headline: 'ERP Quản Trị Doanh Nghiệp Toàn Diện',
    tagline: 'Quản trị tập trung vận hành, nhân sự, quy trình & học viên trên một nền tảng',
    description:
      'Hệ thống quản trị hợp nhất loại bỏ phân mảnh dữ liệu, tối ưu chi phí và tăng tốc hiệu suất vận hành cho doanh nghiệp giáo dục & cung ứng nhân lực.',
    image: erpImg,
    accent: {
      text: 'text-[#0088cc]',
      bg: 'bg-[#0088cc]/10',
      border: 'border-[#0088cc]/30',
      gradient: 'from-[#0088cc] to-[#005580]',
      glow: 'shadow-[0_12px_36px_rgba(0,136,204,0.28)]',
    },
    features: [
      { icon: 'group', title: 'Nhân sự & Bảng lương', desc: 'Tự động tính công, tính lương và quản lý hồ sơ hợp đồng.' },
      { icon: 'task_alt', title: 'Giao việc & Tiến độ KPI', desc: 'Phân bổ công việc trực quan, theo dõi tiến độ và lịch công tác.' },
      { icon: 'school', title: 'Học viên & Đào tạo', desc: 'Quản lý điểm danh, lộ trình đào tạo và kết quả học tập.' },
      { icon: 'account_tree', title: 'Quy trình & Phê duyệt', desc: 'Số hóa quy trình ký duyệt nội bộ và phễu tuyển dụng ứng viên.' },
    ],
    stats: [
      { value: '70%', label: 'Giảm thời gian thủ tục' },
      { value: '100%', label: 'Dữ liệu tập trung' },
      { value: '24/7', label: 'Truy cập đa nền tảng' },
    ],
    targetAudience: 'Giáo dục, Đào tạo & Cung ứng nhân lực',
  },
  {
    id: 'luxcare-erp',
    name: 'LuxCare ERP',
    category: 'Hệ Thống Y Tế & Thẩm Mỹ',
    headline: 'Nền Tảng Quản Lý Y Tế Toàn Diện',
    tagline: 'Kết nối con người – Tối ưu vận hành – Nâng cao chất lượng chăm sóc',
    description:
      'Tự động hóa toàn diện từ tiếp đón, đặt lịch, hồ sơ bệnh án điện tử đến kho dược phẩm và viện phí cho bệnh viện, phòng khám & thẩm mỹ viện.',
    image: luxcareImg,
    accent: {
      text: 'text-[#10b981]',
      bg: 'bg-[#10b981]/10',
      border: 'border-[#10b981]/30',
      gradient: 'from-[#10b981] to-[#059669]',
      glow: 'shadow-[0_12px_36px_rgba(16,185,129,0.28)]',
    },
    features: [
      { icon: 'calendar_month', title: 'Đặt lịch khám thông minh', desc: 'Nhắc hẹn tự động qua Zalo/SMS, giảm thời gian chờ đợi.' },
      { icon: 'clinical_notes', title: 'Hồ sơ bệnh án điện tử', desc: 'Lưu trữ lịch sử khám, đơn thuốc và cận lâm sàng bảo mật cao.' },
      { icon: 'medication', title: 'Kho Dược & Vật tư', desc: 'Kiểm soát xuất nhập tồn kho thuốc, cảnh báo hạn dùng tự động.' },
      { icon: 'payments', title: 'Thanh toán & Viện phí', desc: 'Tích hợp xuất hóa đơn điện tử, đối soát tài chính minh bạch.' },
    ],
    stats: [
      { value: '95%', label: 'Hài lòng từ khách hàng' },
      { value: '60%', label: 'Rút ngắn quy trình tiếp đón' },
      { value: '0%', label: 'Thất thoát dược phẩm' },
    ],
    targetAudience: 'Phòng khám, Bệnh viện, Thẩm mỹ & Nha khoa',
  },
  {
    id: 'ai-marketing',
    name: 'iGen Marketing',
    category: 'Workspace & Tự Động Hóa',
    headline: 'AI Marketing & Sales Workspace',
    tagline: 'Trợ thủ AI chốt đơn 24/7 – Tối ưu hóa doanh số bán hàng đa kênh',
    description:
      'Đồng bộ quản lý đa Fanpage, tự động phản hồi bình luận, gom tin nhắn tập trung và nuôi dưỡng khách hàng tiềm năng bằng AI tiếng Việt.',
    image: marketingImg,
    accent: {
      text: 'text-[#0284c7]',
      bg: 'bg-[#0284c7]/10',
      border: 'border-[#0284c7]/30',
      gradient: 'from-[#0284c7] to-[#0369a1]',
      glow: 'shadow-[0_12px_36px_rgba(2,132,199,0.28)]',
    },
    features: [
      { icon: 'dynamic_feed', title: 'Quản lý đa Fanpage', desc: 'Kết nối không giới hạn fanpage, quản lý nội dung một điểm.' },
      { icon: 'smart_toy', title: 'AI Chốt đơn 24/7', desc: 'Tự động phản hồi bình luận, tư vấn và gửi báo giá tức thì.' },
      { icon: 'chat', title: 'Hộp thư gom tập trung', desc: 'Hợp nhất toàn bộ tin nhắn đa kênh về một giao diện xử lý.' },
      { icon: 'leaderboard', title: 'Thu thập & Đo lường Leads', desc: 'Theo dõi tỷ lệ chuyển đổi và tự động lưu data khách hàng.' },
    ],
    stats: [
      { value: '24/7', label: 'Phản hồi tức thì' },
      { value: '3×', label: 'Tốc độ chốt đơn' },
      { value: '80%', label: 'Tiết kiệm chi phí trực page' },
    ],
    targetAudience: 'Bán lẻ, Thương mại điện tử & Đội ngũ Sales Online',
  },
  {
    id: 'igen-ban-hang',
    name: 'iGen Bán Hàng',
    category: 'Phần Mềm Bán Hàng & POS',
    headline: 'Phần Mềm Bán Hàng Thông Minh',
    tagline: 'Quản lý bán hàng, tồn kho & khách hàng trên một nền tảng duy nhất',
    description:
      'Giao diện bán hàng POS mượt mà, kiểm soát tồn kho thời gian thực, quản lý bảo hành và báo cáo doanh thu chính xác không lo thất thoát.',
    image: banHangImg,
    accent: {
      text: 'text-[#2563eb]',
      bg: 'bg-[#2563eb]/10',
      border: 'border-[#2563eb]/30',
      gradient: 'from-[#2563eb] to-[#1d4ed8]',
      glow: 'shadow-[0_12px_36px_rgba(37,99,235,0.28)]',
    },
    features: [
      { icon: 'point_of_sale', title: 'POS Bán hàng siêu tốc', desc: 'Quét mã vạch, in bill và thanh toán đa phương thức chỉ 3 giây.' },
      { icon: 'inventory_2', title: 'Quản lý tồn kho Real-time', desc: 'Kiểm soát số lượng tồn tức thì, cảnh báo tự động khi sắp hết hàng.' },
      { icon: 'receipt_long', title: 'Báo cáo doanh thu & Lãi lỗ', desc: 'Thống kê doanh thu, đơn hàng, công nợ rõ ràng theo ngày/tháng.' },
      { icon: 'handyman', title: 'Bảo hành & Chăm sóc khách', desc: 'Lưu lịch sử mua sắm, quản lý quy trình sửa chữa bảo hành chu đáo.' },
    ],
    stats: [
      { value: '3s', label: 'Tốc độ tạo hóa đơn' },
      { value: '100%', label: 'Chính xác số liệu kho' },
      { value: '0 Đổi', label: 'Không lo thất thoát' },
    ],
    targetAudience: 'Cửa hàng Bán lẻ, Siêu thị mini, Chuỗi Bán buôn',
  },
  {
    id: 'igen-pt',
    name: 'iGen PT Fitness',
    category: 'Quản Lý Huấn Luyện Viên',
    headline: 'Giải Pháp Quản Lý PT & Học Viên',
    tagline: 'Quản lý học viên & giáo án tập luyện chuyên nghiệp với Trợ lý AI',
    description:
      'Đồng bộ theo dõi chỉ số InBody, thiết kế giáo án tập luyện, gợi ý thực đơn dinh dưỡng khoa học và AI trợ lý đồng hành cùng hội viên 24/7.',
    image: ptImg,
    accent: {
      text: 'text-[#06b6d4]',
      bg: 'bg-[#06b6d4]/10',
      border: 'border-[#06b6d4]/30',
      gradient: 'from-[#06b6d4] to-[#0891b2]',
      glow: 'shadow-[0_12px_36px_rgba(6,182,212,0.28)]',
    },
    features: [
      { icon: 'fitness_center', title: 'Theo dõi chỉ số InBody', desc: 'Biểu đồ trực quan tiến độ cơ, mỡ, cân nặng của từng học viên.' },
      { icon: 'menu_book', title: 'Lập giáo án & Lịch tập', desc: 'Cá nhân hóa bài tập, tự động gửi lịch và nhắc hẹn qua app.' },
      { icon: 'restaurant', title: 'Thực đơn dinh dưỡng chuẩn', desc: 'Gợi ý chế độ ăn uống khoa học theo thể trạng và mục tiêu.' },
      { icon: 'smart_toy', title: 'AI Chuyên gia đồng hành', desc: 'Phân tích tiến độ và hỗ trợ giải đáp thắc mắc học viên 24/7.' },
    ],
    stats: [
      { value: '70%+', label: 'Học viên đạt mục tiêu' },
      { value: '5×', label: 'Tiết kiệm thời gian quản lý' },
      { value: 'App/Web', label: 'Linh hoạt mọi thiết bị' },
    ],
    targetAudience: 'PT cá nhân, Phòng Gym, Studio Yoga & Fitness',
  },
];

const AUTOPLAY_INTERVAL = 6000; // 6 seconds per slide

export const Products: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useRevealAnimations(PRODUCTS.length);

  // Set document title
  useEffect(() => {
    document.title = 'Sản phẩm | iGen Technology - Hệ sinh thái phần mềm & giải pháp AI';
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  // Autoplay loop with smooth progress bar
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
      return;
    }

    startTimeRef.current = Date.now() - (progress / 100) * AUTOPLAY_INTERVAL;

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentProgress = Math.min((elapsed / AUTOPLAY_INTERVAL) * 100, 100);
      setProgress(currentProgress);

      if (elapsed >= AUTOPLAY_INTERVAL) {
        goToNext();
      } else {
        timerRef.current = requestAnimationFrame(tick);
      }
    };

    timerRef.current = requestAnimationFrame(tick);

    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
    };
  }, [currentIndex, isPaused, goToNext, progress]);

  const currentProduct = PRODUCTS[currentIndex];

  return (
    <main className="flex flex-col w-full relative bg-white">
      {/* Featured Interactive Slideshow - Compact sizing to fit screen viewport */}
      <section className="pt-20 pb-8 sm:pt-22 md:pb-12 relative overflow-hidden bg-gradient-to-b from-surface-alt/60 via-white to-surface-alt/30">
        <div className="container-page">
          
          <div className="max-w-4xl lg:max-w-[920px] mx-auto">
            {/* Top Control Bar: Category, Name & Controls */}
            <div className="mb-3 flex items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${currentProduct.accent.bg} ${currentProduct.accent.text} border ${currentProduct.accent.border}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                  {currentProduct.category}
                </span>
                <h1 className="text-sm sm:text-base font-bold text-ink tracking-tight">
                  {currentProduct.name}
                </h1>
              </div>

              {/* Slider Navigation & Counter Controls */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1 text-xs text-muted font-semibold">
                  <span className="text-ink font-bold">0{currentIndex + 1}</span>
                  <div className="w-14 sm:w-20 h-1 bg-line rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-100 ease-linear rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span>0{PRODUCTS.length}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPaused((prev) => !prev)}
                  className="p-1 rounded-lg text-muted hover:text-ink hover:bg-white border border-line transition-colors text-xs flex items-center gap-1 shadow-xs"
                  title={isPaused ? 'Tiếp tục tự động chuyển' : 'Tạm dừng tự động chuyển'}
                >
                  <span className="material-symbols-outlined text-sm">
                    {isPaused ? 'play_arrow' : 'pause'}
                  </span>
                  <span className="hidden sm:inline text-[11px] pr-1">
                    {isPaused ? 'Tạm dừng' : 'Tự chuyển'}
                  </span>
                </button>

                <div className="flex items-center gap-1 border-l border-line pl-1.5">
                  <button
                    onClick={goToPrev}
                    aria-label="Slide trước"
                    className="w-7 h-7 rounded-full border border-line bg-white hover:bg-surface-alt text-ink flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-base">chevron_left</span>
                  </button>
                  <button
                    onClick={goToNext}
                    aria-label="Slide tiếp theo"
                    className="w-7 h-7 rounded-full border border-line bg-white hover:bg-surface-alt text-ink flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-base">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* MAIN SLIDE: Full clean banner, rounded corners, fits viewport cleanly */}
            <div
              className="relative rounded-2xl md:rounded-3xl border border-line/80 bg-slate-950 shadow-[0_16px_40px_-10px_rgba(10,37,64,0.14)] overflow-hidden transition-all duration-500 cursor-pointer group"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onClick={() => setModalImage(currentProduct.image)}
            >
              {/* Image container: Constrained height to fit viewport cleanly without scrolling */}
              <div className="relative aspect-[16/9] max-h-[50vh] sm:max-h-[54vh] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                <img
                  key={currentProduct.image}
                  src={currentProduct.image}
                  alt={`${currentProduct.name} - ${currentProduct.headline}`}
                  className="w-full h-full object-cover transition-all duration-700 ease-out transform group-hover:scale-[1.01]"
                />

                {/* Prev / Next buttons on hover */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrev();
                  }}
                  aria-label="Slide trước"
                  className="absolute left-2.5 sm:left-3.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110 active:scale-95"
                >
                  <span className="material-symbols-outlined text-xl">chevron_left</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  aria-label="Slide tiếp theo"
                  className="absolute right-2.5 sm:right-3.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110 active:scale-95"
                >
                  <span className="material-symbols-outlined text-xl">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Quick Switch Pills - 5 products directly under slide */}
            <div className="mt-3.5 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
              {PRODUCTS.map((prod, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-ink text-white shadow-sm ring-2 ring-primary/30 scale-102'
                        : 'bg-white hover:bg-surface-alt text-muted hover:text-ink border border-line shadow-xs'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? 'bg-primary' : 'bg-slate-300'
                      }`}
                    />
                    <span>{prod.name}</span>
                  </button>
                );
              })}
            </div>

            {/* PRODUCT DESCRIPTION - Concise, focused on key business needs */}
            <div className="mt-6 rounded-2xl md:rounded-3xl border border-line bg-white p-5 sm:p-7 shadow-xs">
              {/* Header row: Product Title, Tagline & Target Audience */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-line">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${currentProduct.accent.bg} ${currentProduct.accent.text} border ${currentProduct.accent.border}`}>
                      {currentProduct.category}
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-ink">
                      {currentProduct.name}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-body font-medium">
                    {currentProduct.tagline}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-light/60 text-primary text-xs font-semibold border border-primary/20">
                    <span className="material-symbols-outlined text-sm">target</span>
                    {currentProduct.targetAudience}
                  </span>
                </div>
              </div>

              {/* 4 Core Features: Direct, practical, concise */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 py-4">
                {currentProduct.features.map((feat, fi) => (
                  <div
                    key={fi}
                    className="p-3.5 rounded-xl bg-surface-alt/70 border border-line/70 hover:border-primary/30 transition-all flex flex-col"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-line flex items-center justify-center text-primary mb-2 shadow-xs">
                      <span className="material-symbols-outlined text-lg">{feat.icon}</span>
                    </div>
                    <h3 className="text-xs font-bold text-ink mb-1">
                      {feat.title}
                    </h3>
                    <p className="text-[11px] text-muted leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Actions Row */}
              <div className="pt-3.5 border-t border-line flex flex-wrap items-center justify-between gap-3">
                <div className="hidden sm:flex items-center gap-3 text-xs text-muted">
                  {currentProduct.stats.map((s, si) => (
                    <span key={si} className="inline-flex items-center gap-1">
                      <strong className="text-ink font-bold">{s.value}</strong>
                      <span className="text-[11px]">{s.label}</span>
                      {si < currentProduct.stats.length - 1 && <span className="text-line ml-2">|</span>}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2.5 ml-auto">
                  <button
                    type="button"
                    onClick={() => setModalImage(currentProduct.image)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-alt hover:bg-white border border-line text-xs font-semibold text-ink transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">fullscreen</span>
                    Phóng to
                  </button>

                  <Link
                    to="/contact"
                    className="btn-primary py-1.5 px-4 text-xs font-bold shadow-xs"
                  >
                    Đăng ký tư vấn demo
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Product Deep Dive Section (Cards for all 3 products) */}
      <section className="section section-alt border-t border-line">
        <div className="container-page">
          <div className="mb-14 text-center max-w-3xl mx-auto reveal-text">
            <span className="text-xs uppercase font-bold tracking-widest text-primary mb-2 block">
              Danh mục sản phẩm
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
              Toàn cảnh giải pháp phần mềm <span className="text-primary">iGen</span>
            </h2>
            <p className="text-body text-base md:text-lg">
              Mỗi sản phẩm đều được nghiên cứu kỹ lưỡng từ bài toán thực tế của doanh nghiệp Việt, đảm bảo giao diện thân thiện, bảo mật cao và dễ dàng mở rộng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="card card-hover flex flex-col overflow-hidden bg-white border border-line transition-all duration-300 hover:shadow-xl"
              >
                {/* Product Header Graphic */}
                <div
                  className="aspect-[16/10] w-full bg-slate-900 relative overflow-hidden group cursor-pointer"
                  onClick={() => setModalImage(prod.image)}
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-ink text-xs font-bold shadow-sm">
                    {prod.category}
                  </span>

                  <span className="absolute bottom-4 left-4 right-4 text-white font-bold text-lg drop-shadow-md">
                    {prod.name}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-ink mb-2">
                    {prod.headline}
                  </h3>
                  <p className="text-sm text-body leading-relaxed mb-6 flex-1">
                    {prod.tagline}
                  </p>

                  {/* Bullet features */}
                  <div className="space-y-2.5 mb-8 pt-4 border-t border-line">
                    {prod.features.map((f, fi) => (
                      <div key={fi} className="flex items-start gap-2.5 text-xs text-body">
                        <span className="material-symbols-outlined text-primary text-base flex-shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span>
                          <strong className="text-ink font-semibold">{f.title}:</strong> {f.desc}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-4 border-t border-line flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setModalImage(prod.image)}
                      className="text-xs font-semibold text-muted hover:text-ink flex items-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">zoom_in</span>
                      Xem infographic
                    </button>

                    <Link
                      to="/contact"
                      className="btn-primary py-2 px-4 text-xs font-bold"
                    >
                      Tư vấn triển khai
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition / Why Choose Section */}
      <section className="section bg-white border-t border-line">
        <div className="container-page">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
              Tại sao chọn sản phẩm của <span className="text-primary">iGen Technology</span>?
            </h2>
            <p className="text-body text-base md:text-lg">
              Chúng tôi không chỉ bán phần mềm, chúng tôi mang tới giải pháp đồng hành bền vững cùng sự phát triển của doanh nghiệp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-surface-alt border border-line flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center text-primary mb-5 shadow-sm">
                <span className="material-symbols-outlined text-3xl">tune</span>
              </div>
              <h3 className="text-lg font-bold text-ink mb-2">Tùy biến linh hoạt</h3>
              <p className="text-sm text-body leading-relaxed">
                Được may đo trực tiếp theo bài toán thực tế và mô hình kinh doanh của từng doanh nghiệp, không gò bó rập khuôn.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-surface-alt border border-line flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center text-primary mb-5 shadow-sm">
                <span className="material-symbols-outlined text-3xl">psychology</span>
              </div>
              <h3 className="text-lg font-bold text-ink mb-2">Trí tuệ nhân tạo tích hợp</h3>
              <p className="text-sm text-body leading-relaxed">
                Tích hợp sâu các mô hình AI tiếng Việt giúp tự động hóa quy trình, xử lý dữ liệu và hỗ trợ ra quyết định thông minh.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-surface-alt border border-line flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center text-primary mb-5 shadow-sm">
                <span className="material-symbols-outlined text-3xl">support_agent</span>
              </div>
              <h3 className="text-lg font-bold text-ink mb-2">Đồng hành & Chuyển giao</h3>
              <p className="text-sm text-body leading-relaxed">
                Đội ngũ kỹ sư tận tâm hỗ trợ đào tạo SOP, chuyển giao công nghệ và hỗ trợ kỹ thuật liên tục trong suốt vòng đời sản phẩm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="section bg-gradient-hero text-white relative overflow-hidden">
        <div className="container-page relative z-10 text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-6">
            Bắt đầu chuyển đổi số ngay hôm nay
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Sẵn sàng nâng tầm vận hành doanh nghiệp cùng iGen?
          </h2>
          <p className="text-white/90 text-base sm:text-lg mb-8 leading-relaxed">
            Liên hệ ngay với đội ngũ chuyên gia của chúng tôi để được tư vấn lộ trình và trải nghiệm bản demo trực tiếp của các dòng sản phẩm.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="bg-white text-ink hover:bg-surface-alt font-bold px-8 py-3.5 rounded-full shadow-xl transition-all hover:scale-105"
            >
              Liên hệ nhận demo miễn phí
            </Link>
            <Link
              to="/solutions"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold px-8 py-3.5 rounded-full transition-all"
            >
              Xem hệ sinh thái giải pháp
            </Link>
          </div>
        </div>
      </section>

      {/* Fullscreen HD Image Lightbox Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-6xl w-full max-h-[92vh] flex flex-col items-center justify-center">
            {/* Close button */}
            <button
              onClick={() => setModalImage(null)}
              className="absolute -top-12 right-0 sm:right-2 text-white/80 hover:text-white flex items-center gap-1.5 text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-all"
            >
              <span className="material-symbols-outlined text-lg">close</span>
              Đóng (ESC)
            </button>

            <img
              src={modalImage}
              alt="iGen Product HD Showcase"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </main>
  );
};
