import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  Layers, 
  Users, 
  Puzzle, 
  Cloud, 
  Target,
  Clock,
  CheckCircle
} from 'lucide-react'

const features = [
  {
    icon: Layers,
    title: '多图层管理',
    description: '强大的图层系统，支持分组、锁定、可见性控制，让复杂设计井然有序',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop',
  },
  {
    icon: Users,
    title: '实时协作',
    description: '多人同时编辑，实时同步更新，告别版本冲突，提升团队效率',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
  },
  {
    icon: Puzzle,
    title: '插件系统',
    description: '开放的插件API，支持第三方扩展，满足个性化需求',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
  },
  {
    icon: Cloud,
    title: '云端同步',
    description: '安全可靠的云存储，自动保存版本，随时随地访问您的作品',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
  },
]

const comparison = [
  { feature: '实时协作', codebrush: true, figma: true, sketch: false },
  { feature: '插件系统', codebrush: true, figma: true, sketch: true },
  { feature: '中文界面', codebrush: true, figma: false, sketch: false },
  { feature: '离线使用', codebrush: true, figma: false, sketch: true },
  { feature: '免费版本', codebrush: true, figma: true, sketch: false },
  { feature: '私有部署', codebrush: true, figma: false, sketch: false },
]

const roadmap = [
  {
    quarter: 'Q1 2025',
    items: [
      'AI智能设计辅助',
      '团队管理后台优化',
      '企业版定制功能',
    ],
  },
  {
    quarter: 'Q2 2025',
    items: [
      '移动端App发布',
      '设计资产市场',
      '第三方平台集成',
    ],
  },
  {
    quarter: 'Q3 2025',
    items: [
      'AR/VR设计工具',
      '自动化工作流',
      '高级分析报表',
    ],
  },
]

export default function ProductPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-purple-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-1 mb-6">
              为创意而生的
              <br />
              <span className="text-gradient">专业设计工具</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              CodeBrush 融合了先进的设计理念和强大的技术架构，为设计师和开发者提供流畅、高效的创作体验
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/download" className="btn-primary text-lg px-8 py-4">
                免费下载
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/docs" className="btn-outline text-lg px-8 py-4">
                查看文档
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Detail */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">强大功能，匠心设计</h2>
            <p className="text-xl text-gray-600">每一个功能都经过精心打磨，只为给您最佳体验</p>
          </div>

          <div className="space-y-24">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-500 p-4 mb-6`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-lg text-gray-600 mb-6">{feature.description}</p>
                  <Link to="/docs" className="text-primary-600 font-medium flex items-center gap-2 hover:gap-3 transition-all">
                    了解更多
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className={`bg-gray-100 rounded-2xl overflow-hidden ${
                  index % 2 === 1 ? 'lg:order-1' : ''
                }`}>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">与竞品对比</h2>
            <p className="text-xl text-gray-600">为什么选择 CodeBrush？</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50 border-b">
              <div className="font-semibold text-gray-900">功能</div>
              <div className="font-semibold text-primary-600 text-center">CodeBrush</div>
              <div className="font-semibold text-gray-600 text-center">Figma</div>
              <div className="font-semibold text-gray-600 text-center">Sketch</div>
            </div>
            {comparison.map((row, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 p-6 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                <div className="text-gray-900">{row.feature}</div>
                <div className="text-center">
                  {row.codebrush && <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />}
                  {!row.codebrush && <X className="w-6 h-6 text-gray-300 mx-auto" />}
                </div>
                <div className="text-center">
                  {row.figma && <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />}
                  {!row.figma && <X className="w-6 h-6 text-gray-300 mx-auto" />}
                </div>
                <div className="text-center">
                  {row.sketch && <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />}
                  {!row.sketch && <X className="w-6 h-6 text-gray-300 mx-auto" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">发展路线图</h2>
            <p className="text-xl text-gray-600">我们的未来规划</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {roadmap.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primary-50 to-purple-50 p-8 rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6 text-primary-600" />
                  <h3 className="text-xl font-bold text-gray-900">{item.quarter}</h3>
                </div>
                <ul className="space-y-3">
                  {item.items.map((todo, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{todo}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function X({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
