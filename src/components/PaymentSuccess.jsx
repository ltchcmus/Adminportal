import { useEffect, useState } from 'react';

const PaymentSuccess = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [codeValue, setCodeValue] = useState('XXXX-XXXX-XXXX-XXXX');

  useEffect(() => {
    setIsVisible(true);
    // Get transaction details from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    const transId = urlParams.get('transId');
    const amount = urlParams.get('amount');
    const code = urlParams.get('code');
    
    console.log('Transaction Details:', { orderId, transId, amount, code });
    
    // Store code for display
    if (code) {
      setCodeValue(code);
    }
  }, []);

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleDownloadCode = () => {
    // Logic để download code
    alert('Code của bạn sẽ được gửi qua email!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-600 to-cyan-500 flex items-center justify-center px-4 py-12">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className={`relative z-10 max-w-2xl w-full transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-8 text-center">
            {/* Success Icon Animation */}
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {/* Confetti Effect */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                <div className="animate-bounce" style={{ animationDuration: '0.6s' }}>
                  <span className="text-4xl">🎉</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-2">
              Thanh Toán Thành Công!
            </h1>
            <p className="text-xl text-green-50">
              Cảm ơn bạn đã mua code premium
            </p>
          </div>

          {/* Content */}
          <div className="p-8 sm:p-12">
            {/* Transaction Details */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Chi Tiết Giao Dịch
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Mã đơn hàng:</span>
                  <span className="font-semibold text-gray-800">#MOMO{new Date().getTime()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sản phẩm:</span>
                  <span className="font-semibold text-gray-800">Code Premium</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Số tiền:</span>
                  <span className="font-bold text-2xl text-blue-600">199,000 VNĐ</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Thời gian:</span>
                  <span className="font-semibold text-gray-800">{new Date().toLocaleString('vi-VN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trạng thái:</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 font-semibold">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Thành công
                  </span>
                </div>
              </div>
            </div>

            {/* Code Information */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 mb-8 border-2 border-yellow-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🔑</span>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Code Kích Hoạt Của Bạn</h3>
                  <div className="bg-white rounded-lg p-4 mb-3 border border-yellow-300">
                    <p className="text-2xl font-mono font-bold text-center text-blue-600 tracking-wider">
                      {codeValue}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Code đã được gửi đến email của bạn
                  </p>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📝 Các Bước Tiếp Theo</h3>
              <ol className="space-y-3">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                  <span className="text-gray-700">Kiểm tra email để nhận code kích hoạt</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                  <span className="text-gray-700">Tải và cài đặt ứng dụng MyShop</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                  <span className="text-gray-700">Nhập code để kích hoạt phiên bản Premium</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
                  <span className="text-gray-700">Bắt đầu trải nghiệm tất cả tính năng cao cấp</span>
                </li>
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDownloadCode}
                className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold text-lg hover-lift hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Tải Ứng Dụng
              </button>
              <button
                onClick={handleGoHome}
                className="flex-1 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300"
              >
                Về Trang Chủ
              </button>
            </div>

            {/* Support Section */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-2">Cần hỗ trợ?</p>
              <div className="flex justify-center space-x-4">
                <a href="mailto:support@myshop.vn" className="text-blue-600 hover:text-blue-800 font-medium">
                  📧 Email
                </a>
                <span className="text-gray-300">|</span>
                <a href="tel:+84123456789" className="text-blue-600 hover:text-blue-800 font-medium">
                  📞 Hotline
                </a>
                <span className="text-gray-300">|</span>
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                  💬 Chat
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-white text-sm">
          <p>🔒 Giao dịch được bảo mật bởi SSL 256-bit</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;