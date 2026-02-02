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
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900">植入链接引流</h1>
        <p class="mt-3 text-gray-600">面向技术受众的内容植入与链接引流合作（CPC），用于放大曝光与获得可衡量的点击。</p>
      </header>

      <div class="space-y-6">
        <!-- 核心说明区 -->
        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">核心说明区</h2>

          <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">什么是 CPC / 引流合作</div>
              <p class="mt-2 text-sm text-gray-600 leading-relaxed">
                在博主内容中植入你的产品链接或落地页入口，通过“点击”作为主要衡量口径，帮助你在技术圈获得持续曝光与有效访问。
              </p>
            </div>

            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">适合谁</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-green-600 mr-2">•</span><span>有清晰落地页/注册路径，希望稳定获取访问与线索</span></li>
                <li class="flex items-start"><span class="text-green-600 mr-2">•</span><span>开发者工具、SaaS、AI 产品、技术课程等面向技术受众的产品</span></li>
                <li class="flex items-start"><span class="text-green-600 mr-2">•</span><span>希望用可量化口径评估投放效果</span></li>
              </ul>
            </div>

            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">不适合谁</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>落地页承接弱（无法注册/无法转化/链路不完整）</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>只追求短期爆量、但不关心受众匹配与转化质量</span></li>
                <li class="flex items-start">
                  <span class="text-gray-500 mr-2">•</span>
                  <span>
                    无法提供可追踪链接（UTM/专属落地页等）
                    <a
                      href="https://my.feishu.cn/docx/X82odey7boLBybxWiFCcBbiXnug?from=from_copylink"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="ml-2 text-green-700 hover:text-green-800 underline"
                      title="UTM 是什么"
                    >
                      UTM 是什么
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 合作形式 -->
        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">合作形式</h2>
          <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="relative rounded-xl border border-gray-200 bg-emerald-50/40 p-4">
              <div class="absolute top-3 left-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/70 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                1
              </div>
              <div class="pl-10 text-sm font-semibold text-gray-900">长尾文章 CPC</div>
              <p class="mt-2 pl-10 text-sm text-gray-600">植入高表现长尾内容，受众精准，流量随时间递减。</p>
            </div>
            <div class="relative rounded-xl border border-gray-200 bg-sky-50/40 p-4">
              <div class="absolute top-3 left-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/70 border border-sky-200 text-sky-700 text-xs font-semibold">
                2
              </div>
              <div class="pl-10 text-sm font-semibold text-gray-900">近期文章 CPC</div>
              <p class="mt-2 pl-10 text-sm text-gray-600">植入最新发布内容，曝光更高，相关性略弱。</p>
            </div>
            <div class="relative rounded-xl border border-gray-200 bg-violet-50/40 p-4">
              <div class="absolute top-3 left-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/70 border border-violet-200 text-violet-700 text-xs font-semibold">
                3
              </div>
              <div class="pl-10 text-sm font-semibold text-gray-900">AI 文章 + CPC</div>
              <p class="mt-2 pl-10 text-sm text-gray-600">AI 生成专题创作，平台接受度不一，不按 UV 结算。</p>
            </div>
          </div>
        </section>

        <!-- 投放规则 & 结算口径 -->
        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">投放规则 &amp; 结算口径</h2>

          <div class="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">规则</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start">
                  <span class="text-gray-500 mr-2">•</span>
                  <span>
                    使用专属链接或带 UTM 的可追踪链接
                    <a
                      href="https://my.feishu.cn/docx/X82odey7boLBybxWiFCcBbiXnug?from=from_copylink"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="ml-2 text-green-700 hover:text-green-800 underline"
                      title="UTM 是什么"
                    >
                      UTM 是什么
                    </a>
                  </span>
                </li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>链接位置、露出频次、投放周期按约定执行</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>涉及平台合规/审核的内容，按平台要求调整</span></li>
              </ul>
            </div>

            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">结算方式</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>按点击（CPC）结算：以约定口径统计的有效点击为准</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>统计数据来源按约定（链接追踪/平台数据/双方对账）</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>AI 文章 + CPC：不按 UV 结算（按约定口径）</span></li>
              </ul>
            </div>

            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">
                <a
                  href="https://my.feishu.cn/docx/SG4Md7h28oNxVgxrEMqchlGonEb?from=from_copylink"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-green-700 hover:text-green-800 underline"
                >
                  CPC结算模型-基础版
                </a>
              </div>
              <div class="mt-2 text-sm text-gray-600 leading-relaxed">
                根据品牌方需求设计、新建、敏捷迭代结算模型，长期合作、双向调优。
              </div>
            </div>
          </div>
        </section>

        <!-- 案例 & 数据参考（预留） -->
        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">案例 &amp; 数据参考（预留）</h2>
          <div class="mt-4 rounded-xl border border-dashed border-gray-300 bg-white/60 p-5 text-sm text-gray-600">
            预留位置：后续可补充具体案例、点击数据、转化链路、素材示例与复盘摘要。
          </div>
        </section>

        <!-- 合作流程 -->
        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">合作流程</h2>
          <div class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-xs font-semibold text-gray-500">第 1 步</div>
              <div class="mt-1 text-sm font-semibold text-gray-900">需求对齐</div>
              <div class="mt-1 text-sm text-gray-600">目标、受众、预算与周期确认。</div>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-xs font-semibold text-gray-500">第 2 步</div>
              <div class="mt-1 text-sm font-semibold text-gray-900">选文与排期</div>
              <div class="mt-1 text-sm text-gray-600">确定长尾/近期/AI专题形式与投放位。</div>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-xs font-semibold text-gray-500">第 3 步</div>
              <div class="mt-1 text-sm font-semibold text-gray-900">上线投放</div>
              <div class="mt-1 text-sm text-gray-600">按规则上线，监控链接与数据。</div>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-xs font-semibold text-gray-500">第 4 步</div>
              <div class="mt-1 text-sm font-semibold text-gray-900">数据对账</div>
              <div class="mt-1 text-sm text-gray-600">对账结算并复盘优化下一轮。</div>
            </div>
          </div>
        </section>

        <!-- 联系 / CTA -->
        <section class="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-xl p-6 text-white">
          <div class="text-lg font-semibold">联系 / CTA</div>
          <div class="mt-2 text-sm opacity-90">
            想做 CPC 引流合作？请添加微信号 <span class="font-semibold">atar24</span>，备注「CPC 引流」。
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
              class="inline-flex items-center justify-center px-4 h-10 rounded-xl bg-white text-green-700 hover:bg-green-50 transition-colors text-sm font-semibold"
            >
              了解联盟
            </a>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
