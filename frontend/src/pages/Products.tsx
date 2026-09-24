import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useRevealAnimations } from '../hooks/useRevealAnimations';

import erpImg from '../assets/product/erp.png';
import luxcareImg from '../assets/product/luxcare.png';
import marketingImg from '../assets/product/marketing.png';
import banHangImg from '../assets/product/ban-hang.png';
import ptImg from '../assets/product/pt.png';
import kienTrucSuImg from '../assets/product/kien-truc-su.png';

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
    tagline: 'Quản lý Fanpage • Chăm sóc khách hàng • AI Chốt đơn 24/24',
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
      { icon: 'dynamic_feed', title: 'Quản lý đa Fanpage', desc: 'Kết nối không giới hạn fanpage, quản lý nội dung và lịch đăng bài một điểm.' },
      { icon: 'leaderboard', title: 'Facebook Leads', desc: 'Thu thập, phân loại và tự động nuôi dưỡng tệp khách hàng tiềm năng.' },
      { icon: 'chat', title: 'Hộp thư đa kênh (Inbox)', desc: 'Hợp nhất toàn bộ tin nhắn Messenger, bình luận về một giao diện xử lý.' },
      { icon: 'smart_toy', title: 'AI Reply & Chốt đơn 24/24', desc: 'Trợ thủ AI hiểu ngữ cảnh tiếng Việt, tư vấn và gửi báo giá tự động.' },
    ],
    stats: [
      { value: '24/24', label: 'Phản hồi tức thì' },
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
  {
    id: 'igen-kien-truc-su',
    name: 'iGen Kiến trúc sư',
    category: 'AI Thiết Kế & 3D',
    headline: 'Render & Thiết Kế Thông Minh',
    tagline: 'Ngoại thất • Nội thất • Floorplan to 3D – Ý tưởng thành hiện thực',
    description:
      'Nền tảng AI chuyên biệt cho kiến trúc sư và thiết kế nội ngoại thất. Dựng phối cảnh 3D siêu tốc từ bản vẽ 2D, render không gian thực tế ảo VR 360 và quy hoạch masterplan trực quan.',
    image: kienTrucSuImg,
    accent: {
      text: 'text-[#0284c7]',
      bg: 'bg-[#0284c7]/10',
      border: 'border-[#0284c7]/30',
      gradient: 'from-[#0284c7] to-[#0369a1]',
      glow: 'shadow-[0_12px_36px_rgba(2,132,199,0.28)]',
    },
    features: [
      { icon: 'bolt', title: 'Render siêu tốc', desc: 'Tạo phối cảnh 3D ngoại thất và nội thất chân thực chỉ trong vài giây bằng AI.' },
      { icon: 'view_in_ar', title: 'Không gian VR 360', desc: 'Trải nghiệm không gian ảo sống động, giúp khách hàng hình dung trực quan.' },
      { icon: 'grid_view', title: 'Floorplan to 3D', desc: 'Chuyển đổi bản vẽ mặt bằng 2D thành mô hình kiến trúc 3D chuẩn xác.' },
      { icon: 'auto_awesome', title: 'AI Hỗ trợ & Masterplan', desc: 'Hỗ trợ quy hoạch phối cảnh tổng thể và tinh chỉnh ý tưởng thiết kế tức thì.' },
    ],
    stats: [
      { value: '10s', label: 'Tốc độ render phối cảnh' },
      { value: '3D & VR', label: 'Đa định dạng không gian' },
      { value: '85%', label: 'Tiết kiệm thời gian dựng hình' },
    ],
    targetAudience: 'Kiến trúc sư, Nhà thiết kế Nội thất, Công ty Xây dựng & Bất động sản',
  },
];

const AUTOPLAY_INTERVAL = 5000; // Default 5 seconds per slide for both main view and fullscreen

export const Products: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useRevealAnimations(PRODUCTS.length);

  // Set document title
  useEffect(() => {
    document.title = 'Sản phẩm | iGen Technology - Hệ sinh thái phần mềm & giải pháp AI';
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  }, []);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Autoplay loop every 5 seconds (active in both main view and fullscreen mode)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      goToNext();
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, goToNext]);

  // Keyboard navigation (ArrowLeft / ArrowRight / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  const currentProduct = PRODUCTS[currentIndex];
  const prevIndex = (currentIndex - 1 + PRODUCTS.length) % PRODUCTS.length;
  const nextIndex = (currentIndex + 1) % PRODUCTS.length;
  const prevProduct = PRODUCTS[prevIndex];
  const nextProduct = PRODUCTS[nextIndex];

  return (
    <main className="flex flex-col w-full relative bg-white">
      {/* Featured Interactive Slideshow - 3D Rotating Carousel */}
      <section className="pt-20 pb-8 sm:pt-22 md:pb-12 relative overflow-hidden bg-gradient-to-b from-surface-alt/60 via-white to-surface-alt/30">
        <div className="container-page">
          
          <div className="w-full max-w-6xl mx-auto">
            {/* Top Bar: Only Product Name in Brand Color (centered, clean, no clutter) */}
            <div className="mb-3 text-center">
              <h1 className={`text-2xl sm:text-3xl font-black tracking-tight transition-colors duration-300 ${currentProduct.accent.text}`}>
                {currentProduct.name}
              </h1>
            </div>

            {/* 3D Rotating Showcase Stage: Center bright & sharp, Left/Right dimmed & rotated */}
            <div className="relative w-full overflow-hidden py-2 sm:py-4 [perspective:1200px] select-none">
              <div className="relative w-full flex items-center justify-center min-h-[220px] sm:min-h-[360px] md:min-h-[440px] lg:min-h-[480px]">

                {/* Left Slide (Previous) - Dimmed, scaled down, rotated */}
                <div
                  onClick={goToPrev}
                  className="absolute left-0 sm:left-2 md:left-6 top-1/2 -translate-y-1/2 w-[62%] sm:w-[66%] md:w-[68%] aspect-[1672/941] -translate-x-[20%] sm:-translate-x-[15%] md:-translate-x-[12%] scale-[0.84] [transform:translateY(-50%)_rotateY(10deg)] opacity-35 hover:opacity-65 transition-all duration-500 ease-out z-10 cursor-pointer rounded-2xl md:rounded-3xl overflow-hidden border border-line/60 bg-white shadow-md group/prev"
                  title={`Xem ${prevProduct.name}`}
                >
                  <img
                    src={prevProduct.image}
                    alt={prevProduct.name}
                    className="w-full h-full object-contain block pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-slate-900/20 group-hover/prev:bg-transparent transition-colors" />
                </div>

                {/* Center Slide (Active) - 100% Bright, full scale, sharp & glowing */}
                <div
                  className="relative w-[78%] sm:w-[80%] md:w-[82%] aspect-[1672/941] z-20 cursor-pointer transition-all duration-500 ease-out rounded-2xl md:rounded-3xl overflow-hidden border border-line/90 bg-white shadow-[0_20px_50px_-10px_rgba(10,37,64,0.22)] group flex items-center justify-center"
                  onClick={() => setIsModalOpen(true)}
                >
                  {/* Left Arrow Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrev();
                    }}
                    aria-label="Slide trước"
                    className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-black/85 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-85 sm:opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 shadow-xl"
                  >
                    <span className="material-symbols-outlined text-xl sm:text-2xl">chevron_left</span>
                  </button>

                  {/* Active Slide Image */}
                  <img
                    key={currentProduct.image}
                    src={currentProduct.image}
                    alt={`${currentProduct.name} - ${currentProduct.headline}`}
                    className="w-full h-full object-contain block"
                  />

                  {/* Right Arrow Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNext();
                    }}
                    aria-label="Slide tiếp theo"
                    className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-black/85 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-85 sm:opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 shadow-xl"
                  >
                    <span className="material-symbols-outlined text-xl sm:text-2xl">chevron_right</span>
                  </button>
                </div>

                {/* Right Slide (Next) - Dimmed, scaled down, rotated */}
                <div
                  onClick={goToNext}
                  className="absolute right-0 sm:right-2 md:right-6 top-1/2 -translate-y-1/2 w-[62%] sm:w-[66%] md:w-[68%] aspect-[1672/941] translate-x-[20%] sm:translate-x-[15%] md:translate-x-[12%] scale-[0.84] [transform:translateY(-50%)_rotateY(-10deg)] opacity-35 hover:opacity-65 transition-all duration-500 ease-out z-10 cursor-pointer rounded-2xl md:rounded-3xl overflow-hidden border border-line/60 bg-white shadow-md group/next"
                  title={`Xem ${nextProduct.name}`}
                >
                  <img
                    src={nextProduct.image}
                    alt={nextProduct.name}
                    className="w-full h-full object-contain block pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-slate-900/20 group-hover/next:bg-transparent transition-colors" />
                </div>

              </div>
            </div>

            {/* Quick Switch Pills - 6 products directly under slide */}
            <div className="mt-4 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
              {PRODUCTS.map((prod, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
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
            <div className="max-w-4xl mx-auto mt-6 rounded-2xl md:rounded-3xl border border-line bg-white p-5 sm:p-7 shadow-xs">
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
                    onClick={() => setIsModalOpen(true)}
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

      {/* Fullscreen Interactive Showcase Lightbox Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 animate-fadeIn select-none"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Modal Header Bar */}
          <div
            className="w-full max-w-6xl flex items-center justify-between z-20 py-1"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Current Product Title in Brand Color */}
            <div className="flex items-center gap-2">
              <span className={`text-base sm:text-xl font-black tracking-tight ${currentProduct.accent.text}`}>
                {currentProduct.name}
              </span>
              <span className="hidden sm:inline text-xs text-white/60">
                • {currentProduct.category}
              </span>
            </div>

            {/* Controls: Autoplay toggle & Close */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium backdrop-blur-md border border-white/15 transition-all shadow-sm"
                title={isPaused ? 'Bật tự động chuyển slide' : 'Tạm dừng tự động chuyển'}
              >
                <span className="material-symbols-outlined text-base">
                  {isPaused ? 'play_arrow' : 'pause'}
                </span>
                <span className="text-[11px]">
                  {isPaused ? 'Tự chuyển: Tắt' : 'Tự chuyển: Bật'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-base">close</span>
                <span>Đóng (ESC)</span>
              </button>
            </div>
          </div>

          {/* Modal Center Stage: Big Image + Prev/Next Buttons */}
          <div
            className="relative w-full max-w-6xl flex-1 flex items-center justify-center my-auto min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Slide trước"
              className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-2xl"
            >
              <span className="material-symbols-outlined text-2xl sm:text-3xl">chevron_left</span>
            </button>

            {/* Slide Image - 100% Uncropped HD */}
            <img
              key={currentProduct.image}
              src={currentProduct.image}
              alt={currentProduct.name}
              className="max-w-full max-h-[76vh] sm:max-h-[80vh] w-auto h-auto object-contain rounded-xl sm:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/15 transition-all duration-300"
            />

            {/* Next Button */}
            <button
              type="button"
              onClick={goToNext}
              aria-label="Slide tiếp theo"
              className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-2xl"
            >
              <span className="material-symbols-outlined text-2xl sm:text-3xl">chevron_right</span>
            </button>
          </div>

          {/* Modal Footer Bar: 5 Product Quick Pills in Fullscreen */}
          <div
            className="w-full max-w-6xl flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap z-20 py-1"
            onClick={(e) => e.stopPropagation()}
          >
            {PRODUCTS.map((prod, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={prod.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-white text-ink shadow-lg scale-105 ring-2 ring-white/60'
                      : 'bg-white/15 hover:bg-white/25 text-white/80 hover:text-white backdrop-blur-md border border-white/10'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? 'bg-primary' : 'bg-white/40'
                    }`}
                  />
                  <span>{prod.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
};
