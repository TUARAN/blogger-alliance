/**
 * 当前账号体系使用的邮件发送服务方。
 *
 * 切换 SMTP 服务（例如从 Supabase 内置改为 Resend）后，
 * 把这里的常量改成新的服务方信息即可，所有提示位会自动同步。
 *
 * 切换 Resend 后参考值：
 *   {
 *     id: 'resend',
 *     name: 'Resend',
 *     sender: 'noreply@blogger-alliance.cn',
 *     limit: '免费额度 3000 封/月，足以支撑日常注册',
 *     hint: '若 5 分钟内未收到，请检查垃圾箱或重发。',
 *     trustworthy: true
 *   }
 */
export const EMAIL_PROVIDER = {
  id: 'supabase-builtin',
  name: 'Supabase 内置 SMTP',
  sender: 'noreply@mail.app.supabase.io',
  limit: '每小时 2 封（超出会被静默丢弃）',
  hint: '若 5 分钟内未收到，可能已触发限流；请等待约 1 小时后重试，或联系管理员（微信 atar24）确认。',
  trustworthy: false
}

export function describeEmailProvider() {
  return `邮件由 ${EMAIL_PROVIDER.name} 发送`
}
