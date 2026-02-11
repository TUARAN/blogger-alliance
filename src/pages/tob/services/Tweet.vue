<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <nav class="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-40">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-14 gap-3">
          <router-link
            to="/tob#cooperation-services"
            class="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
          >
            ← 返回 TOB
          </router-link>

          <div class="flex items-center gap-2">
            <router-link
              to="/tob/services/tweet"
              class="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors"
              :class="$route.path === '/tob/services/tweet' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'"
            >
              推文
            </router-link>
            <router-link
              to="/tob/services/cpc"
              class="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors"
              :class="$route.path === '/tob/services/cpc' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'"
            >
              引流
            </router-link>
            <router-link
              to="/tob/services/community"
              class="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors"
              :class="$route.path === '/tob/services/community' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'"
            >
              社群
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900">写推文</h1>
        <p class="mt-3 text-gray-600">
          面向技术受众的内容分发合作，提供从「直发」到「深度测评」的不同强度推文方案，兼顾速度、可信度与转化质量。
        </p>
      </header>

      <div class="space-y-6">
        <!-- 核心说明区 -->
        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">核心说明区</h2>

          <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">什么是「推文合作」</div>
              <p class="mt-2 text-sm text-gray-600 leading-relaxed">
                以博主账号在内容平台发布图文/长图/短文等形式的产品内容。可以是甲方提供的稿件直发，也可以是基于真实试用体验的测评推文。
              </p>
            </div>

            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">适合谁</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-indigo-600 mr-2">•</span><span>希望快速触达开发者受众，获得曝光与心智</span></li>
                <li class="flex items-start"><span class="text-indigo-600 mr-2">•</span><span>开发者工具、SaaS、AI 产品、技术课程、硬件外设等</span></li>
                <li class="flex items-start"><span class="text-indigo-600 mr-2">•</span><span>需要「内容可信度」来提升点击与转化（测评更适合）</span></li>
              </ul>
            </div>

            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">不适合谁</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>只追求“硬广口播”，不接受基本的内容合规与体验验证</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>无法提供可试用账号/素材/卖点信息，导致内容无法落地</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>产品与开发者受众不匹配（测评也很难讲出真实价值）</span></li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 推文类型（你要求的 3 类） -->
        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">推文类型（3 选 1 / 可组合）</h2>
          <p class="mt-2 text-sm text-gray-600">三种类型的核心差异：投入时间 vs 内容可信度 vs 转化质量。</p>

          <div class="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="relative rounded-xl border border-gray-200 bg-indigo-50/40 p-4">
              <div class="absolute top-3 left-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/70 border border-indigo-200 text-indigo-700 text-xs font-semibold">1</div>
              <div class="pl-10 text-sm font-semibold text-gray-900">直发推文</div>
              <p class="mt-2 pl-10 text-sm text-gray-600 leading-relaxed">
                甲方提供成稿/海报/要点，博主按约定格式直接发布。
              </p>

              <div class="mt-3 pl-10">
                <div class="text-xs font-semibold text-gray-500">优点</div>
                <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                  <li class="flex items-start"><span class="text-emerald-600 mr-2">•</span><span>上线快、沟通成本低</span></li>
                  <li class="flex items-start"><span class="text-emerald-600 mr-2">•</span><span>信息可控，适合活动/节点宣发</span></li>
                </ul>
                <div class="mt-3 text-xs font-semibold text-gray-500">不足</div>
                <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                  <li class="flex items-start"><span class="text-rose-600 mr-2">•</span><span>内容“广告感”更强，信任与转化不稳定</span></li>
                  <li class="flex items-start"><span class="text-rose-600 mr-2">•</span><span>通常不适合承诺深度互动/问答</span></li>
                </ul>
              </div>
            </div>

            <div class="relative rounded-xl border border-gray-200 bg-emerald-50/40 p-4">
              <div class="absolute top-3 left-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/70 border border-emerald-200 text-emerald-700 text-xs font-semibold">2</div>
              <div class="pl-10 text-sm font-semibold text-gray-900">常规测评推文</div>
              <p class="mt-2 pl-10 text-sm text-gray-600 leading-relaxed">
                基于试用体验写“常规产品测评”：亮点、适用人群、上手成本、对比同类与使用建议。
              </p>

              <div class="mt-3 pl-10">
                <div class="text-xs font-semibold text-gray-500">优点</div>
                <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                  <li class="flex items-start"><span class="text-emerald-600 mr-2">•</span><span>可信度更高，评论区更容易产生讨论</span></li>
                  <li class="flex items-start"><span class="text-emerald-600 mr-2">•</span><span>适合工具类、SaaS、AI 应用等“能试用”的产品</span></li>
                </ul>
                <div class="mt-3 text-xs font-semibold text-gray-500">不足</div>
                <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                  <li class="flex items-start"><span class="text-rose-600 mr-2">•</span><span>需要提供试用账号/素材，排期较直发更长</span></li>
                  <li class="flex items-start"><span class="text-rose-600 mr-2">•</span><span>会保留客观表达（不做“全优”承诺）</span></li>
                </ul>
              </div>
            </div>

            <div class="relative rounded-xl border border-gray-200 bg-sky-50/40 p-4">
              <div class="absolute top-3 left-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/70 border border-sky-200 text-sky-700 text-xs font-semibold">3</div>
              <div class="pl-10 text-sm font-semibold text-gray-900">深度测评推文</div>
              <p class="mt-2 pl-10 text-sm text-gray-600 leading-relaxed">
                带一点“开发性质”的测评：例如接入 Demo、API 调用、对接工作流、简单 Benchmark、踩坑与最佳实践。
              </p>

              <div class="mt-3 pl-10">
                <div class="text-xs font-semibold text-gray-500">优点</div>
                <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                  <li class="flex items-start"><span class="text-emerald-600 mr-2">•</span><span>信任强、决策信息密度高，更利于高客单价/ToB 工具转化</span></li>
                  <li class="flex items-start"><span class="text-emerald-600 mr-2">•</span><span>内容可沉淀为“参考资料”，长尾更稳</span></li>
                </ul>
                <div class="mt-3 text-xs font-semibold text-gray-500">不足</div>
                <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                  <li class="flex items-start"><span class="text-rose-600 mr-2">•</span><span>周期更长，需要技术支持/文档/权限配合</span></li>
                  <li class="flex items-start"><span class="text-rose-600 mr-2">•</span><span>对产品稳定性要求更高（否则会出现真实踩坑）</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 交付清单 -->
        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">交付清单（可按需求定制）</h2>

          <div class="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">基础交付</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>1 条推文发布（按约定平台与时间）</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>素材规范：标题/正文/配图/链接/引导语</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>发布后链接回传与基础数据截图（如平台可见）</span></li>
              </ul>
            </div>

            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">测评增强</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>测评结构：痛点 → 方案 → 亮点 → 适用人群 → 建议</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>同类对比 / 选型建议（如适用）</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>评论区基础互动（在约定时间窗口内）</span></li>
              </ul>
            </div>

            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">深度内容加项</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>Demo / 接入示例 / 简单 Benchmark（视产品而定）</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>踩坑点与解决思路（真实体验）</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>可选：二次分发/站外同步（按约定）</span></li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 合作流程 -->
        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">合作流程</h2>
          <div class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-xs font-semibold text-gray-500">第 1 步</div>
              <div class="mt-1 text-sm font-semibold text-gray-900">需求对齐</div>
              <div class="mt-1 text-sm text-gray-600">目标、受众、类型（直发/常规/深度）与排期确认。</div>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-xs font-semibold text-gray-500">第 2 步</div>
              <div class="mt-1 text-sm font-semibold text-gray-900">素材/试用准备</div>
              <div class="mt-1 text-sm text-gray-600">成稿/卖点/素材包，或提供试用账号、文档与技术对接人。</div>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-xs font-semibold text-gray-500">第 3 步</div>
              <div class="mt-1 text-sm font-semibold text-gray-900">撰写与确认</div>
              <div class="mt-1 text-sm text-gray-600">直发快速确认；测评根据体验完成初稿与必要修改。</div>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-xs font-semibold text-gray-500">第 4 步</div>
              <div class="mt-1 text-sm font-semibold text-gray-900">发布与复盘</div>
              <div class="mt-1 text-sm text-gray-600">按排期发布，回传链接/数据，复盘下一轮优化方向。</div>
            </div>
          </div>
        </section>

        <!-- 案例（预留） -->
        <section v-if="false" class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">案例 &amp; 参考（预留）</h2>
          <div class="mt-4 rounded-xl border border-dashed border-gray-300 bg-white/60 p-5 text-sm text-gray-600">
            预留位置：后续可补充推文示例、选题模板、评论区互动截图、复盘摘要与投放建议。
          </div>
        </section>

        <!-- 联系 / CTA -->
        <section class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
          <div class="text-lg font-semibold">联系 / CTA</div>
          <div class="mt-2 text-sm opacity-90">
            想做推文合作？请添加微信号 <span class="font-semibold">atar24</span>，备注「推文直发 / 常规测评 / 深度测评」。
          </div>
          <div class="mt-4 flex flex-col sm:flex-row gap-3">
            <router-link
              to="/tob#cooperation-services"
              class="inline-flex items-center justify-center px-4 h-10 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 transition-colors text-sm font-semibold"
            >
              返回合作服务
            </router-link>
            <a
              href="https://github.com/TUARAN/blogger-alliance"
              target="_blank"
              class="inline-flex items-center justify-center px-4 h-10 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 transition-colors text-sm font-semibold"
            >
              了解联盟
            </a>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
