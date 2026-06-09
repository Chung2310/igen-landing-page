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
    title: 'iGen Technology chính thức ra mắt Hệ sinh thái Giải pháp AI toàn diện',
    slug: 'igen-technology-ra-mat-he-sinh-thai-giai-phap-ai',
    content: `
      <h2>1. Tầm nhìn chiến lược chuyển đổi số bằng Trí tuệ Nhân tạo</h2>
      <p>Trong bối cảnh nền kinh tế số phát triển vượt bậc, việc tích hợp Trí tuệ Nhân tạo (AI) vào hoạt động sản xuất kinh doanh không còn là một lựa chọn, mà đã trở thành yếu tố sống còn giúp doanh nghiệp duy trì năng lực cạnh tranh. Nhận thức rõ điều đó, iGen Technology đã nghiên cứu và phát triển thành công Hệ sinh thái Giải pháp AI toàn diện bao gồm 4 trụ cột công nghệ chính: Website AI, Studio AI, Agency Marketing AI và Trợ lý AI.</p>
      <p>Lễ công bố diễn ra với sự tham gia của đông đảo đại diện từ các cơ quan quản lý, viện nghiên cứu và hơn 100 doanh nghiệp đối tác hàng đầu Việt Nam.</p>
      <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&auto=format&fit=crop&q=80" alt="Lễ ra mắt Hệ sinh thái AI" class="my-8 rounded-2xl w-full object-cover max-h-[400px] shadow-lg" />
      
      <h2>2. 4 Trụ cột cốt lõi định hình tương lai vận hành doanh nghiệp</h2>
      <ul>
        <li><strong>Website AI:</strong> Nền tảng web thông minh tự động tối ưu hóa giao diện (UI/UX) và nội dung theo hành vi thực tế của khách hàng, giúp gia tăng tối đa tỷ lệ chuyển đổi mua hàng một cách tự động.</li>
        <li><strong>Studio AI:</strong> Công nghệ người mẫu ảo (Virtual Models) sản xuất hình ảnh, video quảng cáo và tư liệu truyền thông chất lượng 4K chỉ trong vài giây, giảm tới 90% chi phí sản xuất truyền thống.</li>
        <li><strong>Agency Marketing AI:</strong> Hệ thống tự động thu thập thông tin thị trường, tối ưu hóa ngân sách quảng cáo đa kênh và lập kế hoạch nội dung tự động dựa trên dữ liệu lớn.</li>
        <li><strong>Trợ lý AI (AI Assistant):</strong> Đội ngũ nhân viên ảo hoạt động liên tục 24/7, hỗ trợ tư vấn chăm sóc khách hàng đa kênh và tích hợp thanh toán Auto-checkout thông minh.</li>
      </ul>
      
      <h2>3. Cam kết đồng hành cùng doanh nghiệp Việt</h2>
      <p>Phát biểu tại sự kiện, đại diện iGen Technology khẳng định: "Chúng tôi không chỉ cung cấp công nghệ, mà cung cấp giải pháp tăng trưởng thực tế. Các công cụ AI được bản địa hóa tối đa để phù hợp với ngôn ngữ, hành vi mua sắm và thói quen tiêu dùng của người Việt Nam."</p>
    `,
    excerpt: 'Giới thiệu sự kiện công bố 4 giải pháp trụ cột của iGen Tech trong việc thúc đẩy chuyển đổi số toàn diện cho doanh nghiệp Việt Nam.',
    category: 'AI Trends',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60',
    author: 'iGen Admin',
    createdAt: '2026-06-09T09:00:00.000Z',
    publishedAt: '2026-06-09T09:00:00.000Z',
  },
  {
    title: 'Cách Website AI giúp doanh nghiệp tăng 150% tỷ lệ chuyển đổi',
    slug: 'cach-website-ai-tang-ty-le-chuyen-doi',
    content: `
      <h2>1. Rào cản của những trang web truyền thống</h2>
      <p>Một website tĩnh truyền thống thường được thiết kế dựa trên cảm tính của lập trình viên hoặc nhà quản lý. Điều này dẫn đến việc giao diện không phù hợp với hành vi thực tế của đa số khách hàng truy cập, gây lãng phí chi phí marketing và làm giảm đáng kể tỷ lệ chuyển đổi đơn hàng.</p>
      <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80" alt="Phân tích dữ liệu hành vi người dùng trên Website AI" class="my-8 rounded-2xl w-full object-cover max-h-[400px] shadow-lg" />
      
      <h2>2. Giải pháp đột phá từ Website AI của iGen Technology</h2>
      <p>Website AI giải quyết triệt để vấn đề này bằng cách tích hợp trí tuệ nhân tạo trực tiếp vào mã nguồn website. Hệ thống hoạt động qua 3 giai đoạn thông minh:</p>
      <ul>
        <li><strong>Theo dõi & Phân tích hành vi:</strong> AI tự động thu thập và phân tích bản đồ nhiệt (Heatmap), cử chỉ cuộn trang và thời gian tương tác của người dùng trên từng phần của trang web.</li>
        <li><strong>Tự động điều chỉnh giao diện (CRO):</strong> Dựa trên dữ liệu thu thập, hệ thống tự động chạy các bài kiểm tra A/B testing ẩn và tinh chỉnh các nút kêu gọi hành động (CTA), vị trí banner hoặc bố cục nội dung để tối đa hóa tương tác.</li>
        <li><strong>SEO thông minh theo thời gian thực:</strong> Tự động nghiên cứu từ khóa, tạo thẻ meta, viết lại mô tả sản phẩm và tối ưu hóa cấu trúc schema để website luôn đạt thứ hạng cao nhất trên Google mà không cần nhân sự SEO thủ công.</li>
      </ul>
      
      <h2>3. Kết quả thực tiễn từ khách hàng áp dụng</h2>
      <p>Theo báo cáo thống kê từ các doanh nghiệp đã nâng cấp lên nền tảng Website AI của iGen Tech, tỷ lệ giữ chân khách hàng (Retention Rate) tăng trung bình 45%, và tỷ lệ chuyển đổi mua hàng (Conversion Rate) ghi nhận mức tăng trưởng đột phá lên tới 150% chỉ sau 3 tháng vận hành.</p>
    `,
    excerpt: 'Phân tích giải pháp tự động hóa thiết kế giao diện UI/UX và tối ưu SEO sâu bằng trí tuệ nhân tạo để bứt phá doanh số.',
    category: 'Tech Insights',
    thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop&q=60',
    author: 'iGen Admin',
    createdAt: '2026-06-08T09:00:00.000Z',
    publishedAt: '2026-06-08T09:00:00.000Z',
  },
  {
    title: 'Studio AI: Cuộc cách mạng sản xuất hình ảnh quảng cáo bằng Người mẫu ảo',
    slug: 'studio-ai-san-xuat-hinh-anh-nguoi-mau-ao',
    content: `
      <h2>1. Chi phí sản xuất hình ảnh truyền thống - Gánh nặng của doanh nghiệp bán lẻ</h2>
      <p>Đối với ngành thời trang và thương mại điện tử, việc liên tục chụp ảnh sản phẩm mới là vô cùng tốn kém. Chi phí thuê người mẫu, nhiếp ảnh gia, thuê studio, trang điểm và hậu kỳ hình ảnh có thể chiếm tới 30-40% ngân sách vận hành ban đầu của một bộ sưu tập mới.</p>
      <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=80" alt="Người mẫu ảo 3D sản xuất bởi Studio AI" class="my-8 rounded-2xl w-full object-cover max-h-[400px] shadow-lg" />
      
      <h2>2. Giải pháp Studio AI: Tạo ảnh mẫu chuẩn 4K trong 5 giây</h2>
      <p>Công nghệ Studio AI của iGen Technology cho phép doanh nghiệp tạo ra hình ảnh sản phẩm với độ chân thực tuyệt đối mà không cần qua bất kỳ công đoạn chụp ảnh thực tế nào:</p>
      <ul>
        <li><strong>Người mẫu ảo đa dạng:</strong> Doanh nghiệp chỉ cần tải lên ảnh chụp phẳng của trang phục. AI sẽ tự động mặc bộ trang phục đó lên một người mẫu ảo có thể tùy chỉnh giới tính, độ tuổi, màu da, quốc tịch và biểu cảm khuôn mặt.</li>
        <li><strong>Bối cảnh 3D vô hạn:</strong> AI tự động tách nền và ghép sản phẩm vào những bối cảnh sang trọng từ bãi biển nhiệt đới, đường phố Paris cho đến phòng khách hiện đại tùy theo ý muốn.</li>
        <li><strong>Sản xuất video hàng loạt:</strong> Tự động chuyển đổi kịch bản viết tay thành video giới thiệu sản phẩm sống động với giọng nói AI truyền cảm và phụ đề tự động chạy mượt mà.</li>
      </ul>
      
      <h2>3. Tối ưu hóa chi phí đến 90%</h2>
      <p>Nhờ Studio AI, thời gian ra mắt hình ảnh sản phẩm mới giảm từ 1-2 tuần xuống chỉ còn vài phút. Doanh nghiệp tiết kiệm được hơn 90% chi phí sản xuất hình ảnh, giúp đẩy nhanh tốc độ tiếp cận thị trường và tăng khả năng cạnh tranh vượt bậc.</p>
    `,
    excerpt: 'Ứng dụng mô hình AI tạo mẫu ảnh và video 4K tự động giúp tiết kiệm đến 90% chi phí sản xuất tài nguyên quảng cáo cho doanh nghiệp thời trang và bán lẻ.',
    category: 'AI Trends',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=60',
    author: 'iGen Admin',
    createdAt: '2026-06-07T09:00:00.000Z',
    publishedAt: '2026-06-07T09:00:00.000Z',
  },
  {
    title: 'Trợ lý AI Thế hệ mới: Tự động hóa Chăm sóc khách hàng và Auto-Checkout',
    slug: 'tro-ly-ai-tu-dong-hoa-cham-soc-khach-hang-247',
    content: `
      <h2>1. CSKH 24/7: Bài toán nhân sự khó giải của doanh nghiệp</h2>
      <p>Khách hàng trực tuyến có thói quen mua sắm vào ban đêm và cuối tuần. Nếu doanh nghiệp không phản hồi tin nhắn tư vấn trong vòng 5 phút, tỷ lệ khách hàng bỏ sang đối thủ cạnh tranh lên tới 80%. Tuy nhiên, việc duy trì đội ngũ trực chat 24/7 tốn rất nhiều chi phí nhân sự và khó kiểm soát chất lượng câu trả lời.</p>
      <img src="https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1000&auto=format&fit=crop&q=80" alt="Trợ lý ảo hỗ trợ CSKH và Auto-Checkout 24/7" class="my-8 rounded-2xl w-full object-cover max-h-[400px] shadow-lg" />
      
      <h2>2. Trợ lý AI thế hệ mới từ iGen Technology</h2>
      <p>Được xây dựng trên nền tảng học sâu và xử lý ngôn ngữ tự nhiên tiếng Việt chuyên sâu, Trợ lý AI của iGen mang lại trải nghiệm tương tác tự nhiên như người thật:</p>
      <ul>
        <li><strong>Tự động trả lời đa kênh:</strong> Hoạt động đồng bộ trên Website, Fanpage Facebook, Zalo OA, Instagram và Telegram. Đọc hiểu được các từ viết tắt, tiếng lóng và ngữ cảnh phức tạp của khách hàng.</li>
        <li><strong>Tự động thanh toán (Auto-Checkout):</strong> Không chỉ dừng lại ở tư vấn, Trợ lý AI tích hợp trực tiếp với cổng thanh toán điện tử (Momo, VNPAY, chuyển khoản ngân hàng qua mã QR động). AI có thể tự chốt đơn, gửi link thanh toán, kiểm tra giao dịch thành công và tạo vận đơn trên hệ thống giao hàng hoàn toàn tự động.</li>
        <li><strong>Gợi ý sản phẩm thông minh (Up-sell/Cross-sell):</strong> Dựa trên nhu cầu trò chuyện của khách hàng, AI phân tích hành vi và đề xuất thêm các sản phẩm đi kèm phù hợp để gia tăng giá trị đơn hàng trung bình.</li>
      </ul>
      
      <h2>3. Tăng trưởng doanh thu đột phá</h2>
      <p>Sự hiện diện của Trợ lý AI giúp doanh nghiệp đảm bảo không bỏ sót bất kỳ khách hàng nào, đồng thời giảm tải 85% công việc cho đội ngũ nhân sự chăm sóc khách hàng truyền thống, mở ra cơ hội tăng trưởng doanh thu liên tục ngay cả khi doanh nghiệp đang ngủ.</p>
    `,
    excerpt: 'Giải pháp nhân viên ảo đa kênh tích hợp cổng thanh toán trực tuyến giúp tối đa hóa hiệu suất kinh doanh và tối ưu chi phí nhân sự.',
    category: 'Tech Insights',
    thumbnail: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?w=800&auto=format&fit=crop&q=60',
    author: 'iGen Admin',
    createdAt: '2026-06-06T09:00:00.000Z',
    publishedAt: '2026-06-06T09:00:00.000Z',
  },
  {
    title: 'Case Study: Viện Quốc tế Luxdefa bứt phá doanh số với Agency Marketing AI',
    slug: 'case-study-luxdefa-agency-marketing-ai',
    content: `
      <h2>1. Thách thức của Viện Quốc tế Luxdefa</h2>
      <p>Viện Quốc tế Luxdefa là đơn vị hàng đầu trong lĩnh vực làm đẹp và chăm sóc sức khỏe cao cấp. Với đặc thù phân khúc khách hàng thượng lưu, việc tiếp cận khách hàng tiềm năng qua các kênh quảng cáo truyền thống ngày càng trở nên đắt đỏ. Chi phí trên mỗi số điện thoại quan tâm (CPL) tăng cao liên tục trong khi tỷ lệ chuyển đổi thực tế giảm sút.</p>
      <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1000&auto=format&fit=crop&q=80" alt="Không gian sang trọng tại Viện Quốc tế Luxdefa" class="my-8 rounded-2xl w-full object-cover max-h-[400px] shadow-lg" />
      
      <h2>2. Giải pháp đột phá từ iGen Agency Marketing AI</h2>
      <p>iGen Technology đã triển khai giải pháp Agency Marketing tích hợp trí tuệ nhân tạo toàn diện cho Luxdefa:</p>
      <ul>
        <li><strong>Quét và phân tích xu hướng:</strong> Hệ thống AI quét toàn bộ dữ liệu thảo luận trên mạng xã hội liên quan đến xu hướng làm đẹp để tự động lên kế hoạch nội dung hàng tuần.</li>
        <li><strong>Tự động phân bổ ngân sách:</strong> Thuật toán AI theo dõi hiệu quả quảng cáo theo thời gian thực, tự động tăng ngân sách vào các nhóm quảng cáo hiệu quả và tắt các chiến dịch kém chất lượng trên Google Ads, Facebook Ads và TikTok Ads.</li>
        <li><strong>Tự sinh banner và thông điệp:</strong> Sử dụng Studio AI tạo ra hàng loạt phiên bản thiết kế và thông điệp khác nhau để tối ưu hóa trải nghiệm cho từng nhóm đối tượng khách hàng mục tiêu riêng biệt.</li>
      </ul>
      
      <h2>3. Những con số ấn tượng</h2>
      <p>Sau 2 tháng áp dụng giải pháp Agency Marketing AI của iGen Tech, Viện Quốc tế Luxdefa đã đạt được những kết quả đáng kinh ngạc:</p>
      <ul>
        <li>Chi phí quảng cáo trên mỗi khách hàng tiềm năng (CPL) giảm tới 40%.</li>
        <li>Số lượng khách hàng đặt lịch hẹn thành công qua hệ thống tăng 65%.</li>
        <li>Doanh số tổng thể tăng trưởng 120% so với quý trước đó, chứng minh hiệu quả vượt trội của việc ứng dụng AI vào tối ưu hóa tiếp thị kỹ thuật số.</li>
      </ul>
    `,
    excerpt: 'Kết quả thực tế từ sự kết hợp của iGen Tech và Viện Quốc tế Luxdefa trong việc áp dụng AI tối ưu hóa ngân sách và quảng cáo đa kênh.',
    category: 'Case Study',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    author: 'iGen Admin',
    createdAt: '2026-06-05T09:00:00.000Z',
    publishedAt: '2026-06-05T09:00:00.000Z',
  },
  {
    title: 'iGen Technology ký kết hợp tác chiến lược cùng các đối tác doanh nghiệp lớn',
    slug: 'igen-technology-ky-ket-hop-tac-chien-luoc',
    content: `
      <h2>1. Cột mốc quan trọng thúc đẩy chuyển đổi số toàn diện</h2>
      <p>Vừa qua, iGen Technology đã tổ chức thành công Lễ ký kết thỏa thuận hợp tác chiến lược giai đoạn 2026 - 2030 với 4 doanh nghiệp lớn trong các lĩnh vực làm đẹp, sản xuất và y dược. Sự kiện đánh dấu bước tiến quan trọng của iGen Tech trong việc đưa các giải pháp Trí tuệ nhân tạo ứng dụng sâu vào thực tiễn kinh doanh và sản xuất tại Việt Nam.</p>
      <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1000&auto=format&fit=crop&q=80" alt="Lễ ký kết hợp tác chiến lược iGen Tech" class="my-8 rounded-2xl w-full object-cover max-h-[400px] shadow-lg" />
      
      <h2>2. Nội dung hợp tác chiến lược với các đối tác</h2>
      <ul>
        <li><strong>Viện Quốc tế Luxdefa:</strong> iGen Tech triển khai toàn bộ giải pháp Agency Marketing AI và Trợ lý AI hỗ trợ tư vấn chăm sóc khách hàng VIP tự động, giúp nâng cao chất lượng dịch vụ chuẩn quốc tế của Luxdefa.</li>
        <li><strong>Company TNHH Sản xuất Nhôm đúc:</strong> Áp dụng công nghệ thiết kế AI tự động dựng phối cảnh 3D các mẫu nhôm đúc mỹ thuật theo yêu cầu riêng biệt của khách hàng chỉ trong 10 giây, giảm thiểu quy trình thiết kế thủ công tốn thời gian.</li>
        <li><strong>Công ty Cổ phần Sâm Ngọc Linh:</strong> Xây dựng hệ thống Website AI và giải pháp truy xuất nguồn gốc sản phẩm bằng AI Vision, giúp bảo vệ thương hiệu và nâng cao uy tín cho dược liệu quý của Việt Nam.</li>
        <li><strong>Công ty xe điện Kaishi Việt Nhật:</strong> Tích hợp Trợ lý ảo AI thông minh trên hệ thống màn hình điều khiển của các dòng xe điện thế hệ mới, hỗ trợ người lái tương tác bằng giọng nói tiếng Việt tự nhiên và điều hướng thông minh.</li>
      </ul>
      
      <h2>3. Cùng nhau kiến tạo tương lai số</h2>
      <p>Đại diện các bên đối tác bày tỏ niềm tin vững chắc vào năng lực công nghệ và đội ngũ chuyên gia của iGen Technology. Sự kết hợp giữa năng lực sản xuất, dịch vụ cốt lõi của các doanh nghiệp truyền thống và sức mạnh công nghệ AI đột phá từ iGen Tech hứa hẹn sẽ mang đến những sản phẩm, dịch vụ tốt nhất cho người tiêu dùng Việt Nam.</p>
    `,
    excerpt: 'Lễ ký kết hợp tác chuyển đổi số toàn diện giữa iGen Tech với Viện Quốc tế Luxdefa, Công ty sản xuất nhôm đúc, Công ty Cổ phần Sâm Ngọc Linh và Công ty xe điện Kaishi Việt Nhật.',
    category: 'Case Study',
    thumbnail: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60',
    author: 'iGen Admin',
    createdAt: '2026-06-04T09:00:00.000Z',
    publishedAt: '2026-06-04T09:00:00.000Z',
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
