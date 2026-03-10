export const languages = {
  en: 'English',
  zh: '中文',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    // Nav
    'nav.home': 'Clawman',
    'nav.docs': 'Knowledge Base',
    'nav.getStarted': 'Get Started',

    // Hero
    'hero.title': 'Your First Agent Employee',
    'hero.subtitle': 'We build, deploy, and manage AI agents that work 24/7 for your business. No AI expertise required.',
    'hero.cta': 'Get Started',
    'hero.note': 'Early bird pricing available',

    // Problem
    'problem.label': 'The Problem',
    'problem.title': 'AI is everywhere. But your team is still overwhelmed.',
    'problem.card1.title': 'Repetitive Work',
    'problem.card1.desc': 'Your team spends hours on tasks that could be automated — data entry, customer queries, report generation.',
    'problem.card2.title': 'Hiring is Slow',
    'problem.card2.desc': 'Finding, interviewing, and onboarding takes months. Meanwhile, work piles up.',
    'problem.card3.title': 'AI Tools Need Experts',
    'problem.card3.desc': 'ChatGPT is cool, but building reliable AI workflows requires engineering your team doesn\'t have.',
    'problem.punch': 'You need agents that just work.',

    // Service
    'service.label': 'What We Do',
    'service.title': 'Agent employees. Built for your business.',
    'service.card1.title': 'Custom Agent Development',
    'service.card1.desc': 'We design and build agents tailored to your specific workflows and needs.',
    'service.card2.title': 'Subscription Hosting',
    'service.card2.desc': '24/7 managed hosting. Your agents run reliably, we handle the infrastructure.',
    'service.card3.title': 'Integration & Training',
    'service.card3.desc': 'Seamless integration with your existing tools — Slack, Telegram, email, CRM.',
    'service.card4.title': '24/7 Operation',
    'service.card4.desc': 'Agents work around the clock. No sick days, no holidays, no burnout.',
    'service.card5.title': 'Human Oversight',
    'service.card5.desc': 'Every agent has human supervision. Quality and safety, guaranteed.',
    'service.card6.title': 'Continuous Improvement',
    'service.card6.desc': 'We monitor, optimize, and upgrade your agents as your needs evolve.',

    // How
    'how.label': 'How It Works',
    'how.title': 'Three steps to your first agent.',
    'how.step1.title': 'Define Your Workflow',
    'how.step1.desc': 'Tell us what tasks you want automated. We\'ll design the perfect agent.',
    'how.step2.title': 'We Build & Deploy',
    'how.step2.desc': 'Our team builds your agent using OpenClaw, tests it, and deploys to production.',
    'how.step3.title': 'Monitor & Optimize',
    'how.step3.desc': 'Track performance in real-time. We continuously improve based on results.',

    // Technology
    'tech.label': 'Technology',
    'tech.title': 'Built on OpenClaw',
    'tech.desc': 'OpenClaw is our open-source agent framework — battle-tested, extensible, and production-ready. 3,200+ skills available on ClawHub.',
    'tech.cta': 'Explore the Knowledge Base',

    // Pricing
    'pricing.label': 'Pricing',
    'pricing.title': 'Simple, transparent pricing.',
    'pricing.original': '$1,999/mo',
    'pricing.price': '$499',
    'pricing.period': '/mo',
    'pricing.badge': 'EARLY BIRD',
    'pricing.item1': 'Custom agent development',
    'pricing.item2': '24/7 managed hosting',
    'pricing.item3': 'Slack / Telegram / Email integration',
    'pricing.item4': 'Human oversight & quality assurance',
    'pricing.item5': 'Continuous optimization',
    'pricing.item6': 'Priority support',
    'pricing.item7': 'Cancel anytime',
    'pricing.cta': 'Get Started',

    // FAQ
    'faq.label': 'FAQ',
    'faq.title': 'Frequently Asked Questions',

    // CTA
    'cta.title': 'Ready to hire your first agent?',
    'cta.button': 'Get Started',
    'cta.contact': 'Or reach out directly',

    // Footer
    'footer.copy': '© 2026 Clawman · Built on OpenClaw',
    'footer.twitter': 'Twitter',
    'footer.github': 'GitHub',

    // Docs
    'docs.toc': 'On this page',
    'docs.related': 'Related Articles',
    'docs.lastUpdated': 'Last updated',
    'docs.search': 'Search docs...',
    'docs.backToIndex': 'Back to Knowledge Base',
  },
  zh: {
    // Nav
    'nav.home': '龙虾超人',
    'nav.docs': '知识库',
    'nav.getStarted': '开始使用',

    // Hero
    'hero.title': '龙虾超人，你的第一个 Agent 员工',
    'hero.subtitle': '我们为企业构建、部署和管理 7×24 小时运行的 AI Agent。无需 AI 专业知识。',
    'hero.cta': '立即开始',
    'hero.note': '早鸟优惠进行中',

    // Problem
    'problem.label': '痛点',
    'problem.title': 'AI 工具到处都是，但团队依然忙不过来。',
    'problem.card1.title': '重复性工作',
    'problem.card1.desc': '团队每天花大量时间在可以自动化的任务上——数据录入、客户咨询、报表生成。',
    'problem.card2.title': '招人太慢',
    'problem.card2.desc': '找人、面试、入职需要数月时间。工作却不等人。',
    'problem.card3.title': 'AI 工具门槛高',
    'problem.card3.desc': 'ChatGPT 很酷，但构建可靠的 AI 工作流需要团队不具备的工程能力。',
    'problem.punch': '你需要的是直接能干活的 Agent。',

    // Service
    'service.label': '我们做什么',
    'service.title': 'Agent 员工，为你的业务量身打造。',
    'service.card1.title': '定制 Agent 开发',
    'service.card1.desc': '根据你的具体工作流和需求，设计并构建专属 Agent。',
    'service.card2.title': '订阅制托管',
    'service.card2.desc': '7×24 小时托管运行。Agent 稳定可靠，基础设施由我们负责。',
    'service.card3.title': '集成与培训',
    'service.card3.desc': '无缝对接现有工具——Slack、Telegram、邮件、CRM。',
    'service.card4.title': '全天候运行',
    'service.card4.desc': 'Agent 全年无休。不请假、不倦怠、不掉线。',
    'service.card5.title': '人类监督',
    'service.card5.desc': '每个 Agent 都有人类审核。质量与安全，双重保障。',
    'service.card6.title': '持续优化',
    'service.card6.desc': '我们持续监控、优化和升级你的 Agent，随业务需求进化。',

    // How
    'how.label': '如何运作',
    'how.title': '三步拥有你的第一个 Agent。',
    'how.step1.title': '定义工作流',
    'how.step1.desc': '告诉我们你想自动化的任务，我们来设计最合适的 Agent。',
    'how.step2.title': '我们构建并部署',
    'how.step2.desc': '团队使用 OpenClaw 构建你的 Agent，测试并部署到生产环境。',
    'how.step3.title': '监控与优化',
    'how.step3.desc': '实时追踪运行效果，我们根据结果持续改进。',

    // Technology
    'tech.label': '技术',
    'tech.title': '基于 OpenClaw 构建',
    'tech.desc': 'OpenClaw 是我们的开源 Agent 框架——经过实战检验、高度可扩展、生产就绪。ClawHub 上有 3,200+ 技能可用。',
    'tech.cta': '探索知识库',

    // Pricing
    'pricing.label': '定价',
    'pricing.title': '简单透明的定价。',
    'pricing.original': '¥12,999/月',
    'pricing.price': '¥3,499',
    'pricing.period': '/月',
    'pricing.badge': '早鸟优惠',
    'pricing.item1': '定制 Agent 开发',
    'pricing.item2': '7×24 托管运行',
    'pricing.item3': 'Slack / Telegram / 邮件集成',
    'pricing.item4': '人类监督与质量保障',
    'pricing.item5': '持续优化迭代',
    'pricing.item6': '优先技术支持',
    'pricing.item7': '随时取消，无合约',
    'pricing.cta': '立即开始',

    // FAQ
    'faq.label': '常见问题',
    'faq.title': '常见问题解答',

    // CTA
    'cta.title': '准备好雇佣你的第一个 Agent 了吗？',
    'cta.button': '立即开始',
    'cta.contact': '或直接联系我们',

    // Footer
    'footer.copy': '© 2026 龙虾超人 · 基于 OpenClaw 构建',
    'footer.twitter': 'Twitter',
    'footer.github': 'GitHub',

    // Docs
    'docs.toc': '本页目录',
    'docs.related': '相关文章',
    'docs.lastUpdated': '最后更新',
    'docs.search': '搜索文档...',
    'docs.backToIndex': '返回知识库',
  },
} as const;
