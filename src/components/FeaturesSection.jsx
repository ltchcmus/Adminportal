import { useState, useEffect, useRef } from 'react';
import CodeRequestModal from './CodeRequestModal';
import { requestTrialCode, requestPremiumCode } from '../services/api';

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('trial'); // 'trial' or 'premium'
  const [successMessage, setSuccessMessage] = useState('');
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: "🎯",
      title: "Quản Lý Sản Phẩm",
      description: "Thêm, sửa, xóa sản phẩm với giao diện trực quan",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "📊",
      title: "Thống Kê Doanh Thu",
      description: "Báo cáo chi tiết về doanh số và lợi nhuận",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "👥",
      title: "Quản Lý Khách Hàng",
      description: "Theo dõi thông tin và lịch sử mua hàng",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "🔔",
      title: "Thông Báo Thông Minh",
      description: "Nhận cảnh báo về đơn hàng và tồn kho",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Hoạt động mượt mà trên mọi thiết bị",
      color: "from-teal-500 to-blue-500"
    },
    {
      icon: "⚡",
      title: "Hiệu Suất Cao",
      description: "Xử lý nhanh chóng với công nghệ hiện đại",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section id="features" ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">
            Tính Năng Nổi Bật
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá những tính năng mạnh mẽ giúp bạn quản lý shop hiệu quả hơn
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl p-8 shadow-lg hover-lift transition-all duration-500 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Code Options */}
        <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-3xl font-bold text-center gradient-text mb-12">
            Chọn Gói Phù Hợp Với Bạn
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Trial Code Card */}
            <div className="relative bg-white rounded-3xl p-8 shadow-xl hover-lift group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full -translate-y-16 translate-x-16 opacity-10 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4">
                    <span className="text-3xl">🎁</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800">Code Trial</h4>
                    <p className="text-blue-600 font-semibold">Miễn Phí</p>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-600">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 text-sm">✓</span>
                    Thời hạn sử dụng: 15 ngày
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 text-sm">✓</span>
                    Đầy đủ tính năng cơ bản
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 text-sm">✓</span>
                    Hỗ trợ qua email
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="w-6 h-6 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mr-3 text-sm">✗</span>
                    Không có tính năng premium
                  </li>
                </ul>

                <button 
                  onClick={() => {
                    setModalType('trial');
                    setModalOpen(true);
                  }}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold text-lg hover-lift hover:shadow-2xl transition-all duration-300"
                >
                  Nhận Code Trial Ngay
                </button>
              </div>
            </div>

            {/* Premium Code Card */}
            <div className="relative bg-white rounded-3xl p-8 shadow-xl hover-lift group overflow-hidden border-2 border-gradient-to-br from-yellow-400 to-orange-500">
              <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                🔥 Phổ Biến
              </div>
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full -translate-y-16 translate-x-16 opacity-10 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mr-4 animate-pulse-glow">
                    <span className="text-3xl">💎</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800">Code Premium</h4>
                    <p className="text-orange-600 font-bold text-xl">15,000,000 VNĐ</p>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-600">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 text-sm">✓</span>
                    Sử dụng vĩnh viễn
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 text-sm">✓</span>
                    Tất cả tính năng premium
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 text-sm">✓</span>
                    Hỗ trợ 24/7
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 text-sm">✓</span>
                    Cập nhật miễn phí
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 text-sm">✓</span>
                    Tùy chỉnh giao diện
                  </li>
                </ul>

                <button 
                  onClick={() => {
                    setModalType('premium');
                    setModalOpen(true);
                  }}
                  className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-bold text-lg hover-lift hover:shadow-2xl transition-all duration-300 animate-pulse-glow"
                >
                  Mua Code Premium
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl animate-fade-in-up z-50">
            <div className="flex items-center">
              <span className="text-2xl mr-3">✅</span>
              <p className="font-semibold">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Code Request Modal */}
        <CodeRequestModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSuccessMessage('');
          }}
          type={modalType}
          onSubmit={handleCodeRequest}
        />
      </div>
    </section>
  );

  async function handleCodeRequest(formData) {
    const { nameCompany, email, cccd } = formData;

    if (modalType === 'trial') {
      // Request trial code
      const response = await requestTrialCode(nameCompany, email, cccd);
      setSuccessMessage(response.message || 'Code Trial đã được gửi đến email của bạn!');
      setModalOpen(false);
      
      // Hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    } else {
      // Request premium code (redirect to payment)
      const response = await requestPremiumCode(nameCompany, email, cccd);
      
      if (response.paymentUrl) {
        // Redirect to MoMo payment
        window.location.href = response.paymentUrl;
      } else {
        throw new Error('Không thể tạo yêu cầu thanh toán');
      }
    }
  }
};

export default FeaturesSection;