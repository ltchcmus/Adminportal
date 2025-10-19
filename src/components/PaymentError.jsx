import { useEffect, useState } from 'react';

const PaymentError = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [errorDetails, setErrorDetails] = useState({
    resultCode: '',
    message: 'Giao dịch không thành công',
    orderId: ''
  });

  useEffect(() => {
    setIsVisible(true);
    // Get error details from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const resultCode = urlParams.get('resultCode');
    const message = urlParams.get('message');
    const orderId = urlParams.get('orderId');
    
    setErrorDetails({
      resultCode: resultCode || '9999',
      message: message || 'Giao dịch không thành công',
      orderId: orderId || 'N/A'
    });

    console.log('Error Details:', { resultCode, message, orderId });
  }, []);

  const handleRetry = () => {
    window.location.href = '/#pricing';
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const getErrorMessage = (code) => {
    const errorMessages = {
      '1006': 'Giao dịch bị từ chối bởi người dùng',
      '1001': 'Giao dịch thất bại do lỗi hệ thống',
      '49': 'Giao dịch vượt quá hạn mức thanh toán',
      '10': 'Thẻ/Tài khoản chưa đăng ký dịch vụ thanh toán',
      '11': 'Số dư tài khoản không đủ',
      '12': 'Tài khoản bị khóa',
      '9000': 'Giao dịch đã được xử lý',
      '9999': 'Lỗi không xác định'
    };
    return errorMessages[code] || errorMessages['9999'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-600 to-orange-500 flex items-center justify-center px-4 py-12">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className={`relative z-10 max-w-2xl w-full transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {/* Error Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 p-8 text-center">
            {/* Error Icon Animation */}
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              {/* Warning Icon */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                <div className="animate-bounce" style={{ animationDuration: '0.6s' }}>
                  <span className="text-4xl">⚠️</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-2">
              Thanh Toán Thất Bại!
            </h1>
            <p className="text-xl text-red-50">
              Đã có lỗi xảy ra trong quá trình thanh toán
            </p>
          </div>

          {/* Content */}
          <div className="p-8 sm:p-12">
            {/* Error Details */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 mb-8 border-2 border-red-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Thông Tin Lỗi
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-gray-600">Mã lỗi:</span>
                  <span className="font-bold text-red-600">{errorDetails.resultCode}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-600">Lý do:</span>
                  <span className="font-semibold text-gray-800 text-right flex-1 ml-4">
                    {getErrorMessage(errorDetails.resultCode)}
                  </span>
                </div>
                {errorDetails.orderId !== 'N/A' && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Mã đơn hàng:</span>
                    <span className="font-semibold text-gray-800">{errorDetails.orderId}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Thời gian:</span>
                  <span className="font-semibold text-gray-800">{new Date().toLocaleString('vi-VN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trạng thái:</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 font-semibold">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    Thất bại
                  </span>
                </div>
              </div>
            </div>

            {/* Common Reasons */}
            <div className="bg-yellow-50 rounded-2xl p-6 mb-8 border border-yellow-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">💡</span>
                Các Nguyên Nhân Thường Gặp
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Số dư trong tài khoản không đủ để thanh toán</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Thẻ/Tài khoản đã hết hạn hoặc bị khóa</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Thông tin thanh toán không chính xác</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Hủy giao dịch trong quá trình thanh toán</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Vượt quá hạn mức giao dịch trong ngày</span>
                </li>
              </ul>
            </div>

            {/* What to do next */}
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">🔧</span>
                Giải Pháp
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                  <span className="text-gray-700">Kiểm tra lại thông tin tài khoản và số dư</span>
                </div>
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                  <span className="text-gray-700">Thử lại với phương thức thanh toán khác</span>
                </div>
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                  <span className="text-gray-700">Liên hệ ngân hàng nếu vấn đề vẫn tiếp diễn</span>
                </div>
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
                  <span className="text-gray-700">Hoặc liên hệ bộ phận hỗ trợ của chúng tôi</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleRetry}
                className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold text-lg hover-lift hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Thử Lại
              </button>
              <button
                onClick={handleGoHome}
                className="flex-1 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300"
              >
                Về Trang Chủ
              </button>
            </div>

            {/* Support Section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl text-white text-center">
              <h4 className="font-bold text-lg mb-3">💬 Cần Hỗ Trợ Ngay?</h4>
              <p className="mb-4 text-blue-50">Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp bạn 24/7</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a href="mailto:support@myshop.vn" className="px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  📧 Email Support
                </a>
                <a href="tel:+84123456789" className="px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  📞 Gọi Hotline
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-white text-sm">
          <p>🔒 Thông tin giao dịch của bạn được bảo mật tuyệt đối</p>
          <p className="mt-2">Mọi thắc mắc vui lòng liên hệ: support@myshop.vn</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentError;