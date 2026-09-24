import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SilkBackground } from '../components/SilkBackground';
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
    headline: 'ERP Quản Trị Doanh Nghiệp',
    tagline: 'Giải pháp quản trị toàn diện cho doanh nghiệp giáo dục, cung ứng lao động & đào tạo',
    description:
      'Hệ thống tập trung vận hành, nhân sự, giao việc, hợp đồng, bảng lương và học viên trên một nền tảng thống nhất, loại bỏ phân mảnh dữ liệu và tối đa hóa năng suất vận hành.',
    image: erpImg,
    accent: {
      text: 'text-[#0088cc]',
      bg: 'bg-[#0088cc]/10',
      border: 'border-[#0088cc]/30',
      gradient: 'from-[#0088cc] to-[#005580]',
      glow: 'shadow-[0_12px_36px_rgba(0,136,204,0.28)]',
    },
    features: [
      { icon: 'group', title: 'Quản lý Nhân sự & Bảng lương', desc: 'Theo dõi hồ sơ nhân sự, tính công, tính lương và hợp đồng tự động.' },
      { icon: 'task_alt', title: 'Giao việc & Lịch làm việc', desc: 'Phân bổ công việc trực quan, theo dõi tiến độ KPI và lịch công tác.' },
      { icon: 'school', title: 'Quản lý Học viên & Đào tạo', desc: 'Theo dõi lộ trình đào tạo, điểm danh và kết quả học tập thông suốt.' },
      { icon: 'account_tree', title: 'Quy trình & Tuyển dụng', desc: 'Số hóa quy trình phê duyệt nội bộ và phễu tuyển dụng ứng viên.' },
    ],
    stats: [
      { value: '70%', label: 'Giảm thời gian xử lý thủ tục' },
      { value: '100%', label: 'Dữ liệu vận hành tập trung' },
      { value: '24/7', label: 'Truy cập đa nền tảng linh hoạt' },
    ],
    targetAudience: 'Doanh nghiệp Giáo dục, Trung tâm Đào tạo, Cung ứng Lao động & Xuất khẩu Lao động',
  },
  {
    id: 'luxcare-erp',
    name: 'LuxCare ERP',
    category: 'Hệ Thống Y Tế & Thẩm Mỹ',
    headline: 'Nền Tảng Quản Lý Y Tế Toàn Diện',
    tagline: 'Kết nối con người – Tối ưu vận hành – Nâng cao chất lượng chăm sóc',
    description:
      'LuxCare ERP mang đến chuẩn mực quản trị hiện đại cho bệnh viện, phòng khám và thẩm mỹ viện. Tự động hóa từ khâu tiếp đón, đặt lịch khám, hồ sơ bệnh án điện tử đến kho dược phẩm và viện phí.',
    image: luxcareImg,
    accent: {
      text: 'text-[#10b981]',
      bg: 'bg-[#10b981]/10',
      border: 'border-[#10b981]/30',
      gradient: 'from-[#10b981] to-[#059669]',
      glow: 'shadow-[0_12px_36px_rgba(16,185,129,0.28)]',
    },
    features: [
      { icon: 'calendar_month', title: 'Đặt lịch khám thông minh', desc: 'Phân luồng bệnh nhân, nhắc hẹn tự động qua Zalo/SMS giúp giảm thời gian chờ.' },
      { icon: 'clinical_notes', title: 'Hồ sơ bệnh án điện tử', desc: 'Lưu trữ lịch sử khám, đơn thuốc và kết quả xét nghiệm bảo mật cao.' },
      { icon: 'medication', title: 'Dược phẩm & Vật tư tiêu hao', desc: 'Quản lý xuất nhập tồn kho thuốc, cảnh báo hạn dùng và dự trù tự động.' },
      { icon: 'payments', title: 'Thanh toán & Báo cáo viện phí', desc: 'Tích hợp cổng thanh toán đa kênh, minh bạch tài chính và xuất hóa đơn điện tử.' },
    ],
    stats: [
      { value: '95%', label: 'Hài lòng từ khách hàng khám bệnh' },
      { value: '60%', label: 'Rút ngắn quy trình tiếp đón' },
      { value: '0%', label: 'Thất thoát dược phẩm & vật tư' },
    ],
    targetAudience: 'Phòng khám Đa khoa, Chuyên khoa, Bệnh viện tư nhân, Thẩm mỹ viện & Nha khoa',
  },
  {
    id: 'ai-marketing',
    name: 'iGen Marketing',
    category: 'Workspace & Tự Động Hóa',
    headline: 'AI Marketing & Sales Workspace',
    tagline: 'Trợ thủ AI chốt đơn 24/24 – Tối ưu hóa doanh số đa kênh Facebook',
    description:
      'Bộ công cụ tiếp thị và bán hàng tự động ứng dụng Trí tuệ Nhân tạo thế hệ mới. Quản lý đồng bộ đa Fanpage, tự động phản hồi bình luận, gom tin nhắn tập trung và nuôi dưỡng khách hàng tiềm năng liên tục 24/7.',
    image: marketingImg,
    accent: {
      text: 'text-[#0284c7]',
      bg: 'bg-[#0284c7]/10',
      border: 'border-[#0284c7]/30',
      gradient: 'from-[#0284c7] to-[#0369a1]',
      glow: 'shadow-[0_12px_36px_rgba(2,132,199,0.28)]',
    },
    features: [
      { icon: 'dynamic_feed', title: 'Quản lý Fanpage tập trung', desc: 'Kết nối không giới hạn Fanpage, quản lý nội dung và lịch đăng bài một điểm.' },
      { icon: 'chat', title: 'Hộp thư đa kênh thông minh', desc: 'Gom toàn bộ tin nhắn, bình luận về một giao diện duy nhất để phân loại xử lý.' },
      { icon: 'smart_toy', title: 'AI Phản hồi & Chốt đơn 24/7', desc: 'Chatbot AI hiểu ngữ cảnh tiếng Việt, tư vấn sản phẩm và gửi báo giá tự động.' },
      { icon: 'leaderboard', title: 'Facebook Leads & Đo lường', desc: 'Thu thập thông tin khách hàng, đánh giá hiệu quả quảng cáo và tỷ lệ chuyển đổi.' },
    ],
    stats: [
      { value: '24/7', label: 'Phản hồi khách hàng tức thì' },
      { value: '3×', label: 'Tăng tốc độ chốt đơn thành công' },
      { value: '80%', label: 'Tiết kiệm chi phí trực Fanpage' },
    ],
    targetAudience: 'Doanh nghiệp Bán lẻ, Thương mại Điện tử, Dịch vụ & Đội ngũ Telesale / Online Sales',
  },
  {
    id: 'igen-ban-hang',
    name: 'iGen Bán Hàng',
    category: 'Phần Mềm Bán Hàng & POS',
    headline: 'Phần Mềm Bán Hàng Thông Minh',
    tagline: 'Quản lý bán hàng – Tồn kho – Khách hàng trên một nền tảng duy nhất',
    description:
      'Giải pháp giúp doanh nghiệp theo dõi doanh thu trực quan, quản lý đơn hàng, kho sản phẩm, khách hàng, bảo hành linh hoạt và vận hành bán lẻ hiệu quả hơn.',
    image: banHangImg,
    accent: {
      text: 'text-[#2563eb]',
      bg: 'bg-[#2563eb]/10',
      border: 'border-[#2563eb]/30',
      gradient: 'from-[#2563eb] to-[#1d4ed8]',
      glow: 'shadow-[0_12px_36px_rgba(37,99,235,0.28)]',
    },
    features: [
      { icon: 'point_of_sale', title: 'Bán hàng tại quầy & POS', desc: 'Giao diện tính tiền siêu tốc, hỗ trợ quét mã vạch và thanh toán đa phương thức.' },
      { icon: 'inventory_2', title: 'Quản lý kho & Tồn kho', desc: 'Kiểm soát số lượng tồn kho theo thời gian thực, cảnh báo tự động khi sắp hết hàng.' },
      { icon: 'receipt_long', title: 'Hóa đơn & Quản lý đơn hàng', desc: 'Theo dõi chi tiết trạng thái đơn hàng, đối soát công nợ và xuất hóa đơn.' },
      { icon: 'handyman', title: 'Bảo hành & Marketing tự động', desc: 'Quản lý quy trình sửa chữa bảo hành, chăm sóc khách hàng và marketing tích hợp.' },
    ],
    stats: [
      { value: '3s', label: 'Tốc độ tạo hóa đơn tại quầy' },
      { value: '100%', label: 'Chính xác số liệu tồn kho' },
      { value: '0 Đổi', label: 'Không lo thất thoát doanh thu' },
    ],
    targetAudience: 'Cửa hàng Bán lẻ, Siêu thị mini, Chuỗi Điện máy, Thời trang, Phụ kiện & Dịch vụ',
  },
  {
    id: 'igen-pt',
    name: 'iGen PT Fitness',
    category: 'Quản Lý Huấn Luyện Viên',
    headline: 'Giải Pháp Quản Lý PT & Học Viên',
    tagline: 'Quản lý học viên dễ dàng hơn với Trợ lý AI Chuyên gia – Tối ưu hóa giáo án & dinh dưỡng',
    description:
      'Nền tảng chuyên biệt dành cho huấn luyện viên cá nhân (Personal Trainer), phòng gym và studio fitness. Đồng bộ theo dõi chỉ số InBody, lập giáo án tập luyện, thực đơn dinh dưỡng và trợ lý AI đồng hành 24/7.',
    image: ptImg,
    accent: {
      text: 'text-[#06b6d4]',
      bg: 'bg-[#06b6d4]/10',
      border: 'border-[#06b6d4]/30',
      gradient: 'from-[#06b6d4] to-[#0891b2]',
      glow: 'shadow-[0_12px_36px_rgba(6,182,212,0.28)]',
    },
    features: [
      { icon: 'fitness_center', title: 'Chỉ số InBody & Thể chất', desc: 'Theo dõi tiến độ cân nặng, cơ, mỡ trực quan qua biểu đồ sinh động.' },
      { icon: 'menu_book', title: 'Lập giáo án & Lịch tập', desc: 'Thiết kế bài tập cá nhân hóa, nhắc lịch hẹn tập luyện tự động qua App.' },
      { icon: 'restaurant', title: 'Dinh dưỡng cá nhân hóa', desc: 'Gợi ý chế độ ăn uống chuẩn khoa học phù hợp với từng mục tiêu học viên.' },
      { icon: 'smart_toy', title: 'Trợ lý AI Đồng hành', desc: 'AI phân tích tiến độ, gợi ý bài tập nâng cao và hỗ trợ tư vấn 24/7.' },
    ],
    stats: [
      { value: '71%+', label: 'Học viên đạt tiến độ tốt' },
      { value: '5×', label: 'Tối ưu thời gian quản lý lớp' },
      { value: 'Web & App', label: 'Linh hoạt mọi thiết bị' },
    ],
    targetAudience: 'Huấn luyện viên cá nhân (PT), Phòng Gym, Yoga, Pilates & Fitness Studio',
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
      {/* Hero Header */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden border-b border-line bg-surface-alt">
        <SilkBackground />
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 flex flex-col items-center">
          <span className="hero-reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            iGen Technology Ecosystem
          </span>

          <h1 className="hero-reveal text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-ink leading-[1.15] mb-6">
            Hệ sinh thái <span className="text-primary">Sản phẩm Công nghệ</span>
          </h1>

          <p className="hero-reveal text-base sm:text-lg md:text-xl text-body max-w-3xl leading-relaxed">
            Khám phá các nền tảng và phần mềm đột phá được phát triển chuyên biệt bởi <strong className="text-ink font-semibold">iGen Technology</strong> nhằm số hóa toàn diện quy trình vận hành, nâng cao hiệu suất y tế và tự động hóa marketing bán hàng.
          </p>

          {/* Quick jump tabs */}
          <div className="hero-reveal mt-8 flex flex-wrap items-center justify-center gap-3">
            {PRODUCTS.map((prod, idx) => {
              const active = idx === currentIndex;
              return (
                <button
                  key={prod.id}
                  onClick={() => goToSlide(idx)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2.5 ${
                    active
                      ? 'bg-ink text-white shadow-lg scale-105 border border-ink'
                      : 'bg-white text-body hover:text-ink hover:bg-surface-alt border border-line shadow-sm'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full transition-colors ${active ? 'bg-primary' : 'bg-line'}`} />
                  {prod.name}
                  <span className="text-xs opacity-70 font-normal">({prod.category})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Interactive Slideshow with Embossed Typography */}
      <section className="section py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-white via-surface-alt/60 to-white">
        <div className="container-page">

          {/* Slideshow Showcase Container */}
          <div
            className="relative rounded-3xl border border-line/80 bg-white shadow-[0_25px_60px_-15px_rgba(10,37,64,0.12)] overflow-hidden transition-all duration-500"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Top Bar with Status & Autoplay Progress */}
            <div className="px-6 py-4 border-b border-line/80 flex flex-wrap items-center justify-between gap-4 bg-white/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${currentProduct.accent.bg} ${currentProduct.accent.text} border ${currentProduct.accent.border}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                  {currentProduct.category}
                </span>
                <span className="text-sm font-semibold text-ink hidden sm:inline-block">
                  {currentProduct.name}
                </span>
              </div>

              {/* Autoplay Controls & Progress Bar */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-muted font-medium">
                  <span>0{currentIndex + 1}</span>
                  <div className="w-24 sm:w-36 h-1.5 bg-line rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-100 ease-linear rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span>0{PRODUCTS.length}</span>
                </div>

                {/* Pause/Play indicator */}
                <button
                  type="button"
                  onClick={() => setIsPaused((prev) => !prev)}
                  className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-surface-alt transition-colors text-xs flex items-center gap-1"
                  title={isPaused ? 'Tiếp tục tự động chuyển' : 'Tạm dừng tự động chuyển'}
                >
                  <span className="material-symbols-outlined text-base">
                    {isPaused ? 'play_arrow' : 'pause'}
                  </span>
                  <span className="hidden md:inline text-[11px]">
                    {isPaused ? 'Đang dừng' : 'Tự chuyển'}
                  </span>
                </button>

                {/* Navigation Arrows */}
                <div className="flex items-center gap-1 border-l border-line pl-3">
                  <button
                    onClick={goToPrev}
                    aria-label="Slide trước"
                    className="w-8 h-8 rounded-full border border-line bg-white hover:bg-surface-alt text-ink flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-lg">chevron_left</span>
                  </button>
                  <button
                    onClick={goToNext}
                    aria-label="Slide tiếp theo"
                    className="w-8 h-8 rounded-full border border-line bg-white hover:bg-surface-alt text-ink flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Stage: Image and Embossed Float Card */}
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-slate-900 overflow-hidden group cursor-pointer"
                 onClick={() => setModalImage(currentProduct.image)}>
              {/* Product Full Banner Image */}
              <img
                key={currentProduct.image}
                src={currentProduct.image}
                alt={`${currentProduct.name} - ${currentProduct.headline}`}
                className="w-full h-full object-cover sm:object-contain md:object-cover transition-all duration-700 ease-out transform group-hover:scale-[1.015]"
              />

              {/* Ambient gradient overlay for subtle contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Magnifier badge indicator */}
              <div className="absolute top-5 right-5 z-20 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-xs font-medium border border-white/20 shadow-lg">
                  <span className="material-symbols-outlined text-sm">zoom_in</span>
                  Xem ảnh gốc HD
                </span>
              </div>

              {/* EMBOSSED 3D FLOATING HEADLINE OVERLAY */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 z-20 pointer-events-none">
                <div className="max-w-2xl bg-white/90 backdrop-blur-xl rounded-2xl p-5 sm:p-7 border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.25)] pointer-events-auto transform transition-all duration-500 hover:translate-y-[-2px]">
                  
                  {/* Embossed 3D Title */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${currentProduct.accent.bg} ${currentProduct.accent.text} border ${currentProduct.accent.border}`}>
                      {currentProduct.name}
                    </span>
                    <span className="text-xs text-muted font-medium">• {currentProduct.category}</span>
                  </div>

                  {/* 3D Embossed Text styling: layered shadows creating physical depth */}
                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl font-black text-ink tracking-tight mb-2 leading-tight"
                    style={{
                      textShadow: '0 1px 0 rgba(255,255,255,1), 0 2px 3px rgba(10,37,64,0.18), 0 8px 18px rgba(10,37,64,0.12)',
                    }}
                  >
                    {currentProduct.headline}
                  </h2>

                  <p className="text-sm sm:text-base text-body leading-relaxed line-clamp-2 sm:line-clamp-3 mb-4">
                    {currentProduct.tagline}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      to="/contact"
                      className="btn-primary py-2 px-5 text-sm shadow-md"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Đăng ký tư vấn demo
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalImage(currentProduct.image);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-surface-alt border border-line text-xs font-semibold text-ink transition-colors shadow-sm"
                    >
                      <span className="material-symbols-outlined text-sm">fullscreen</span>
                      Phóng to infographic
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Feature Strip Below Current Slide */}
            <div className="p-6 md:p-10 bg-white border-t border-line">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Product Bio & Target Audience */}
                <div className="md:col-span-5 flex flex-col justify-center">
                  <span className="text-xs uppercase font-bold tracking-widest text-primary mb-2">
                    Đối tượng ứng dụng tối ưu
                  </span>
                  <p className="text-sm font-semibold text-ink mb-4 p-3 rounded-xl bg-primary-light/60 border border-primary/10">
                    🎯 {currentProduct.targetAudience}
                  </p>
                  <p className="text-body text-sm leading-relaxed mb-6">
                    {currentProduct.description}
                  </p>

                  {/* Highlights Stats */}
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-line">
                    {currentProduct.stats.map((s, si) => (
                      <div key={si} className="flex flex-col">
                        <span className="text-xl sm:text-2xl font-black text-ink">{s.value}</span>
                        <span className="text-[11px] text-muted leading-tight mt-0.5">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4 Key Modules / Features */}
                <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentProduct.features.map((feat, fi) => (
                    <div
                      key={fi}
                      className="p-4 rounded-2xl bg-surface-alt border border-line/70 hover:border-primary/30 transition-all duration-300 hover:shadow-sm flex flex-col group/f"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-line/80 flex items-center justify-center text-primary mb-3 shadow-xs group-hover/f:scale-105 group-hover/f:bg-primary group-hover/f:text-white transition-all">
                        <span className="material-symbols-outlined text-xl">{feat.icon}</span>
                      </div>
                      <h4 className="text-sm font-bold text-ink mb-1 group-hover/f:text-primary transition-colors">
                        {feat.title}
                      </h4>
                      <p className="text-xs text-muted leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Slider Thumbnail Selectors */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {PRODUCTS.map((prod, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <div
                  key={prod.id}
                  onClick={() => goToSlide(idx)}
                  className={`card p-4 cursor-pointer transition-all duration-300 flex items-center gap-4 ${
                    isSelected
                      ? 'border-primary ring-2 ring-primary/20 bg-primary-light/10 shadow-md translate-y-[-2px]'
                      : 'hover:border-line hover:bg-surface-alt opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-900 border border-line flex-shrink-0">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs text-primary font-bold">{prod.category}</span>
                    <span className="text-sm font-bold text-ink truncate">{prod.name}</span>
                    <span className="text-[11px] text-muted truncate">{prod.headline}</span>
                  </div>
                  <span className={`material-symbols-outlined ml-auto text-lg transition-transform ${isSelected ? 'text-primary translate-x-1' : 'text-muted'}`}>
                    arrow_forward
                  </span>
                </div>
              );
            })}
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
