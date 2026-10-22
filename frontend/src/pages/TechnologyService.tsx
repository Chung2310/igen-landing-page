import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './SoftwareService.css';
import './TechnologyService.css';

type Item = { title: string; description: string };
type TechnologyServiceData = {
  name: string;
  headline: string;
  highlight: string;
  intro: string;
  image: string;
  imageAlt: string;
  pillars: string[];
  scopeHeading: string;
  scopeIntro: string;
  scope: Item[];
  usesHeading: string;
  usesIntro: string;
  uses: Item[];
  process: Item[];
  closingHeading: string;
  closingText: string;
};

const services: Record<string, TechnologyServiceData> = {
  crm: {
    name: 'CRM',
    headline: 'Hiểu và chăm sóc khách hàng',
    highlight: 'trên một hành trình liền mạch',
    intro: 'iGen kết nối thông tin khách hàng, lịch sử tương tác và công việc của đội ngũ để mỗi cuộc trao đổi đều có đủ ngữ cảnh.',
    image: '/service-illustrations/crm-hero.png',
    imageAlt: 'Minh họa giao diện CRM theo dõi khách hàng và quy trình bán hàng',
    pillars: ['Một nguồn dữ liệu', 'Theo dõi tương tác', 'Phối hợp rõ ràng', 'Mở rộng theo nhu cầu'],
    scopeHeading: 'Bắt đầu từ cách đội ngũ đang chăm sóc khách hàng',
    scopeIntro: 'Phạm vi CRM được thiết kế theo quy trình bán hàng và chăm sóc thực tế của từng doanh nghiệp.',
    scope: [
      { title: 'Hồ sơ khách hàng', description: 'Tập hợp thông tin và lịch sử làm việc ở nơi đội ngũ có thể tra cứu.' },
      { title: 'Cơ hội bán hàng', description: 'Theo dõi giai đoạn, đầu việc và người phụ trách của từng cơ hội.' },
      { title: 'Chăm sóc sau bán', description: 'Ghi nhận yêu cầu, phản hồi và các lần liên hệ tiếp theo.' },
      { title: 'Báo cáo phù hợp', description: 'Xem tình hình theo chỉ số có ý nghĩa với cách doanh nghiệp vận hành.' },
    ],
    usesHeading: 'Một trải nghiệm cho nhiều bộ phận',
    usesIntro: 'Thông tin được tổ chức để các nhóm liên quan phối hợp mà không phải tìm lại dữ liệu rời rạc.',
    uses: [
      { title: 'Đội ngũ kinh doanh', description: 'Nắm trạng thái cơ hội và việc cần làm tiếp theo.' },
      { title: 'Bộ phận chăm sóc', description: 'Hiểu ngữ cảnh trước khi phản hồi khách hàng.' },
      { title: 'Người quản lý', description: 'Theo dõi hoạt động và điều chỉnh ưu tiên kịp thời.' },
    ],
    process: [
      { title: 'Khảo sát', description: 'Hiểu dữ liệu và quy trình hiện tại.' },
      { title: 'Thiết kế', description: 'Chọn luồng và trường thông tin cần thiết.' },
      { title: 'Triển khai', description: 'Thiết lập, kết nối và hướng dẫn sử dụng.' },
      { title: 'Cải tiến', description: 'Điều chỉnh theo phản hồi thực tế.' },
    ],
    closingHeading: 'Muốn nhìn rõ hơn hành trình khách hàng?',
    closingText: 'Chia sẻ cách đội ngũ đang bán hàng và chăm sóc. iGen sẽ cùng bạn xác định phạm vi CRM phù hợp.',
  },
  'marketing-tu-dong': {
    name: 'Marketing tự động',
    headline: 'Đúng thông điệp, đúng thời điểm',
    highlight: 'trên từng hành trình khách hàng',
    intro: 'iGen giúp doanh nghiệp tổ chức dữ liệu, nội dung và các bước tương tác để đội ngũ triển khai chiến dịch nhất quán hơn.',
    image: '/service-illustrations/marketing-automation-hero.png',
    imageAlt: 'Minh họa bảng điều khiển chiến dịch marketing tự động',
    pillars: ['Phân nhóm phù hợp', 'Luồng tương tác', 'Theo dõi kết quả', 'Cải tiến liên tục'],
    scopeHeading: 'Tự động hóa phần việc có thể lặp lại',
    scopeIntro: 'Giải pháp bắt đầu từ mục tiêu chiến dịch và các kênh doanh nghiệp đang sử dụng.',
    scope: [
      { title: 'Tổ chức dữ liệu', description: 'Làm rõ nhóm khách hàng và những tín hiệu cần theo dõi.' },
      { title: 'Thiết kế hành trình', description: 'Sắp xếp nội dung và điểm chạm theo từng giai đoạn.' },
      { title: 'Thiết lập quy trình', description: 'Tự động gửi hoặc chuyển việc khi điều kiện phù hợp.' },
      { title: 'Đo lường', description: 'Xem kết quả để chỉnh nội dung, thời điểm và cách tiếp cận.' },
    ],
    usesHeading: 'Giữ mạch tương tác khi khách hàng thay đổi',
    usesIntro: 'Quy trình có thể áp dụng theo từng nhóm nhu cầu và được điều chỉnh sau khi vận hành.',
    uses: [
      { title: 'Nuôi dưỡng khách hàng tiềm năng', description: 'Cung cấp thông tin phù hợp với mức độ quan tâm.' },
      { title: 'Chăm sóc khách hàng hiện tại', description: 'Nhắc lịch, cập nhật hoặc gửi nội dung hữu ích.' },
      { title: 'Phối hợp với bán hàng', description: 'Chuyển thông tin khi khách hàng sẵn sàng trao đổi.' },
    ],
    process: [
      { title: 'Xác định', description: 'Chọn mục tiêu và nhóm khách hàng.' },
      { title: 'Thiết kế', description: 'Lập hành trình và nội dung.' },
      { title: 'Kết nối', description: 'Thiết lập công cụ và dữ liệu.' },
      { title: 'Tối ưu', description: 'Rà soát số liệu và điều chỉnh.' },
    ],
    closingHeading: 'Đang muốn chăm sóc khách hàng đều đặn hơn?',
    closingText: 'Hãy chia sẻ hành trình marketing hiện tại. iGen sẽ giúp bạn chọn bước tự động hóa nên bắt đầu.',
  },
  'generative-ai': {
    name: 'Generative AI',
    headline: 'Đưa AI tạo sinh vào',
    highlight: 'công việc có giá trị thực',
    intro: 'iGen thiết kế ứng dụng AI tạo sinh theo dữ liệu và quy trình của doanh nghiệp, để đội ngũ có thêm công cụ hỗ trợ soạn thảo, tìm kiếm và xử lý thông tin.',
    image: '/service-illustrations/generative-ai-hero.png',
    imageAlt: 'Minh họa AI tạo sinh xử lý tài liệu và nội dung số',
    pillars: ['Bám sát nghiệp vụ', 'Dữ liệu có ngữ cảnh', 'Con người kiểm soát', 'Triển khai từng bước'],
    scopeHeading: 'Chọn bài toán trước khi chọn mô hình',
    scopeIntro: 'Giá trị của AI tạo sinh nằm ở luồng sử dụng rõ ràng và kết quả có thể kiểm tra.',
    scope: [
      { title: 'Tìm kiếm tri thức', description: 'Truy vấn thông tin từ tài liệu được doanh nghiệp cho phép sử dụng.' },
      { title: 'Hỗ trợ nội dung', description: 'Tạo bản nháp để nhân sự rà soát và hoàn thiện.' },
      { title: 'Tóm tắt thông tin', description: 'Rút gọn hội thoại, báo cáo hoặc tài liệu dài theo nhu cầu.' },
      { title: 'Tích hợp công việc', description: 'Đặt tính năng AI vào công cụ và quy trình đội ngũ đang dùng.' },
    ],
    usesHeading: 'Ứng dụng có kiểm soát trong từng bối cảnh',
    usesIntro: 'Phạm vi dữ liệu, quyền sử dụng và bước kiểm duyệt được xác định theo từng dự án.',
    uses: [
      { title: 'Hỗ trợ nội bộ', description: 'Giúp đội ngũ tìm thông tin và chuẩn bị câu trả lời nhanh hơn.' },
      { title: 'Sản xuất nội dung', description: 'Phác thảo ý tưởng, nội dung và tài liệu theo hướng dẫn.' },
      { title: 'Trợ lý nghiệp vụ', description: 'Gợi ý bước xử lý tiếp theo dựa trên ngữ cảnh được cung cấp.' },
    ],
    process: [
      { title: 'Chọn bài toán', description: 'Xác định tác vụ nên thử trước.' },
      { title: 'Chuẩn bị dữ liệu', description: 'Làm rõ nguồn và quyền sử dụng.' },
      { title: 'Thử nghiệm', description: 'Kiểm tra đầu ra với người dùng thật.' },
      { title: 'Mở rộng', description: 'Cải tiến và kết nối vào quy trình.' },
    ],
    closingHeading: 'Bạn muốn bắt đầu với AI tạo sinh từ đâu?',
    closingText: 'Chia sẻ tác vụ đang tốn thời gian. iGen sẽ cùng bạn xác định trường hợp sử dụng phù hợp.',
  },
  'computer-vision': {
    name: 'Computer Vision',
    headline: 'Biến hình ảnh thành',
    highlight: 'thông tin hữu ích cho vận hành',
    intro: 'iGen nghiên cứu và triển khai giải pháp nhận diện hình ảnh theo điều kiện thực tế, giúp doanh nghiệp giảm các bước quan sát và ghi nhận thủ công.',
    image: '/service-illustrations/computer-vision-hero.png',
    imageAlt: 'Minh họa camera nhận diện hình ảnh sản phẩm trong quy trình vận hành',
    pillars: ['Dữ liệu hình ảnh', 'Tiêu chí rõ ràng', 'Kiểm chứng thực tế', 'Kết nối quy trình'],
    scopeHeading: 'Nhận diện dựa trên điều kiện sử dụng thật',
    scopeIntro: 'Độ phù hợp được đánh giá từ chất lượng hình ảnh, môi trường và tiêu chí cần nhận biết.',
    scope: [
      { title: 'Khảo sát nguồn hình', description: 'Xem camera, ảnh đầu vào và điều kiện ánh sáng hoặc góc chụp.' },
      { title: 'Xác định đối tượng', description: 'Làm rõ điều cần nhận diện và cách kiểm tra kết quả.' },
      { title: 'Thử nghiệm mô hình', description: 'Đánh giá trên dữ liệu đại diện trước khi triển khai rộng.' },
      { title: 'Kết nối cảnh báo', description: 'Đưa kết quả vào màn hình, báo cáo hoặc luồng xử lý phù hợp.' },
    ],
    usesHeading: 'Từ quan sát thủ công đến dữ liệu có cấu trúc',
    usesIntro: 'Tình huống sử dụng được chọn theo giá trị vận hành và khả năng thu thập hình ảnh.',
    uses: [
      { title: 'Kiểm tra sản phẩm', description: 'Hỗ trợ phát hiện đặc điểm hoặc sai khác cần xem lại.' },
      { title: 'Theo dõi hiện trường', description: 'Ghi nhận trạng thái và sự kiện từ nguồn hình phù hợp.' },
      { title: 'Phân loại hình ảnh', description: 'Sắp xếp dữ liệu ảnh theo nhóm để dễ tra cứu và xử lý.' },
    ],
    process: [
      { title: 'Khảo sát', description: 'Xác định nguồn hình và mục tiêu.' },
      { title: 'Chuẩn bị', description: 'Chọn dữ liệu và tiêu chí đánh giá.' },
      { title: 'Thử nghiệm', description: 'Kiểm tra trong điều kiện thực tế.' },
      { title: 'Triển khai', description: 'Kết nối và theo dõi kết quả.' },
    ],
    closingHeading: 'Có một quy trình đang cần quan sát bằng hình ảnh?',
    closingText: 'Chia sẻ mẫu hình ảnh và điều kiện sử dụng. iGen sẽ cùng bạn đánh giá hướng triển khai.',
  },
  'chatbot-ai': {
    name: 'Chatbot AI',
    headline: 'Cuộc trò chuyện rõ ràng hơn',
    highlight: 'trên những kênh khách hàng dùng',
    intro: 'iGen thiết kế chatbot AI theo nguồn thông tin và kịch bản của doanh nghiệp, hỗ trợ trả lời câu hỏi thường gặp và chuyển tiếp đúng lúc cho nhân sự.',
    image: '/service-illustrations/chatbot-ai-hero.png',
    imageAlt: 'Minh họa chatbot AI kết nối hội thoại trên điện thoại và máy tính',
    pillars: ['Trả lời theo dữ liệu', 'Chuyển tiếp linh hoạt', 'Theo dõi hội thoại', 'Cải tiến từ phản hồi'],
    scopeHeading: 'Một chatbot hữu ích cần hiểu giới hạn của mình',
    scopeIntro: 'Nội dung trả lời, trường hợp cần chuyển người và cách cập nhật tri thức được xác định từ đầu.',
    scope: [
      { title: 'Tổ chức tri thức', description: 'Chọn nguồn thông tin đáng tin cậy để chatbot tham khảo.' },
      { title: 'Thiết kế hội thoại', description: 'Xây cách hỏi đáp phù hợp với khách hàng và giọng thương hiệu.' },
      { title: 'Chuyển cho nhân sự', description: 'Đưa cuộc trò chuyện đến đúng đầu mối khi cần xử lý sâu hơn.' },
      { title: 'Theo dõi chất lượng', description: 'Rà soát câu hỏi chưa được giải quyết để bổ sung thông tin.' },
    ],
    usesHeading: 'Hỗ trợ khách hàng và đội ngũ trong cùng một luồng',
    usesIntro: 'Chatbot được đặt ở nơi người dùng cần hỗ trợ, với phạm vi trả lời phù hợp từng kênh.',
    uses: [
      { title: 'Tư vấn ban đầu', description: 'Giúp khách hàng tìm nhanh thông tin dịch vụ và bước tiếp theo.' },
      { title: 'Hỗ trợ sau bán', description: 'Trả lời các câu hỏi lặp lại và ghi nhận yêu cầu cần theo dõi.' },
      { title: 'Trợ lý nội bộ', description: 'Hỗ trợ nhân sự tra cứu quy trình hoặc tài liệu được phép truy cập.' },
    ],
    process: [
      { title: 'Khảo sát', description: 'Chọn nhóm câu hỏi và kênh sử dụng.' },
      { title: 'Chuẩn bị', description: 'Tổ chức nội dung và quy tắc trả lời.' },
      { title: 'Triển khai', description: 'Kết nối kênh và kiểm tra hội thoại.' },
      { title: 'Cải tiến', description: 'Cập nhật từ phản hồi thực tế.' },
    ],
    closingHeading: 'Bạn muốn chatbot hỗ trợ việc gì trước?',
    closingText: 'Chia sẻ các câu hỏi khách hàng thường gặp. iGen sẽ cùng bạn xác định phạm vi phù hợp.',
  },
};

export function TechnologyService({ slug }: { slug: string }) {
  const service = services[slug];

  useEffect(() => {
    if (service) document.title = `${service.name} | iGen Technology`;
  }, [service]);

  if (!service) return <Navigate to="/solutions" replace />;
  const contactLink = `/contact?service=${encodeURIComponent(service.name)}`;

  return (
    <main className="software-page technology-page">
      <section className="software-hero" aria-labelledby="technology-title">
        <div className="container-page software-hero__layout">
          <div className="software-hero__copy">
            <nav className="software-breadcrumb" aria-label="Đường dẫn trang"><Link to="/">Trang chủ</Link><span>/</span><Link to="/solutions">Dịch vụ</Link><span>/</span><span aria-current="page">{service.name}</span></nav>
            <h1 id="technology-title">{service.headline} <span>{service.highlight}</span></h1>
            <p>{service.intro}</p>
            <div className="software-hero__actions"><Link className="software-button" to={contactLink}>Trao đổi giải pháp <span aria-hidden="true">↗</span></Link><a className="software-text-link" href="#technology-scope">Khám phá dịch vụ <span aria-hidden="true">↓</span></a></div>
          </div>
          <figure className="software-visual"><img src={service.image} alt={service.imageAlt} width="1672" height="941" fetchPriority="high" decoding="async" /></figure>
        </div>
      </section>
      <section className="software-pillars" aria-label="Điểm nổi bật"><div className="container-page software-pillars__grid">{service.pillars.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong></div>)}</div></section>
      <section className="software-section" id="technology-scope"><div className="container-page"><div className="software-heading"><h2>{service.scopeHeading}</h2><p>{service.scopeIntro}</p></div><div className="software-scope-grid">{service.scope.map((item, index) => <article className="software-scope-card" key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></div></section>
      <section className="software-section software-section--soft"><div className="container-page software-outcomes"><div className="software-outcomes__copy"><h2>{service.usesHeading}</h2><p>{service.usesIntro}</p><Link className="software-text-link" to={contactLink}>Trao đổi nhu cầu của bạn <span aria-hidden="true">↗</span></Link></div><div className="software-outcomes__list">{service.uses.map((item, index) => <article key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div></div></section>
      <section className="software-section"><div className="container-page"><div className="software-heading"><h2>Triển khai từng bước, rõ mục tiêu</h2></div><div className="software-process">{service.process.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></div></section>
      <section className="software-closing"><div className="container-page software-closing__layout"><div><h2>{service.closingHeading}</h2><p>{service.closingText}</p></div><Link className="software-button" to={contactLink}>Yêu cầu tư vấn <span aria-hidden="true">↗</span></Link></div></section>
    </main>
  );
}
