import { useState, useEffect, useRef } from 'react';

const PricingSection = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const plans = [
    {
      id: 'trial',
      name: 'Trial',
      price: 'Miễn Phí',
      duration: '7 ngày',
      icon: '🎁',
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Quản lý sản phẩm cơ bản',
        'Báo cáo doanh thu',
        'Quản lý khách hàng',
        'Hỗ trợ email',
        'Giao diện cơ bản'
      ],
      limitations: [
        'Giới hạn 50 sản phẩm',
        'Không có backup tự động',
        'Không có tùy chỉnh giao diện'
      ],
      buttonText: 'Nhận Trial Ngay',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '199,000',
      duration: 'Vĩnh viễn',
      icon: '💎',
      color: 'from-yellow-500 to-orange-500',
      features: [
        'Tất cả tính năng Trial',
        'Không giới hạn sản phẩm',
        'Backup tự động',
        'Tùy chỉnh giao diện',
        'Báo cáo chi tiết',
        'Hỗ trợ 24/7',
        'Cập nhật miễn phí',
        'Xuất dữ liệu Excel/PDF',
        'Quản lý đa cửa hàng',
        'API tích hợp'
      ],
      limitations: [],
      buttonText: 'Mua Premium',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Liên hệ',
      duration: 'Tùy chỉnh',
      icon: '🏢',
      color: 'from-purple-500 to-indigo-500',
      features: [
        'Tất cả tính năng Premium',
        'Hỗ trợ nhiều chi nhánh',
        'Báo cáo nâng cao',
        'Tích hợp hệ thống',
        'Training riêng',
        'Support ưu tiên',
        'Custom development'
      ],
      limitations: [],
      buttonText: 'Liên Hệ Tư Vấn',
      popular: false
    }
  ];

  return (
    <section id="pricing" ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Bảng Giá <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Ưu Đãi</span>
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Chọn gói phù hợp với nhu cầu kinh doanh của bạn. Tất cả gói đều bao gồm hỗ trợ kỹ thuật.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 transition-all duration-500 transform hover-lift ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              } ${plan.popular ? 'scale-105 border-2 border-yellow-400' : 'border border-white/20'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold animate-pulse">
                    🔥 Phổ Biến Nhất
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className={`w-20 h-20 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4 ${plan.popular ? 'animate-pulse-glow' : ''}`}>
                  <span className="text-4xl">{plan.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-white mb-1">
                  {plan.price === 'Miễn Phí' || plan.price === 'Liên hệ' ? (
                    plan.price
                  ) : (
                    <>
                      {plan.price} <span className="text-lg text-blue-200">VNĐ</span>
                    </>
                  )}
                </div>
                <p className="text-blue-200">{plan.duration}</p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-white">
                    <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-3 text-sm">✓</span>
                    {feature}
                  </div>
                ))}
                {plan.limitations.map((limitation, limitIndex) => (
                  <div key={limitIndex} className="flex items-center text-gray-400">
                    <span className="w-6 h-6 bg-gray-500 text-white rounded-full flex items-center justify-center mr-3 text-sm">✗</span>
                    {limitation}
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 hover-lift ${
                plan.popular 
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white animate-pulse-glow hover:shadow-2xl' 
                  : 'bg-white/20 text-white hover:bg-white/30 border border-white/20'
              }`}>
                {plan.buttonText}
              </button>

              {/* Additional Info */}
              {plan.id === 'trial' && (
                <p className="text-center text-blue-200 text-sm mt-4">
                  Không cần thẻ tín dụng
                </p>
              )}
              {plan.id === 'premium' && (
                <p className="text-center text-blue-200 text-sm mt-4">
                  Thanh toán một lần, sử dụng mãi mãi
                </p>
              )}
              {plan.id === 'enterprise' && (
                <p className="text-center text-blue-200 text-sm mt-4">
                  Giá ưu đãi cho khối lượng lớn
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className={`mt-16 text-center transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-2xl font-bold text-white mb-8">Phương Thức Thanh Toán</h3>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 flex items-center space-x-3">
              <span className="text-2xl">💳</span>
              <span className="text-white font-medium">Thẻ tín dụng</span>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 flex items-center space-x-3">
              <span className="text-2xl">🏦</span>
              <span className="text-white font-medium">Chuyển khoản</span>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 flex items-center space-x-3">
              <span className="text-2xl">📱</span>
              <span className="text-white font-medium">Ví điện tử</span>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 flex items-center space-x-3">
              <span className="text-2xl">💰</span>
              <span className="text-white font-medium">Tiền mặt</span>
            </div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className={`mt-16 bg-white/5 backdrop-blur-lg rounded-3xl p-8 transform transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-2xl font-bold text-white text-center mb-8">Câu Hỏi Thường Gặp</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-semibold mb-2">🔄 Có thể nâng cấp từ Trial lên Premium không?</h4>
                <p className="text-blue-200 text-sm">Có, bạn có thể nâng cấp bất cứ lúc nào và dữ liệu sẽ được giữ nguyên.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">🔒 Dữ liệu có được bảo mật không?</h4>
                <p className="text-blue-200 text-sm">Tuyệt đối! Chúng tôi sử dụng mã hóa SSL và backup hàng ngày.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-semibold mb-2">💬 Có hỗ trợ kỹ thuật không?</h4>
                <p className="text-blue-200 text-sm">Có, chúng tôi hỗ trợ qua email, chat và hotline 24/7.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">🔄 Có chính sách hoàn tiền không?</h4>
                <p className="text-blue-200 text-sm">Có, hoàn tiền 100% trong 30 ngày đầu nếu không hài lòng.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;