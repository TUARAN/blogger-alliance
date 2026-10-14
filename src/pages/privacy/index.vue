<template>
  <div class="min-h-screen bg-slate-50 text-slate-800">
    <AppNav />
    <main class="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <h1 class="text-3xl font-bold text-slate-950">隐私说明</h1>
      <p class="mt-3 text-sm text-slate-500">开发者博主联盟 · 更新于 2026 年 10 月 14 日</p>

      <div class="mt-8 space-y-8 rounded-2xl border border-slate-200 bg-white p-6 leading-7 shadow-sm sm:p-9">
        <section>
          <h2 class="text-lg font-semibold text-slate-950">账号资料</h2>
          <p class="mt-2">注册和登录时，网站使用邮箱地址、账号标识、显示名称与头像来识别账号和展示资料。使用 Google 或 GitHub 登录时，授权页面会列明共享的信息；网站通过 Supabase Auth 接收登录所需的账号信息。网站不会获取你的 Google 或 GitHub 登录密码。</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-slate-950">使用方式</h2>
          <p class="mt-2">这些信息用于创建和维持登录会话、展示个人资料、关联工作台内容，以及按照账号角色控制内部功能的访问。账号角色由网站管理，不以第三方账号资料直接决定。</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-slate-950">服务提供方</h2>
          <p class="mt-2">账号认证和资料存储使用 Supabase；网站通过 Cloudflare 提供访问；验证邮件由邮件服务商发送。选择 Google 或 GitHub 登录时，相应提供方会处理授权过程。各服务提供方也会依照其隐私规则处理为提供服务所需的数据。</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-slate-950">资料管理与联系</h2>
          <p class="mt-2">你可以在账号页查看和修改可编辑的资料。如需询问账号数据或申请删除账号，请发邮件至 <a class="text-indigo-700 underline underline-offset-2" href="mailto:tuaran666@gmail.com">tuaran666@gmail.com</a>。处理删除请求前，我们可能需要核实账号归属。</p>
        </section>
      </div>
    </main>
  </div>
</template>
