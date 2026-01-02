import { useState } from 'react';

const CodeRequestModal = ({ isOpen, onClose, onSubmit, type = 'trial' }) => {
  const [formData, setFormData] = useState({
    nameCompany: '',
    email: '',
    cccd: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.nameCompany.trim()) {
      setError('Vui lòng nhập tên công ty/cá nhân');
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Vui lòng nhập email hợp lệ');
      return false;
    }
    if (!formData.cccd.trim() || formData.cccd.length < 9) {
      setError('Vui lòng nhập số CCCD/CMND hợp lệ');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    
    try {
      await onSubmit(formData);
      // Reset form after successful submission
      setFormData({ nameCompany: '', email: '', cccd: '' });
    } catch (err) {
      setError(err.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all animate-fade-in-up">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className={`w-16 h-16 ${type === 'trial' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 'bg-gradient-to-br from-yellow-500 to-orange-500'} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <span className="text-3xl">{type === 'trial' ? '🎁' : '💎'}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {type === 'trial' ? 'Nhận Code Trial Miễn Phí' : 'Mua Code Premium'}
            </h3>
            <p className="text-gray-600">
              {type === 'trial' 
                ? 'Trải nghiệm đầy đủ tính năng trong 15 ngày' 
                : 'Sử dụng vĩnh viễn, không giới hạn'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên Công Ty / Cá Nhân <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nameCompany"
                value={formData.nameCompany}
                onChange={handleChange}
                placeholder="VD: Shop Thời Trang ABC"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                disabled={loading}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                disabled={loading}
              />
            </div>

            {/* CCCD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số CCCD / CMND <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="cccd"
                value={formData.cccd}
                onChange={handleChange}
                placeholder="001234567890"
                maxLength="12"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">
                {type === 'trial' 
                  ? '⚠️ Mỗi CCCD chỉ được nhận 1 code trial duy nhất' 
                  : 'Để bảo vệ giao dịch và xác thực người dùng'}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Info Box */}
            <div className={`${type === 'trial' ? 'bg-blue-50 border-blue-200' : 'bg-yellow-50 border-yellow-200'} border rounded-lg p-3 text-sm`}>
              <p className="text-gray-700">
                <strong>📧 Lưu ý:</strong> Code sẽ được gửi đến email của bạn ngay sau khi xác nhận.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium disabled:opacity-50"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 px-6 py-3 ${type === 'trial' ? 'bg-gradient-to-r from-blue-600 to-cyan-500' : 'bg-gradient-to-r from-yellow-500 to-orange-500'} text-white rounded-lg hover-lift font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang xử lý...
                  </span>
                ) : (
                  type === 'trial' ? 'Nhận Code Miễn Phí' : 'Tiếp Tục Thanh Toán'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CodeRequestModal;