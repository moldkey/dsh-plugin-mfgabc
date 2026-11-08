// dsh-plugin-mfgabc · mfgabc.com 只读页面查询
import { defineTool } from '@deepseek-ai/dsh-tools'
import {
  DEFAULT_BASE, normalizeBase, normalizeStandard, slugify,
  buildSiteUrl, isSafePath, extractTitle,
} from './core.js'

export const name = 'dsh-plugin-mfgabc'
export const inject = ['tools']

const text = (value) => [{ type: 'text', text: JSON.stringify(value, null, 2) }]
const headers = { 'user-agent': 'dsh-plugin-mfgabc/0.1', accept: 'text/html' }

export function apply(ctx, config = {}) {
  const base = normalizeBase(config.baseUrl)

  async function fetchPage(path, signal) {
    const url = buildSiteUrl(base, path)
    const r = await fetch(url, { headers, signal, redirect: 'follow' })
    const html = await r.text()
    return {
      ok: r.ok,
      status: r.status,
      url: r.url || url,
      title: extractTitle(html),
    }
  }

  ctx.tools.register(defineTool({
    name: 'mfgabc_standard',
    description: '查 mfgabc.com 标准页：给标准号（如 ISO 4703-1977、GB/T 9114-2010），返回页面状态、标题与官方链接。当用户给标准号要查页面时使用。',
    parameters: {
      number: { type: 'string', required: true, description: '标准号，如“ISO 4703-1977”' },
    },
    output: { schema: { type: 'json' }, render: (_a, v) => text(v) },
    isConcurrencySafe: () => true,
    async execute(args, exec) {
      const slug = normalizeStandard(args.number)
      return { slug, ...(await fetchPage(`/standards/s/${slug}/`, exec.signal)) }
    },
  }))

  ctx.tools.register(defineTool({
    name: 'mfgabc_city',
    description: '查 mfgabc.com 产业带城市页（如 dongguan、shenzhen）。当用户查某地制造业产业带时使用。',
    parameters: {
      city: { type: 'string', required: true, description: '城市英文 slug，如 dongguan' },
    },
    output: { schema: { type: 'json' }, render: (_a, v) => text(v) },
    isConcurrencySafe: () => true,
    async execute(args, exec) {
      const slug = slugify(args.city)
      return { city: slug, ...(await fetchPage(`/cities/${slug}/`, exec.signal)) }
    },
  }))

  ctx.tools.register(defineTool({
    name: 'mfgabc_process',
    description: '查 mfgabc.com 工艺集群页（城市 + 工艺，如 dongguan + stamping-die）。当用户查城市+工艺集群时使用。',
    parameters: {
      process: { type: 'string', required: true, description: '工艺 slug，如 stamping-die' },
      city: { type: 'string', required: true, description: '城市 slug，如 dongguan' },
    },
    output: { schema: { type: 'json' }, render: (_a, v) => text(v) },
    isConcurrencySafe: () => true,
    async execute(args, exec) {
      const p = slugify(args.process), c = slugify(args.city)
      return { process: p, city: c, ...(await fetchPage(`/guide/clusters/${p}/${c}/`, exec.signal)) }
    },
  }))

  ctx.tools.register(defineTool({
    name: 'mfgabc_compliance',
    description: '查 mfgabc.com 跨境合规页（品类 + 国家，如 plastic-products + singapore）。当用户查品类+国家合规时使用。',
    parameters: {
      category: { type: 'string', required: true, description: '品类 slug，如 plastic-products' },
      country: { type: 'string', required: true, description: '国家 slug，如 singapore' },
    },
    output: { schema: { type: 'json' }, render: (_a, v) => text(v) },
    isConcurrencySafe: () => true,
    async execute(args, exec) {
      const cat = slugify(args.category), c = slugify(args.country)
      return { category: cat, country: c, ...(await fetchPage(`/compliance/${cat}-${c}/`, exec.signal)) }
    },
  }))

  ctx.tools.register(defineTool({
    name: 'mfgabc_page',
    description: '取 mfgabc.com 任意站内页面的状态、标题与最终链接（用于标准/材料/指南等已知路径）。当已知站内路径要核实状态时使用。',
    parameters: {
      path: { type: 'string', required: true, description: '站内路径，以 / 开头，如 /standards/' },
    },
    output: { schema: { type: 'json' }, render: (_a, v) => text(v) },
    isConcurrencySafe: () => true,
    async execute(args, exec) {
      if (!isSafePath(args.path)) throw new Error('path 必须是站内绝对路径（以 / 开头，不含 .. 或 //）')
      return fetchPage(args.path, exec.signal)
    },
  }))
}
