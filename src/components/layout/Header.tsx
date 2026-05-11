import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Download, Search } from 'lucide-react'

const navigation = [
  { name: '产品', href: '/product', description: '了解CodeBrush' },
  { name: '下载', href: '/download', description: '获取最新版本' },
  { name: '文档', href: '/docs', description: '学习使用指南' },
  { name: '联系我们', href: '/contact', description: '获取帮助' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="font-display font-bold text-xl text-gray-900">CodeBrush</span>
            </Link>

            <div className="hidden md:flex md:gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                    location.pathname === item.href ? 'text-primary-600' : 'text-gray-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="搜索"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              to="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              登录
            </Link>

            <Link
              to="/download"
              className="btn-primary text-sm py-2 px-4 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              免费下载
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600"
            aria-label="菜单"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {searchOpen && (
          <div className="py-4 border-t border-gray-100 animate-slide-down">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索文档、功能..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                autoFocus
              />
              <kbd className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 text-xs bg-gray-100 rounded">
                ESC
              </kbd>
            </div>
          </div>
        )}

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-slide-down">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <Link
                  to="/login"
                  className="block px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  登录
                </Link>
                <Link
                  to="/download"
                  className="block px-4 py-3 bg-primary-600 text-white rounded-lg text-center font-medium"
                >
                  免费下载
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
