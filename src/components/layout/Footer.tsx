import { Link } from 'react-router-dom'
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react'

const footerLinks = {
  product: {
    title: '产品',
    links: [
      { name: '功能介绍', href: '/product' },
      { name: '下载中心', href: '/download' },
      { name: '更新日志', href: '/download#changelog' },
      { name: '路线图', href: '/product#roadmap' },
    ],
  },
  resources: {
    title: '资源',
    links: [
      { name: '用户文档', href: '/docs' },
      { name: 'API文档', href: '/docs/api' },
      { name: '插件开发', href: '/docs/plugins' },
      { name: '常见问题', href: '/docs/faq' },
    ],
  },
  company: {
    title: '公司',
    links: [
      { name: '关于我们', href: '/about' },
      { name: '联系我们', href: '/contact' },
      { name: '加入团队', href: '/careers' },
      { name: '新闻资讯', href: '/blog' },
    ],
  },
  legal: {
    title: '法律',
    links: [
      { name: '服务条款', href: '/terms' },
      { name: '隐私政策', href: '/privacy' },
      { name: 'Cookie政策', href: '/cookies' },
    ],
  },
}

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/codebrush' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/codebrush' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/codebrush' },
  { name: '邮箱', icon: Mail, href: 'mailto:hello@codebrush.com' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="font-display font-bold text-xl text-white">CodeBrush</span>
            </div>
            <p className="text-sm text-gray-400 mb-6 max-w-sm">
              专业级在线设计工具，让创意触手可及。实时协作、云端同步、插件扩展，助力团队高效工作。
            </p>
            <div className="flex gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 CodeBrush. 保留所有权利。
            </p>
            <p className="text-sm text-gray-400 flex items-center gap-1">
              用 <Heart className="w-4 h-4 text-red-500" /> 打造
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
