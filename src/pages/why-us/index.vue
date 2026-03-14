<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-cyan-50">
    <nav class="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 gap-4">
          <div class="flex items-center min-w-0">
            <router-link to="/tob" class="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors truncate">
              🚀开发者博主联盟
            </router-link>
          </div>

          <div class="flex items-center gap-4 lg:gap-6 overflow-x-auto whitespace-nowrap">
            <router-link
              to="/tob/deals"
              class="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors font-medium text-base"
              active-class="text-gray-700 font-semibold"
            >
              <span class="text-base leading-none">🧭</span>
              <span>合作查询</span>
            </router-link>

            <router-link
              to="/matrix"
              class="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors font-medium text-base"
              active-class="text-gray-700 font-semibold"
            >
              <span class="text-base leading-none">🧩</span>
              <span>矩阵联盟</span>
            </router-link>

            <router-link
              to="/academy"
              class="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors font-medium text-base"
              active-class="text-gray-700 font-semibold"
            >
              <span class="text-base leading-none">📚</span>
              <span>联盟学院</span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 min-h-[calc(100vh-4rem)]">
      <section class="bg-white rounded-2xl border border-indigo-100 shadow-sm px-4 py-3 md:px-5 md:py-4">
        <div class="max-w-5xl">
          <div class="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700">
            <span>❓</span>
            <span>为什么技术品牌更适合选择技术博主联盟</span>
          </div>
          <h1 class="mt-2 text-2xl md:text-3xl font-bold text-gray-900">我们与泛娱乐 MCN 的区别在哪里？</h1>
          <p class="mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
            技术博主联盟的优势不只是一批账号，而是由技术理解、博主信任、开发者圈层、技术内容生产和交易履约组成的五层优势结构。五层叠加后，形成的是技术内容渠道网络。
          </p>
        </div>
      </section>

      <section class="mt-4 bg-white rounded-2xl border border-indigo-100 shadow-sm p-4 md:p-6">
        <div class="overflow-x-auto rounded-xl border border-gray-200">
          <table class="min-w-full text-sm">
            <thead class="bg-gray-50 text-gray-700">
              <tr>
                <th class="px-3 py-2 text-left font-semibold">优势层</th>
                <th class="px-3 py-2 text-left font-semibold">核心资源</th>
                <th class="px-3 py-2 text-left font-semibold">复制难度</th>
                <th class="px-3 py-2 text-left font-semibold">形成方式</th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr class="border-t border-gray-100">
                <td class="px-3 py-2 text-gray-900 font-medium">认知优势层</td>
                <td class="px-3 py-2 text-gray-700">技术理解能力</td>
                <td class="px-3 py-2 text-gray-700">高</td>
                <td class="px-3 py-2 text-gray-700">长期技术背景</td>
              </tr>
              <tr class="border-t border-gray-100">
                <td class="px-3 py-2 text-gray-900 font-medium">信任优势层</td>
                <td class="px-3 py-2 text-gray-700">博主关系网络</td>
                <td class="px-3 py-2 text-gray-700">极高</td>
                <td class="px-3 py-2 text-gray-700">时间积累</td>
              </tr>
              <tr class="border-t border-gray-100">
                <td class="px-3 py-2 text-gray-900 font-medium">圈层优势层</td>
                <td class="px-3 py-2 text-gray-700">开发者社区影响力</td>
                <td class="px-3 py-2 text-gray-700">高</td>
                <td class="px-3 py-2 text-gray-700">社区参与</td>
              </tr>
              <tr class="border-t border-gray-100">
                <td class="px-3 py-2 text-gray-900 font-medium">内容优势层</td>
                <td class="px-3 py-2 text-gray-700">技术内容生产能力</td>
                <td class="px-3 py-2 text-gray-700">中高</td>
                <td class="px-3 py-2 text-gray-700">专业写作</td>
              </tr>
              <tr class="border-t border-gray-100">
                <td class="px-3 py-2 text-gray-900 font-medium">交易优势层</td>
                <td class="px-3 py-2 text-gray-700">商单撮合与履约能力</td>
                <td class="px-3 py-2 text-gray-700">中</td>
                <td class="px-3 py-2 text-gray-700">商业经验</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <article class="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
            <h2 class="text-base font-semibold text-indigo-900">第一层优势：技术认知壁垒</h2>
            <p class="mt-2 text-sm text-indigo-900/80 leading-relaxed">
              技术博主与娱乐博主的合作逻辑完全不同。娱乐内容合作主要看粉丝量、播放量和价格；技术内容合作更看技术真实性、是否理解产品，以及内容是否可信。
            </p>
            <div class="mt-2 rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm text-indigo-900/90">
              很多泛娱乐 MCN 做技术推广时，常见问题是：品牌方说不清技术、博主听不懂产品、推广文章读起来像广告。
            </div>
            <ul class="mt-2 text-sm text-indigo-900/80 space-y-1">
              <li>• 把产品讲清楚</li>
              <li>• 找到合适博主</li>
              <li>• 把内容写得像技术文章</li>
            </ul>
          </article>

          <article class="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
            <h2 class="text-base font-semibold text-emerald-900">第二层优势：信任网络</h2>
            <p class="mt-2 text-sm text-emerald-900/80 leading-relaxed">
              博主合作最核心的资产是信任。技术博主最担心内容被硬改、推广产品质量差、结算拖延，只要出现一次问题，就可能拒绝继续合作。
            </p>
            <div class="mt-2 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm text-emerald-900/90">
              信任网络只能通过长期合作与口碑传播形成，通常需要 1–3 年才能稳定建立。
            </div>
            <ul class="mt-2 text-sm text-emerald-900/80 space-y-1">
              <li>• 拿到品牌资源</li>
              <li>• 维护博主关系</li>
              <li>• 保证结算稳定</li>
            </ul>
          </article>

          <article class="rounded-xl border border-cyan-100 bg-cyan-50/50 p-4">
            <h2 class="text-base font-semibold text-cyan-900">第三层优势：开发者圈层</h2>
            <p class="mt-2 text-sm text-cyan-900/80 leading-relaxed">
              开发者社区存在明显圈层结构，如掘金、CSDN、GitHub、知乎和技术公众号。开发者对内容非常敏感：广告感强会被排斥，技术错误会被指出，过度营销会影响博主口碑。
            </p>
            <ul class="mt-2 text-sm text-cyan-900/80 space-y-1">
              <li>• 技术真实性</li>
              <li>• 内容价值</li>
              <li>• 社区语境</li>
            </ul>
          </article>

          <article class="rounded-xl border border-violet-100 bg-violet-50/50 p-4">
            <h2 class="text-base font-semibold text-violet-900">第四层优势：技术内容生产能力</h2>
            <p class="mt-2 text-sm text-violet-900/80 leading-relaxed">
              技术推广并不是简单发广告。一个有效的技术推广通常包含技术背景介绍、产品解决的问题、实际使用案例和技术实现细节，这类内容既是推广，也是技术文章。
            </p>
            <ul class="mt-2 text-sm text-violet-900/80 space-y-1">
              <li>• 技术理解能力</li>
              <li>• 技术写作能力</li>
              <li>• 产品理解能力</li>
            </ul>
          </article>
        </div>

        <article class="mt-4 rounded-xl border border-amber-100 bg-amber-50/60 p-4">
          <h2 class="text-base font-semibold text-amber-900">第五层优势：交易履约能力</h2>
          <p class="mt-2 text-sm text-amber-900/80 leading-relaxed">
            当博主数量增加后，真正复杂的是运营。品牌需求、筛选博主、内容沟通、文章审核、发布分发、数据统计与结算管理，都会随着规模上升而迅速变复杂。
          </p>
          <div class="mt-3 rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm text-amber-900/90">
            品牌需求 → 筛选博主 → 内容沟通 → 文章审核 → 发布分发 → 数据统计 → 结算管理
          </div>
          <div class="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div class="rounded-lg border border-amber-200 bg-white px-2.5 py-1.5 text-amber-800">商单管理</div>
            <div class="rounded-lg border border-amber-200 bg-white px-2.5 py-1.5 text-amber-800">价格体系</div>
            <div class="rounded-lg border border-amber-200 bg-white px-2.5 py-1.5 text-amber-800">发布节奏</div>
            <div class="rounded-lg border border-amber-200 bg-white px-2.5 py-1.5 text-amber-800">结算体系</div>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>