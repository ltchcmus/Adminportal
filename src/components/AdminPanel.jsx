import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CodeRequestModal from './CodeRequestModal';
import { requestTrialCode, requestPremiumCode } from '../services/api';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('trial');
  const [successMessage, setSuccessMessage] = useState('');
  const sectionRef = useRef(null);

  useEffect(() => {
    // Check authentication
    const isAuth = sessionStorage.getItem('isAuthenticated');
    if (!isAuth) {
      navigate('/');
      return;
    }

    // Fade in animation
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
  }, [navigate]);

  const handleCodeRequest = async (formData) => {
    const { nameCompany, email, cccd } = formData;

    if (modalType === 'trial') {
      // Request trial code
      const response = await requestTrialCode(nameCompany, email, cccd);
      setSuccessMessage(response.message || 'Code Trial đã được gửi đến email của bạn!');
      setModalOpen(false);
      
      // Hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    } else {
      // Request premium code (skip payment, go directly to success)
      const response = await requestPremiumCode(nameCompany, email, cccd);
      
      if (response.success) {
        // Mock successful payment and redirect to success page
        const mockOrderId = `ORDER_${Date.now()}`;
        const mockCode = response.data?.code || 'PRM-XXXX-XXXX-XXXX';
        
        navigate(`/payment-success?orderId=${mockOrderId}&amount=199000&code=${mockCode}`);
      } else {
        throw new Error(response.message || 'Không thể tạo yêu cầu premium');
      }
    }
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center animate-pulse-glow">
              <span className="text-4xl">👨‍💼</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Admin Panel
          </h1>
          <p className="text-xl text-gray-600">
            Quản lý và cấp phát Code cho MyShop
          </p>
          <div className="mt-4 inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
            ✅ Đã đăng nhập: admin
          </div>
        </div>

        {/* Code Options Cards */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
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
                  <p className="text-blue-600 font-semibold">Miễn Phí - 15 ngày</p>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600">
                  <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 text-sm">✓</span>
                  Thời hạn: 15 ngày
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 text-sm">✓</span>
                  Đầy đủ tính năng cơ bản
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 text-sm">✓</span>
                  Gửi email tự động
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="w-6 h-6 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mr-3 text-sm">!</span>
                  1 CCCD chỉ nhận 1 lần
                </li>
              </ul>

              <button 
                onClick={() => {
                  setModalType('trial');
                  setModalOpen(true);
                }}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold text-lg hover-lift hover:shadow-2xl transition-all duration-300"
              >
                🎁 Cấp Code Trial
              </button>
            </div>
          </div>

          {/* Premium Code Card */}
          <div className="relative bg-white rounded-3xl p-8 shadow-xl hover-lift group overflow-hidden border-2 border-yellow-400">
            <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
              🔥 Premium
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
                  Gửi email tự động
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 text-sm">✓</span>
                  Không giới hạn CCCD
                </li>
              </ul>

              <button 
                onClick={() => {
                  setModalType('premium');
                  setModalOpen(true);
                }}
                className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-bold text-lg hover-lift hover:shadow-2xl transition-all duration-300 animate-pulse-glow"
              >
                💎 Cấp Code Premium (Test Mode)
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                ⚠️ Test mode: Không cần thanh toán thật
              </p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className={`mt-12 max-w-4xl mx-auto bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
            <span className="text-2xl mr-3">ℹ️</span>
            Lưu ý quan trọng
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Trial Code:</strong> Chỉ gửi email khi tạo thành công. Mỗi CCCD chỉ nhận 1 lần.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Premium Code:</strong> Test mode - không cần thanh toán, luôn redirect success.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Database:</strong> Code chỉ được lưu KHI đã gửi email thành công.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Email:</strong> Gửi qua Brevo API với HTML template đẹp.</span>
            </li>
          </ul>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl animate-fade-in-up z-50 max-w-md">
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
    </div>
  );
};

export default AdminPanel;
