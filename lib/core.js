// dsh-plugin-mfgabc · 纯函数：站内路径构造与 HTML 解析
export const DEFAULT_BASE = 'https://www.mfgabc.com'

export function normalizeBase(base) {
  const b = (base || DEFAULT_BASE).trim().replace(/\/+$/, '')
  if (!/^https?:\/\//i.test(b)) throw new Error('baseUrl 必须以 http(s):// 开头')
  return b
}

export function slugify(s) {
  return String(s || '')
    .trim()
    .toLowerCase()
    .replace(/[\/\s_.]+/g, '-')
    .replace(/[^a-z0-9\u4e00-\u9fa5-]+/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/** 标准号 → mfgabc 标准页 slug：ISO 4703-1977 → ISO-4703-1977 */
export function normalizeStandard(no) {
  return String(no || '')
    .trim()
    .toUpperCase()
    .replace(/[\/\s_]+/g, '-')
    .replace(/\./g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function buildSiteUrl(base, path) {
  if (!isSafePath(path)) throw new Error('非法站内路径')
  return normalizeBase(base) + path
}

export function isSafePath(path) {
  if (typeof path !== 'string' || !path.startsWith('/')) return false
  if (path.includes('..') || path.includes('//')) return false
  if (/[\s"'<>\\]/.test(path)) return false
  return path.length <= 512
}

export function extractTitle(html) {
  const m = String(html || '').match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  if (!m) return ''
  return decodeEntities(m[1]).replace(/\s+/g, ' ').trim().slice(0, 200)
}

export function decodeEntities(s) {
  return String(s)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
}
