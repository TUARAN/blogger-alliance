<template>
  <section :id="sectionId" class="mb-10 rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-sm backdrop-blur-sm scroll-mt-24">
    <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <div class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">服务总览</div>
        <h2 class="mt-2 text-2xl font-bold text-gray-900">6 类合作 & 报价对比</h2>
      </div>
      <div class="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-4 py-2 text-xs md:text-sm font-medium text-amber-800">
        报价口径混合（单篇 / 单价 / 项目费 / 分佣），起步预算见各行
      </div>
    </div>
    <p class="mt-4 max-w-4xl text-sm leading-7 text-gray-600">
      推文、引流、社群三类<strong class="font-medium text-gray-800">推广合作</strong>；AI Access、出海云访问两类<strong class="font-medium text-gray-800">专题联运</strong>；大厂云服务单独一类<strong class="font-medium text-gray-800">渠道服务</strong>——联盟本身就是云厂商认证渠道，提供官方充值与按量返利。按目标选型：要曝光走推文，要点击走引流，要私域走社群；要云采购渠道价走大厂云服务。
    </p>

    <div class="mt-6 grid gap-4 lg:grid-cols-3">
      <article class="rounded-xl border border-indigo-200 bg-indigo-50/60 p-5">
        <div class="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-indigo-700">方案 01</div>
        <h3 class="mt-3 text-lg font-bold text-gray-900">冷启动曝光包</h3>
        <p class="mt-2 text-sm leading-6 text-gray-700">
          适合新品发布、开发者工具首轮声量、融资后品牌露出。先让目标用户知道产品，再用可信内容解释产品为什么值得试。
        </p>
        <div class="mt-4 space-y-2 text-sm text-gray-700">
          <div><span class="font-semibold text-gray-900">组合：</span>推文服务 + 多平台分发 + 基础数据回传</div>
          <div><span class="font-semibold text-gray-900">指标：</span>曝光、阅读、互动、原帖链接、平台权重</div>
          <div><span class="font-semibold text-gray-900">适合周期：</span>单次排期 / 1-2 周集中发声</div>
        </div>
      </article>

      <article class="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
        <div class="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-emerald-700">方案 02</div>
        <h3 class="mt-3 text-lg font-bold text-gray-900">线索增长包</h3>
        <p class="mt-2 text-sm leading-6 text-gray-700">
          适合已经有落地页、注册路径或试用入口的 SaaS / AI 产品。用内容种草承接点击，再通过 UTM 和对账口径评估效果。
        </p>
        <div class="mt-4 space-y-2 text-sm text-gray-700">
          <div><span class="font-semibold text-gray-900">组合：</span>CPC 引流 + 测评推文 + UTM 追踪 + 数据对账</div>
          <div><span class="font-semibold text-gray-900">指标：</span>有效点击、注册、试用线索、渠道表现</div>
          <div><span class="font-semibold text-gray-900">适合周期：</span>2 周起跑 / 可持续调优</div>
        </div>
      </article>

      <article class="rounded-xl border border-amber-200 bg-amber-50/70 p-5">
        <div class="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-amber-800">方案 03</div>
        <h3 class="mt-3 text-lg font-bold text-gray-900">长期资产包</h3>
        <p class="mt-2 text-sm leading-6 text-gray-700">
          适合高 LTV、订阅、分佣或出海场景。把内容、站点、社群和搜索占位做成长期可复用的转化资产。
        </p>
        <div class="mt-4 space-y-2 text-sm text-gray-700">
          <div><span class="font-semibold text-gray-900">组合：</span>专题内容站 + 社群承接 + GEO / SEO + 分佣联运</div>
          <div><span class="font-semibold text-gray-900">指标：</span>自然流量、咨询、成交归因、复购线索</div>
          <div><span class="font-semibold text-gray-900">适合周期：</span>3 个月以上长期协同</div>
        </div>
      </article>
    </div>

    <!-- Desktop table (md+) -->
    <div class="mt-6 hidden md:block overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table class="min-w-full divide-y divide-slate-200 text-left text-sm table-fixed">
        <colgroup>
          <col class="w-[17%]" />
          <col class="w-[22%]" />
          <col class="w-[27%]" />
          <col class="w-[22%]" />
          <col class="w-[12%]" />
        </colgroup>
        <thead class="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
          <tr>
            <th class="px-4 py-3 font-semibold">服务</th>
            <th class="px-4 py-3 font-semibold">适合场景</th>
            <th class="px-4 py-3 font-semibold">报价 & 起步</th>
            <th class="px-4 py-3 font-semibold">核心指标 / 资产</th>
            <th class="px-4 py-3 font-semibold whitespace-nowrap">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <!-- 推文 -->
          <tr class="hover:bg-slate-50/60">
            <td class="px-4 py-4 align-top">
              <div class="inline-flex items-center gap-2 font-semibold text-gray-900">
                <span>✍️</span><span>推文服务</span>
              </div>
              <div class="mt-1.5"><span class="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-700">单次交付</span></div>
              <div class="mt-1.5 text-xs text-gray-500">多平台同发</div>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">
              <div>想要快速曝光、内容种草和品牌心智</div>
              <div class="mt-1.5 text-xs text-gray-500 leading-5">掘金 / 知乎 / 小红书 / 公众号 / X 等多平台同时分发</div>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">
              <div class="font-semibold text-gray-900">起步 ¥500 / 篇</div>
              <div class="mt-1.5 space-y-0.5">
                <div>直发 ¥500–1k／篇</div>
                <div>简单测评 ¥1k–1.5k／篇</div>
                <div>研发测评 ¥3k–5k／篇</div>
              </div>
              <div class="mt-1.5 text-xs text-gray-500">按博主层级 / 粉丝量浮动</div>
              <div class="mt-2.5 pt-2 border-t border-dashed border-slate-200 text-xs text-slate-500"><span class="text-slate-400 mr-0.5">⏱</span>单篇起 / 可排期</div>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">
              <div>阅读量、关注转化、品牌可信度</div>
              <div class="mt-1.5 text-xs text-gray-500 leading-5">沉淀：原帖链接 + 平台权重</div>
            </td>
            <td class="px-4 py-4 align-top">
              <div class="flex flex-col gap-1.5 text-sm">
                <router-link to="/tob/services/tweet" class="font-medium text-indigo-700 hover:underline whitespace-nowrap">专项介绍 →</router-link>
                <router-link to="/cases/tweet" class="font-medium text-slate-600 hover:text-indigo-700 hover:underline whitespace-nowrap">查看案例 →</router-link>
              </div>
            </td>
          </tr>

          <!-- 引流 -->
          <tr class="hover:bg-slate-50/60">
            <td class="px-4 py-4 align-top">
              <div class="inline-flex items-center gap-2 font-semibold text-gray-900">
                <span>🔗</span><span>引流服务</span>
              </div>
              <div class="mt-1.5"><span class="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">按效果 · CPC</span></div>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">想要可量化点击、注册和试用线索</td>
            <td class="px-4 py-4 align-top text-gray-700">
              <div class="font-semibold text-gray-900">起步 ¥1 / 有效点击</div>
              <div class="mt-1.5">CPC ¥1–10 / 有效点击</div>
              <div class="mt-1.5 text-xs text-gray-500 leading-5">AI / 出海类偏高，国内通用工具偏低；按品类与结算口径浮动</div>
              <div class="mt-2.5 pt-2 border-t border-dashed border-slate-200 text-xs text-slate-500"><span class="text-slate-400 mr-0.5">⏱</span>建议 ≥ 2 周</div>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">
              <div>点击量、注册量、试用线索</div>
              <div class="mt-1.5 text-xs text-gray-500 leading-5">沉淀：UTM 追踪数据</div>
            </td>
            <td class="px-4 py-4 align-top">
              <div class="flex flex-col gap-1.5 text-sm">
                <router-link to="/tob/services/cpc" class="font-medium text-indigo-700 hover:underline whitespace-nowrap">专项介绍 →</router-link>
                <router-link to="/cases/cpc" class="font-medium text-slate-600 hover:text-indigo-700 hover:underline whitespace-nowrap">查看案例 →</router-link>
              </div>
            </td>
          </tr>

          <!-- 社群 -->
          <tr class="hover:bg-slate-50/60">
            <td class="px-4 py-4 align-top">
              <div class="inline-flex items-center gap-2 font-semibold text-gray-900">
                <span>👥</span><span>社群服务</span>
              </div>
              <div class="mt-1.5"><span class="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[11px] font-medium text-blue-700">项目制交付</span></div>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">想要长期私域沉淀和稳定开发者关系</td>
            <td class="px-4 py-4 align-top text-gray-700">
              <div class="font-semibold text-gray-900">起步 ¥2k / 项目</div>
              <div class="mt-1.5 space-y-0.5">
                <div>社群宣发 ¥2k–1w／项目</div>
                <div>建群项目 ¥3k–3w</div>
              </div>
              <div class="mt-1.5 text-xs text-gray-500 leading-5">按社群规模、活跃节奏与运营深度浮动</div>
              <div class="mt-2.5 pt-2 border-t border-dashed border-slate-200 text-xs text-slate-500"><span class="text-slate-400 mr-0.5">⏱</span>按项目排期 · 建群项目一般 2–6 周</div>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">
              <div>入群人数、活跃度、长期触达资产</div>
              <div class="mt-1.5 text-xs text-gray-500 leading-5">沉淀：专属社群 / 私域用户池</div>
            </td>
            <td class="px-4 py-4 align-top">
              <div class="flex flex-col gap-1.5 text-sm">
                <router-link to="/tob/services/community" class="font-medium text-indigo-700 hover:underline whitespace-nowrap">专项介绍 →</router-link>
                <router-link to="/cases/community" class="font-medium text-slate-600 hover:text-indigo-700 hover:underline whitespace-nowrap">查看案例 →</router-link>
              </div>
            </td>
          </tr>

          <!-- 分组分隔行：长期联运专题 -->
          <tr class="bg-amber-50/40">
            <td colspan="5" class="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-amber-800">
              <span class="inline-flex items-center gap-2">
                <span class="inline-block h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                以下为长期联运专题 · 由联盟方搭建内容 / 站点 / 仓库 / 社群资产，按成交分佣
              </span>
            </td>
          </tr>

          <!-- AI Access -->
          <tr class="hover:bg-slate-50/60">
            <td class="px-4 py-4 align-top">
              <div class="inline-flex items-center gap-2 font-semibold text-gray-900">
                <span>🤖</span><span>AI Access</span>
              </div>
              <div class="mt-1.5"><span class="inline-flex items-center rounded-full bg-amber-100 border border-amber-200 px-2.5 py-0.5 text-[11px] font-medium text-amber-800">联运分佣</span></div>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">
              <div>境外大模型 / AI SaaS 订阅承接</div>
              <div class="mt-1.5 text-xs text-gray-500 leading-5">聚焦 ChatGPT / Claude 等订阅类工具</div>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">
              <div class="font-semibold text-gray-900">零硬投入 · 按成交分佣</div>
              <div class="mt-1.5">参考 30%–60% / 笔</div>
              <div class="mt-1.5 text-xs text-gray-500 leading-5">按品类、客单价、复购周期浮动</div>
              <div class="mt-2.5 pt-2 border-t border-dashed border-slate-200 text-xs text-slate-500"><span class="text-slate-400 mr-0.5">⏱</span>建议 ≥ 3 个月</div>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">
              <div>高 LTV 长期转化</div>
              <div class="mt-1.5 text-xs text-gray-500 leading-5">沉淀：AI 站点矩阵 + 仓库 SEO + 社群</div>
            </td>
            <td class="px-4 py-4 align-top">
              <div class="flex flex-col gap-1.5 text-sm">
                <router-link to="/tob/services/ai-access" class="font-medium text-indigo-700 hover:underline whitespace-nowrap">专项介绍 →</router-link>
                <router-link to="/cases/ai-access" class="font-medium text-slate-600 hover:text-indigo-700 hover:underline whitespace-nowrap">查看案例 →</router-link>
              </div>
            </td>
          </tr>

          <!-- 出海云访问 -->
          <tr class="hover:bg-slate-50/60">
            <td class="px-4 py-4 align-top">
              <div class="inline-flex items-center gap-2 font-semibold text-gray-900">
                <span>🌐</span><span>出海云访问</span>
              </div>
              <div class="mt-1.5"><span class="inline-flex items-center rounded-full bg-amber-100 border border-amber-200 px-2.5 py-0.5 text-[11px] font-medium text-amber-800">联运分佣</span></div>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">
              <div>云服务 / 节点 / 跨境办公出海推广</div>
              <div class="mt-1.5 text-xs text-gray-500 leading-5">聚焦真实节点测速 + 出海团队场景教程</div>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">
              <div class="font-semibold text-gray-900">零硬投入 · 按成交分佣</div>
              <div class="mt-1.5">参考 30%–60% / 笔</div>
              <div class="mt-1.5 text-xs text-gray-500 leading-5">仅承接合规面向出海 / 跨境场景</div>
              <div class="mt-2.5 pt-2 border-t border-dashed border-slate-200 text-xs text-slate-500"><span class="text-slate-400 mr-0.5">⏱</span>建议 ≥ 3 个月</div>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">
              <div>高 LTV 长期转化</div>
              <div class="mt-1.5 text-xs text-gray-500 leading-5">沉淀：教程站 + 对比导航 + 出海社群</div>
            </td>
            <td class="px-4 py-4 align-top">
              <div class="flex flex-col gap-1.5 text-sm">
                <router-link to="/tob/services/oversea-cloud" class="font-medium text-indigo-700 hover:underline whitespace-nowrap">专项介绍 →</router-link>
                <router-link to="/cases/oversea-cloud" class="font-medium text-slate-600 hover:text-indigo-700 hover:underline whitespace-nowrap">查看案例 →</router-link>
              </div>
            </td>
          </tr>

          <!-- 大厂云服务 -->
          <tr class="hover:bg-slate-50/60">
            <td class="px-4 py-4 align-top">
              <div class="inline-flex items-center gap-2 font-semibold text-gray-900">
                <span>☁️</span><span>大厂云服务</span>
              </div>
              <div class="mt-1.5"><span class="inline-flex items-center rounded-full bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-medium text-emerald-800">渠道服务</span></div>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">
              <div>个人 / 小团队 / 企业 · 联盟即云厂商官方渠道</div>
              <div class="mt-1.5 text-xs text-gray-500 leading-5">专属充值链接 + 按量返利 + 账单体检</div>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">
              <div class="font-semibold text-gray-900">官方充值 · 按量返利</div>
              <div class="mt-1.5">用多少返多少 · 用量越大阶梯越高</div>
              <div class="mt-1.5 text-xs text-gray-500 leading-5">面向有真实云采购 / 续费需求的团队</div>
              <div class="mt-2.5 pt-2 border-t border-dashed border-slate-200 text-xs text-slate-500"><span class="text-slate-400 mr-0.5">⏱</span>长期有效</div>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">
              <div>云消费归因 + 返利阶梯</div>
              <div class="mt-1.5 text-xs text-gray-500 leading-5">沉淀：官方充值链接 + 渠道返利政策</div>
            </td>
            <td class="px-4 py-4 align-top">
              <div class="flex flex-col gap-1.5 text-sm">
                <router-link to="/tob/services/cloud-cost" class="font-medium text-indigo-700 hover:underline whitespace-nowrap">渠道说明 →</router-link>
                <router-link to="/cases/enterprise-cloud" class="font-medium text-slate-600 hover:text-indigo-700 hover:underline whitespace-nowrap">查看案例 →</router-link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile cards (below md) -->
    <div class="mt-6 md:hidden space-y-3">
      <div
        v-for="row in mobileRows"
        :key="row.title"
        class="rounded-xl border border-slate-200 bg-white p-4"
        :class="row.theme === 'special' ? 'border-amber-200 bg-amber-50/30' : row.theme === 'channel' ? 'border-emerald-200 bg-emerald-50/30' : ''"
      >
        <div class="flex items-center justify-between gap-3">
          <div>
            <div class="inline-flex items-center gap-2 font-semibold text-gray-900">
              <span>{{ row.icon }}</span><span>{{ row.title }}</span>
            </div>
            <div v-if="row.subtitle" class="mt-0.5 text-xs text-gray-500">{{ row.subtitle }}</div>
          </div>
          <span
            class="inline-flex items-center justify-center rounded-full px-2.5 py-1 text-[11px] font-medium whitespace-nowrap"
            :class="row.modeClass"
          >{{ row.mode }}</span>
        </div>
        <div class="mt-2 text-sm text-gray-700">{{ row.scene }}</div>
        <div v-if="row.sceneNote" class="text-xs text-gray-500">{{ row.sceneNote }}</div>

        <div class="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
          <div>
            <div class="text-gray-500">起步</div>
            <div class="mt-0.5 font-semibold text-gray-900">{{ row.startsAt }}</div>
          </div>
          <div>
            <div class="text-gray-500">起投周期</div>
            <div class="mt-0.5 text-gray-800">{{ row.cycle }}</div>
          </div>
        </div>

        <div class="mt-3 text-xs text-gray-700">
          <div class="text-gray-500">报价范围</div>
          <div v-for="line in row.priceLines" :key="line" class="mt-0.5">{{ line }}</div>
          <div v-if="row.priceNote" class="mt-1 text-gray-500">{{ row.priceNote }}</div>
        </div>

        <div class="mt-3 text-xs text-gray-700">
          <div class="text-gray-500">核心指标 / 资产</div>
          <div class="mt-0.5">{{ row.metrics }}</div>
          <div v-if="row.asset" class="mt-0.5 text-gray-500">沉淀：{{ row.asset }}</div>
        </div>

        <div class="mt-4 flex flex-wrap gap-3 text-sm">
          <router-link :to="row.detailTo" class="font-medium text-indigo-700 hover:underline">{{ row.detailLabel || '专项介绍 →' }}</router-link>
          <a
            v-if="row.caseTo?.startsWith('http')"
            :href="row.caseTo"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium text-emerald-700 hover:underline"
          >联运落地页 →</a>
          <router-link v-else :to="row.caseTo" class="font-medium text-indigo-700 hover:underline">查看案例 →</router-link>
        </div>
      </div>
    </div>

    <!-- Decision helper -->
    <div class="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-gray-600">
      <div class="rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2.5">
        <div class="font-semibold text-slate-700 mb-1">按目标选</div>
        一次性发声 → 推文；持续要点击 / 线索 → 引流；长期沉淀 → 社群；云采购官方渠道 → 大厂云服务；长期高提成 → AI Access / 出海云。
      </div>
      <div class="rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2.5">
        <div class="font-semibold text-slate-700 mb-1">按预算选</div>
        零硬投入 → 专题联运分佣；云采购走官方渠道 → 大厂云服务；项目预算可控 → 社群；效果结算 → CPC；单次预算 → 推文。
      </div>
      <div class="rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2.5">
        <div class="font-semibold text-slate-700 mb-1">按周期选</div>
        单篇 / 排期 → 推文；2 周到几个月 → 引流 / 社群；3 个月以上长期协同 → 专题联运；云采购渠道 → 大厂云服务（长期有效）。
      </div>
    </div>

    <!-- Primary CTA -->
    <div class="mt-5 rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div class="text-sm leading-7 text-gray-700">
        <span class="font-semibold text-gray-900">选好了想直接询价？</span>
        右下角浮动「我要合作」扫码加微信
        <span class="font-mono text-indigo-700">atar24</span>
        ，备注预算 / 品类 / 目标，1 个工作日内给方案。
      </div>
      <div class="flex flex-wrap gap-2 shrink-0">
        <router-link to="/cases" class="inline-flex items-center justify-center rounded-full bg-white border border-indigo-200 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50">先看案例</router-link>
        <router-link to="/tob/services" class="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">服务总入口 →</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  sectionId: {
    type: String,
    default: 'overview'
  }
})

const modeClassMap = {
  regular: 'bg-slate-100 text-slate-700',
  effect: 'bg-emerald-50 border border-emerald-200 text-emerald-700',
  project: 'bg-blue-50 border border-blue-200 text-blue-700',
  affiliate: 'bg-amber-100 border border-amber-200 text-amber-800'
}

const mobileRows = [
  {
    icon: '✍️',
    title: '推文服务',
    subtitle: '多平台同发',
    mode: '单次交付',
    modeClass: modeClassMap.regular,
    theme: 'regular',
    scene: '想要快速曝光、内容种草和品牌心智',
    sceneNote: '掘金 / 知乎 / 小红书 / 公众号 / X 等多平台同时分发',
    startsAt: '¥500 / 篇',
    cycle: '单篇起 / 可排期',
    priceLines: [
      '直发 ¥500–1k／篇',
      '简单测评 ¥1k–1.5k／篇',
      '研发测评 ¥3k–5k／篇'
    ],
    priceNote: '按博主层级 / 粉丝量浮动',
    metrics: '阅读量、关注转化、品牌可信度',
    asset: '原帖链接 + 平台权重',
    detailTo: '/tob/services/tweet',
    caseTo: '/cases/tweet'
  },
  {
    icon: '🔗',
    title: '引流服务',
    mode: '按效果 · CPC',
    modeClass: modeClassMap.effect,
    theme: 'regular',
    scene: '想要可量化点击、注册和试用线索',
    startsAt: '¥1 / 有效点击',
    cycle: '建议 ≥ 2 周',
    priceLines: ['CPC ¥1–10 / 有效点击'],
    priceNote: 'AI / 出海类偏高，国内通用工具偏低；按品类与结算口径浮动',
    metrics: '点击量、注册量、试用线索',
    asset: 'UTM 追踪数据',
    detailTo: '/tob/services/cpc',
    caseTo: '/cases/cpc'
  },
  {
    icon: '👥',
    title: '社群服务',
    mode: '项目制交付',
    modeClass: modeClassMap.project,
    theme: 'regular',
    scene: '想要长期私域沉淀和稳定开发者关系',
    startsAt: '¥2k / 项目',
    cycle: '按项目排期 · 建群项目一般 2–6 周',
    priceLines: [
      '社群宣发 ¥2k–1w／项目',
      '建群项目 ¥3k–3w'
    ],
    priceNote: '按社群规模、活跃节奏与运营深度浮动',
    metrics: '入群人数、活跃度、长期触达资产',
    asset: '专属社群 / 私域用户池',
    detailTo: '/tob/services/community',
    caseTo: '/cases/community'
  },
  {
    icon: '🤖',
    title: 'AI Access',
    mode: '联运分佣',
    modeClass: modeClassMap.affiliate,
    theme: 'special',
    scene: '境外大模型 / AI SaaS 订阅承接',
    sceneNote: '聚焦 ChatGPT / Claude 等订阅类工具',
    startsAt: '零硬投入',
    cycle: '建议 ≥ 3 个月',
    priceLines: ['分佣 30%–60% / 笔', '按成交结算'],
    priceNote: '按品类、客单价、复购周期浮动',
    metrics: '高 LTV 长期转化',
    asset: 'AI 站点矩阵 + 仓库 SEO + 社群',
    detailTo: '/tob/services/ai-access',
    caseTo: '/cases/ai-access'
  },
  {
    icon: '🌐',
    title: '出海云访问',
    mode: '联运分佣',
    modeClass: modeClassMap.affiliate,
    theme: 'special',
    scene: '云服务 / 节点 / 跨境办公出海推广',
    sceneNote: '聚焦真实节点测速 + 出海团队场景教程',
    startsAt: '零硬投入',
    cycle: '建议 ≥ 3 个月',
    priceLines: ['分佣 30%–60% / 笔', '按成交结算'],
    priceNote: '仅承接合规面向出海 / 跨境场景',
    metrics: '高 LTV 长期转化',
    asset: '教程站 + 对比导航 + 出海社群',
    detailTo: '/tob/services/oversea-cloud',
    caseTo: '/cases/oversea-cloud'
  },
  {
    icon: '☁️',
    title: '大厂云服务',
    mode: '渠道服务',
    modeClass: 'bg-emerald-100 border border-emerald-200 text-emerald-800',
    theme: 'channel',
    scene: '个人 / 小团队 / 企业 · 联盟即云厂商官方渠道',
    sceneNote: '专属充值链接 + 按量返利 + 账单体检',
    startsAt: '官方渠道价',
    cycle: '长期有效',
    priceLines: ['用多少消费 · 返多少', '用量越大 · 返利阶梯越高'],
    priceNote: '面向有真实云采购 / 续费需求',
    metrics: '云消费归因 + 返利阶梯',
    asset: '官方充值链接 + 渠道返利政策',
    detailTo: '/tob/services/cloud-cost',
    detailLabel: '渠道说明 →',
    caseTo: '/cases/enterprise-cloud'
  }
]
</script>
