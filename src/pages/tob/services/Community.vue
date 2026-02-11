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
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900">社群推广</h1>
        <p class="mt-3 text-gray-600">
          面向开发者社群的触达与运营合作，提供「社群宣传」与「建设社群」两种方案：前者持续在存量社群中宣发，后者帮助品牌方搭建专属社群并沉淀长期资产。
        </p>
      </header>

      <div class="space-y-6">
        <!-- 核心说明区 -->
        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">核心说明区</h2>

          <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">什么是「社群推广」</div>
              <p class="mt-2 text-sm text-gray-600 leading-relaxed">
                通过开发者社群进行产品信息触达、活动报名与内容分发。可以选择在既有社群中持续宣发，也可以帮助你建立并运营一个品牌专属社群。
              </p>
            </div>

            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">适合谁</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-blue-600 mr-2">•</span><span>要做活动/发布/内测招募，希望持续获得高意向开发者反馈</span></li>
                <li class="flex items-start"><span class="text-blue-600 mr-2">•</span><span>工具/课程/AI 产品/技术服务，能提供明确价值或福利</span></li>
                <li class="flex items-start"><span class="text-blue-600 mr-2">•</span><span>想把一次投放变成“长期阵地”（建设社群更适合）</span></li>
              </ul>
            </div>

            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">不适合谁</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>只想短期“刷屏爆量”，不接受社群规则与节奏</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>无法提供清晰卖点/报名链接/福利机制，社群用户很难行动</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>没有长期投入预期却希望快速做成“高活跃私域”</span></li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 两种方案 -->
        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">两种合作方案</h2>
          <p class="mt-2 text-sm text-gray-600">一个是“在存量社群持续宣发”，一个是“帮你建立专属社群并沉淀资产”。</p>

          <div class="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div class="relative rounded-xl border border-gray-200 bg-blue-50/40 p-4">
              <div class="absolute top-3 left-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/70 border border-blue-200 text-blue-700 text-xs font-semibold">1</div>
              <div class="pl-10 text-sm font-semibold text-gray-900">社群宣传</div>
              <p class="mt-2 pl-10 text-sm text-gray-600 leading-relaxed">
                在既有开发者社群内，按节奏持续发布产品信息/活动/内测/福利，获取曝光、报名与线索。
              </p>

              <div class="mt-3 pl-10">
                <div class="text-xs font-semibold text-gray-500">优点</div>
                <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                  <li class="flex items-start"><span class="text-emerald-600 mr-2">•</span><span>启动快：不需要先把社群从 0 拉起来</span></li>
                  <li class="flex items-start"><span class="text-emerald-600 mr-2">•</span><span>覆盖面广：适合宣发活动、招募、试用、促销节点</span></li>
                  <li class="flex items-start"><span class="text-emerald-600 mr-2">•</span><span>可控节奏：按周/月规划宣发频次与内容主题</span></li>
                </ul>

                <div class="mt-3 text-xs font-semibold text-gray-500">不足</div>
                <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                  <li class="flex items-start"><span class="text-rose-600 mr-2">•</span><span>不沉淀资产：用户留存到品牌方侧需要额外承接</span></li>
                  <li class="flex items-start"><span class="text-rose-600 mr-2">•</span><span>需尊重社群规则：不适合高频硬广刷屏</span></li>
                </ul>
              </div>
            </div>

            <div class="relative rounded-xl border border-gray-200 bg-indigo-50/40 p-4">
              <div class="absolute top-3 left-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/70 border border-indigo-200 text-indigo-700 text-xs font-semibold">2</div>
              <div class="pl-10 text-sm font-semibold text-gray-900">建设社群（专属社群）</div>
              <p class="mt-2 pl-10 text-sm text-gray-600 leading-relaxed">
                帮品牌方建立一个专属社群（如微信群/飞书群等），设计入群路径、运营机制、内容节奏与互动玩法，沉淀长期私域。
              </p>

              <div class="mt-3 pl-10">
                <div class="text-xs font-semibold text-gray-500">优点</div>
                <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                  <li class="flex items-start"><span class="text-emerald-600 mr-2">•</span><span>沉淀资产：把用户留到品牌方侧，便于长期运营与转化</span></li>
                  <li class="flex items-start"><span class="text-emerald-600 mr-2">•</span><span>更强互动：适合产品内测、反馈闭环、共创与答疑</span></li>
                  <li class="flex items-start"><span class="text-emerald-600 mr-2">•</span><span>可复制体系：入群 SOP、欢迎语、话题模板、活动模板等</span></li>
                </ul>

                <div class="mt-3 text-xs font-semibold text-gray-500">不足</div>
                <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                  <li class="flex items-start"><span class="text-rose-600 mr-2">•</span><span>见效更慢：需要持续供给内容与福利，建立活跃习惯</span></li>
                  <li class="flex items-start"><span class="text-rose-600 mr-2">•</span><span>更依赖配合：需要品牌方提供产品支持、资源与对接人</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 交付清单 -->
        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">交付清单（示例）</h2>

          <div class="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">社群宣传交付</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>宣发排期与频次（按周/月）</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>文案/海报/活动信息整理与合规检查</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>发布记录与链接回传（报名/落地页/群二维码等）</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>基础反馈汇总（常见问题/用户关注点）</span></li>
              </ul>
            </div>

            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">建设社群交付</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>入群链路设计：引流入口、入群问卷/关键词、欢迎语</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>运营 SOP：群规、禁言/踢人策略、内容日历、活动机制</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>启动期运营：冷启动活动、话题引导、用户分层与共创机制</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>阶段复盘：活跃/留存/转化路径问题与优化建议</span></li>
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
              <div class="mt-1 text-sm text-gray-600">目标、受众、周期与选择方案（宣传/建设）确定。</div>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-xs font-semibold text-gray-500">第 2 步</div>
              <div class="mt-1 text-sm font-semibold text-gray-900">素材与承接</div>
              <div class="mt-1 text-sm text-gray-600">整理卖点、活动信息、报名链接/二维码与福利机制。</div>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-xs font-semibold text-gray-500">第 3 步</div>
              <div class="mt-1 text-sm font-semibold text-gray-900">执行与运营</div>
              <div class="mt-1 text-sm text-gray-600">按节奏宣发；或搭建专属社群并进行启动期运营。</div>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-xs font-semibold text-gray-500">第 4 步</div>
              <div class="mt-1 text-sm font-semibold text-gray-900">复盘与迭代</div>
              <div class="mt-1 text-sm text-gray-600">回收反馈与数据，优化选题、节奏与承接链路。</div>
            </div>
          </div>
        </section>

        <!-- 案例（预留） -->
        <section v-if="false" class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">案例 &amp; 参考（预留）</h2>
          <div class="mt-4 rounded-xl border border-dashed border-gray-300 bg-white/60 p-5 text-sm text-gray-600">
            预留位置：后续可补充宣发话术模板、社群欢迎语与群规模板、冷启动活动脚本、典型问答与复盘摘要。
          </div>
        </section>

        <!-- 联系 / CTA -->
        <section class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-6 text-white">
          <div class="text-lg font-semibold">联系 / CTA</div>
          <div class="mt-2 text-sm opacity-90">
            想做社群合作？请添加微信号 <span class="font-semibold">atar24</span>，备注「社群宣传 / 建设社群」。
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
              class="inline-flex items-center justify-center px-4 h-10 rounded-xl bg-white text-blue-700 hover:bg-blue-50 transition-colors text-sm font-semibold"
            >
              了解联盟
            </a>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
