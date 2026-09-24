import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useRevealAnimations } from '../hooks/useRevealAnimations';

import erpImg from '../assets/product/erp.png';
import luxcareImg from '../assets/product/luxcare.png';
import marketingImg from '../assets/product/marketing.png';
import banHangImg from '../assets/product/ban-hang.png';
import ptImg from '../assets/product/pt.png';
import kienTrucSuImg from '../assets/product/kien-truc-su.png';
import laoDongImg from '../assets/product/lao-dong.png';

interface ProductItem {
  id: string;
  name: string;
  category: string;
  icon: string;
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
    name: 'iGen ERP Giáo Dục',
    category: 'Quản Lý Giáo Dục & Đào Tạo',
    icon: 'school',
    headline: 'ERP Quản Lý Giáo Dục',
    tagline: 'Hỗ trợ quản lý học viên, đào tạo & vận hành cho các trung tâm, trường, lớp học',
    description:
      'Hệ thống ERP chuyên sâu cho ngành giáo dục: số hóa toàn diện quy trình tuyển sinh, quản lý học viên, lớp học, điểm danh, kết quả học tập và tài chính trên một nền tảng thống nhất.',
    image: erpImg,
    accent: {
      text: 'text-[#0088cc]',
      bg: 'bg-[#0088cc]/10',
      border: 'border-[#0088cc]/30',
      gradient: 'from-[#0088cc] to-[#005580]',
      glow: 'shadow-[0_12px_36px_rgba(0,136,204,0.28)]',
    },
    features: [
      { icon: 'school', title: 'Quản lý học viên & Đào tạo', desc: 'Lưu trữ hồ sơ học viên, lộ trình đào tạo, điểm danh và đánh giá học tập.' },
      { icon: 'class', title: 'Lớp học & Lịch giảng dạy', desc: 'Sắp xếp thời khóa biểu, phân bổ phòng học và theo dõi ca giảng trực quan.' },
      { icon: 'payments', title: 'Học phí & Báo cáo thu chi', desc: 'Tự động nhắc phí, đối soát học phí, hóa đơn và báo cáo tài chính minh bạch.' },
      { icon: 'group', title: 'Giảng viên & Nhân sự', desc: 'Tự động tính lương, tính công và quản lý hồ sơ hợp đồng giáo viên.' },
    ],
    stats: [
      { value: '100%', label: 'Học viên số hóa' },
      { value: '70%', label: 'Giảm thời gian thủ tục' },
      { value: '24/7', label: 'Tra cứu đa nền tảng' },
    ],
    targetAudience: 'Trung tâm đào tạo, Trường học, Cơ sở giáo dục & Lớp học',
  },
  {
    id: 'luxcare-erp',
    name: 'LuxCare ERP',
    category: 'Hệ Thống Y Tế & Thẩm Mỹ',
    icon: 'medical_services',
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
    icon: 'campaign',
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
    icon: 'storefront',
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
    icon: 'fitness_center',
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
    icon: 'architecture',
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
  {
    id: 'igen-lao-dong',
    name: 'iGen Quản Lý Lao Động',
    category: 'Cung Ứng & Quản Lý Lao Động',
    icon: 'engineering',
    headline: 'Quản Lý Lao Động Thông Minh',
    tagline: 'Hồ sơ • Dự án • Hợp đồng – Tối ưu nguồn lực, an toàn & hiệu quả',
    description:
      'Hệ thống quản lý chuyên sâu dành cho các doanh nghiệp, tổ chức cung ứng lao động và nhà thầu xây dựng. Tự động hóa quản lý hồ sơ nhân sự, điều phối dự án công trình, ký duyệt hợp đồng và giám sát an toàn lao động.',
    image: laoDongImg,
    accent: {
      text: 'text-[#0284c7]',
      bg: 'bg-[#0284c7]/10',
      border: 'border-[#0284c7]/30',
      gradient: 'from-[#0284c7] to-[#0369a1]',
      glow: 'shadow-[0_12px_36px_rgba(2,132,199,0.28)]',
    },
    features: [
      { icon: 'badge', title: 'Quản lý hồ sơ lao động', desc: 'Lưu trữ thông tin cá nhân, tay nghề, CCCD, chứng chỉ và lịch sử công tác tập trung.' },
      { icon: 'engineering', title: 'Điều phối & Dự án', desc: 'Phân bổ nhân sự linh hoạt theo công trình, theo dõi chấm công và tiến độ ca kíp.' },
      { icon: 'description', title: 'Hợp đồng & Pháp lý', desc: 'Tự động tạo hợp đồng cung ứng, theo dõi thời hạn, tính công và đối soát công nợ.' },
      { icon: 'notifications_active', title: 'Cảnh báo & An toàn', desc: 'Nhắc hạn gia hạn chứng chỉ, kiểm soát bảo hộ lao động và cảnh báo rủi ro tức thì.' },
    ],
    stats: [
      { value: '100%', label: 'Hồ sơ số hóa' },
      { value: '3×', label: 'Tốc độ điều phối dự án' },
      { value: '0 Sai sót', label: 'Hợp đồng & Bảng công' },
    ],
    targetAudience: 'Doanh nghiệp, Tổ chức Cung ứng lao động & Nhà thầu',
  },
];

const AUTOPLAY_INTERVAL = 5000; // Default 5 seconds per slide for both main view and fullscreen

export const Products: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
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
    const timer = setInterval(() => {
      goToNext();
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [goToNext]);

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

  return (
    <main className="flex flex-col w-full relative bg-white">
      {/* Featured Interactive Slideshow - 3D Rotating Carousel */}
      <section className="pt-20 pb-8 sm:pt-22 md:pb-12 relative overflow-hidden bg-gradient-to-b from-surface-alt/60 via-white to-surface-alt/30">
        <div className="container-page">
          
          <div className="w-full max-w-6xl mx-auto">
            {/* Top Bar: Product Name with Icon, aligned to the left side of the slide, sleek & refined */}
            <div className="w-[76%] sm:w-[78%] md:w-[80%] mx-auto mb-2.5 flex items-center justify-start gap-2 px-1">
              <span className={`material-symbols-outlined text-lg sm:text-xl transition-colors duration-300 ${currentProduct.accent.text}`}>
                {currentProduct.icon}
              </span>
              <h1 className={`text-base sm:text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${currentProduct.accent.text}`}>
                {currentProduct.name}
              </h1>
            </div>

            {/* 3D Rotating Showcase Stage: Center bright & sharp, Left/Right dimmed & rotated with smooth continuous transitions */}
            <div className="relative w-full overflow-hidden py-3 sm:py-6 [perspective:1400px] select-none">
              <div className="relative w-full flex items-center justify-center min-h-[220px] sm:min-h-[360px] md:min-h-[440px] lg:min-h-[490px]">

                {/* Left Arrow Button */}
                <button
                  type="button"
                  onClick={goToPrev}
                  aria-label="Slide trước"
                  className="absolute left-1 sm:left-3 md:left-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-ink border border-line shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:border-[#00d2ff] hover:shadow-[0_0_14px_rgba(0,210,255,0.5)]"
                >
                  <span className="material-symbols-outlined text-2xl">chevron_left</span>
                </button>

                {/* Slides 3D Carousel Stage */}
                {PRODUCTS.map((prod, idx) => {
                  let diff = (idx - currentIndex + PRODUCTS.length) % PRODUCTS.length;
                  if (diff > PRODUCTS.length / 2) {
                    diff -= PRODUCTS.length;
                  }

                  const isActive = diff === 0;
                  const isPrev = diff === -1;
                  const isNext = diff === 1;

                  let transform: string;
                  let opacity: number;
                  let zIndex: number;
                  let filter = 'none';

                  if (isActive) {
                    transform = 'translate3d(-50%, -50%, 0) scale(1) rotateY(0deg)';
                    opacity = 1;
                    zIndex = 30;
                    filter = 'none';
                  } else if (isPrev) {
                    transform = 'translate3d(calc(-50% - 32%), -50%, -80px) scale(0.84) rotateY(12deg)';
                    opacity = 0.45;
                    zIndex = 20;
                    filter = 'brightness(0.92)';
                  } else if (isNext) {
                    transform = 'translate3d(calc(-50% + 32%), -50%, -80px) scale(0.84) rotateY(-12deg)';
                    opacity = 0.45;
                    zIndex = 20;
                    filter = 'brightness(0.92)';
                  } else if (diff < -1) {
                    transform = 'translate3d(calc(-50% - 64%), -50%, -180px) scale(0.7) rotateY(22deg)';
                    opacity = 0;
                    zIndex = 10;
                  } else {
                    transform = 'translate3d(calc(-50% + 64%), -50%, -180px) scale(0.7) rotateY(-22deg)';
                    opacity = 0;
                    zIndex = 10;
                  }

                  return (
                    <div
                      key={prod.id}
                      onClick={() => {
                        if (isActive) {
                          setIsModalOpen(true);
                        } else {
                          goToSlide(idx);
                        }
                      }}
                      style={{
                        transform,
                        opacity,
                        zIndex,
                        filter,
                        transition: 'transform 700ms cubic-bezier(0.25, 1, 0.5, 1), opacity 650ms cubic-bezier(0.25, 1, 0.5, 1), filter 650ms ease, box-shadow 650ms ease',
                      }}
                      className={`absolute top-1/2 left-1/2 w-[76%] sm:w-[78%] md:w-[80%] aspect-[1672/941] rounded-2xl md:rounded-3xl overflow-hidden border bg-white cursor-pointer select-none ${
                        isActive
                          ? 'border-line/90 shadow-[0_20px_50px_-10px_rgba(10,37,64,0.22)]'
                          : 'border-line/60 shadow-md hover:opacity-75'
                      }`}
                      title={isActive ? 'Bấm để phóng to xem toàn màn hình' : `Xem ${prod.name}`}
                    >
                      <img
                        src={prod.image}
                        alt={`${prod.name} - ${prod.headline}`}
                        className="w-full h-full object-contain block pointer-events-none"
                      />
                      {!isActive && (
                        <div className="absolute inset-0 bg-slate-900/15 hover:bg-transparent transition-colors duration-300" />
                      )}
                    </div>
                  );
                })}

                {/* Right Arrow Button */}
                <button
                  type="button"
                  onClick={goToNext}
                  aria-label="Slide tiếp theo"
                  className="absolute right-1 sm:right-3 md:right-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-ink border border-line shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:border-[#00d2ff] hover:shadow-[0_0_14px_rgba(0,210,255,0.5)]"
                >
                  <span className="material-symbols-outlined text-2xl">chevron_right</span>
                </button>

              </div>
            </div>

            {/* Quick Switch Pills - 7 products directly under slide */}
            <div className="mt-4 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
              {PRODUCTS.map((prod, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs transition-all duration-300 flex items-center gap-2 ${
                      isSelected
                        ? 'bg-white text-ink font-bold border-2 border-[#00d2ff] shadow-[0_0_16px_rgba(0,210,255,0.6)] ring-2 ring-[#00d2ff]/25 scale-105'
                        : 'bg-white hover:bg-surface-alt text-muted hover:text-ink font-medium border border-line hover:border-[#00d2ff]/40 hover:shadow-[0_0_8px_rgba(0,210,255,0.2)] shadow-xs'
                    }`}
                  >
                    <span
                      className={`rounded-full transition-all duration-300 ${
                        isSelected
                          ? 'w-2 h-2 bg-[#00d2ff] shadow-[0_0_8px_#00d2ff] animate-pulse'
                          : 'w-1.5 h-1.5 bg-slate-300'
                      }`}
                    />
                    <span>{prod.name}</span>
                  </button>
                );
              })}
            </div>

            {/* PRODUCT DESCRIPTION - Pure Typography, Clean, Enterprise Elegance (No colored tag badges) */}
            <div className="max-w-4xl mx-auto mt-6 rounded-2xl md:rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300">
              
              {/* Top Sub-bar: Minimalist Category & Target Audience Text (No badge boxes) */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-line/70">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>{currentProduct.category}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="material-symbols-outlined text-base text-slate-400">domain</span>
                  <span className="text-slate-400">Phù hợp:</span>
                  <span className="font-semibold text-ink">{currentProduct.targetAudience}</span>
                </div>
              </div>

              {/* Main Title & Tagline */}
              <div className="py-4 border-b border-line/70">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-1.5">
                  <span className={`material-symbols-outlined text-xl sm:text-2xl ${currentProduct.accent.text}`}>
                    {currentProduct.icon}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
                    {currentProduct.name}
                  </h2>
                  <span className="text-sm sm:text-base font-medium text-slate-500">
                    — {currentProduct.headline}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-body leading-relaxed max-w-3xl">
                  {currentProduct.tagline}
                </p>
              </div>

              {/* 4 Core Features: Clean, modern cards with subtle neutral icon boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 py-5">
                {currentProduct.features.map((feat, fi) => (
                  <div
                    key={fi}
                    className="group p-4 rounded-xl bg-slate-50/60 hover:bg-white border border-slate-200/80 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-primary mb-2.5 shadow-2xs group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-200">
                        <span className="material-symbols-outlined text-lg">{feat.icon}</span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-ink mb-1 group-hover:text-primary transition-colors">
                        {feat.title}
                      </h3>
                      <p className="text-[11px] text-muted leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Actions Row */}
              <div className="pt-4 border-t border-line/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {currentProduct.stats.map((s, si) => (
                    <div
                      key={si}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs"
                    >
                      <strong className="text-ink font-bold text-xs">{s.value}</strong>
                      <span className="text-muted text-[11px]">{s.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-alt hover:bg-white border border-line text-xs font-semibold text-ink transition-colors shadow-2xs hover:border-slate-300"
                  >
                    <span className="material-symbols-outlined text-sm">fullscreen</span>
                    <span>Phóng to</span>
                  </button>

                  <Link
                    to="/contact"
                    className="btn-primary py-2 px-5 text-xs font-bold shadow-xs hover:shadow-md transition-all"
                  >
                    <span>Đăng ký tư vấn demo</span>
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

      {/* Fullscreen Interactive Showcase Lightbox Modal - True Fullscreen, Clean, Only X Close Button */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-0 select-none animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Floating Close (X) Button Only */}
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            aria-label="Đóng toàn màn hình"
            className="absolute top-3 right-3 sm:top-5 sm:right-6 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-2xl hover:border-[#00d2ff] hover:shadow-[0_0_15px_rgba(0,210,255,0.6)] cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl sm:text-3xl">close</span>
          </button>

          {/* Modal Center Stage: True Fullscreen Slide Track */}
          <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Slide trước"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-2xl hover:border-[#00d2ff] hover:shadow-[0_0_15px_rgba(0,210,255,0.6)] cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl sm:text-3xl">chevron_left</span>
            </button>

            {/* Smooth Modal Slides Track - Maximize Screen Space */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              {PRODUCTS.map((prod, idx) => {
                let diff = (idx - currentIndex + PRODUCTS.length) % PRODUCTS.length;
                if (diff > PRODUCTS.length / 2) diff -= PRODUCTS.length;
                const isCurrent = diff === 0;

                return (
                  <div
                    key={prod.id}
                    style={{
                      transform: `translate3d(calc(-50% + ${diff * 105}%), -50%, 0)`,
                      opacity: isCurrent ? 1 : 0,
                      pointerEvents: isCurrent ? 'auto' : 'none',
                      transition: 'transform 650ms cubic-bezier(0.25, 1, 0.5, 1), opacity 500ms ease',
                    }}
                    className="absolute top-1/2 left-1/2 w-full h-full flex items-center justify-center p-2 sm:p-6"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="max-w-[96vw] max-h-[94vh] sm:max-h-[95vh] w-auto h-auto object-contain rounded-xl sm:rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] border border-white/10"
                    />
                  </div>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={goToNext}
              aria-label="Slide tiếp theo"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-2xl hover:border-[#00d2ff] hover:shadow-[0_0_15px_rgba(0,210,255,0.6)] cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl sm:text-3xl">chevron_right</span>
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
