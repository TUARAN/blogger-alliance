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
  id: 'resend',
  name: 'Resend',
  sender: 'noreply@mail.syncblog.cn',
  limit: '每小时 100 封 / 每月 3000 封，足以覆盖日常注册',
  hint: '若 5 分钟内未收到，请检查垃圾箱或点「重发验证邮件」。',
  trustworthy: true
}

export function describeEmailProvider() {
  return `邮件由 ${EMAIL_PROVIDER.name} 发送`
}
