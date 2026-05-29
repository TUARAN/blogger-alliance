<template>
  <div class="min-h-screen bg-gradient-to-b from-indigo-50/50 via-white to-white">
    <AppNav logo-to="/" />

    <!-- Hero 区域 -->
    <section class="relative overflow-hidden">
      <!-- subtle decorative blobs -->
      <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div class="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl"></div>
        <div class="absolute -top-10 right-0 h-80 w-80 rounded-full bg-violet-200/25 blur-3xl"></div>
        <div class="absolute top-60 left-1/3 h-60 w-60 rounded-full bg-sky-200/20 blur-3xl"></div>
      </div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-14 lg:pt-20 lg:pb-20">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
            博主联盟
          </h1>
          <p class="mt-5 max-w-5xl mx-auto text-3xl md:text-5xl font-bold tracking-tight leading-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            连接 AI 产品与技术影响力
          </p>
          <p class="mt-6 max-w-3xl mx-auto text-base md:text-lg text-slate-600 leading-relaxed">
            我们聚合一批专业技术博主，把技术品牌带到开发者 / AI 爱好者 / 科技爱好者真正会讨论的地方，并持续沉淀真实有效的 GEO 结果。
          </p>

          <!-- Feature chips -->
          <div class="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs md:text-sm text-slate-600">
            <span class="inline-flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>5 类合作可组合</span>
            <span class="text-slate-300">/</span>
            <span class="inline-flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>单次最多 20 位博主</span>
            <span class="text-slate-300">/</span>
            <span class="inline-flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-violet-500"></span>高提成专题分佣</span>
            <span class="text-slate-300">/</span>
            <span class="inline-flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-amber-500"></span>1 工作日响应</span>
          </div>

          <!-- Primary CTAs -->
          <div class="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#service-overview"
              class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-200/60 hover:shadow-xl hover:shadow-indigo-200 hover:from-indigo-700 hover:to-violet-700 transition-all"
            >
              查看服务与报价
              <span aria-hidden="true">→</span>
            </a>
            <router-link
              to="/cases"
              class="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 backdrop-blur px-6 py-3 text-sm font-medium text-slate-700 hover:border-indigo-300 hover:text-indigo-700 transition-colors"
            >
              浏览合作案例
            </router-link>
            <a
              href="#positioning"
              class="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900 underline-offset-4 hover:underline"
            >
              生态定位 & 我们的优势 ↓
            </a>
          </div>

          <!-- Stats strip -->
          <div class="mt-14 mx-auto max-w-5xl">
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
              <div class="text-center">
                <div class="text-3xl md:text-4xl font-bold text-indigo-600 tabular-nums">{{ bloggerStats.bloggerCount }} 位+</div>
                <div class="mt-2 text-sm text-slate-600">技术博主</div>
              </div>
              <div class="text-center">
                <div class="text-3xl md:text-4xl font-bold text-purple-600 tabular-nums">{{ bloggerStats.formattedFollowers }}+</div>
                <div class="mt-2 text-sm text-slate-600">覆盖程序员 / 科技粉丝</div>
              </div>
              <div class="text-center">
                <div class="text-3xl md:text-4xl font-bold text-green-600 tabular-nums">{{ bloggerStats.totalPosts }} 篇+</div>
                <div class="mt-2 text-sm text-slate-600">累计投放推文</div>
              </div>
              <div class="text-center">
                <div class="text-3xl md:text-4xl font-bold text-rose-600 tabular-nums">{{ bloggerStats.formattedExposure }}+</div>
                <div class="mt-2 text-sm text-slate-600">累计曝光</div>
              </div>
              <div class="text-center col-span-2 sm:col-span-1">
                <div class="text-3xl md:text-4xl font-bold text-orange-600 tabular-nums">20 个+</div>
                <div class="mt-2 text-sm text-slate-600">辐射社群</div>
              </div>
            </div>
          </div>

          <div class="mt-16 max-w-4xl mx-auto">
            <div class="mb-5 text-center text-[11px] font-medium uppercase tracking-[0.24em] text-slate-400">已合作品牌</div>
            <BrandMarquee />
          </div>
        </div>
      </div>
    </section>

    <!-- 定位 & 优势 -->
    <section id="positioning" class="relative scroll-mt-24">
      <div class="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-indigo-50/30 to-white pointer-events-none"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center mb-14">
          <div class="text-xs font-medium uppercase tracking-[0.24em] text-indigo-600">Position & Edge</div>
          <h2 class="mt-3 text-3xl md:text-4xl font-light text-slate-900 tracking-tight">我们站在哪里 · 凭什么相信</h2>
          <p class="mt-4 max-w-2xl mx-auto text-base text-slate-500 leading-relaxed">
            在 AI 生态的传播链路里有清晰位置，并把这条路径上的能力做厚。
          </p>
        </div>

        <div class="grid gap-6 lg:grid-cols-12">
          <!-- 生态定位 (5 cols) -->
          <div class="lg:col-span-5">
            <div class="h-full rounded-2xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/60 p-7 shadow-sm">
              <div class="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-indigo-600">
                <span aria-hidden="true">📍</span>
                Our Position
              </div>
              <div class="mt-3 text-xl font-semibold text-slate-900">AI 生态中的「开发者传播渠道」</div>
              <p class="mt-3 text-sm leading-7 text-slate-600">
                上游有算力与模型，中游有产品与工具，下游是真实用户与商单。我们是中间这条把产品讲给开发者、并形成市场教育的渠道层。
              </p>

              <!-- 4 layers visual -->
              <div class="mt-5 space-y-2">
                <div class="flex items-center gap-3 rounded-lg border border-slate-200 bg-white/80 px-3 py-2.5">
                  <span class="text-[10px] font-mono text-slate-400 w-8">L1</span>
                  <span class="text-sm font-medium text-slate-700">上游 · 基础能力层</span>
                  <span class="ml-auto text-xs text-slate-400">算力 · 模型 · 框架</span>
                </div>
                <div class="flex items-center gap-3 rounded-lg border border-slate-200 bg-white/80 px-3 py-2.5">
                  <span class="text-[10px] font-mono text-slate-400 w-8">L2</span>
                  <span class="text-sm font-medium text-slate-700">中游 · 产品工具层</span>
                  <span class="ml-auto text-xs text-slate-400">SaaS · 工作流 · API</span>
                </div>
                <div class="flex items-center gap-3 rounded-xl border-2 border-indigo-500 bg-gradient-to-r from-indigo-50 to-violet-50 px-3 py-3 shadow-sm">
                  <span class="text-[10px] font-mono text-indigo-600 w-8 font-semibold">L3</span>
                  <span class="text-sm font-semibold text-slate-900">渠道 · 开发者传播</span>
                  <span class="ml-auto inline-flex items-center gap-1 text-xs font-medium text-indigo-700">
                    <span aria-hidden="true">←</span> 我们在这
                  </span>
                </div>
                <div class="flex items-center gap-3 rounded-lg border border-slate-200 bg-white/80 px-3 py-2.5">
                  <span class="text-[10px] font-mono text-slate-400 w-8">L4</span>
                  <span class="text-sm font-medium text-slate-700">下游 · 用户与商业转化</span>
                  <span class="ml-auto text-xs text-slate-400">付费 · 复购 · LTV</span>
                </div>
              </div>

              <router-link
                to="/ecosystem"
                class="mt-5 inline-flex items-center gap-1 text-sm font-medium text-indigo-700 hover:text-indigo-900 underline-offset-4 hover:underline"
              >
                查看完整生态定位
                <span aria-hidden="true">→</span>
              </router-link>
            </div>
          </div>

          <!-- 6 层优势 (7 cols) -->
          <div class="lg:col-span-7">
            <div class="text-xs font-medium uppercase tracking-[0.22em] text-violet-600 mb-3">
              <span aria-hidden="true">✨</span> Why Us · 六层核心能力
            </div>
            <div class="grid sm:grid-cols-2 gap-4">
              <!-- 优势 1 -->
              <div class="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-sky-300 hover:shadow-md transition-all">
                <div class="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-sky-50 text-sky-600 text-lg">
                  <span aria-hidden="true">🧠</span>
                </div>
                <div class="mt-4 text-base font-semibold text-slate-900">技术认知壁垒</div>
                <p class="mt-2 text-sm leading-6 text-slate-600">
                  我们懂技术产品的真实价值，能把产品能力拆成开发者看得懂、愿意讨论的技术语境。
                </p>
                <div class="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                  <span class="rounded-md bg-sky-50 text-sky-700 px-2 py-0.5">技术理解</span>
                  <span class="rounded-md bg-sky-50 text-sky-700 px-2 py-0.5">产品拆解</span>
                  <span class="rounded-md bg-sky-50 text-sky-700 px-2 py-0.5">开发者语境</span>
                </div>
              </div>

              <!-- 优势 1 -->
              <div class="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-indigo-300 hover:shadow-md transition-all">
                <div class="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 text-lg">
                  <span aria-hidden="true">📝</span>
                </div>
                <div class="mt-4 text-base font-semibold text-slate-900">技术内容生产力</div>
                <p class="mt-2 text-sm leading-6 text-slate-600">
                  能把产品讲成技术文章，覆盖痛点 / 接入 / Benchmark 全套结构，不是硬广。
                </p>
                <div class="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                  <span class="rounded-md bg-indigo-50 text-indigo-700 px-2 py-0.5">技术理解</span>
                  <span class="rounded-md bg-indigo-50 text-indigo-700 px-2 py-0.5">写作能力</span>
                  <span class="rounded-md bg-indigo-50 text-indigo-700 px-2 py-0.5">产品视角</span>
                </div>
              </div>

              <!-- 优势 3 -->
              <div class="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-emerald-300 hover:shadow-md transition-all">
                <div class="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 text-lg">
                  <span aria-hidden="true">🧑‍💻</span>
                </div>
                <div class="mt-4 text-base font-semibold text-slate-900">开发者真实在场</div>
                <p class="mt-2 text-sm leading-6 text-slate-600">
                  41 位长期活跃的技术博主 + 20 个开发者社群，覆盖掘金 / 知乎 / 小红书 / 公众号 / X 等讨论场。
                </p>
                <div class="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                  <span class="rounded-md bg-emerald-50 text-emerald-700 px-2 py-0.5">5+ 主流平台</span>
                  <span class="rounded-md bg-emerald-50 text-emerald-700 px-2 py-0.5">20+ 开发者社群</span>
                  <span class="rounded-md bg-emerald-50 text-emerald-700 px-2 py-0.5">技术圈语境</span>
                </div>
              </div>

              <!-- 优势 2 -->
              <div class="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-cyan-300 hover:shadow-md transition-all">
                <div class="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 text-lg">
                  <span aria-hidden="true">🤝</span>
                </div>
                <div class="mt-4 text-base font-semibold text-slate-900">信任网络</div>
                <p class="mt-2 text-sm leading-6 text-slate-600">
                  长期合作沉淀的博主关系与履约口碑，让品牌需求能被稳定承接、持续执行，而不是一次性合作。
                </p>
                <div class="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                  <span class="rounded-md bg-cyan-50 text-cyan-700 px-2 py-0.5">长期协作</span>
                  <span class="rounded-md bg-cyan-50 text-cyan-700 px-2 py-0.5">稳定履约</span>
                  <span class="rounded-md bg-cyan-50 text-cyan-700 px-2 py-0.5">口碑网络</span>
                </div>
              </div>

              <!-- 优势 4 -->
              <div class="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all">
                <div class="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-50 text-violet-600 text-lg">
                  <span aria-hidden="true">🔍</span>
                </div>
                <div class="mt-4 text-base font-semibold text-slate-900">GEO 长期可见度沉淀</div>
                <p class="mt-2 text-sm leading-6 text-slate-600">
                  每篇内容在搜索 / AI 问答里都是一次长尾占位，把品牌沉淀进 AI 时代的可见度池。
                </p>
                <div class="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                  <span class="rounded-md bg-violet-50 text-violet-700 px-2 py-0.5">长尾搜索</span>
                  <span class="rounded-md bg-violet-50 text-violet-700 px-2 py-0.5">品牌占位</span>
                  <span class="rounded-md bg-violet-50 text-violet-700 px-2 py-0.5">AI 问答触达</span>
                </div>
              </div>

              <!-- 优势 6 -->
              <div class="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-amber-300 hover:shadow-md transition-all">
                <div class="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 text-amber-700 text-lg">
                  <span aria-hidden="true">🧭</span>
                </div>
                <div class="mt-4 text-base font-semibold text-slate-900">流程清晰可履约</div>
                <p class="mt-2 text-sm leading-6 text-slate-600">
                  从需求确认 → 博主撮合 → 发稿 → 数据回收 → 结算闭环，全流程透明，5+ 年商单履约经验。
                </p>
                <div class="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                  <span class="rounded-md bg-amber-50 text-amber-800 px-2 py-0.5">需求撮合</span>
                  <span class="rounded-md bg-amber-50 text-amber-800 px-2 py-0.5">数据回收</span>
                  <span class="rounded-md bg-amber-50 text-amber-800 px-2 py-0.5">结算闭环</span>
                </div>
              </div>
            </div>
            <router-link
              to="/why-us"
              class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-violet-700 hover:text-violet-900 underline-offset-4 hover:underline"
            >
              查看 6 层完整优势分析
              <span aria-hidden="true">→</span>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 博主团队展示 -->
    <section id="blogger-team" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 scroll-mt-24">
      <div class="text-center mb-12">
        <div class="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">Our Bloggers</div>
        <h2 class="mt-3 text-3xl md:text-4xl font-light text-slate-900 tracking-tight">技术博主矩阵</h2>
        <p class="mt-4 text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
          覆盖前端、后端、AI、移动开发等技术领域。
          <a href="#join-cta" class="ml-1 inline-flex items-center gap-0.5 text-slate-700 underline underline-offset-4 decoration-slate-300 hover:text-slate-900 hover:decoration-slate-500">
            持续招募中
            <span aria-hidden="true">↘</span>
          </a>
        </p>
      </div>

      <BloggerControls
        v-model:viewMode="viewMode"
        v-model:selectedPlatform="selectedPlatform"
        v-model:sortField="sortField"
        v-model:sortOrder="sortOrder"
        :available-platforms="availablePlatforms"
        :roster-file="bloggerRosterFile"
        @copy-table="copyTableToClipboard"
      />

      <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        <BloggerCard
          v-for="blogger in bloggersShownInGrid"
          :key="blogger.id"
          :blogger="blogger"
          :expanded="expandedBloggers.includes(blogger.id)"
          :is-kol="isKOL(blogger.followers)"
          :is-koc="isKOC(blogger.followers)"
          :has-only-one-platform="hasOnlyOnePlatform(blogger)"
          :fallback-avatar="getFallbackAvatar(blogger.name)"
          @toggle-expanded="toggleExpanded"
          @link-click="handleLinkEvent"
          @request-platforms="openMoreDataModal"
          @avatar-error="handleAvatarError"
        />
      </div>

      <div v-if="showGridExpandToggle" class="mt-10 flex justify-center">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
          @click="bloggersGridExpanded = !bloggersGridExpanded"
        >
          <span v-if="!bloggersGridExpanded">展开全部 {{ filteredAndSortedBloggers.length }} 位博主</span>
          <span v-else>收起为精选（前 {{ BLOGGER_GRID_PREVIEW }} 位）</span>
          <span aria-hidden="true" class="text-slate-400">{{ bloggersGridExpanded ? '↑' : '↓' }}</span>
        </button>
      </div>

      <BloggerTable
        v-if="viewMode !== 'grid'"
        class="hidden md:block"
        :bloggers="filteredAndSortedBloggers"
        :available-platforms="availablePlatforms"
        :fallback-avatar-for="getFallbackAvatar"
        :has-only-one-platform="hasOnlyOnePlatform"
        :get-account-by-platform="getAccountByPlatform"
        @link-click="handleLinkEvent"
        @request-platforms="openMoreDataModal"
        @avatar-error="handleAvatarError"
      />
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-2">
      <ServiceOverviewSection section-id="service-overview" />
    </div>

    <!-- 底部 CTA · 双入口 -->
    <section id="join-cta" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center mb-10">
        <div class="text-xs font-medium uppercase tracking-[0.24em] text-indigo-600">Get Started</div>
        <h2 class="mt-3 text-3xl md:text-4xl font-light text-slate-900 tracking-tight">两个入口，选一个开始</h2>
      </div>
      <div class="grid gap-5 md:grid-cols-2 max-w-5xl mx-auto">
        <!-- 品牌方 -->
        <div class="group relative overflow-hidden rounded-2xl border border-indigo-200 bg-gradient-to-br from-white via-indigo-50/40 to-violet-50/60 p-7 transition-all hover:shadow-lg hover:shadow-indigo-100">
          <div class="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-indigo-200/40 blur-2xl pointer-events-none"></div>
          <div class="relative">
            <div class="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-indigo-700">
              <span aria-hidden="true">💼</span>
              For Brands
            </div>
            <div class="mt-2 text-xl font-semibold text-slate-900">我是品牌方</div>
            <p class="mt-3 text-sm leading-7 text-slate-600">
              想要推文 / 引流 / 社群 / AI 联运。看完表格后想直接询价，加微信 <span class="font-mono text-indigo-700">atar24</span>，备注预算 / 品类 / 目标，1 个工作日内给方案。
            </p>
            <div class="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#service-overview"
                class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-indigo-200 hover:shadow-lg hover:from-indigo-700 hover:to-violet-700 transition-all"
              >
                查看服务与报价
                <span aria-hidden="true">→</span>
              </a>
              <router-link
                to="/cases"
                class="inline-flex items-center text-sm font-medium text-indigo-700 hover:text-indigo-900 underline-offset-4 hover:underline"
              >
                先看案例
              </router-link>
            </div>
          </div>
        </div>

        <!-- 博主/共创者 -->
        <div class="group relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-white via-amber-50/40 to-orange-50/50 p-7 transition-all hover:shadow-lg hover:shadow-amber-100">
          <div class="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-amber-200/40 blur-2xl pointer-events-none"></div>
          <div class="relative">
            <div class="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-amber-700">
              <span aria-hidden="true">🛠</span>
              For Builders
            </div>
            <div class="mt-2 text-xl font-semibold text-slate-900">我是博主 / AI 爱好者</div>
            <p class="mt-3 text-sm leading-7 text-slate-600">
              想共创内容、尝试 AI 项目、打磨开发者工具，或者用兼职方式参与真实合作。欢迎长期协作，也欢迎从一次共创开始。
            </p>
            <div class="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/TUARAN/blogger-alliance"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
              >
                加入博主联盟
                <span aria-hidden="true">→</span>
              </a>
              <router-link
                to="/academy"
                class="inline-flex items-center text-sm font-medium text-amber-700 hover:text-amber-900 underline-offset-4 hover:underline"
              >
                了解联盟学院
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <QrCorner />

    <div v-if="moreDataModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/40" @click="closeMoreDataModal"></div>
      <div class="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
        <div class="text-base font-semibold text-gray-900 mb-2">提示</div>
        <div class="text-sm text-gray-600 leading-relaxed">
          该博主尚未补全其他平台主页链接。补齐后即可展示更完整的影响力画像与覆盖人数。
        </div>
        <div class="mt-5 flex justify-end">
          <button
            type="button"
            class="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
            @click="closeMoreDataModal"
          >
            知道了
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { bloggersData, cooperationHeatOrder } from '../../data/bloggerInfo.js'
import { trackLinkClick, getBloggerStats, recordPageView } from '../../utils/stats.js'
import bloggerRosterFile from '../../data/博主联盟花名册v20260106.xlsx?url'
import { showToast } from '../../utils/toast.js'
import BrandMarquee from '../../components/BrandMarquee.vue'
import ServiceOverviewSection from '../../components/ServiceOverviewSection.vue'
import BloggerCard from '../../components/BloggerCard.vue'
import BloggerTable from '../../components/BloggerTable.vue'
import BloggerControls from '../../components/BloggerControls.vue'
import QrCorner from '../../components/QrCorner.vue'

const expandedBloggers = ref([])
const bloggerStats = ref(getBloggerStats())

/** 网格视图默认只展示前若干位，降低首屏以下长度与图片请求 */
const BLOGGER_GRID_PREVIEW = 16
const bloggersGridExpanded = ref(false)

const moreDataModalOpen = ref(false)
const openMoreDataModal = () => { moreDataModalOpen.value = true }
const closeMoreDataModal = () => { moreDataModalOpen.value = false }

const hasOnlyOnePlatform = (blogger) => (blogger?.socialAccounts?.length ?? 0) === 1

const avatarPalette = [
  ['#E0EAFF', '#6D28D9'],
  ['#DFF6F3', '#0F766E'],
  ['#FFE7D6', '#C2410C'],
  ['#FDE7F3', '#BE185D'],
  ['#E9F7D9', '#3F6212']
]

const getInitials = (name = '') => {
  const compact = String(name).trim().replace(/\s+/g, '')
  if (!compact) return '博'
  return compact.slice(0, Math.min(2, compact.length))
}

const getFallbackAvatar = (name = '') => {
  const initials = getInitials(name)
  const seed = Array.from(String(name)).reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const [bgColor, textColor] = avatarPalette[seed % avatarPalette.length]
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <rect width="96" height="96" rx="48" fill="${bgColor}" />
      <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="${textColor}" font-family="Arial, PingFang SC, Microsoft YaHei, sans-serif" font-size="34" font-weight="700">${initials}</text>
    </svg>
  `
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

const handleAvatarError = (event) => {
  const target = event?.target
  if (!(target instanceof HTMLImageElement)) return
  const fallback = target.dataset.fallbackAvatar || getFallbackAvatar(target.alt)
  if (target.src === fallback) return
  target.src = fallback
}

const parseFollowersValue = (followersStr) => {
  if (!followersStr) return 0
  const clean = followersStr.replace(/\s+/g, '').replace(/\+/g, '').toUpperCase()

  if (clean.includes('K')) {
    const num = parseFloat(clean.replace('K', ''))
    return Number.isNaN(num) ? 0 : num * 1000
  }
  if (clean.includes('W')) {
    const num = parseFloat(clean.replace('W', ''))
    return Number.isNaN(num) ? 0 : num * 10000
  }
  if (clean.includes('M')) {
    const num = parseFloat(clean.replace('M', ''))
    return Number.isNaN(num) ? 0 : num * 1000000
  }
  const num = parseFloat(clean)
  return Number.isNaN(num) ? 0 : num
}

const KOL_THRESHOLD = 5000
const isKOL = (followersStr) => parseFollowersValue(followersStr) > KOL_THRESHOLD
const isKOC = (followersStr) => {
  const value = parseFollowersValue(followersStr)
  return value > 0 && value <= KOL_THRESHOLD
}

const hasExplicitAvatar = (blogger) => {
  const avatar = blogger?.avatar
  if (typeof avatar !== 'string') return false
  const trimmed = avatar.trim()
  if (!trimmed) return false
  return !trimmed.includes('dicebear.com')
}

const toggleExpanded = (bloggerId) => {
  const index = expandedBloggers.value.indexOf(bloggerId)
  if (index > -1) {
    expandedBloggers.value.splice(index, 1)
  } else {
    expandedBloggers.value.push(bloggerId)
  }
}

const handleLinkEvent = ({ platform, url, bloggerName }) => {
  trackLinkClick(`${bloggerName}-${platform}`, url, '/tob')
}

// --- 列表/表格视图与筛选排序逻辑 ---
const viewMode = ref('grid')
const selectedPlatform = ref('all')
const sortField = ref('cooperationHeat')
const sortOrder = ref('desc')

const bloggerOrderIndex = new Map(bloggersData.map((b, i) => [b.id, i]))
const getBloggerOriginalIndex = (b) => bloggerOrderIndex.get(b.id) ?? Number.MAX_SAFE_INTEGER

const getCooperationHeatPriority = (blogger) => {
  const idx = cooperationHeatOrder.findIndex((kw) => blogger.name.includes(kw))
  return idx === -1 ? Number.MAX_SAFE_INTEGER : idx
}

const compareByRecommendedOrder = (a, b) => {
  const hasA = hasExplicitAvatar(a)
  const hasB = hasExplicitAvatar(b)
  if (hasA !== hasB) return hasA ? -1 : 1

  if (hasA && hasB) {
    const tierA = isKOL(a.followers) ? 0 : isKOC(a.followers) ? 1 : 2
    const tierB = isKOL(b.followers) ? 0 : isKOC(b.followers) ? 1 : 2
    if (tierA !== tierB) return tierA - tierB
    return getBloggerOriginalIndex(a) - getBloggerOriginalIndex(b)
  }

  const followersDiff = parseFollowersValue(b.followers) - parseFollowersValue(a.followers)
  if (followersDiff !== 0) return followersDiff
  return getBloggerOriginalIndex(a) - getBloggerOriginalIndex(b)
}

const staticPlatforms = ['掘金', 'GitHub', 'CSDN', '知乎', '微信公众号']

const availablePlatforms = computed(() => {
  const platforms = new Set()
  bloggersData.forEach((blogger) => {
    blogger.socialAccounts.forEach((acc) => {
      let p = acc.platform
      if (p.includes('微信公众号')) p = '微信公众号'
      if (p.includes('腾讯云')) p = '腾讯云'
      platforms.add(p)
    })
  })
  return Array.from(platforms).sort((a, b) => {
    const idxA = staticPlatforms.indexOf(a)
    const idxB = staticPlatforms.indexOf(b)
    if (idxA !== -1 && idxB !== -1) return idxA - idxB
    if (idxA !== -1) return -1
    if (idxB !== -1) return 1
    return a.localeCompare(b)
  })
})

const getAccountByPlatform = (blogger, platformName) => {
  return blogger.socialAccounts.find((acc) => {
    if (platformName === '微信公众号') return acc.platform.includes('微信公众号')
    if (platformName === '腾讯云') return acc.platform.includes('腾讯云')
    return acc.platform === platformName
  })
}

const copyTableToClipboard = () => {
  const headers = ['博主姓名', '粉丝基数', '擅长领域', '个人简介', ...availablePlatforms.value]

  const rows = filteredAndSortedBloggers.value.map((blogger) => {
    const rowData = [
      blogger.name,
      blogger.followers,
      blogger.expandedContent.specialties.join(', '),
      blogger.introduction.replace(/\n|\r/g, ' ')
    ]
    availablePlatforms.value.forEach((p) => {
      const acc = getAccountByPlatform(blogger, p)
      rowData.push(acc ? acc.url : '-')
    })
    return rowData.join('\t')
  })

  const finalContent = `${headers.join('\t')}\n${rows.join('\n')}`

  navigator.clipboard
    .writeText(finalContent)
    .then(() => showToast('✅ 表格数据已复制，可粘贴到 Excel / 飞书 / Notion', { type: 'success' }))
    .catch(() => showToast('复制失败，请重试', { type: 'error' }))
}

const filteredAndSortedBloggers = computed(() => {
  let result = [...bloggersData]

  if (selectedPlatform.value !== 'all') {
    result = result.filter((blogger) => getAccountByPlatform(blogger, selectedPlatform.value))
  }

  if (sortField.value === 'cooperationHeat') {
    result.sort((a, b) => {
      const priorityA = getCooperationHeatPriority(a)
      const priorityB = getCooperationHeatPriority(b)
      if (priorityA !== priorityB) return priorityA - priorityB
      return compareByRecommendedOrder(a, b)
    })
  } else if (sortField.value === 'recommended') {
    result.sort(compareByRecommendedOrder)
  } else if (sortField.value === 'followers') {
    result.sort((a, b) => {
      const valA = parseFollowersValue(a.followers)
      const valB = parseFollowersValue(b.followers)
      if (valA < valB) return sortOrder.value === 'asc' ? -1 : 1
      if (valA > valB) return sortOrder.value === 'asc' ? 1 : -1
      return 0
    })
  }

  return result
})

const bloggersShownInGrid = computed(() => {
  const list = filteredAndSortedBloggers.value
  if (viewMode.value !== 'grid') return list
  if (bloggersGridExpanded.value || list.length <= BLOGGER_GRID_PREVIEW) return list
  return list.slice(0, BLOGGER_GRID_PREVIEW)
})

const showGridExpandToggle = computed(
  () => viewMode.value === 'grid' && filteredAndSortedBloggers.value.length > BLOGGER_GRID_PREVIEW
)

onMounted(() => {
  recordPageView()
})
</script>
