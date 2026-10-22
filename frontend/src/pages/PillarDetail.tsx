import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Check, ChevronRight, Lightbulb, Megaphone, Settings2, GraduationCap } from 'lucide-react';
import './PillarDetail.css';

type Pillar = {
  slug: string;
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  image: string;
  imageAlt: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; 'aria-hidden'?: boolean }>;
  highlights: string[];
  overviewTitle: string;
  overview: string;
  situations: string[];
  capabilities: { title: string; description: string }[];
  steps: { title: string; description: string }[];
  deliverables: string[];
  faqs: { question: string; answer: string }[];
};

const pillars: Record<string, Pillar> = {
  'tu-van-chuyen-doi-so': {
    slug: 'tu-van-chuyen-doi-so',
    eyebrow: 'TƯ VẤN & CHUYỂN ĐỔI SỐ',
    title: 'Bắt đầu chuyển đổi số từ',
    accent: 'đúng bài toán',
    intro: 'iGen cùng doanh nghiệp nhìn lại cách vận hành, chọn việc cần ưu tiên và xây dựng lộ trình số hóa phù hợp với nguồn lực thực tế.',
    image: '/service-illustrations/remote-development-center.png',
    imageAlt: 'Minh họa các quy trình và hệ thống được kết nối trên nhiều màn hình',
    icon: Lightbulb,
    highlights: ['Hiểu hiện trạng', 'Ưu tiên rõ ràng', 'Thử nghiệm thực tế', 'Mở rộng theo giai đoạn'],
    overviewTitle: 'Một lộ trình xuất phát từ công việc hằng ngày',
    overview: 'Chuyển đổi số hiệu quả bắt đầu bằng việc xác định thông tin đang nằm ở đâu, các bước nào đang làm thủ công và bộ phận nào cần phối hợp. Từ đó, chúng tôi đề xuất những thay đổi có thể triển khai và đánh giá được.',
    situations: ['Dữ liệu phân tán giữa nhiều công cụ và bảng tính', 'Quy trình phụ thuộc vào việc nhắc việc thủ công', 'Khó chọn công nghệ phù hợp với ngân sách và đội ngũ'],
    capabilities: [
      { title: 'Khảo sát vận hành', description: 'Phỏng vấn đội ngũ, quan sát luồng công việc và ghi nhận những điểm chậm hoặc dễ sai sót.' },
      { title: 'Thiết kế lộ trình', description: 'Sắp xếp các hạng mục theo mức độ cần thiết, công sức triển khai và khả năng sử dụng lâu dài.' },
      { title: 'Thử nghiệm giải pháp', description: 'Chọn một nghiệp vụ phù hợp để kiểm tra cách làm trước khi mở rộng sang các bộ phận khác.' },
      { title: 'Đồng hành áp dụng', description: 'Hướng dẫn sử dụng, tiếp nhận phản hồi và điều chỉnh quy trình sau khi đưa vào vận hành.' },
    ],
    steps: [
      { title: 'Hiểu doanh nghiệp', description: 'Làm rõ mục tiêu, người sử dụng và công cụ đang có.' },
      { title: 'Chọn ưu tiên', description: 'Xác định những thay đổi tạo tác động rõ nhất cho hoạt động hiện tại.' },
      { title: 'Triển khai từng bước', description: 'Thử nghiệm, đo lại kết quả và mở rộng khi quy trình đã ổn định.' },
    ],
    deliverables: ['Bản mô tả hiện trạng và các điểm cần cải thiện', 'Danh sách hạng mục ưu tiên theo giai đoạn', 'Đề xuất cách kết nối dữ liệu và công cụ', 'Kế hoạch thử nghiệm và đánh giá sau triển khai'],
    faqs: [
      { question: 'Doanh nghiệp nhỏ có cần xây dựng lộ trình không?', answer: 'Có. Một lộ trình ngắn giúp tập trung vào vài việc cần thiết trước, tránh đầu tư dàn trải.' },
      { question: 'Có phải thay toàn bộ hệ thống đang dùng?', answer: 'Phạm vi được xác định sau khi khảo sát. Những công cụ đang đáp ứng tốt vẫn có thể tiếp tục sử dụng và được kết nối khi phù hợp.' },
    ],
  },
  'ai-marketing-van-hanh': {
    slug: 'ai-marketing-van-hanh',
    eyebrow: 'AI MARKETING & VẬN HÀNH',
    title: 'Làm marketing nhất quán,',
    accent: 'vận hành gọn hơn',
    intro: 'Kết nối kế hoạch nội dung, dữ liệu khách hàng và các bước phối hợp trong một quy trình rõ ràng, với AI hỗ trợ những công việc lặp lại.',
    image: '/service-illustrations/marketing-automation-hero.png',
    imageAlt: 'Minh họa bảng theo dõi marketing và các kênh tương tác khách hàng',
    icon: Megaphone,
    highlights: ['Kế hoạch nội dung', 'Quản lý tương tác', 'Phối hợp đội ngũ', 'Theo dõi hiệu quả'],
    overviewTitle: 'Từ ý tưởng chiến dịch đến phản hồi khách hàng',
    overview: 'Một chiến dịch thường đi qua nhiều người và nhiều kênh. iGen giúp tổ chức lại các bước lên kế hoạch, tạo nội dung, duyệt, xuất bản và chăm sóc sau tương tác để đội ngũ nắm được tình trạng công việc.',
    situations: ['Nội dung và lịch đăng rải rác ở nhiều nơi', 'Khách hàng quan tâm chưa được chuyển tiếp đúng người', 'Báo cáo phải tổng hợp thủ công vào cuối kỳ'],
    capabilities: [
      { title: 'Lập kế hoạch nội dung', description: 'Xây dựng chủ đề, lịch triển khai và đầu việc cho từng kênh truyền thông.' },
      { title: 'AI hỗ trợ sản xuất', description: 'Gợi ý bản nháp, biến thể thông điệp và cấu trúc nội dung để con người kiểm tra, biên tập.' },
      { title: 'Luồng xử lý khách hàng', description: 'Ghi nhận tương tác, phân loại nhu cầu và chuyển thông tin tới bộ phận phụ trách.' },
      { title: 'Báo cáo dễ theo dõi', description: 'Tập hợp chỉ số phù hợp với mục tiêu để đội ngũ nhìn thấy điều cần điều chỉnh.' },
    ],
    steps: [
      { title: 'Chọn mục tiêu', description: 'Thống nhất khách hàng mục tiêu, kênh ưu tiên và kết quả cần theo dõi.' },
      { title: 'Thiết kế luồng làm việc', description: 'Phân rõ người duyệt, người thực hiện và thời điểm AI có thể hỗ trợ.' },
      { title: 'Cải tiến liên tục', description: 'Xem lại phản hồi và dữ liệu chiến dịch để cập nhật nội dung, quy trình.' },
    ],
    deliverables: ['Khung kế hoạch nội dung theo mục tiêu', 'Quy trình tiếp nhận và chuyển tiếp khách hàng', 'Mẫu nội dung và hướng dẫn kiểm duyệt AI', 'Bảng theo dõi những chỉ số cần thiết'],
    faqs: [
      { question: 'AI có tự đăng nội dung thay đội ngũ không?', answer: 'Quyền tự động hóa được thiết kế theo nhu cầu. Các bước cần kiểm duyệt vẫn có thể yêu cầu người phụ trách xác nhận trước.' },
      { question: 'Có thể dùng cùng CRM hiện tại không?', answer: 'Khả năng kết nối phụ thuộc vào công cụ và quyền truy cập đang sử dụng. iGen sẽ kiểm tra trước khi đề xuất cách tích hợp.' },
    ],
  },
  'nen-tang-ai-theo-yeu-cau': {
    slug: 'nen-tang-ai-theo-yeu-cau',
    eyebrow: 'NỀN TẢNG AI THEO YÊU CẦU',
    title: 'Xây dựng AI theo',
    accent: 'quy trình của bạn',
    intro: 'Từ trợ lý tra cứu tri thức đến tự động hóa nghiệp vụ, iGen thiết kế ứng dụng AI dựa trên dữ liệu, vai trò và cách làm việc của từng tổ chức.',
    image: '/service-illustrations/generative-ai-hero.png',
    imageAlt: 'Minh họa các nguồn dữ liệu và ứng dụng kết nối qua lõi AI',
    icon: Settings2,
    highlights: ['Theo nhu cầu riêng', 'Kết nối dữ liệu', 'Có bước kiểm duyệt', 'Sẵn sàng mở rộng'],
    overviewTitle: 'Ứng dụng AI vào một công việc cụ thể',
    overview: 'Nền tảng theo yêu cầu được xác định từ người dùng thực tế: họ cần tìm thông tin gì, xử lý đầu vào nào và quyết định nào cần con người phê duyệt. Kiến trúc và tính năng được chọn theo những nhu cầu đó.',
    situations: ['Tài liệu nội bộ nhiều nhưng khó tìm đúng thông tin', 'Nhân sự phải sao chép dữ liệu qua nhiều hệ thống', 'Công cụ AI phổ thông chưa theo sát quy trình riêng'],
    capabilities: [
      { title: 'Trợ lý tri thức', description: 'Hỗ trợ tìm và tóm tắt thông tin từ nguồn tài liệu được doanh nghiệp cho phép sử dụng.' },
      { title: 'Tự động hóa nghiệp vụ', description: 'Nhận dữ liệu đầu vào, đề xuất bước xử lý và chuyển việc theo quy tắc đã thống nhất.' },
      { title: 'Kết nối hệ thống', description: 'Xem xét tích hợp với các phần mềm sẵn có qua phương thức được hệ thống hỗ trợ.' },
      { title: 'Quản lý quyền và kiểm duyệt', description: 'Thiết kế quyền sử dụng, nhật ký thao tác và các điểm cần người phụ trách xác nhận.' },
    ],
    steps: [
      { title: 'Xác định trường hợp sử dụng', description: 'Chọn một công việc có đầu vào, đầu ra và người chịu trách nhiệm rõ ràng.' },
      { title: 'Thiết kế và thử nghiệm', description: 'Chuẩn bị dữ liệu mẫu, xây luồng xử lý và kiểm tra với người dùng thật.' },
      { title: 'Đưa vào vận hành', description: 'Điều chỉnh quyền truy cập, hướng dẫn sử dụng và theo dõi phản hồi.' },
    ],
    deliverables: ['Đặc tả trường hợp sử dụng và luồng xử lý', 'Mẫu thử hoặc tính năng theo phạm vi thống nhất', 'Tài liệu tích hợp và quyền truy cập', 'Hướng dẫn vận hành, đánh giá và cải tiến'],
    faqs: [
      { question: 'Có cần chuẩn bị dữ liệu từ đầu không?', answer: 'Có thể bắt đầu từ tài liệu hoặc quy trình đang có. Chất lượng và quyền sử dụng dữ liệu sẽ được rà soát trong giai đoạn khảo sát.' },
      { question: 'Có thể bổ sung tính năng sau này không?', answer: 'Kiến trúc được chọn theo phạm vi hiện tại và khả năng mở rộng mong muốn. Các phần bổ sung sẽ được đánh giá riêng khi nhu cầu thay đổi.' },
    ],
  },
  'hoc-vien-doanh-nghiep-1-nguoi': {
    slug: 'hoc-vien-doanh-nghiep-1-nguoi',
    eyebrow: 'HỌC VIỆN DOANH NGHIỆP 1 NGƯỜI',
    title: 'Học AI để',
    accent: 'tự vận hành tốt hơn',
    intro: 'Một lộ trình học thực hành dành cho người đang tự xây dựng công việc kinh doanh: hiểu công cụ, thiết kế quy trình và biết khi nào cần kiểm tra kết quả của AI.',
    image: '/academy-ai-hero.png',
    imageAlt: 'Người học thực hành cùng trợ lý AI trên máy tính trong không gian sáng',
    icon: GraduationCap,
    highlights: ['Học theo tình huống', 'Làm trực tiếp', 'Có mẫu áp dụng', 'Tự cải tiến'],
    overviewTitle: 'Học từ chính việc bạn cần làm',
    overview: 'Thay vì học một danh sách công cụ rời rạc, người học chọn công việc đang tốn thời gian và thực hành từng bước: mô tả đầu việc, giao nhiệm vụ cho AI, kiểm tra đầu ra và lưu lại cách làm có thể lặp lại.',
    situations: ['Muốn dùng AI nhưng chưa biết bắt đầu từ đâu', 'Làm nhiều vai trò cùng lúc và khó sắp xếp việc', 'Đã thử công cụ AI nhưng kết quả chưa ổn định'],
    capabilities: [
      { title: 'Nền tảng sử dụng AI', description: 'Hiểu khả năng, giới hạn và cách đặt yêu cầu rõ ràng cho từng công việc.' },
      { title: 'Nội dung và marketing', description: 'Lập ý tưởng, chuẩn bị bản nháp và xây quy trình kiểm tra trước khi xuất bản.' },
      { title: 'Bán hàng và chăm sóc', description: 'Sắp xếp thông tin khách hàng, chuẩn bị câu trả lời và theo dõi các việc cần tiếp tục.' },
      { title: 'Quy trình cá nhân', description: 'Tạo bộ mẫu và các bước tự động hóa đơn giản có thể duy trì sau khóa học.' },
    ],
    steps: [
      { title: 'Chọn việc cần cải thiện', description: 'Liệt kê các công việc lặp lại và chọn một tình huống phù hợp để thực hành.' },
      { title: 'Học và làm cùng lúc', description: 'Thử công cụ trên dữ liệu mẫu hoặc dữ liệu được phép sử dụng.' },
      { title: 'Đúc kết cách làm', description: 'Lưu mẫu, tiêu chí kiểm tra và kế hoạch áp dụng cho công việc tiếp theo.' },
    ],
    deliverables: ['Danh sách trường hợp sử dụng phù hợp với cá nhân', 'Bộ mẫu yêu cầu và checklist kiểm tra kết quả AI', 'Một quy trình thực hành cho công việc đã chọn', 'Kế hoạch tự học và cải tiến sau chương trình'],
    faqs: [
      { question: 'Chưa biết lập trình có học được không?', answer: 'Nội dung bắt đầu từ cách ứng dụng công cụ vào công việc. Những phần kỹ thuật chuyên sâu sẽ được tách theo nhu cầu.' },
      { question: 'Có phải đăng ký nhiều công cụ trả phí?', answer: 'Công cụ được lựa chọn theo bài tập và ngân sách. Trước khi bắt đầu, người học sẽ biết những công cụ nào cần chuẩn bị.' },
    ],
  },
};

export const PillarDetail: React.FC<{ slug: string }> = ({ slug }) => {
  const pillar = pillars[slug];

  useEffect(() => {
    if (pillar) document.title = `${pillar.eyebrow} | iGen Technology`;
  }, [pillar]);

  if (!pillar) return null;

  const Icon = pillar.icon;
  const contactUrl = `/contact?service=${encodeURIComponent(pillar.eyebrow)}`;

  return (
    <main className="pillar-page">
      <section className="pillar-hero">
        <div className="pillar-shell pillar-hero__grid">
          <div className="pillar-hero__copy">
            <nav className="pillar-breadcrumb" aria-label="Đường dẫn trang">
              <Link to="/">Trang chủ</Link><ChevronRight size={15} aria-hidden="true" />
              <Link to="/#home-pillars">Hệ sinh thái Giải pháp AI</Link><ChevronRight size={15} aria-hidden="true" />
              <span aria-current="page">{pillar.eyebrow}</span>
            </nav>
            <span className="pillar-eyebrow"><Icon size={17} aria-hidden={true} /> {pillar.eyebrow}</span>
            <h1>{pillar.title} <span>{pillar.accent}</span></h1>
            <p>{pillar.intro}</p>
            <div className="pillar-hero__actions">
              <Link className="pillar-button" to={contactUrl}>Trao đổi nhu cầu <ArrowRight size={19} aria-hidden="true" /></Link>
              <a className="pillar-text-link" href="#pillar-explore">Khám phá giải pháp <ArrowDown size={18} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="pillar-hero__visual">
            <img src={pillar.image} alt={pillar.imageAlt} fetchPriority="high" />
          </div>
        </div>
        <div className="pillar-shell pillar-highlights" aria-label="Điểm nổi bật">
          {pillar.highlights.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}
        </div>
      </section>

      <section className="pillar-section" id="pillar-explore">
        <div className="pillar-shell pillar-overview">
          <div>
            <span className="pillar-section__label">CÁCH TIẾP CẬN</span>
            <h2>{pillar.overviewTitle}</h2>
            <p>{pillar.overview}</p>
          </div>
          <div className="pillar-situations">
            <h3>Những tình huống thường gặp</h3>
            {pillar.situations.map(item => <div key={item}><Check size={19} aria-hidden="true" /><span>{item}</span></div>)}
          </div>
        </div>
      </section>

      <section className="pillar-section pillar-section--soft">
        <div className="pillar-shell">
          <div className="pillar-section__heading">
            <span className="pillar-section__label">NỘI DUNG GIẢI PHÁP</span>
            <h2>Đi từ nhu cầu đến cách làm cụ thể</h2>
            <p>Phạm vi được chọn theo mục tiêu và điều kiện triển khai của từng doanh nghiệp.</p>
          </div>
          <div className="pillar-capabilities">
            {pillar.capabilities.map((item, index) => (
              <article className="pillar-capability" key={item.title}>
                <span className="pillar-capability__number">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pillar-section">
        <div className="pillar-shell pillar-delivery">
          <div>
            <span className="pillar-section__label">LỘ TRÌNH THỰC HIỆN</span>
            <h2>Ba bước để bắt đầu rõ ràng</h2>
            <div className="pillar-steps">
              {pillar.steps.map((step, index) => (
                <div className="pillar-step" key={step.title}>
                  <span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div>
                </div>
              ))}
            </div>
          </div>
          <aside className="pillar-deliverables">
            <span className="pillar-section__label">ĐẦU RA DỰ KIẾN</span>
            <h2>Sau quá trình làm việc</h2>
            <p>Nội dung bàn giao được thống nhất theo phạm vi thực tế.</p>
            <ul>{pillar.deliverables.map(item => <li key={item}><Check size={18} aria-hidden="true" />{item}</li>)}</ul>
          </aside>
        </div>
      </section>

      <section className="pillar-section pillar-section--soft">
        <div className="pillar-shell pillar-faq">
          <div><span className="pillar-section__label">GIẢI ĐÁP NHANH</span><h2>Trước khi bắt đầu</h2><p>Những điều cần làm rõ khi lựa chọn giải pháp phù hợp.</p></div>
          <div>{pillar.faqs.map(faq => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div>
        </div>
      </section>

      <section className="pillar-cta">
        <div className="pillar-shell pillar-cta__inner">
          <div><span className="pillar-section__label">CÙNG iGEN BẮT ĐẦU</span><h2>Trao đổi về nhu cầu của bạn</h2><p>Chia sẻ mục tiêu và cách bạn đang vận hành. iGen sẽ cùng bạn xác định bước tiếp theo phù hợp.</p></div>
          <Link className="pillar-button" to={contactUrl}>Liên hệ tư vấn <ArrowRight size={19} aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
};
