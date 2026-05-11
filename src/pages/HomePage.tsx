import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Download, 
  Zap, 
  Users, 
  Palette, 
  Cloud, 
  Puzzle,
  Shield,
  Star,
  Play
} from 'lucide-react'

const features = [
  {
    icon: Users,
    title: '实时协作',
    description: '多人同时编辑，实时同步，告别版本冲突',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Puzzle,
    title: '插件系统',
    description: '丰富的插件生态，随心扩展功能',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Cloud,
    title: '云端同步',
    description: '安全可靠的云存储，随时随地访问',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Palette,
    title: '设计系统',
    description: '统一的设计规范，确保品牌一致性',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Zap,
    title: '极致性能',
    description: '流畅的操作体验，响应时间<100ms',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Shield,
    title: '安全可靠',
    description: '端到端加密，符合安全标准',
    color: 'from-red-500 to-rose-500',
  },
]

const stats = [
  { value: '100K+', label: '活跃用户' },
  { value: '50+', label: '国家使用' },
  { value: '99.9%', label: '服务可用性' },
  { value: '<100ms', label: '平均响应时间' },
]

const testimonials = [
  {
    content: 'CodeBrush彻底改变了我们的设计工作流。实时协作功能让团队效率提升了3倍！',
    author: '李明',
    role: '设计总监',
    company: '字节跳动',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
  {
    content: '作为独立设计师，CodeBrush的专业功能和云端同步让我能随时随地工作，太方便了！',
    author: '王芳',
    role: '自由设计师',
    company: 'Freelancer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  },
  {
    content: '插件系统太棒了！我自己开发的几个插件让工作效率翻倍，社区也很活跃。',
    author: '张伟',
    role: '全栈工程师',
    company: '阿里巴巴',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  },
]

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center gradient-bg overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-200" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-400" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                <Star className="w-4 h-4" />
                v2.0 全新发布
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="heading-1 mb-6 text-gray-900"
            >
              专业设计工具
              <br />
              <span className="text-gradient">触手可及</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
            >
              CodeBrush 是一款新一代在线设计工具，融合实时协作、云端同步、插件扩展等强大功能，让创意工作更加高效流畅。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/download" className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                免费下载
              </Link>
              <Link to="/docs" className="btn-outline text-lg px-8 py-4 flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                快速入门
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">为什么选择 CodeBrush？</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              我们专注于为用户提供最佳的设计体验，每一个功能都经过精心打磨
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-2xl border border-gray-200 hover:border-primary-200 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-2 mb-6">准备好开始了吗？</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            加入 100,000+ 设计师和开发者，开始您的高效设计之旅
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/download" className="btn bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4">
              立即开始
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link to="/contact" className="btn border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-4">
              联系我们
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">用户怎么说</h2>
            <p className="text-xl text-gray-600">来自全球用户的真实反馈</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-sm"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">{testimonial.content}</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role} · {testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
