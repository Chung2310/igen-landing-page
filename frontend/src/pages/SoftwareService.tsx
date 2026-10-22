import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SoftwareService.css';

type Point = { title: string; description: string };
type SoftwareServiceData = {
  name: string;
  headline: string;
  highlight: string;
  intro: string;
  visual: 'mobile' | 'web' | 'testing' | 'design' | 'remote' | 'team' | 'managed';
  pillars: string[];
  scopeHeading: string;
  scopeIntro: string;
  scope: Point[];
  outcomesHeading: string;
  outcomesIntro: string;
  outcomes: Point[];
  benefitsHeading: string;
  benefits: Point[];
  process: Point[];
  closingHeading: string;
  closingText: string;
};

const services: Record<string, SoftwareServiceData> = {
  'trung-tam-phat-trien-phan-mem-tu-xa': {
    name: 'Trung tâm phát triển phần mềm từ xa',
    headline: 'Mở rộng năng lực phát triển với',
    highlight: 'một đội ngũ phối hợp từ xa',
    intro: 'iGen tổ chức nhóm phát triển từ xa theo phạm vi và cách làm việc đã thống nhất, giúp doanh nghiệp bổ sung năng lực triển khai mà vẫn theo dõi được tiến độ và chất lượng.',
    visual: 'remote',
    pillars: ['Đúng năng lực', 'Quy trình chung', 'Tiến độ rõ ràng', 'Linh hoạt mở rộng'],
    scopeHeading: 'Một cách phối hợp rõ từ đầu',
    scopeIntro: 'Nhóm từ xa được tổ chức quanh mục tiêu sản phẩm, trách nhiệm và nhịp trao đổi của dự án.',
    scope: [
      { title: 'Xác định nhu cầu', description: 'Làm rõ sản phẩm, khối lượng công việc và năng lực cần bổ sung.' },
      { title: 'Tổ chức đội ngũ', description: 'Chọn vai trò phù hợp và thống nhất đầu mối phối hợp.' },
      { title: 'Thiết lập cách làm việc', description: 'Thống nhất công cụ, lịch trao đổi, bàn giao và tiêu chí hoàn thành.' },
      { title: 'Triển khai & rà soát', description: 'Theo dõi kết quả theo từng giai đoạn và điều chỉnh khi ưu tiên thay đổi.' },
    ],
    outcomesHeading: 'Phù hợp với nhiều giai đoạn phát triển',
    outcomesIntro: 'Phạm vi có thể bắt đầu từ một nhóm nhiệm vụ và mở rộng theo nhu cầu thực tế.',
    outcomes: [
      { title: 'Phát triển tính năng mới', description: 'Bổ sung năng lực thiết kế, lập trình và kiểm thử cho lộ trình sản phẩm.' },
      { title: 'Nâng cấp hệ thống', description: 'Cải tiến giao diện, hiệu năng hoặc các phần đang cần thay đổi.' },
      { title: 'Duy trì sản phẩm', description: 'Xử lý lỗi và phát triển tiếp sau khi hệ thống đi vào sử dụng.' },
    ],
    benefitsHeading: 'Tăng năng lực triển khai mà vẫn giữ sự chủ động.',
    benefits: [
      { title: 'Vai trò rõ ràng', description: 'Mỗi bên hiểu phần việc, đầu mối và kết quả cần bàn giao.' },
      { title: 'Dễ theo dõi', description: 'Công việc được chia theo ưu tiên và cập nhật trong nhịp phối hợp thống nhất.' },
      { title: 'Thay đổi có kiểm soát', description: 'Phạm vi đội ngũ có thể điều chỉnh theo giai đoạn phát triển của sản phẩm.' },
    ],
    process: [
      { title: 'Trao đổi', description: 'Hiểu sản phẩm và nhu cầu.' },
      { title: 'Thiết lập', description: 'Chọn đội ngũ, cách phối hợp.' },
      { title: 'Triển khai', description: 'Phát triển theo ưu tiên.' },
      { title: 'Đánh giá', description: 'Rà soát kết quả, điều chỉnh.' },
    ],
    closingHeading: 'Cần thêm năng lực phát triển cho dự án?',
    closingText: 'Chia sẻ sản phẩm và khối lượng công việc hiện tại. iGen sẽ cùng bạn xác định mô hình phối hợp phù hợp.',
  },
  'doi-ngu-chuyen-trach': {
    name: 'Đội ngũ chuyên trách',
    headline: 'Một đội ngũ tập trung vào',
    highlight: 'mục tiêu sản phẩm của bạn',
    intro: 'iGen xây dựng đội ngũ chuyên trách theo năng lực dự án cần, phối hợp cùng doanh nghiệp trong một lộ trình thống nhất từ phát triển đến cải tiến sản phẩm.',
    visual: 'team',
    pillars: ['Tập trung mục tiêu', 'Vai trò phù hợp', 'Phối hợp liên tục', 'Hiểu sản phẩm sâu'],
    scopeHeading: 'Đội ngũ được tổ chức theo bài toán của bạn',
    scopeIntro: 'Cấu trúc nhóm, trách nhiệm và cách báo cáo được thống nhất trước khi bắt đầu.',
    scope: [
      { title: 'Làm rõ mục tiêu', description: 'Xác định sản phẩm, giai đoạn và kết quả cần đạt.' },
      { title: 'Ghép năng lực', description: 'Chọn các vai trò phù hợp với phần việc ưu tiên.' },
      { title: 'Bắt nhịp dự án', description: 'Thống nhất tài liệu, quy trình và kênh trao đổi với đội ngũ hiện có.' },
      { title: 'Đồng hành phát triển', description: 'Triển khai theo kế hoạch và rà soát kết quả thường xuyên.' },
    ],
    outcomesHeading: 'Một đội ngũ cho hành trình sản phẩm',
    outcomesIntro: 'Mô hình chuyên trách phù hợp khi doanh nghiệp cần phát triển liên tục và giữ mạch hiểu biết về sản phẩm.',
    outcomes: [
      { title: 'Sản phẩm mới', description: 'Thiết kế, xây dựng và kiểm thử phiên bản đầu theo ưu tiên.' },
      { title: 'Sản phẩm đang phát triển', description: 'Mở rộng tính năng theo phản hồi của người dùng và nhu cầu kinh doanh.' },
      { title: 'Đội ngũ nội bộ cần hỗ trợ', description: 'Phối hợp trên cùng kế hoạch, tài liệu và quy trình bàn giao.' },
    ],
    benefitsHeading: 'Giữ nhịp làm việc, giữ hiểu biết về sản phẩm.',
    benefits: [
      { title: 'Tập trung hơn', description: 'Đội ngũ bám sát mục tiêu và ưu tiên đã thống nhất.' },
      { title: 'Phối hợp thuận hơn', description: 'Cách trao đổi và bàn giao được duy trì xuyên suốt các giai đoạn.' },
      { title: 'Linh hoạt theo lộ trình', description: 'Vai trò và phạm vi có thể điều chỉnh khi sản phẩm phát triển.' },
    ],
    process: [
      { title: 'Xác định', description: 'Làm rõ mục tiêu và vai trò.' },
      { title: 'Tổ chức', description: 'Thiết lập đội ngũ phù hợp.' },
      { title: 'Phối hợp', description: 'Triển khai theo nhịp chung.' },
      { title: 'Cải tiến', description: 'Đánh giá và điều chỉnh.' },
    ],
    closingHeading: 'Bạn cần một đội ngũ tập trung cho sản phẩm?',
    closingText: 'Cho iGen biết mục tiêu và giai đoạn hiện tại. Chúng ta sẽ cùng xác định những vai trò cần thiết.',
  },
  'dich-vu-quan-ly-he-thong-it': {
    name: 'Dịch vụ quản lý hệ thống IT',
    headline: 'Hệ thống được theo dõi để',
    highlight: 'vận hành ổn định hơn',
    intro: 'iGen hỗ trợ theo dõi, bảo trì và xử lý các vấn đề vận hành hệ thống IT theo phạm vi thống nhất, giúp doanh nghiệp nhìn rõ trạng thái dịch vụ đang sử dụng.',
    visual: 'managed',
    pillars: ['Theo dõi trạng thái', 'Xử lý sự cố', 'Bảo trì định kỳ', 'Báo cáo rõ ràng'],
    scopeHeading: 'Chăm sóc hệ thống theo phạm vi rõ ràng',
    scopeIntro: 'Bắt đầu bằng việc xác định thành phần cần quản lý và mức hỗ trợ phù hợp với hoạt động của doanh nghiệp.',
    scope: [
      { title: 'Rà soát hiện trạng', description: 'Ghi nhận hệ thống, điểm kết nối và rủi ro vận hành cần chú ý.' },
      { title: 'Thiết lập theo dõi', description: 'Chọn chỉ số và cách nhận thông tin khi có vấn đề.' },
      { title: 'Hỗ trợ vận hành', description: 'Phân loại yêu cầu, phối hợp xử lý sự cố theo trách nhiệm đã thống nhất.' },
      { title: 'Bảo trì & cải tiến', description: 'Rà soát định kỳ và đề xuất điều chỉnh theo tình hình sử dụng.' },
    ],
    outcomesHeading: 'Tập trung vào những thành phần quan trọng',
    outcomesIntro: 'Danh mục hệ thống cần quản lý được thống nhất theo hạ tầng và ứng dụng thực tế.',
    outcomes: [
      { title: 'Ứng dụng doanh nghiệp', description: 'Theo dõi trạng thái và hỗ trợ các vấn đề trong quá trình sử dụng.' },
      { title: 'Máy chủ & dịch vụ đám mây', description: 'Rà soát tài nguyên, kết nối và các điểm cần bảo trì.' },
      { title: 'Sao lưu & quyền truy cập', description: 'Kiểm tra quy trình dữ liệu và quyền sử dụng theo phạm vi đã thống nhất.' },
    ],
    benefitsHeading: 'Vận hành rõ ràng giúp xử lý vấn đề kịp thời.',
    benefits: [
      { title: 'Dễ nắm trạng thái', description: 'Người phụ trách có thông tin về các thành phần đang được theo dõi.' },
      { title: 'Có đầu mối xử lý', description: 'Yêu cầu hỗ trợ được tiếp nhận và phân loại theo quy trình chung.' },
      { title: 'Chủ động bảo trì', description: 'Các điểm cần cải thiện được ghi nhận để lên kế hoạch phù hợp.' },
    ],
    process: [
      { title: 'Đánh giá', description: 'Hiểu hệ thống và ưu tiên.' },
      { title: 'Thiết lập', description: 'Thống nhất phạm vi theo dõi.' },
      { title: 'Vận hành', description: 'Tiếp nhận và xử lý yêu cầu.' },
      { title: 'Rà soát', description: 'Báo cáo và cải tiến.' },
    ],
    closingHeading: 'Muốn hệ thống IT được quản lý rõ ràng hơn?',
    closingText: 'Chia sẻ hạ tầng và ứng dụng đang sử dụng. iGen sẽ cùng bạn xác định phạm vi hỗ trợ phù hợp.',
  },
  'phat-trien-ung-dung-di-dong': {
    name: 'Phát triển ứng dụng di động',
    headline: 'Một ứng dụng hữu ích bắt đầu từ',
    highlight: 'trải nghiệm người dùng',
    intro: 'iGen thiết kế và phát triển ứng dụng di động theo nhu cầu thực tế của doanh nghiệp, từ luồng thao tác cốt lõi đến kết nối với hệ thống đang vận hành.',
    visual: 'mobile',
    pillars: ['Trải nghiệm rõ ràng', 'Phù hợp nghiệp vụ', 'Kết nối dữ liệu', 'Tiếp tục cải tiến'],
    scopeHeading: 'Từ ý tưởng đến ứng dụng có thể sử dụng',
    scopeIntro: 'Mỗi dự án được xác định phạm vi theo người dùng, mục tiêu và hệ thống cần kết nối.',
    scope: [
      { title: 'Khảo sát & định hướng', description: 'Làm rõ nhóm người dùng, hành trình và chức năng ưu tiên.' },
      { title: 'Thiết kế giao diện', description: 'Xây dựng màn hình và luồng thao tác dễ hiểu trên thiết bị di động.' },
      { title: 'Phát triển ứng dụng', description: 'Triển khai tính năng, phân quyền và kết nối dữ liệu theo phạm vi đã thống nhất.' },
      { title: 'Kiểm thử & hoàn thiện', description: 'Rà soát trải nghiệm trên thiết bị, xử lý lỗi và chuẩn bị phát hành.' },
    ],
    outcomesHeading: 'Một nền tảng, nhiều tình huống sử dụng',
    outcomesIntro: 'Ứng dụng được thiết kế theo hành trình cụ thể, thay vì một bộ tính năng cố định.',
    outcomes: [
      { title: 'Ứng dụng cho khách hàng', description: 'Đặt lịch, theo dõi yêu cầu, nhận thông báo và tương tác với doanh nghiệp.' },
      { title: 'Ứng dụng cho đội ngũ', description: 'Cập nhật công việc, tra cứu thông tin và phối hợp khi làm việc ngoài văn phòng.' },
      { title: 'Ứng dụng kết nối hệ thống', description: 'Đưa dữ liệu từ ERP, CRM hoặc công cụ nội bộ đến đúng người dùng.' },
    ],
    benefitsHeading: 'Dễ dùng từ lần đầu. Sẵn sàng phát triển về sau.',
    benefits: [
      { title: 'Ít thao tác hơn', description: 'Các tác vụ quan trọng được đặt ở nơi người dùng dễ tìm và dễ hoàn thành.' },
      { title: 'Thông tin đúng lúc', description: 'Người dùng theo dõi dữ liệu và trạng thái công việc ở nơi họ cần.' },
      { title: 'Mở rộng có chủ đích', description: 'Chức năng mới được bổ sung theo phản hồi và kết quả sử dụng thực tế.' },
    ],
    process: [
      { title: 'Khám phá', description: 'Hiểu người dùng và mục tiêu.' },
      { title: 'Thiết kế', description: 'Thống nhất luồng và giao diện.' },
      { title: 'Xây dựng', description: 'Phát triển, kết nối, kiểm thử.' },
      { title: 'Cải tiến', description: 'Theo dõi phản hồi sau phát hành.' },
    ],
    closingHeading: 'Bạn đang có ý tưởng cho một ứng dụng?',
    closingText: 'Chia sẻ bối cảnh và nhóm người dùng. iGen sẽ cùng bạn xác định phiên bản nên bắt đầu.',
  },
  'phat-trien-ung-dung-web': {
    name: 'Phát triển ứng dụng web',
    headline: 'Công cụ làm việc được xây quanh',
    highlight: 'quy trình của bạn',
    intro: 'iGen phát triển ứng dụng web giúp tổ chức dữ liệu, công việc và tương tác trên một trải nghiệm thống nhất, phù hợp với cách doanh nghiệp vận hành.',
    visual: 'web',
    pillars: ['Luồng việc mạch lạc', 'Dữ liệu tập trung', 'Truy cập linh hoạt', 'Dễ mở rộng'],
    scopeHeading: 'Xây đúng công cụ cho đúng công việc',
    scopeIntro: 'Ứng dụng web được triển khai từ những tác vụ mang lại giá trị rõ nhất.',
    scope: [
      { title: 'Phân tích quy trình', description: 'Xác định người dùng, vai trò và các bước xử lý quan trọng.' },
      { title: 'Thiết kế trải nghiệm', description: 'Sắp xếp thông tin và thao tác theo ngữ cảnh sử dụng.' },
      { title: 'Phát triển hệ thống', description: 'Xây dựng chức năng, phân quyền và luồng dữ liệu cần thiết.' },
      { title: 'Tích hợp & kiểm thử', description: 'Kết nối công cụ liên quan, rà soát tính ổn định trước triển khai.' },
    ],
    outcomesHeading: 'Một ứng dụng web có thể phục vụ nhiều nhu cầu',
    outcomesIntro: 'Phạm vi được chọn theo bài toán thực tế và có thể phát triển tiếp khi nhu cầu thay đổi.',
    outcomes: [
      { title: 'Cổng làm việc nội bộ', description: 'Quản lý yêu cầu, quy trình và thông tin giữa các bộ phận.' },
      { title: 'Nền tảng cho khách hàng', description: 'Cho phép khách hàng gửi yêu cầu, tra cứu và theo dõi tiến độ.' },
      { title: 'Bảng điều hành', description: 'Tập hợp dữ liệu và chỉ số để người quản lý theo dõi hoạt động.' },
    ],
    benefitsHeading: 'Thông tin rõ hơn. Phối hợp thuận hơn.',
    benefits: [
      { title: 'Một nơi để làm việc', description: 'Dữ liệu và tác vụ liên quan được đưa vào cùng một luồng sử dụng.' },
      { title: 'Phân quyền rõ ràng', description: 'Mỗi vai trò nhìn thấy thông tin và thao tác phù hợp với trách nhiệm.' },
      { title: 'Dễ thích nghi', description: 'Hệ thống có thể bổ sung chức năng theo quy mô và quy trình mới.' },
    ],
    process: [
      { title: 'Khảo sát', description: 'Hiểu mục tiêu và người dùng.' },
      { title: 'Thiết kế', description: 'Mô tả luồng và giao diện.' },
      { title: 'Triển khai', description: 'Phát triển và kiểm thử.' },
      { title: 'Đồng hành', description: 'Hướng dẫn và cải tiến.' },
    ],
    closingHeading: 'Cần một ứng dụng web phù hợp với quy trình?',
    closingText: 'Hãy cho iGen biết công việc đang mất nhiều thời gian nhất. Chúng ta sẽ xác định điểm bắt đầu phù hợp.',
  },
  'kiem-thu-phan-mem-tu-dong': {
    name: 'Kiểm thử phần mềm tự động',
    headline: 'Phát hành tự tin hơn với',
    highlight: 'quy trình kiểm thử rõ ràng',
    intro: 'iGen xây dựng kịch bản và quy trình kiểm thử tự động cho những luồng quan trọng, giúp đội ngũ nhận biết lỗi sớm trong mỗi lần thay đổi phần mềm.',
    visual: 'testing',
    pillars: ['Ưu tiên luồng chính', 'Kiểm tra lặp lại', 'Phát hiện sớm', 'Báo cáo dễ hiểu'],
    scopeHeading: 'Kiểm thử tập trung vào rủi ro thực tế',
    scopeIntro: 'Không phải mọi thao tác đều cần tự động hóa. iGen chọn các luồng đáng kiểm tra thường xuyên nhất.',
    scope: [
      { title: 'Đánh giá hiện trạng', description: 'Xem cách sản phẩm được phát triển, kiểm tra và phát hành.' },
      { title: 'Thiết kế kịch bản', description: 'Chọn các tình huống quan trọng và xác định kết quả mong đợi.' },
      { title: 'Tự động hóa kiểm thử', description: 'Xây dựng bài kiểm tra có thể chạy lại khi phần mềm thay đổi.' },
      { title: 'Báo cáo & bảo trì', description: 'Theo dõi kết quả, rà soát lỗi và cập nhật kịch bản khi tính năng đổi.' },
    ],
    outcomesHeading: 'Kiểm tra đúng chỗ, giảm việc lặp lại',
    outcomesIntro: 'Bộ kiểm thử được tổ chức theo sản phẩm và mức độ quan trọng của từng chức năng.',
    outcomes: [
      { title: 'Luồng người dùng', description: 'Kiểm tra các bước quan trọng từ đăng nhập đến hoàn tất tác vụ.' },
      { title: 'Tích hợp dữ liệu', description: 'Rà soát điểm giao tiếp giữa các thành phần và hệ thống liên quan.' },
      { title: 'Kiểm tra sau thay đổi', description: 'Chạy lại các kịch bản cốt lõi khi cập nhật hoặc chuẩn bị phát hành.' },
    ],
    benefitsHeading: 'Thấy vấn đề sớm, quyết định phát hành rõ hơn.',
    benefits: [
      { title: 'Giảm công việc lặp', description: 'Các bước kiểm tra thường xuyên có thể chạy lại theo cùng một cách.' },
      { title: 'Phản hồi nhanh', description: 'Đội ngũ thấy chức năng nào bị ảnh hưởng sau một thay đổi.' },
      { title: 'Chất lượng có thể theo dõi', description: 'Kết quả kiểm thử được lưu và trình bày để cùng đánh giá.' },
    ],
    process: [
      { title: 'Rà soát', description: 'Xác định rủi ro và ưu tiên.' },
      { title: 'Thiết kế', description: 'Viết kịch bản kiểm tra.' },
      { title: 'Tự động hóa', description: 'Xây và chạy bài kiểm thử.' },
      { title: 'Duy trì', description: 'Cập nhật theo sản phẩm.' },
    ],
    closingHeading: 'Muốn biết nên tự động hóa kiểm thử từ đâu?',
    closingText: 'Chia sẻ quy trình phát hành hiện tại. iGen sẽ cùng bạn chọn những luồng cần ưu tiên.',
  },
  'thiet-ke-ui-ux': {
    name: 'Thiết kế UI/UX',
    headline: 'Trải nghiệm tốt bắt đầu từ việc',
    highlight: 'hiểu người dùng',
    intro: 'iGen thiết kế giao diện và hành trình sử dụng cho sản phẩm số, giúp người dùng hiểu nhanh, thao tác thuận và doanh nghiệp truyền tải đúng giá trị.',
    visual: 'design',
    pillars: ['Hiểu người dùng', 'Luồng dễ theo', 'Giao diện nhất quán', 'Kiểm chứng sớm'],
    scopeHeading: 'Thiết kế từ nhu cầu, không từ màn hình trống',
    scopeIntro: 'Mỗi quyết định giao diện đều bắt đầu bằng mục tiêu, ngữ cảnh và việc người dùng cần hoàn thành.',
    scope: [
      { title: 'Tìm hiểu người dùng', description: 'Xác định nhu cầu, khó khăn và bối cảnh sử dụng sản phẩm.' },
      { title: 'Sắp xếp hành trình', description: 'Làm rõ cấu trúc thông tin và các bước thao tác chính.' },
      { title: 'Thiết kế giao diện', description: 'Tạo màn hình, thành phần và quy tắc hiển thị nhất quán.' },
      { title: 'Tạo mẫu & rà soát', description: 'Dùng bản mẫu để kiểm tra ý tưởng trước khi phát triển.' },
    ],
    outcomesHeading: 'Bộ thiết kế có thể đi vào phát triển',
    outcomesIntro: 'Đầu ra được thống nhất theo phạm vi dự án, từ luồng tổng thể đến chi tiết màn hình.',
    outcomes: [
      { title: 'Sơ đồ hành trình', description: 'Cho thấy các bước chính và điểm cần cải thiện trong trải nghiệm.' },
      { title: 'Bản mẫu tương tác', description: 'Giúp các bên xem và thử luồng sử dụng trước khi xây dựng.' },
      { title: 'Hệ thống giao diện', description: 'Các thành phần và quy tắc giúp sản phẩm giữ tính nhất quán.' },
    ],
    benefitsHeading: 'Một giao diện rõ ràng giúp mọi bước dễ hơn.',
    benefits: [
      { title: 'Dễ bắt đầu', description: 'Người dùng nhanh chóng nhận ra việc cần làm và cách thực hiện.' },
      { title: 'Ít nhầm lẫn', description: 'Thông tin, trạng thái và phản hồi được trình bày đúng ngữ cảnh.' },
      { title: 'Dễ phát triển tiếp', description: 'Quy tắc thiết kế thống nhất giúp bổ sung màn hình mới thuận lợi hơn.' },
    ],
    process: [
      { title: 'Tìm hiểu', description: 'Hiểu mục tiêu và người dùng.' },
      { title: 'Định hình', description: 'Xây cấu trúc và luồng.' },
      { title: 'Thiết kế', description: 'Tạo giao diện và bản mẫu.' },
      { title: 'Hoàn thiện', description: 'Rà soát và bàn giao.' },
    ],
    closingHeading: 'Sản phẩm của bạn đang cần một trải nghiệm rõ hơn?',
    closingText: 'Chia sẻ màn hình hoặc ý tưởng hiện có. iGen sẽ cùng bạn nhìn lại hành trình người dùng.',
  },
};

const visualAssets: Record<SoftwareServiceData['visual'], { src: string; alt: string }> = {
  mobile: { src: '/service-illustrations/mobile-app.png', alt: 'Minh họa ứng dụng di động trên điện thoại' },
  web: { src: '/service-illustrations/web-app.png', alt: 'Minh họa bảng điều hành ứng dụng web trên laptop' },
  testing: { src: '/service-illustrations/automated-testing.png', alt: 'Minh họa báo cáo kiểm thử phần mềm tự động' },
  design: { src: '/service-illustrations/ui-ux-design.png', alt: 'Minh họa không gian thiết kế giao diện UI/UX' },
  remote: { src: '/service-illustrations/remote-development-center.png', alt: 'Minh họa trung tâm phát triển phần mềm kết nối từ xa' },
  team: { src: '/service-illustrations/dedicated-team.png', alt: 'Minh họa đội ngũ chuyên trách phối hợp trên một dự án' },
  managed: { src: '/service-illustrations/managed-it.png', alt: 'Minh họa hệ thống IT và bảng theo dõi vận hành' },
};

function ServiceVisual({ kind }: { kind: SoftwareServiceData['visual'] }) {
  const asset = visualAssets[kind];
  return (
    <figure className="software-visual">
      <img src={asset.src} alt={asset.alt} width="1672" height="941" fetchPriority="high" decoding="async" />
    </figure>
  );
}

export const SoftwareService = ({ slug }: { slug: string }) => {
  const service = services[slug];

  useEffect(() => {
    document.title = service ? `${service.name} | iGen Technology` : 'Dịch vụ | iGen Technology';
  }, [service]);

  if (!service) return null;
  const contactLink = `/contact?service=${encodeURIComponent(service.name)}`;

  return (
    <main className="software-page">
      <section className="software-hero" aria-labelledby="software-title">
        <div className="container-page software-hero__layout">
          <div className="software-hero__copy">
            <nav className="software-breadcrumb" aria-label="Đường dẫn trang"><Link to="/">Trang chủ</Link><span>/</span><Link to="/solutions">Dịch vụ</Link><span>/</span><strong>{service.name}</strong></nav>
            <h1 id="software-title">{service.headline} <span>{service.highlight}</span></h1>
            <p>{service.intro}</p>
            <div className="software-hero__actions"><Link className="software-button" to={contactLink}>Trao đổi giải pháp <span aria-hidden="true">↗</span></Link><a className="software-text-link" href="#software-scope">Khám phá dịch vụ <span aria-hidden="true">↓</span></a></div>
          </div>
          <ServiceVisual kind={service.visual} />
        </div>
      </section>

      <section className="software-pillars" aria-label="Điểm nổi bật"><div className="container-page software-pillars__grid">{service.pillars.map((pillar, index) => <div key={pillar}><span>{String(index + 1).padStart(2, '0')}</span><strong>{pillar}</strong></div>)}</div></section>

      <section className="software-section" id="software-scope"><div className="container-page"><div className="software-heading"><h2>{service.scopeHeading}</h2><p>{service.scopeIntro}</p></div><div className="software-scope-grid">{service.scope.map((item, index) => <article className="software-scope-card" key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></div></section>

      <section className="software-section software-section--soft"><div className="container-page software-outcomes"><div className="software-outcomes__copy"><h2>{service.outcomesHeading}</h2><p>{service.outcomesIntro}</p><Link className="software-text-link" to={contactLink}>Trao đổi nhu cầu của bạn <span aria-hidden="true">↗</span></Link></div><div className="software-outcomes__list">{service.outcomes.map((item, index) => <article key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div></div></section>

      <section className="software-section software-benefits"><div className="container-page software-benefits__layout"><div className="software-benefits__intro"><h2>{service.benefitsHeading}</h2><img src="/brand-icon.png" alt="" aria-hidden="true" loading="lazy" /></div><div className="software-benefits__list">{service.benefits.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></div></section>

      <section className="software-section"><div className="container-page"><div className="software-heading"><h2>Triển khai từng bước, rõ mục tiêu</h2></div><div className="software-process">{service.process.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></div></section>

      <section className="software-closing"><div className="container-page software-closing__layout"><div><h2>{service.closingHeading}</h2><p>{service.closingText}</p></div><Link className="software-button" to={contactLink}>Yêu cầu tư vấn <span aria-hidden="true">↗</span></Link></div></section>
    </main>
  );
};
