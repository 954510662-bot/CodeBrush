import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  MapPin, 
  Phone,
  Send,
  Clock,
  MessageCircle,
  Users,
  HelpCircle,
  CheckCircle
} from 'lucide-react'

const contactTypes = [
  { id: 'support', label: '技术支持', icon: MessageCircle, description: '产品使用问题、故障排查' },
  { id: 'sales', label: '商务合作', icon: Users, description: '企业版购买、定制开发' },
  { id: 'feedback', label: '产品反馈', icon: HelpCircle, description: '功能建议、体验优化' },
]

const faqs = [
  {
    question: 'CodeBrush 支持哪些平台？',
    answer: 'CodeBrush 支持 Windows、macOS 和 Linux 三大主流操作系统。您可以在我们的下载页面找到适合您系统的版本。',
  },
  {
    question: '免费版和付费版有什么区别？',
    answer: '免费版可以无限制使用基础功能，包括项目管理、基本编辑功能等。付费版提供更多高级功能，如无限版本历史、高级插件、云存储空间等。',
  },
  {
    question: '如何购买企业版？',
    answer: '您可以通过邮件联系我们 (enterprise@codebrush.com)，我们的销售团队会在24小时内与您联系，提供定制化的解决方案。',
  },
  {
    question: '数据安全如何保障？',
    answer: '我们采用端到端加密传输，所有数据存储都经过 AES-256 加密，并符合 GDPR 和 SOC 2 安全标准。',
  },
]

export default function ContactPage() {
  const [selectedType, setSelectedType] = useState('support')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    attachment: null as File | null,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-purple-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="heading-1 mb-6">联系我们</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            有任何问题或建议？我们随时为您提供帮助
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold mb-6">发送消息</h2>
              
              {/* Contact Type Selection */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {contactTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedType === type.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <type.icon className={`w-6 h-6 mx-auto mb-2 ${
                      selectedType === type.id ? 'text-primary-600' : 'text-gray-400'
                    }`} />
                    <div className="text-sm font-medium">{type.label}</div>
                  </button>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      姓名
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input"
                      placeholder="您的姓名"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      邮箱
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    主题
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="input"
                    placeholder="简要描述您的问题"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    详细内容
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input min-h-[150px]"
                    placeholder="请详细描述您的问题或建议..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    附件 (可选)
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setFormData({ ...formData, attachment: e.target.files?.[0] || null })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    accept=".jpg,.png,.pdf,.zip"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    支持 JPG、PNG、PDF、ZIP 格式，最大 10MB
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-4 flex items-center justify-center gap-2"
                >
                  {submitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      发送成功！
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      发送消息
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* Contact Cards */}
              <div className="bg-gray-50 rounded-2xl p-8 space-y-6">
                <h3 className="text-xl font-bold">联系方式</h3>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">商务合作</div>
                    <a href="mailto:business@codebrush.com" className="text-gray-600 hover:text-primary-600">
                      business@codebrush.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">技术支持</div>
                    <a href="mailto:support@codebrush.com" className="text-gray-600 hover:text-primary-600">
                      support@codebrush.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">公司地址</div>
                    <div className="text-gray-600">
                      北京市朝阳区建国门外大街1号<br />
                      国贸大厦A座 38层
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">工作时间</div>
                    <div className="text-gray-600">
                      周一至周五 9:00 - 18:00<br />
                      (节假日除外)
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6">常见问题</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <details key={index} className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-4 bg-white rounded-lg hover:bg-gray-50">
                        <span className="font-medium">{faq.question}</span>
                        <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="mt-3 px-4 text-gray-600">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
