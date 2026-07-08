import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
];

interface ArticleData {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  thumbnail: string;
  author: string;
  status: string;
  createdAt: string;
}

interface ContactData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

interface ServiceAdminData {
  _id: string;
  title: string;
  slug: string;
  shortDesc: string;
  description: string;
  icon: string;
  thumbnail?: string;
  videos?: string[];
  category: string;
  features: string[];
  status: 'active' | 'inactive';
  order: number;
}

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const AdminDashboard: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [activeTab, setActiveTab] = useState<'overview' | 'articles' | 'contacts' | 'services'>('overview');
  


  // Data lists
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [services, setServices] = useState<ServiceAdminData[]>([]);
  const [healthStatus, setHealthStatus] = useState<'UP' | 'DOWN'>('DOWN');
  const [stats, setStats] = useState({ articlesCount: 0, contactsCount: 0, servicesCount: 0 });

  // Article Modal Form State
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [articleForm, setArticleForm] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category: 'AI Trends',
    thumbnail: '',
    status: 'draft',
  });
  const [formError, setFormError] = useState<string | null>(null);

  // Load Dashboard Data
  const loadData = async (jwtToken: string) => {
    try {
      const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
      
      // Fetch services
      const svcRes = await axios.get(`${API_URL}/services`, { params: { limit: 50 } });
      if (svcRes.data?.success) {
        setServices(svcRes.data.data.docs);
        setStats((prev) => ({ ...prev, servicesCount: svcRes.data.data.totalDocs }));
      }

      // Fetch articles
      const artRes = await axios.get(`${API_URL}/articles`, {
        params: { limit: 100 },
      });
      if (artRes.data?.success) {
        setArticles(artRes.data.data.docs);
        setStats((prev) => ({ ...prev, articlesCount: artRes.data.data.totalDocs }));
      }

      // Fetch contacts
      const conRes = await axios.get(`${API_URL}/contacts`, config);
      if (conRes.data?.success) {
        setContacts(conRes.data.data.docs);
        setStats((prev) => ({ ...prev, contactsCount: conRes.data.data.totalDocs }));
      }

      // Check health
      const healthRes = await axios.get(`${API_URL}/health`);
      if (healthRes.data?.status === 'UP') {
        setHealthStatus('UP');
      }
    } catch (error) {
      console.warn('Backend server offline or unauthorized:', error);
      setHealthStatus('DOWN');
    }
  };

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        await loadData(token);
      };
      fetchData();
    }
  }, [token]);

  // Service state
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isArticleModalOpen || isServiceModalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isArticleModalOpen, isServiceModalOpen]);

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>, targetForm: 'article' | 'service') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setIsUploading(true);
    try {
      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (res.data?.success && res.data.url) {
        const imageUrl = res.data.url;
        if (targetForm === 'article') {
          setArticleForm((prev) => ({ ...prev, thumbnail: imageUrl }));
        } else {
          setServiceForm((prev) => ({ ...prev, thumbnail: imageUrl }));
        }
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || 'Lỗi khi tải ảnh lên.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setIsUploadingVideo(true);
    try {
      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (res.data?.success && res.data.url) {
        const videoUrl = res.data.url;
        setServiceForm((prev) => {
          const currentVideos = prev.videos.trim();
          const newVideos = currentVideos ? `${currentVideos}\n${videoUrl}` : videoUrl;
          return { ...prev, videos: newVideos };
        });
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || 'Lỗi khi tải video lên.');
    } finally {
      setIsUploadingVideo(false);
    }
  };

  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceFormError, setServiceFormError] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState({
    title: '', slug: '', shortDesc: '', description: '',
    icon: 'category', thumbnail: '', category: 'Web',
    features: '', status: 'active', order: 0, videos: '',
  });

  const handleOpenCreateServiceModal = () => {
    setEditingServiceId(null);
    setServiceForm({
      title: '', slug: '', shortDesc: '', description: '',
      icon: 'category', thumbnail: '', category: 'Web',
      features: '', status: 'active', order: 0, videos: '',
    });
    setServiceFormError(null);
    setIsServiceModalOpen(true);
  };

  const handleOpenEditServiceModal = (svc: ServiceAdminData) => {
    setEditingServiceId(svc._id);
    setServiceForm({
      title: svc.title, slug: svc.slug, shortDesc: svc.shortDesc,
      description: svc.description, icon: svc.icon, thumbnail: svc.thumbnail || '',
      category: svc.category, features: svc.features.join(', '),
      status: svc.status, order: svc.order,
      videos: svc.videos ? svc.videos.join('\n') : '',
    });
    setServiceFormError(null);
    setIsServiceModalOpen(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    setServiceFormError(null);
    if (!token) return;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const payload = {
      ...serviceForm,
      features: serviceForm.features.split(',').map((f) => f.trim()).filter(Boolean),
      videos: serviceForm.videos.split('\n').map((v) => v.trim()).filter(Boolean),
      order: Number(serviceForm.order),
    };
    try {
      if (editingServiceId) {
        const res = await axios.patch(`${API_URL}/services/${editingServiceId}`, payload, config);
        if (res.data?.success) { setIsServiceModalOpen(false); loadData(token); }
      } else {
        const res = await axios.post(`${API_URL}/services`, payload, config);
        if (res.data?.success) { setIsServiceModalOpen(false); loadData(token); }
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string; errors?: string[] } } };
      setServiceFormError(err.response?.data?.errors?.[0] || err.response?.data?.message || 'Lỗi lưu dịch vụ.');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!token) return;
    if (!window.confirm('Xóa dịch vụ này?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.delete(`${API_URL}/services/${id}`, config);
      if (res.data?.success) loadData(token);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || 'Lỗi khi xóa dịch vụ.');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.warn('Backend logout failed or offline:', err);
    }
    localStorage.removeItem('adminToken');
    setToken(null);
    setArticles([]);
    setContacts([]);
  };

  // Article slug generator utility
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleArticleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setArticleForm({
      ...articleForm,
      title,
      slug: generateSlug(title),
    });
  };

  const handleOpenCreateModal = () => {
    setEditingArticleId(null);
    setArticleForm({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      category: 'AI Trends',
      thumbnail: '',
      status: 'draft',
    });
    setFormError(null);
    setIsArticleModalOpen(true);
  };

  const handleOpenEditModal = (art: ArticleData) => {
    setEditingArticleId(art._id);
    setArticleForm({
      title: art.title,
      slug: art.slug,
      content: art.content,
      excerpt: art.excerpt,
      category: art.category,
      thumbnail: art.thumbnail,
      status: art.status,
    });
    setFormError(null);
    setIsArticleModalOpen(true);
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!token) return;

    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      if (editingArticleId) {
        // Edit Article
        const res = await axios.patch(
          `${API_URL}/articles/${editingArticleId}`,
          articleForm,
          config
        );
        if (res.data?.success) {
          setIsArticleModalOpen(false);
          loadData(token);
        }
      } else {
        // Create Article
        const res = await axios.post(`${API_URL}/articles`, articleForm, config);
        if (res.data?.success) {
          setIsArticleModalOpen(false);
          loadData(token);
        }
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string; errors?: string[] } } };
      setFormError(err.response?.data?.errors?.[0] || err.response?.data?.message || 'Lỗi lưu bài viết.');
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (!token) return;
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) return;

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.delete(`${API_URL}/articles/${id}`, config);
      if (res.data?.success) {
        loadData(token);
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || 'Lỗi khi xóa bài viết.');
    }
  };

  const handleUpdateContactStatus = async (id: string, newStatus: 'unread' | 'read' | 'replied') => {
    if (!token) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.patch(
        `${API_URL}/contacts/${id}/status`,
        { status: newStatus },
        config
      );
      if (res.data?.success) {
        loadData(token);
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || 'Lỗi khi cập nhật liên hệ.');
    }
  };

  // Secure Auth Login Gate UI
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-surface-alt text-ink flex font-display">
      
      {/* Side bar */}
      <aside className="w-64 bg-white border-r border-line flex flex-col justify-between hidden md:flex h-screen sticky top-0">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/40 flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-white text-xl">blur_on</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-ink text-base font-bold tracking-wide">iGen Admin</h1>
              <p className="text-primary text-[10px] font-bold tracking-wider uppercase opacity-80">Command Suite</p>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all interactable text-left w-full ${
                activeTab === 'overview'
                  ? 'bg-primary/10 border-primary/20 text-primary font-semibold'
                  : 'border-transparent text-muted hover:text-ink hover:bg-surface-alt'
              }`}
            >
              <span className="material-symbols-outlined text-xl">dashboard</span>
              <span className="text-sm">Tổng quan</span>
            </button>

            <button
              onClick={() => setActiveTab('articles')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all interactable text-left w-full ${
                activeTab === 'articles'
                  ? 'bg-primary/10 border-primary/20 text-primary font-semibold'
                  : 'border-transparent text-muted hover:text-ink hover:bg-surface-alt'
              }`}
            >
              <span className="material-symbols-outlined text-xl">article</span>
              <span className="text-sm">Bài viết</span>
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all interactable text-left w-full ${
                activeTab === 'contacts'
                  ? 'bg-primary/10 border-primary/20 text-primary font-semibold'
                  : 'border-transparent text-muted hover:text-ink hover:bg-surface-alt'
              }`}
            >
              <span className="material-symbols-outlined text-xl">support_agent</span>
              <span className="text-sm">Liên hệ</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all interactable text-left w-full ${
                activeTab === 'services'
                  ? 'bg-primary/10 border-primary/20 text-primary font-semibold'
                  : 'border-transparent text-muted hover:text-ink hover:bg-surface-alt'
              }`}
            >
              <span className="material-symbols-outlined text-xl">grid_view</span>
              <span className="text-sm">Dịch vụ</span>
            </button>
          </nav>
        </div>

        <div className="p-6">
          <div className="border-t border-line pt-6 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-ink truncate">Admin User</p>
              <p className="text-[10px] text-muted truncate">admin@igen.vn</p>
            </div>
            <button onClick={handleLogout} className="text-muted hover:text-primary transition-colors interactable">
              <span className="material-symbols-outlined text-lg">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main View Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          
          {/* Dashboard Title Header */}
          <div className="flex justify-between items-center border-b border-line pb-6">
            <div>
              <h2 className="text-2xl font-bold text-ink">System Command Center</h2>
              <p className="text-xs text-muted">Vận hành, điều phối hệ thống landing page</p>
            </div>
            <div className="flex items-center gap-3 bg-white border border-line rounded-full px-4 py-1.5 text-xs">
              <span className={`w-2.5 h-2.5 rounded-full ${healthStatus === 'UP' ? 'bg-emerald-500 animate-ping' : 'bg-red-500 animate-pulse'}`}></span>
              <span>API Health: {healthStatus === 'UP' ? 'Optimal' : 'Offline'}</span>
            </div>
          </div>

          {/* Cards stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-line rounded-2xl p-6 relative overflow-hidden">
              <h4 className="text-xs text-muted font-medium uppercase tracking-wider mb-2">Tổng số bài viết</h4>
              <p className="text-3xl font-bold text-ink">{stats.articlesCount}</p>
            </div>
            <div className="bg-white border border-line rounded-2xl p-6 relative overflow-hidden">
              <h4 className="text-xs text-muted font-medium uppercase tracking-wider mb-2">Liên hệ mới nhận</h4>
              <p className="text-3xl font-bold text-ink">
                {contacts.filter((c) => c.status === 'unread').length} / {stats.contactsCount}
              </p>
            </div>
            <div className="bg-white border border-line rounded-2xl p-6 relative overflow-hidden">
              <h4 className="text-xs text-muted font-medium uppercase tracking-wider mb-2">Dịch vụ đang hoạt động</h4>
              <p className="text-3xl font-bold text-ink">{stats.servicesCount}</p>
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="bg-white border border-line rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center gap-8 border border-line bg-surface-alt p-6 rounded-2xl">
                <div className="flex-1 space-y-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    Admin Console Ready
                  </span>
                  <h3 className="text-2xl font-bold text-ink tracking-tight">Vận hành Hệ thống</h3>
                  <p className="text-muted text-sm leading-relaxed max-w-md">
                    Bạn có thể cập nhật bài viết tin tức ở thẻ "Bài viết" để thay đổi dữ liệu trang Tin tức ngoài trang khách, hoặc xem các yêu cầu đăng ký tư vấn khách hàng ở thẻ "Liên hệ".
                  </p>
                </div>
                <div className="w-full md:w-1/3 flex items-center justify-center h-40">
                  <div className="relative w-32 h-32 rounded-full border-2 border-dashed border-primary/30 animate-[spin_60s_linear_infinite] flex items-center justify-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
                    <span className="material-symbols-outlined text-primary text-4xl relative z-10 animate-spin-slow">hub</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARTICLES (CRUD LIST) */}
          {activeTab === 'articles' && (
            <div className="bg-white border border-line rounded-2xl overflow-hidden flex flex-col">
              <div className="px-6 py-5 border-b border-line flex justify-between items-center bg-surface-alt">
                <h3 className="text-base font-bold text-ink tracking-wide">Danh sách bài viết tin tức</h3>
                <button
                  onClick={handleOpenCreateModal}
                  className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 interactable"
                >
                  <span className="material-symbols-outlined text-lg">add</span> Thêm bài mới
                </button>
              </div>

              {/* Table list */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-alt text-muted text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-semibold">Tiêu đề bài viết</th>
                      <th className="px-6 py-4 font-semibold">Danh mục</th>
                      <th className="px-6 py-4 font-semibold">Trạng thái</th>
                      <th className="px-6 py-4 font-semibold text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-line">
                    {articles.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-muted">
                          Không có bài viết nào. Nhấp vào "Thêm bài mới" để tạo.
                        </td>
                      </tr>
                    ) : (
                      articles.map((art) => (
                        <tr key={art._id} className="hover:bg-surface-alt transition-colors group">
                          <td className="px-6 py-4">
                            <span className="text-ink font-medium">{art.title}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                              {art.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                                art.status === 'published'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              }`}
                            >
                              {art.status === 'published' ? 'Đã đăng' : 'Bản nháp'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-3">
                              <button
                                onClick={() => handleOpenEditModal(art)}
                                className="p-1.5 text-muted hover:text-primary hover:bg-primary/10 rounded transition-colors interactable"
                                title="Sửa"
                              >
                                <span className="material-symbols-outlined text-sm">edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteArticle(art._id)}
                                className="p-1.5 text-muted hover:text-red-400 hover:bg-red-400/10 rounded transition-colors interactable"
                                title="Xóa"
                              >
                                <span className="material-symbols-outlined text-sm">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CONTACT SUBMISSIONS */}
          {activeTab === 'contacts' && (
            <div className="bg-white border border-line rounded-2xl overflow-hidden flex flex-col">
              <div className="px-6 py-5 border-b border-line bg-surface-alt">
                <h3 className="text-base font-bold text-ink tracking-wide">Khách hàng yêu cầu tư vấn</h3>
              </div>

              {/* Table list */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-alt text-muted text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-semibold">Tên khách hàng</th>
                      <th className="px-6 py-4 font-semibold">Liên hệ</th>
                      <th className="px-6 py-4 font-semibold">Lời nhắn</th>
                      <th className="px-6 py-4 font-semibold">Trạng thái</th>
                      <th className="px-6 py-4 font-semibold text-right">Đánh dấu</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-line">
                    {contacts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-muted">
                          Chưa nhận được liên hệ nào từ khách hàng.
                        </td>
                      </tr>
                    ) : (
                      contacts.map((con) => (
                        <tr key={con._id} className="hover:bg-surface-alt transition-colors">
                          <td className="px-6 py-4 font-medium text-ink">{con.name}</td>
                          <td className="px-6 py-4 text-muted">
                            <p>{con.email}</p>
                            <p className="text-xs">{con.phone}</p>
                          </td>
                          <td className="px-6 py-4 max-w-xs truncate text-muted" title={con.message}>
                            {con.message}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                                con.status === 'replied'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : con.status === 'read'
                                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                  : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              }`}
                            >
                              {con.status === 'replied'
                                ? 'Đã phản hồi'
                                : con.status === 'read'
                                ? 'Đã xem'
                                : 'Chưa đọc'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                disabled={con.status === 'read'}
                                onClick={() => handleUpdateContactStatus(con._id, 'read')}
                                className="px-2.5 py-1 border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 disabled:opacity-30 rounded text-xs font-bold transition-all interactable"
                              >
                                Đã Xem
                              </button>
                              <button
                                disabled={con.status === 'replied'}
                                onClick={() => handleUpdateContactStatus(con._id, 'replied')}
                                className="px-2.5 py-1 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 disabled:opacity-30 rounded text-xs font-bold transition-all interactable"
                              >
                                Đã Trả Lời
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES CRUD */}
          {activeTab === 'services' && (
            <div className="bg-white border border-line rounded-2xl overflow-hidden flex flex-col">
              <div className="px-6 py-5 border-b border-line flex justify-between items-center bg-surface-alt">
                <h3 className="text-base font-bold text-ink tracking-wide">Quản lý Sản phẩm / Dịch vụ</h3>
                <button
                  onClick={handleOpenCreateServiceModal}
                  className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 interactable"
                >
                  <span className="material-symbols-outlined text-lg">add</span> Thêm dịch vụ
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-alt text-muted text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-semibold">Tên dịch vụ</th>
                      <th className="px-6 py-4 font-semibold">Danh mục</th>
                      <th className="px-6 py-4 font-semibold">Thứ tự</th>
                      <th className="px-6 py-4 font-semibold">Trạng thái</th>
                      <th className="px-6 py-4 font-semibold text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-line">
                    {services.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-muted">
                          Chưa có dịch vụ nào. Nhấp "Thêm dịch vụ" để tạo.
                        </td>
                      </tr>
                    ) : (
                      services.map((svc) => (
                        <tr key={svc._id} className="hover:bg-surface-alt transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-primary text-base">{svc.icon}</span>
                              <span className="text-ink font-medium">{svc.title}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                              {svc.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted">{svc.order}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                              svc.status === 'active'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}>
                              {svc.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-3">
                              <button
                                onClick={() => handleOpenEditServiceModal(svc)}
                                className="p-1.5 text-muted hover:text-primary hover:bg-primary/10 rounded transition-colors interactable"
                                title="Sửa"
                              >
                                <span className="material-symbols-outlined text-sm">edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteService(svc._id)}
                                className="p-1.5 text-muted hover:text-red-400 hover:bg-red-400/10 rounded transition-colors interactable"
                                title="Xóa"
                              >
                                <span className="material-symbols-outlined text-sm">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* SERVICE EDIT/CREATE MODAL FORM */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4">
          <div data-lenis-prevent className="w-full max-w-2xl bg-white border border-line rounded-3xl p-6 sm:p-8 overflow-y-auto max-h-[85vh]">
            <div className="flex justify-between items-center border-b border-line pb-4 mb-6">
              <h3 className="text-xl font-bold text-ink">
                {editingServiceId ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}
              </h3>
              <button onClick={() => setIsServiceModalOpen(false)} className="text-muted hover:text-ink transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {serviceFormError && (
              <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-sm mb-6">{serviceFormError}</div>
            )}

            <form onSubmit={handleSaveService} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted font-bold mb-2">Tên dịch vụ *</label>
                <input type="text" required value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  className="w-full bg-surface-alt border border-line text-ink rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 text-sm interactable" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted font-bold mb-2">Slug</label>
                  <input type="text" value={serviceForm.slug}
                    onChange={(e) => setServiceForm({ ...serviceForm, slug: e.target.value })}
                    className="w-full bg-surface-alt border border-line text-ink rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 text-sm interactable" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted font-bold mb-2">Danh mục *</label>
                  <select value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                    className="w-full bg-surface-alt border border-line text-ink rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 text-sm interactable">
                    <option value="Web">Web</option>
                    <option value="Mobile">Mobile</option>
                    <option value="AI">AI</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Consulting">Consulting</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted font-bold mb-2">Icon (material-symbols)</label>
                  <input type="text" value={serviceForm.icon}
                    onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                    placeholder="language, phone_android, chat..."
                    className="w-full bg-surface-alt border border-line text-ink rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 text-sm interactable" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted font-bold mb-2">Trạng thái</label>
                  <select value={serviceForm.status}
                    onChange={(e) => setServiceForm({ ...serviceForm, status: e.target.value })}
                    className="w-full bg-surface-alt border border-line text-ink rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 text-sm interactable">
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Tạm dừng</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted font-bold mb-2">Mô tả ngắn</label>
                <input type="text" value={serviceForm.shortDesc}
                  onChange={(e) => setServiceForm({ ...serviceForm, shortDesc: e.target.value })}
                  className="w-full bg-surface-alt border border-line text-ink rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 text-sm interactable" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted font-bold mb-2">Mô tả chi tiết</label>
                <textarea rows={4} value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full bg-surface-alt border border-line text-ink rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 text-sm interactable" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted font-bold mb-2">Tính năng (cách nhau bằng dấu phẩy)</label>
                <input type="text" value={serviceForm.features}
                  onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
                  placeholder="SEO, SSL, CMS, ..."
                  className="w-full bg-surface-alt border border-line text-ink rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 text-sm interactable" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted font-bold mb-2">Hình ảnh đại diện</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div className="sm:col-span-1 h-24 rounded-xl border border-line bg-surface-alt overflow-hidden flex items-center justify-center relative group">
                    {serviceForm.thumbnail ? (
                      <>
                        <img src={serviceForm.thumbnail} alt="Preview" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        <button type="button" onClick={() => setServiceForm({ ...serviceForm, thumbnail: '' })} className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-red-400 hover:text-red-300">
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </>
                    ) : (
                      <div className="text-muted/40 flex flex-col items-center gap-1">
                        <span className="material-symbols-outlined text-2xl">image</span>
                        <span className="text-[10px]">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex gap-3">
                      <input type="text" value={serviceForm.thumbnail}
                        onChange={(e) => setServiceForm({ ...serviceForm, thumbnail: e.target.value })}
                        placeholder="URL hoặc tải lên..."
                        className="flex-1 bg-surface-alt border border-line text-ink rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 text-sm interactable" />
                      <label className="bg-surface-alt hover:bg-line text-body border border-line text-xs font-semibold py-3 px-4 rounded-xl cursor-pointer flex items-center gap-1 transition-all select-none hover:scale-[1.02] active:scale-95 whitespace-nowrap">
                        {isUploading ? (
                          <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                        ) : (
                          <span className="material-symbols-outlined text-sm">upload</span>
                        )}
                        {isUploading ? 'Đang tải...' : 'Tải lên'}
                        <input type="file" accept="image/*" className="hidden" disabled={isUploading}
                          onChange={(e) => handleUploadImage(e, 'service')} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-muted font-bold mb-2">Danh sách URL Video (Mỗi dòng một URL)</label>
                <div className="flex flex-col gap-3">
                  <textarea rows={3} value={serviceForm.videos}
                    onChange={(e) => setServiceForm({ ...serviceForm, videos: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=...&#10;https://..."
                    className="w-full bg-surface-alt border border-line text-ink rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 text-sm interactable" />
                  
                  <div className="flex justify-end">
                    <label className="bg-surface-alt hover:bg-line text-body border border-line text-xs font-semibold py-2.5 px-4 rounded-xl cursor-pointer flex items-center gap-1 transition-all select-none hover:scale-[1.02] active:scale-95 whitespace-nowrap">
                      {isUploadingVideo ? (
                        <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                      ) : (
                        <span className="material-symbols-outlined text-sm">upload_file</span>
                      )}
                      {isUploadingVideo ? 'Đang tải video...' : 'Tải lên video mới'}
                      <input type="file" accept="video/*" className="hidden" disabled={isUploadingVideo}
                        onChange={handleUploadVideo} />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-muted font-bold mb-2">Thứ tự hiển thị</label>
                <input type="number" min={0} value={serviceForm.order}
                  onChange={(e) => setServiceForm({ ...serviceForm, order: Number(e.target.value) })}
                  className="w-full bg-surface-alt border border-line text-ink rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 text-sm interactable" />
              </div>
              <div className="flex justify-end gap-4 border-t border-line pt-5">
                <button type="button" onClick={() => setIsServiceModalOpen(false)}
                  className="px-5 py-2.5 bg-white hover:bg-surface-alt border border-line text-muted hover:text-ink rounded-xl text-sm transition-all interactable">
                  Hủy bỏ
                </button>
                <button type="submit"
                  className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-semibold transition-all interactable">
                  Lưu dịch vụ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ARTICLE EDIT/CREATE MODAL FORM */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4">
          <div data-lenis-prevent className="w-full max-w-6xl bg-white border border-line rounded-3xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center border-b border-line pb-4 mb-6">
              <h3 className="text-xl font-bold text-ink">
                {editingArticleId ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
              </h3>
              <button
                onClick={() => setIsArticleModalOpen(false)}
                className="text-muted hover:text-ink transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {formError && (
              <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-sm mb-6">
                {formError}
              </div>
            )}

            <form onSubmit={handleSaveArticle} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Content Editor */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted font-bold mb-3">
                    Nội dung bài viết
                  </label>
                  <ReactQuill
                    value={articleForm.content}
                    onChange={(val) => setArticleForm({ ...articleForm, content: val })}
                    theme="snow"
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Viết nội dung bài viết tại đây..."
                  />
                </div>
              </div>

              {/* Right Column: Other Information */}
              <div className="lg:col-span-4 space-y-5 flex flex-col justify-between">
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted font-bold mb-2">
                      Tiêu đề bài viết
                    </label>
                    <input
                      type="text"
                      required
                      value={articleForm.title}
                      onChange={handleArticleTitleChange}
                      className="w-full bg-surface-alt border border-line text-ink rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 text-sm interactable"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-muted font-bold mb-2">
                        Slug (Tự động tạo)
                      </label>
                      <input
                        type="text"
                        required
                        value={articleForm.slug}
                        onChange={(e) => setArticleForm({ ...articleForm, slug: e.target.value })}
                        className="w-full bg-surface-alt border border-line text-ink rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 text-sm interactable"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-muted font-bold mb-2">
                        Danh mục
                      </label>
                      <select
                        value={articleForm.category}
                        onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                        className="w-full bg-surface-alt border border-line text-ink rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 text-sm interactable"
                      >
                        <option value="AI Trends">AI Trends</option>
                        <option value="Tech Insights">Tech Insights</option>
                        <option value="Case Study">Case Study</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted font-bold mb-2">
                      Hình ảnh đại diện
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                      <div className="sm:col-span-1 h-24 rounded-xl border border-line bg-surface-alt overflow-hidden flex items-center justify-center relative group">
                        {articleForm.thumbnail ? (
                          <>
                            <img
                              src={articleForm.thumbnail}
                              alt="Preview"
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <button
                              type="button"
                              onClick={() => setArticleForm({ ...articleForm, thumbnail: '' })}
                              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-red-400 hover:text-red-300"
                            >
                              <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                          </>
                        ) : (
                          <div className="text-muted/40 flex flex-col items-center gap-1">
                            <span className="material-symbols-outlined text-2xl">image</span>
                            <span className="text-[10px]">No image</span>
                          </div>
                        )}
                      </div>
                      <div className="sm:col-span-2">
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={articleForm.thumbnail}
                            onChange={(e) => setArticleForm({ ...articleForm, thumbnail: e.target.value })}
                            placeholder="URL hình ảnh hoặc tải lên..."
                            className="flex-1 bg-surface-alt border border-line text-ink rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 text-sm interactable min-w-0"
                          />
                          <label className="bg-surface-alt hover:bg-line text-body border border-line text-xs font-semibold py-3 px-3.5 rounded-xl cursor-pointer flex items-center gap-1 transition-all select-none hover:scale-[1.02] active:scale-95 whitespace-nowrap">
                            {isUploading ? (
                              <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                            ) : (
                              <span className="material-symbols-outlined text-sm">upload</span>
                            )}
                            {isUploading ? 'Đang tải' : 'Tải lên'}
                            <input type="file" accept="image/*" className="hidden" disabled={isUploading}
                              onChange={(e) => handleUploadImage(e, 'article')} />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted font-bold mb-2">
                      Trạng thái đăng
                    </label>
                    <select
                      value={articleForm.status}
                      onChange={(e) => setArticleForm({ ...articleForm, status: e.target.value })}
                      className="w-full bg-surface-alt border border-line text-ink rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 text-sm interactable"
                    >
                      <option value="draft">Bản nháp (Draft)</option>
                      <option value="published">Đăng ngay (Published)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-4 border-t border-line pt-6 mt-8">
                  <button
                    type="button"
                    onClick={() => setIsArticleModalOpen(false)}
                    className="px-5 py-2.5 bg-white hover:bg-surface-alt border border-line text-muted hover:text-ink rounded-xl text-sm transition-all interactable"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-semibold transition-all interactable"
                  >
                    Lưu bài viết
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
