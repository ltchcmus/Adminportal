import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 animate-slide-in-left">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center animate-pulse-glow">
              <span className="text-white font-bold text-lg sm:text-xl">MS</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold gradient-text">MyShop</h1>
              <p className="text-xs text-blue-600">Admin Portal</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <a href="#home" className="px-4 py-2 text-blue-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium">
              Trang chủ
            </a>
            <a href="#features" className="px-4 py-2 text-blue-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium">
              Tính năng
            </a>
            <a href="#pricing" className="px-4 py-2 text-blue-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium">
              Bảng giá
            </a>
            <a href="#contact" className="px-4 py-2 text-blue-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium">
              Liên hệ
            </a>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-3 animate-slide-in-right">
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
                  👤 {user.username}
                </div>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-all duration-300 font-medium"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium">
                  Đăng nhập
                </button>
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover-lift font-medium shadow-lg">
                  Đăng ký
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass-effect border-b border-white/20 animate-fade-in-up">
            <div className="px-4 py-4 space-y-3">
              <a href="#home" className="block px-4 py-3 text-blue-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium">
                Trang chủ
              </a>
              <a href="#features" className="block px-4 py-3 text-blue-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium">
                Tính năng
              </a>
              <a href="#pricing" className="block px-4 py-3 text-blue-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium">
                Bảng giá
              </a>
              <a href="#contact" className="block px-4 py-3 text-blue-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium">
                Liên hệ
              </a>
              <div className="pt-4 border-t border-blue-200 space-y-3">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-3 bg-green-100 text-green-700 rounded-lg font-medium text-center">
                      👤 {user.username}
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-all duration-300 font-medium"
                    >
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <>
                    <button className="w-full px-4 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium">
                      Đăng nhập
                    </button>
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover-lift font-medium shadow-lg">
                      Đăng ký
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;