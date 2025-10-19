import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-600 to-cyan-500" 
           style={{ 
             backgroundSize: '400% 400%',
             animation: 'gradient-shift 8s ease infinite'
           }}>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block animate-slide-in-left">Nhận Code</span>
            <span className="block text-cyan-300 animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
              Ứng Dụng Premium
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Trải nghiệm ứng dụng MyShop với đầy đủ tính năng. 
            Nhận code trial miễn phí hoặc mua code premium để sử dụng không giới hạn.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover-lift hover:shadow-2xl transition-all duration-300 hover:scale-105">
              🎁 Nhận Code Trial Miễn Phí
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-bold text-lg hover-lift hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-pulse-glow">
              💎 Mua Code Premium
            </button>
          </div>

          {/* Features Preview */}
          <div className={`mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="glass-effect p-6 rounded-xl hover-lift">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Siêu Nhanh</h3>
              <p className="text-blue-100 text-sm">Hiệu suất cao, xử lý nhanh chóng</p>
            </div>
            
            <div className="glass-effect p-6 rounded-xl hover-lift" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Bảo Mật</h3>
              <p className="text-blue-100 text-sm">Mã hóa dữ liệu an toàn tuyệt đối</p>
            </div>
            
            <div className="glass-effect p-6 rounded-xl hover-lift" style={{ animationDelay: '0.4s' }}>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Đẹp Mắt</h3>
              <p className="text-blue-100 text-sm">Giao diện hiện đại, trực quan</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;