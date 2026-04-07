/**
 * 统一规范化访问凭证，减少「手输失败、粘贴成功」：
 * - 全角字母数字（中文输入法常见）→ 半角 ASCII（NFKC）
 * - 去除零宽字符与 BOM
 */
export function normalizeCredential(raw) {
  if (raw == null) {
    return ''
  }

  return String(raw)
    .replace(/^\uFEFF/, '')
    .replace(/[\u200B-\u200D\u2060\uFEFF]/g, '')
    .trim()
    .normalize('NFKC')
}
