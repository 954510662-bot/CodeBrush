import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  User,
  Shield,
  Key,
  History,
  Bell,
  LogOut,
  ChevronRight,
  Monitor,
  Smartphone,
  MapPin,
  Clock
} from 'lucide-react'

const menuItems = [
  { id: 'profile', label: '个人信息', icon: User, href: '#profile' },
  { id: 'security', label: '账户安全', icon: Shield, href: '#security' },
  { id: 'api', label: 'API 密钥', icon: Key, href: '#api' },
  { id: 'history', label: '登录历史', icon: History, href: '#history' },
  { id: 'notifications', label: '通知设置', icon: Bell, href: '#notifications' },
]

const loginHistory = [
  { device: 'Chrome on Windows', location: '北京市', ip: '192.168.1.1', time: '2024-01-15 14:32', current: true },
  { device: 'Safari on macOS', location: '上海市', ip: '192.168.1.2', time: '2024-01-14 09:15', current: false },
  { device: 'Mobile App', location: '广州市', ip: '10.0.0.1', time: '2024-01-13 18:45', current: false },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <span className="font-display font-bold text-xl text-gray-900">CodeBrush</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/download" className="text-sm text-gray-600 hover:text-gray-900">
                下载 App
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-medium text-sm">U</span>
                </div>
                <span className="text-sm font-medium">用户名</span>
              </div>
              <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl border p-4 sticky top-24">
              <div className="flex items-center gap-4 p-4 border-b mb-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold text-2xl">U</span>
                </div>
                <div>
                  <div className="font-semibold">用户名</div>
                  <div className="text-sm text-gray-500">user@example.com</div>
                </div>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border p-6"
              >
                <h2 className="text-2xl font-bold mb-6">个人信息</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-bold text-4xl">U</span>
                    </div>
                    <div>
                      <button className="btn-primary">更换头像</button>
                      <p className="text-sm text-gray-500 mt-2">支持 JPG、PNG 格式，最大 2MB</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">用户名</label>
                      <input type="text" defaultValue="用户名" className="input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                      <input type="email" defaultValue="user@example.com" className="input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">公司</label>
                      <input type="text" placeholder="所属公司（可选）" className="input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">职位</label>
                      <input type="text" placeholder="您的职位（可选）" className="input" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">个人简介</label>
                    <textarea 
                      className="input min-h-[100px]" 
                      placeholder="介绍一下自己..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <button className="btn-primary">保存更改</button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-xl border p-6">
                  <h3 className="text-lg font-bold mb-4">修改密码</h3>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">当前密码</label>
                      <input type="password" className="input" placeholder="••••••••" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">新密码</label>
                      <input type="password" className="input" placeholder="••••••••" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">确认新密码</label>
                      <input type="password" className="input" placeholder="••••••••" />
                    </div>
                    <button className="btn-primary">更新密码</button>
                  </div>
                </div>

                <div className="bg-white rounded-xl border p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">双因素认证 (2FA)</h3>
                        <p className="text-sm text-gray-500">为您的账户添加额外的安全保护</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        twoFactorEnabled
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {twoFactorEnabled ? '已启用' : '启用'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* API Tab */}
            {activeTab === 'api' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border p-6"
              >
                <h3 className="text-lg font-bold mb-4">API 密钥</h3>
                <p className="text-gray-600 mb-6">
                  使用 API 密钥可以在第三方应用中访问您的 CodeBrush 数据。请妥善保管密钥，不要泄露给他人。
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium mb-1">默认密钥</div>
                      <code className="text-sm text-gray-600">cb_live_xxxxxxxxxxxx</code>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-50">
                        复制
                      </button>
                      <button className="px-3 py-1 text-sm text-red-600 bg-white border rounded hover:bg-red-50">
                        重新生成
                      </button>
                    </div>
                  </div>
                </div>

                <button className="btn-primary">创建新密钥</button>
              </motion.div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border p-6"
              >
                <h3 className="text-lg font-bold mb-4">登录历史</h3>
                <p className="text-gray-600 mb-6">
                  您可以在此查看账户的登录记录。如果发现异常登录，请及时更改密码。
                </p>

                <div className="space-y-4">
                  {loginHistory.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                          {session.device.includes('Mobile') ? (
                            <Smartphone className="w-5 h-5 text-primary-600" />
                          ) : (
                            <Monitor className="w-5 h-5 text-primary-600" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{session.device}</span>
                            {session.current && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                                当前设备
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {session.location}
                            </span>
                            <span>{session.ip}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {session.time}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
