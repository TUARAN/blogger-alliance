<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <AppNav />

    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:pl-32">
      <div class="hidden lg:block fixed left-6 top-32 z-30">
        <div class="flex flex-col gap-2 bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-gray-200/50">
          <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-1">
            导航
          </div>
          <a
            href="#overview"
            class="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 whitespace-nowrap min-w-[140px] text-gray-600 hover:bg-gray-50 hover:text-slate-900"
          >
            <span>📊</span>
            <span>服务总览</span>
          </a>
          <a
            href="#tweet"
            class="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 whitespace-nowrap min-w-[140px] text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
          >
            <span>✍️</span>
            <span>推文服务</span>
          </a>
          <a
            href="#cpc"
            class="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 whitespace-nowrap min-w-[140px] text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
          >
            <span>🔗</span>
            <span>引流服务</span>
          </a>
          <a
            href="#community"
            class="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 whitespace-nowrap min-w-[140px] text-gray-600 hover:bg-gray-50 hover:text-blue-600"
          >
            <span>👥</span>
            <span>社群服务</span>
          </a>
          <a
            href="#ai-access"
            class="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 whitespace-nowrap min-w-[140px] text-gray-600 hover:bg-gray-50 hover:text-orange-600"
          >
            <span>🤖</span>
            <span>AI Access</span>
          </a>
          <a
            href="#oversea-cloud"
            class="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 whitespace-nowrap min-w-[140px] text-gray-600 hover:bg-gray-50 hover:text-cyan-600"
          >
            <span>🌐</span>
            <span>出海云访问</span>
          </a>
        </div>
      </div>

      <header class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900">服务介绍</h1>
        <p class="mt-3 text-gray-600 max-w-3xl">
          博主联盟目前提供推文、引流、社群 3 类常规合作，以及 AI Access、出海云访问 2 类专题推广服务。下方先看总览对比，再按方向跳转细则。
        </p>
      </header>

      <section id="overview" class="mb-10 rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-sm backdrop-blur-sm scroll-mt-24">
        <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">服务总览</div>
            <h2 class="mt-2 text-2xl font-bold text-gray-900">5 类合作 & 报价对比</h2>
          </div>
          <div class="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
            报价为参考区间，最终以合作方案为准
          </div>
        </div>
        <p class="mt-4 max-w-4xl text-sm leading-7 text-gray-600">
          按合作目标快速选型：要曝光走推文，要可量化点击走引流，要长期私域走社群；要持续内容资产 + 高提成转化，看 AI Access / 出海云访问 两个专题。各服务可单选，也可组合执行。
        </p>

        <div class="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table class="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead class="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th class="px-4 py-3 font-semibold whitespace-nowrap">服务</th>
                <th class="px-4 py-3 font-semibold whitespace-nowrap">类型</th>
                <th class="px-4 py-3 font-semibold">适合场景</th>
                <th class="px-4 py-3 font-semibold whitespace-nowrap">参考报价</th>
                <th class="px-4 py-3 font-semibold">主要效果</th>
                <th class="px-4 py-3 font-semibold whitespace-nowrap">周期</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr class="hover:bg-slate-50/60">
                <td class="px-4 py-4 align-top">
                  <a href="#tweet" class="inline-flex items-center gap-2 font-semibold whitespace-nowrap text-indigo-700 hover:underline">
                    <span>✍️</span><span>推文服务</span>
                  </a>
                </td>
                <td class="px-4 py-4 align-top">
                  <span class="inline-flex items-center justify-center min-w-[60px] rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">常规</span>
                </td>
                <td class="px-4 py-4 align-top text-gray-700">想要快速曝光、内容种草和品牌心智</td>
                <td class="px-4 py-4 align-top text-gray-700">
                  <div>直发 ¥500–3k／条</div>
                  <div>测评 ¥1.5k–8k／条</div>
                  <div>深度测评 ¥5k–3w／条</div>
                </td>
                <td class="px-4 py-4 align-top text-gray-700">阅读量、关注转化、品牌可信度</td>
                <td class="px-4 py-4 align-top text-gray-700 whitespace-nowrap">单次 / 排期</td>
              </tr>
              <tr class="hover:bg-slate-50/60">
                <td class="px-4 py-4 align-top">
                  <a href="#cpc" class="inline-flex items-center gap-2 font-semibold whitespace-nowrap text-emerald-700 hover:underline">
                    <span>🔗</span><span>引流服务</span>
                  </a>
                </td>
                <td class="px-4 py-4 align-top">
                  <span class="inline-flex items-center justify-center min-w-[60px] rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">常规</span>
                </td>
                <td class="px-4 py-4 align-top text-gray-700">想要可量化点击、注册和试用线索</td>
                <td class="px-4 py-4 align-top text-gray-700">
                  <div>CPC ¥1–10／有效点击</div>
                  <div class="text-xs text-gray-500">依品类与结算口径浮动</div>
                </td>
                <td class="px-4 py-4 align-top text-gray-700">点击量、注册量、试用线索</td>
                <td class="px-4 py-4 align-top text-gray-700 whitespace-nowrap">持续可投</td>
              </tr>
              <tr class="hover:bg-slate-50/60">
                <td class="px-4 py-4 align-top">
                  <a href="#community" class="inline-flex items-center gap-2 font-semibold whitespace-nowrap text-blue-700 hover:underline">
                    <span>👥</span><span>社群服务</span>
                  </a>
                </td>
                <td class="px-4 py-4 align-top">
                  <span class="inline-flex items-center justify-center min-w-[60px] rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">常规</span>
                </td>
                <td class="px-4 py-4 align-top text-gray-700">想要长期私域沉淀和稳定开发者关系</td>
                <td class="px-4 py-4 align-top text-gray-700">
                  <div>社群宣发 ¥2k–1w／月</div>
                  <div>建群项目 ¥3w–20w</div>
                </td>
                <td class="px-4 py-4 align-top text-gray-700">入群人数、活跃度、长期触达资产</td>
                <td class="px-4 py-4 align-top text-gray-700 whitespace-nowrap">月度 / 项目制</td>
              </tr>
              <tr class="hover:bg-slate-50/60">
                <td class="px-4 py-4 align-top">
                  <a href="#ai-access" class="inline-flex items-center gap-2 font-semibold whitespace-nowrap text-orange-700 hover:underline">
                    <span>🤖</span><span>AI Access</span>
                  </a>
                </td>
                <td class="px-4 py-4 align-top">
                  <span class="inline-flex items-center justify-center min-w-[60px] rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">专题</span>
                </td>
                <td class="px-4 py-4 align-top text-gray-700">海外大模型 / AI 工具使用需求承接</td>
                <td class="px-4 py-4 align-top text-gray-700">
                  <div>高提成分佣</div>
                  <div class="text-xs text-gray-500">参考 30%–60%，按成交结算</div>
                </td>
                <td class="px-4 py-4 align-top text-gray-700">站点 / 仓库 / 社群资产 + 长期转化</td>
                <td class="px-4 py-4 align-top text-gray-700 whitespace-nowrap">长期合作</td>
              </tr>
              <tr class="hover:bg-slate-50/60">
                <td class="px-4 py-4 align-top">
                  <a href="#oversea-cloud" class="inline-flex items-center gap-2 font-semibold whitespace-nowrap text-cyan-700 hover:underline">
                    <span>🌐</span><span>出海云访问</span>
                  </a>
                </td>
                <td class="px-4 py-4 align-top">
                  <span class="inline-flex items-center justify-center min-w-[60px] rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">专题</span>
                </td>
                <td class="px-4 py-4 align-top text-gray-700">出海云访问 / 跨境办公工具推广</td>
                <td class="px-4 py-4 align-top text-gray-700">
                  <div>高提成分佣</div>
                  <div class="text-xs text-gray-500">参考 30%–60%，按成交结算</div>
                </td>
                <td class="px-4 py-4 align-top text-gray-700">站点 / 导航 / 社群资产 + 长期转化</td>
                <td class="px-4 py-4 align-top text-gray-700 whitespace-nowrap">长期合作</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-gray-600">
          <div class="rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2">
            <span class="font-semibold text-slate-700">怎么选：</span>一次性发声 → 推文；持续要点击/线索 → 引流；想要长期沉淀 → 社群。
          </div>
          <div class="rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2">
            <span class="font-semibold text-slate-700">可组合：</span>推文 + 引流追加 UTM 追踪、社群宣发承接专题流量都常见。
          </div>
          <div class="rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2">
            <span class="font-semibold text-slate-700">专题优势：</span>由我们承担内容、站点、仓库与社群搭建，按成交分佣，零硬性投放预算。
          </div>
        </div>
      </section>

      <section id="regular-services" class="mb-8 rounded-2xl border border-slate-200 bg-white/75 p-6 shadow-sm backdrop-blur-sm">
        <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">常规服务</div>
            <h2 class="mt-2 text-2xl font-bold text-gray-900">面向常规品牌合作的 3 类服务</h2>
          </div>
          <div class="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
            推文服务 / 引流服务 / 社群服务
          </div>
        </div>
        <p class="mt-4 max-w-4xl text-sm leading-7 text-gray-600">
          这部分更适合常规推广、内容分发、线索获取和社群沉淀场景，按照合作目标选择单项服务，也可以组合执行。
        </p>
      </section>

      <section id="tweet" class="space-y-6 scroll-mt-24">
        <header class="mb-8">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900">推文服务</h2>
          <p class="mt-3 text-gray-600">
            面向技术受众的内容分发合作，提供从「直发」到「深度测评」的不同强度推文方案，兼顾速度、可信度与转化质量。
          </p>
        </header>

        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">核心说明区</h2>
          <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">什么是「推文合作」</div>
              <p class="mt-2 text-sm text-gray-600 leading-relaxed">以博主账号在内容平台发布图文/长图/短文等形式的产品内容。可以是甲方提供的稿件直发，也可以是基于真实试用体验的测评推文。</p>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">适合谁</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-indigo-600 mr-2">•</span><span>希望快速触达开发者受众，获得曝光与心智</span></li>
                <li class="flex items-start"><span class="text-indigo-600 mr-2">•</span><span>开发者工具、SaaS、AI 产品、技术课程、硬件外设等</span></li>
                <li class="flex items-start"><span class="text-indigo-600 mr-2">•</span><span>需要「内容可信度」来提升点击与转化</span></li>
              </ul>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">不适合谁</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>只追求硬广口播，不接受基本的内容合规与体验验证</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>无法提供可试用账号、素材、卖点信息</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>产品与开发者受众不匹配</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">推文类型（3 选 1 / 可组合）</h2>
          <p class="mt-2 text-sm text-gray-600">三种类型的核心差异：投入时间 vs 内容可信度 vs 转化质量。</p>
          <div class="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="relative rounded-xl border border-gray-200 bg-indigo-50/40 p-4">
              <div class="absolute top-3 left-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/70 border border-indigo-200 text-indigo-700 text-xs font-semibold">1</div>
              <div class="pl-10 text-sm font-semibold text-gray-900">直发推文</div>
              <p class="mt-2 pl-10 text-sm text-gray-600 leading-relaxed">甲方提供成稿/海报/要点，博主按约定格式直接发布。</p>
            </div>
            <div class="relative rounded-xl border border-gray-200 bg-emerald-50/40 p-4">
              <div class="absolute top-3 left-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/70 border border-emerald-200 text-emerald-700 text-xs font-semibold">2</div>
              <div class="pl-10 text-sm font-semibold text-gray-900">常规测评推文</div>
              <p class="mt-2 pl-10 text-sm text-gray-600 leading-relaxed">基于试用体验写常规产品测评，覆盖亮点、适用人群、上手成本与使用建议。</p>
            </div>
            <div class="relative rounded-xl border border-gray-200 bg-sky-50/40 p-4">
              <div class="absolute top-3 left-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/70 border border-sky-200 text-sky-700 text-xs font-semibold">3</div>
              <div class="pl-10 text-sm font-semibold text-gray-900">深度测评推文</div>
              <p class="mt-2 pl-10 text-sm text-gray-600 leading-relaxed">带一点开发性质的测评，例如接入 Demo、API 调用、工作流对接和 Benchmark。</p>
            </div>
          </div>
        </section>

        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">交付清单（可按需求定制）</h2>
          <div class="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">基础交付</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>1 条推文发布（按约定平台与时间）</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>素材规范：标题、正文、配图、链接、引导语</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>发布后链接回传与基础数据截图</span></li>
              </ul>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">测评增强</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>测评结构：痛点、方案、亮点、适用人群、建议</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>同类对比和选型建议</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>评论区基础互动</span></li>
              </ul>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">深度内容加项</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>Demo、接入示例、简单 Benchmark</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>踩坑点与解决思路</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>可选二次分发或站外同步</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">合作流程</h2>
          <div class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4"><div class="text-xs font-semibold text-gray-500">第 1 步</div><div class="mt-1 text-sm font-semibold text-gray-900">需求对齐</div><div class="mt-1 text-sm text-gray-600">目标、受众、类型与排期确认。</div></div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4"><div class="text-xs font-semibold text-gray-500">第 2 步</div><div class="mt-1 text-sm font-semibold text-gray-900">素材/试用准备</div><div class="mt-1 text-sm text-gray-600">成稿、卖点、素材包或试用账号和技术对接人。</div></div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4"><div class="text-xs font-semibold text-gray-500">第 3 步</div><div class="mt-1 text-sm font-semibold text-gray-900">撰写与确认</div><div class="mt-1 text-sm text-gray-600">直发快速确认；测评根据体验完成初稿与修改。</div></div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4"><div class="text-xs font-semibold text-gray-500">第 4 步</div><div class="mt-1 text-sm font-semibold text-gray-900">发布与复盘</div><div class="mt-1 text-sm text-gray-600">按排期发布，回传链接和数据，复盘优化方向。</div></div>
          </div>
        </section>

      </section>

      <section id="cpc" class="mt-12 space-y-6 scroll-mt-24">
        <header class="mb-8">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900">引流服务</h2>
          <p class="mt-3 text-lg text-gray-600">通过链接植入与数据追踪，为你的产品获取精准流量。需求发布、全网宣发、数据统计、结算一站式解决。</p>
        </header>

        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">核心说明区</h2>
          <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">什么是 CPC / 引流合作</div>
              <p class="mt-2 text-sm text-gray-600 leading-relaxed">在博主内容中植入你的产品链接或落地页入口，通过点击作为主要衡量口径，帮助你在技术圈获得持续曝光与有效访问。</p>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">适合谁</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-green-600 mr-2">•</span><span>有清晰落地页和注册路径，希望稳定获取访问与线索</span></li>
                <li class="flex items-start"><span class="text-green-600 mr-2">•</span><span>开发者工具、SaaS、AI 产品、技术课程等</span></li>
                <li class="flex items-start"><span class="text-green-600 mr-2">•</span><span>希望用可量化口径评估投放效果</span></li>
              </ul>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">不适合谁</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>落地页承接弱，转化链路不完整</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>只追求短期爆量，不关心受众匹配与转化质量</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>无法提供可追踪链接</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">完整服务流程</h2>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div class="rounded-xl border-2 border-green-300 bg-green-50 p-4"><div class="text-2xl font-bold text-green-700 mb-2">1️⃣</div><div class="text-sm font-semibold text-gray-900">发布需求</div><p class="mt-1 text-xs text-gray-600">明确引流目标、产品卖点、转化链路</p></div>
            <div class="rounded-xl border-2 border-green-300 bg-green-50 p-4"><div class="text-2xl font-bold text-green-700 mb-2">2️⃣</div><div class="text-sm font-semibold text-gray-900">全网宣发</div><p class="mt-1 text-xs text-gray-600">联盟进行链接植入和推广宣发</p></div>
            <div class="rounded-xl border-2 border-green-300 bg-green-50 p-4"><div class="text-2xl font-bold text-green-700 mb-2">3️⃣</div><div class="text-sm font-semibold text-gray-900">数据统计</div><p class="mt-1 text-xs text-gray-600">实时监测点击、转化等关键数据</p></div>
            <div class="rounded-xl border-2 border-green-300 bg-green-50 p-4"><div class="text-2xl font-bold text-green-700 mb-2">4️⃣</div><div class="text-sm font-semibold text-gray-900">结款</div><p class="mt-1 text-xs text-gray-600">按约定口径结算、生成报告</p></div>
          </div>
        </section>

        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">合作形式</h2>
          <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="relative rounded-xl border border-gray-200 bg-emerald-50/40 p-4"><div class="absolute top-3 left-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/70 border border-emerald-200 text-emerald-700 text-xs font-semibold">1</div><div class="pl-10 text-sm font-semibold text-gray-900">长尾文章 CPC</div><p class="mt-2 pl-10 text-sm text-gray-600">植入高表现长尾内容，受众精准，流量随时间递减。</p></div>
            <div class="relative rounded-xl border border-gray-200 bg-sky-50/40 p-4"><div class="absolute top-3 left-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/70 border border-sky-200 text-sky-700 text-xs font-semibold">2</div><div class="pl-10 text-sm font-semibold text-gray-900">近期文章 CPC</div><p class="mt-2 pl-10 text-sm text-gray-600">植入最新发布内容，曝光更高，相关性略弱。</p></div>
            <div class="relative rounded-xl border border-gray-200 bg-violet-50/40 p-4"><div class="absolute top-3 left-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/70 border border-violet-200 text-violet-700 text-xs font-semibold">3</div><div class="pl-10 text-sm font-semibold text-gray-900">AI 文章 + CPC</div><p class="mt-2 pl-10 text-sm text-gray-600">AI 生成专题创作，平台接受度不一，不按 UV 结算。</p></div>
          </div>
        </section>

        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">投放规则 &amp; 结算口径</h2>
          <div class="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">规则</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>使用专属链接或带 UTM 的可追踪链接</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>链接位置、露出频次、投放周期按约定执行</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>涉及平台合规或审核的内容按平台要求调整</span></li>
              </ul>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">结算方式</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>按点击（CPC）结算，以约定口径统计的有效点击为准</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>统计数据来源按约定（链接追踪、平台数据、双方对账）</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>AI 文章 + CPC 不按 UV 结算</span></li>
              </ul>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">模型说明</div>
              <div class="mt-2 text-sm text-gray-600 leading-relaxed">可根据品牌方需求设计、新建和敏捷迭代结算模型，适合长期合作和双向调优。</div>
            </div>
          </div>
        </section>

      </section>

      <section id="community" class="mt-12 space-y-6 scroll-mt-24">
        <header class="mb-8">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900">社群服务</h2>
          <p class="mt-3 text-lg text-gray-600">发布社群需求，导入社群成员、维持社群活跃、实现用户沉淀与结算。为你打造专属社群资产，建立长期的开发者关系。</p>
        </header>

        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">核心说明区</h2>
          <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">什么是「社群推广」</div>
              <p class="mt-2 text-sm text-gray-600 leading-relaxed">通过开发者社群进行产品信息触达、活动报名与内容分发。可以选择在既有社群中持续宣发，也可以帮助你建立并运营一个品牌专属社群。</p>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">适合谁</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-blue-600 mr-2">•</span><span>要做活动、发布、内测招募，希望持续获得高意向开发者反馈</span></li>
                <li class="flex items-start"><span class="text-blue-600 mr-2">•</span><span>工具、课程、AI 产品、技术服务等能提供明确价值或福利的产品</span></li>
                <li class="flex items-start"><span class="text-blue-600 mr-2">•</span><span>想把一次投放变成长期阵地</span></li>
              </ul>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">不适合谁</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>只想短期刷屏爆量，不接受社群规则与节奏</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>无法提供清晰卖点、报名链接或福利机制</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>没有长期投入预期却希望快速做成高活跃私域</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">完整服务流程</h2>
          <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div class="rounded-xl border-2 border-blue-300 bg-blue-50 p-4"><div class="text-2xl font-bold text-blue-700 mb-2">1️⃣</div><div class="text-sm font-semibold text-gray-900">发布需求</div><p class="mt-1 text-xs text-gray-600">定义社群目标和运营方向</p></div>
            <div class="rounded-xl border-2 border-blue-300 bg-blue-50 p-4"><div class="text-2xl font-bold text-blue-700 mb-2">2️⃣</div><div class="text-sm font-semibold text-gray-900">导入社群</div><p class="mt-1 text-xs text-gray-600">将目标用户导入社群</p></div>
            <div class="rounded-xl border-2 border-blue-300 bg-blue-50 p-4"><div class="text-2xl font-bold text-blue-700 mb-2">3️⃣</div><div class="text-sm font-semibold text-gray-900">社群活跃</div><p class="mt-1 text-xs text-gray-600">定期发布内容和互动</p></div>
            <div class="rounded-xl border-2 border-blue-300 bg-blue-50 p-4"><div class="text-2xl font-bold text-blue-700 mb-2">4️⃣</div><div class="text-sm font-semibold text-gray-900">成员沉淀</div><p class="mt-1 text-xs text-gray-600">建立高价值用户池</p></div>
            <div class="rounded-xl border-2 border-blue-300 bg-blue-50 p-4"><div class="text-2xl font-bold text-blue-700 mb-2">5️⃣</div><div class="text-sm font-semibold text-gray-900">结算报告</div><p class="mt-1 text-xs text-gray-600">周期结算和效果报告</p></div>
          </div>
        </section>

        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">两种合作方案</h2>
          <p class="mt-2 text-sm text-gray-600">一个是在存量社群持续宣发，一个是帮你建立专属社群并沉淀资产。</p>
          <div class="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div class="relative rounded-xl border border-gray-200 bg-blue-50/40 p-4">
              <div class="absolute top-3 left-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/70 border border-blue-200 text-blue-700 text-xs font-semibold">1</div>
              <div class="pl-10 text-sm font-semibold text-gray-900">社群宣传</div>
              <p class="mt-2 pl-10 text-sm text-gray-600 leading-relaxed">在既有开发者社群内，按节奏持续发布产品信息、活动、内测和福利，获取曝光、报名与线索。</p>
            </div>
            <div class="relative rounded-xl border border-gray-200 bg-indigo-50/40 p-4">
              <div class="absolute top-3 left-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/70 border border-indigo-200 text-indigo-700 text-xs font-semibold">2</div>
              <div class="pl-10 text-sm font-semibold text-gray-900">建设社群（专属社群）</div>
              <p class="mt-2 pl-10 text-sm text-gray-600 leading-relaxed">帮助品牌方建立专属社群，设计入群路径、运营机制、内容节奏与互动玩法，沉淀长期私域。</p>
            </div>
          </div>
        </section>

        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">交付清单（示例）</h2>
          <div class="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">社群宣传交付</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>宣发排期与频次（按周/月）</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>文案、海报、活动信息整理与合规检查</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>发布记录与链接回传</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>基础反馈汇总</span></li>
              </ul>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">建设社群交付</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>入群链路设计：引流入口、问卷、欢迎语</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>运营 SOP：群规、禁言策略、内容日历、活动机制</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>启动期运营：冷启动活动、话题引导、用户分层与共创机制</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>阶段复盘：活跃、留存、转化路径问题与优化建议</span></li>
              </ul>
            </div>
          </div>
        </section>

      </section>

      <section id="special-services" class="mt-14 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 p-6 shadow-sm">
        <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div class="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">专题服务</div>
            <h2 class="mt-2 text-2xl font-bold text-gray-900">围绕细分赛道做持续分发与转化</h2>
          </div>
          <div class="inline-flex items-center rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-amber-800 shadow-sm">
            当前专题：AI Access / 出海云访问
          </div>
        </div>
        <p class="mt-4 max-w-4xl text-sm leading-7 text-gray-700">
          专题服务更适合持续追踪热点、有明确目标用户、适合长期内容引流和后续转化的方向。相比一次性投放，更强调持续更新、内容节奏和社群承接，统一按高提成分佣方式合作。
        </p>
      </section>

      <section id="ai-access" class="mt-8 space-y-6 scroll-mt-24">
        <header class="mb-8">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900">AI Access 推广</h2>
          <p class="mt-3 text-lg text-gray-600">
            面向海外大模型与 AI 工具使用需求，围绕 ChatGPT、Claude 等话题持续做资讯分发、内容二创、建站承接、文档沉淀、仓库搭建和社区扩散，适合按高提成结果长期合作。
          </p>
        </header>

        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">核心说明区</h2>
          <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">这项服务在做什么</div>
              <p class="mt-2 text-sm text-gray-600 leading-relaxed">
                持续围绕大模型热点、模型使用门槛、账号获取方式、使用技巧与资讯变化发布内容，并把用户承接到站点、文档、仓库、社群或指定落地入口，形成可持续转化链路。
              </p>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">适合谁</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-orange-600 mr-2">•</span><span>面向国内用户提供海外 AI 模型使用支持、账号服务或配套工具的团队</span></li>
                <li class="flex items-start"><span class="text-orange-600 mr-2">•</span><span>希望在小红书、社区、搜索入口持续获取高意向 AI 用户</span></li>
                <li class="flex items-start"><span class="text-orange-600 mr-2">•</span><span>接受高提成合作方式，并愿意把转化链路交给我们一起搭建的合作方</span></li>
              </ul>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">我们能做什么</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>跟踪 Twitter/X、海外 AI 社区、产品更新和热点事件</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>做资讯整理、新闻转发、观点二创、实用教程和专题内容</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>搭建门户站点、文档页、导航页、GitHub 仓库和专题落地页</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>结合帖子、评论、社群和社区平台形成持续引流</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">流程示意</h2>
          <p class="mt-2 text-sm text-gray-600">
            从大模型需求增长开始，通过内容分发把流量沉淀到社群和私域，再完成服务转化与持续投入。
          </p>

          <div class="mt-6 space-y-4">
            <div class="rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-4">
              <div class="grid gap-3 lg:grid-cols-[1.1fr_auto_1.6fr_auto_1.2fr] lg:items-stretch">
                <div class="rounded-xl bg-white/85 border border-orange-200 p-4">
                  <div class="text-sm font-semibold text-gray-900">大模型需求增长</div>
                  <div class="mt-2 text-sm text-gray-600">ChatGPT / Claude 等工具使用需求持续增加</div>
                </div>
                <div class="hidden lg:flex items-center justify-center text-2xl text-orange-500">→</div>
                <div class="rounded-xl bg-white/85 border border-orange-200 p-4">
                  <div class="text-sm font-semibold text-gray-900">内容生产</div>
                  <div class="mt-3 grid gap-3 md:grid-cols-2">
                    <div class="rounded-lg border border-gray-200 bg-orange-50/50 p-3">
                      <div class="text-sm font-medium text-gray-900">热点资讯</div>
                      <div class="mt-1 text-xs leading-6 text-gray-600">Twitter / 海外平台 / 产品更新</div>
                    </div>
                    <div class="rounded-lg border border-gray-200 bg-amber-50/60 p-3">
                      <div class="text-sm font-medium text-gray-900">二创内容</div>
                      <div class="mt-1 text-xs leading-6 text-gray-600">改写 / 整理 / 解读 / 实用教程</div>
                    </div>
                  </div>
                </div>
                <div class="hidden lg:flex items-center justify-center text-2xl text-orange-500">→</div>
                <div class="rounded-xl bg-white/85 border border-orange-200 p-4">
                  <div class="text-sm font-semibold text-gray-900">内容分发</div>
                  <div class="mt-3 grid gap-2">
                    <div class="rounded-lg border border-gray-200 bg-rose-50/60 px-3 py-2 text-sm text-gray-700">小红书发帖</div>
                    <div class="rounded-lg border border-gray-200 bg-rose-50/60 px-3 py-2 text-sm text-gray-700">评论区留钩子</div>
                    <div class="rounded-lg border border-gray-200 bg-rose-50/60 px-3 py-2 text-sm text-gray-700">私信 / 引导</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-center text-2xl text-orange-500">↓</div>

            <div class="rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-50 to-cyan-50 p-4">
              <div class="grid gap-3 lg:grid-cols-[1.2fr_auto_1.3fr_auto_1.1fr] lg:items-stretch">
                <div class="rounded-xl bg-white/85 border border-sky-200 p-4">
                  <div class="text-sm font-semibold text-gray-900">流量沉淀</div>
                  <div class="mt-3 grid gap-3 md:grid-cols-2">
                    <div class="rounded-lg border border-gray-200 bg-sky-50/60 p-3">
                      <div class="text-sm font-medium text-gray-900">社群</div>
                      <div class="mt-1 text-xs leading-6 text-gray-600">集中答疑、转化和持续触达</div>
                    </div>
                    <div class="rounded-lg border border-gray-200 bg-cyan-50/60 p-3">
                      <div class="text-sm font-medium text-gray-900">私域</div>
                      <div class="mt-1 text-xs leading-6 text-gray-600">沉淀用户关系与后续复购</div>
                    </div>
                  </div>
                </div>
                <div class="hidden lg:flex items-center justify-center text-2xl text-sky-500">→</div>
                <div class="rounded-xl bg-white/85 border border-sky-200 p-4">
                  <div class="text-sm font-semibold text-gray-900">服务转化</div>
                  <div class="mt-2 text-sm text-gray-600">把用户需求承接到 AI 工具使用接入、账号支持或相关配套服务。</div>
                </div>
                <div class="hidden lg:flex items-center justify-center text-2xl text-sky-500">→</div>
                <div class="rounded-xl bg-white/85 border border-sky-200 p-4">
                  <div class="text-sm font-semibold text-gray-900">用户付费</div>
                  <div class="mt-2 text-sm text-gray-600">形成实际成交，再进入渠道分佣与后续复盘。</div>
                </div>
              </div>
            </div>

            <div class="flex justify-center text-2xl text-sky-500">↓</div>

            <div class="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-lime-50 p-4">
              <div class="grid gap-3 lg:grid-cols-[1.4fr_auto_1.1fr_auto_1.2fr] lg:items-stretch">
                <div class="rounded-xl bg-white/85 border border-emerald-200 p-4">
                  <div class="text-sm font-semibold text-gray-900">渠道分佣</div>
                  <div class="mt-3 grid gap-3 md:grid-cols-2">
                    <div class="rounded-lg border border-gray-200 bg-emerald-50/60 p-3">
                      <div class="text-sm font-medium text-gray-900">平台分成</div>
                      <div class="mt-1 text-xs leading-6 text-gray-600">按照合作口径进入平台侧结算</div>
                    </div>
                    <div class="rounded-lg border border-gray-200 bg-lime-50/70 p-3">
                      <div class="text-sm font-medium text-gray-900">个人收益</div>
                      <div class="mt-1 text-xs leading-6 text-gray-600">按合作方式获取持续收益</div>
                    </div>
                  </div>
                </div>
                <div class="hidden lg:flex items-center justify-center text-2xl text-emerald-500">→</div>
                <div class="rounded-xl bg-white/85 border border-emerald-200 p-4">
                  <div class="text-sm font-semibold text-gray-900">持续内容投入</div>
                  <div class="mt-2 text-sm text-gray-600">继续跟进热点、更新内容、迭代引流方式。</div>
                </div>
                <div class="hidden lg:flex items-center justify-center text-2xl text-emerald-500">↺</div>
                <div class="rounded-xl bg-white/85 border border-emerald-200 p-4">
                  <div class="text-sm font-semibold text-gray-900">形成循环</div>
                  <div class="mt-2 text-sm text-gray-600">收益反哺内容生产，形成长期分发和转化闭环。</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">合作方式</h2>
          <div class="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">内容与分发承接</div>
              <p class="mt-2 text-sm text-gray-600 leading-relaxed">围绕 AI Access 方向持续规划选题、发布内容，并在小红书、帖子、评论区和社区平台完成分发承接。</p>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">站点与资产搭建</div>
              <p class="mt-2 text-sm text-gray-600 leading-relaxed">可以同步搭建门户站点、文档页、导航页、GitHub 仓库和专题页，把内容流量沉淀成长期资产。</p>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">高提成合作</div>
              <p class="mt-2 text-sm text-gray-600 leading-relaxed">这类项目要求提成空间足够高，只有收益空间够大，才值得持续投入内容、人力和整套转化链路建设。</p>
            </div>
          </div>
          <p class="mt-4 text-sm leading-7 text-gray-600">
            我们更看重能不能把内容、站点、文档、仓库、社区和转化链路一起做起来，因此这类合作默认按长期结果协同推进，且要求提成足够高。
          </p>
        </section>

      </section>

      <section id="oversea-cloud" class="mt-14 space-y-6 scroll-mt-24">
        <header class="mb-8">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900">出海云访问 推广</h2>
          <p class="mt-3 text-lg text-gray-600">
            面向出海团队、跨境电商、海外开发者协作等场景，围绕海外云服务、节点稳定性、客户端体验、出海办公与跨境访问等话题持续做内容分发、专题落地与社群承接，按高提成结果合作。
          </p>
        </header>

        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">核心说明区</h2>
          <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">这项服务在做什么</div>
              <p class="mt-2 text-sm text-gray-600 leading-relaxed">
                围绕出海云访问、跨境办公和海外服务的真实使用场景做内容生产，把有访问需求的用户承接到品牌方的官网、文档、教程站点、社群和导航页，形成可持续的转化链路。
              </p>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">适合谁</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-cyan-600 mr-2">•</span><span>合规面向出海团队 / 跨境业务的云访问、加速、企业出海工具品牌</span></li>
                <li class="flex items-start"><span class="text-cyan-600 mr-2">•</span><span>希望在小红书、技术社区、搜索入口持续获取高意向用户</span></li>
                <li class="flex items-start"><span class="text-cyan-600 mr-2">•</span><span>接受高提成分佣，并愿意把转化链路与内容资产交给联盟一起搭建</span></li>
              </ul>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">我们能做什么</div>
              <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>跟进出海赛道动态、产品更新、节点变化与使用场景</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>做使用教程、对比测评、场景化案例和踩坑解读</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>搭建专题站点、教程文档、导航页和 GitHub 资源仓库</span></li>
                <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>结合帖子、评论、社群和社区平台形成持续引流</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">内容方向（示例）</h2>
          <p class="mt-2 text-sm text-gray-600">围绕真实使用场景规划选题，避免空泛广告，重点放在实用性与可信度。</p>
          <div class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div class="rounded-xl border border-gray-200 bg-cyan-50/40 p-4">
              <div class="text-sm font-semibold text-gray-900">使用教程</div>
              <p class="mt-1 text-xs text-gray-600 leading-6">客户端配置、出海账号注册、远程办公场景对接</p>
            </div>
            <div class="rounded-xl border border-gray-200 bg-sky-50/40 p-4">
              <div class="text-sm font-semibold text-gray-900">对比测评</div>
              <p class="mt-1 text-xs text-gray-600 leading-6">多产品横评、节点稳定性、跨境延迟与可用性测试</p>
            </div>
            <div class="rounded-xl border border-gray-200 bg-blue-50/40 p-4">
              <div class="text-sm font-semibold text-gray-900">场景案例</div>
              <p class="mt-1 text-xs text-gray-600 leading-6">海外开发者协作、跨境电商、出海团队办公等真实场景</p>
            </div>
            <div class="rounded-xl border border-gray-200 bg-indigo-50/40 p-4">
              <div class="text-sm font-semibold text-gray-900">资源沉淀</div>
              <p class="mt-1 text-xs text-gray-600 leading-6">导航页、教程站、文档仓库与长尾 SEO 入口</p>
            </div>
          </div>
        </section>

        <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900">合作方式</h2>
          <div class="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">内容与分发承接</div>
              <p class="mt-2 text-sm text-gray-600 leading-relaxed">围绕跨境访问与出海工具方向持续选题、发布内容，并在小红书、技术社区、评论区与导航站完成分发承接。</p>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">站点与资产搭建</div>
              <p class="mt-2 text-sm text-gray-600 leading-relaxed">同步搭建教程站点、对比导航页、文档资源库和 GitHub 仓库，把内容流量沉淀成长期可复用的转化资产。</p>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
              <div class="text-sm font-semibold text-gray-900">高提成合作</div>
              <p class="mt-2 text-sm text-gray-600 leading-relaxed">这类项目要求提成空间足够高，只有收益空间够大，才值得持续投入内容、人力和整套转化链路建设。</p>
            </div>
          </div>
          <div class="mt-4 rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-sm leading-7 text-amber-900">
            <span class="font-semibold">合规说明：</span>仅承接面向海外或跨境合规场景的产品推广，不参与任何违反相关地区法律法规的投放，具体合规口径以双方签约前评估为准。
          </div>
        </section>

      </section>
    </main>

    <button
      type="button"
      class="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-xl transition-transform hover:-translate-y-0.5 hover:bg-gray-800"
      @click="qrModalOpen = true"
    >
      <span class="text-base leading-none">🤝</span>
      <span>联系合作</span>
    </button>

    <div v-if="qrModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/45 backdrop-blur-sm" @click="qrModalOpen = false"></div>
      <div class="relative w-full max-w-sm rounded-3xl border border-white/60 bg-white/95 p-5 shadow-2xl">
        <button
          type="button"
          class="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          @click="qrModalOpen = false"
        >
          <span class="text-lg leading-none">×</span>
        </button>
        <div class="text-center">
          <div class="text-base font-semibold text-gray-900">联系合作</div>
          <div class="mt-2 text-sm text-gray-500">扫码添加微信号 atar24</div>
        </div>
        <div class="mt-5 rounded-2xl bg-gray-50 p-3">
          <img
            src="/src/img/qrcode1.jpg"
            alt="微信二维码"
            class="w-full h-auto rounded-xl object-contain"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
          />
          <div class="hidden h-72 w-full items-center justify-center rounded-xl bg-gray-100">
            <div class="text-center">
              <div class="text-2xl">📱</div>
              <div class="mt-2 text-xs text-gray-500">二维码图片</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const qrModalOpen = ref(false)
</script>
