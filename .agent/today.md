# today.md - 2026-07-07

## Session Goal
Tái thiết kế toàn bộ giao diện frontend theo phong cách **Stripe** (light-only): nền sáng, typography sans sạch (Inter), card bóng mềm, nút pill, hero gradient nghiêng đa sắc. Giữ teal `#0097b2` làm màu điểm nhấn; bỏ chế độ tối và toàn bộ hiệu ứng nặng.

> Thay thế hướng "toggle sáng/tối" trước đó. Kế hoạch: `~/.claude/plans/frolicking-splashing-robin.md`.

## Progress
- [x] **Phase 1 — Nền tảng:** viết lại `tailwind.config.js` (token ink/body/muted/surface/line, font Inter, shadow mềm, gradient `hero-stripe`); `index.html` (bỏ `class="dark"`, body sáng, chỉ load Inter); viết lại `index.css` sang base Stripe + utilities (`.btn-primary/.btn-secondary/.link-arrow/.card/.section/.container-page/.gradient-hero/.prose-igen`), giữ & restyle sáng cho Quill; dọn `App.tsx` (bỏ ParticleCanvas, theme, sound, ink-wipe; giữ Lenis dịu).
- [x] **Phase 2 — Component:** `Navbar.tsx` light sticky + hairline khi cuộn + menu mobile (bỏ toggle theme/sound); `Footer.tsx` light nhiều cột.
- [x] **Phase 3 — Trang marketing:** Home (hero gradient + 4 card trụ cột + CTA), Solutions, ServiceDetail, About, Contact, News, ArticleDetail — bỏ hết `glass-*/tilt/magnetic/particle`, giữ reveal fade-up nhẹ; giữ nguyên logic API/form.
- [x] **Phase 4 — Admin & Login:** Login card trắng canh giữa; AdminDashboard quét token tối → sáng (sidebar/bảng/input/badge), Quill sáng, giữ chữ trắng trên nút primary, backdrop modal giữ tối.
- [x] **Phase 5 — Dọn dẹp & xác minh:** xóa component không dùng (`ParticleCanvas`, `AIRobotCore`, `CustomCursor`), gỡ effect gsap chết ở News, gỡ class `shadow-glow` chết. `tsc --noEmit` sạch; `vite build` OK (CSS 77.9 → 55.5 kB); dev server phục vụ HTTP 200, mọi module transform không lỗi.
- [x] **Phase 6 — Đồng bộ Logo:** Sao chép logo công ty chính thức (`logo cty 1024x1024.png`) từ `Igen-ERP/assets/img/` sang Landing Page (`logo.png`), cập nhật favicon ở `index.html` và logo chính ở cả `Navbar.tsx` và `Footer.tsx`.
- [x] **Phase 7 — Hợp nhất cấu hình:** Di chuyển các tệp `.env` riêng biệt của frontend và backend vào chung một tệp `.env` duy nhất tại thư mục gốc, cấu hình `envDir` cho Vite và thiết lập bộ nạp dotenv động cho backend.

## Next Steps
- Duyệt mắt thực tế trên trình duyệt (dev `yarn dev`) từng trang để tinh chỉnh tông gradient hero, khoảng cách, ảnh.
- Cân nhắc code-splitting (bundle JS ~722 kB) nếu cần tối ưu tải.
- Chưa commit — chờ người dùng xác nhận giao diện trước khi commit nhánh `fix/cicd`.
