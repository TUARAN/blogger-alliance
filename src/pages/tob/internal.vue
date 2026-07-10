<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <AppNav />

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div class="mb-5 md:mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">数据台账</h1>
          <p class="mt-2 text-sm md:text-base text-gray-600">
            合作进度、数据报告与年度总览统一查看。数据由本地 <code class="px-1 rounded bg-white/70">data/ledger</code> 维护后同步，此处只读。
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <router-link
            v-if="isUnlocked"
            to="/annual-report-2025"
            class="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-orange-200 bg-orange-50 text-sm font-semibold text-orange-700 hover:bg-orange-100"
          >
            <span>📈</span>
            <span>查看 2025 年度总览</span>
          </router-link>
          <button
            v-if="isUnlocked"
            class="h-9 px-3 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
            :disabled="isRefreshing"
            @click="refreshAll"
          >
            {{ isRefreshing ? '加载中...' : '刷新数据' }}
          </button>
        </div>
      </div>

      <div
        v-if="authLoading || isBootstrapping"
        class="rounded-2xl border border-indigo-100 bg-white p-6 text-sm text-slate-600"
      >
        正在验证账号权限并加载台账...
      </div>

      <div
        v-else-if="!isInternal"
        class="rounded-2xl border border-amber-200 bg-amber-50 p-5 md:p-6"
      >
        <h2 class="text-lg font-semibold text-amber-950 mb-2">{{ AUTH_COPY.internalAccessDeniedTitle }}</h2>
        <p class="text-sm text-amber-800 mb-3">
          {{ AUTH_COPY.internalAccessDeniedBody }}
        </p>
        <router-link
          to="/workspace"
          class="inline-flex h-10 items-center rounded-lg bg-amber-700 px-4 text-sm font-semibold text-white hover:bg-amber-800"
        >
          返回联盟入口
        </router-link>
      </div>

      <div
        v-else-if="bootstrapError"
        class="rounded-2xl border border-red-200 bg-red-50 p-5 md:p-6"
      >
        <h2 class="text-lg font-semibold text-red-900 mb-2">加载失败</h2>
        <p class="text-sm text-red-700">{{ bootstrapError }}</p>
      </div>

      <!-- Unified ledger -->
      <template v-else-if="isUnlocked">
        <!-- Stats summary -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
          <div class="rounded-xl border border-indigo-100 bg-white px-4 py-3">
            <p class="text-xs text-gray-500">合作数</p>
            <p class="mt-1 text-xl font-bold text-indigo-700 tabular-nums">{{ filteredDeals.length }}</p>
          </div>
          <div class="rounded-xl border border-indigo-100 bg-white px-4 py-3">
            <p class="text-xs text-gray-500">报告数</p>
            <p class="mt-1 text-xl font-bold text-indigo-700 tabular-nums">{{ filteredReportsCount }}</p>
          </div>
          <div class="rounded-xl border border-indigo-100 bg-white px-4 py-3">
            <p class="text-xs text-gray-500">总阅读</p>
            <p class="mt-1 text-xl font-bold text-teal-700 tabular-nums">{{ formatNumber(filteredStats.reads) }}</p>
          </div>
          <div class="rounded-xl border border-indigo-100 bg-white px-4 py-3">
            <p class="text-xs text-gray-500">总点赞</p>
            <p class="mt-1 text-xl font-bold text-rose-700 tabular-nums">{{ formatNumber(filteredStats.likes) }}</p>
          </div>
          <div class="rounded-xl border border-indigo-100 bg-white px-4 py-3">
            <p class="text-xs text-gray-500">互动 (评+转+收)</p>
            <p class="mt-1 text-xl font-bold text-violet-700 tabular-nums">
              {{ formatNumber(filteredStats.comments + filteredStats.shares + filteredStats.favorites) }}
            </p>
          </div>
        </div>

        <!-- Toolbar -->
        <div class="rounded-2xl border border-indigo-100 bg-white shadow-sm p-4 md:p-5 mb-5">
          <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">服务类型</label>
              <select v-model="serviceFilter" class="w-full h-9 px-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="all">全部服务</option>
                <option v-for="item in serviceOptions" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">当前进度</label>
              <select v-model="progressFilter" class="w-full h-9 px-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="all">全部状态</option>
                <option v-for="item in progressOptions" :key="item.value" :value="item.value">{{ item.label }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">年份</label>
              <select v-model="yearFilter" class="w-full h-9 px-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="all">全部年份</option>
                <option v-for="item in yearOptions" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="block text-xs text-gray-500 mb-1">关键词（合作编码 / 品牌 / 服务 / 备注 / 报告）</label>
              <input
                v-model="keyword"
                type="text"
                placeholder="输入任意关键词筛选合作与报告"
                class="w-full h-9 px-3 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
            </div>
          </div>

          <div class="mt-4 flex flex-wrap items-center gap-2">
            <!-- 结算解锁：仅 owner(admin) 可用；密码短语只活在内存 -->
            <button
              v-if="isAdmin && !settlementUnlocked"
              class="h-9 px-4 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700"
              @click="openUnlock"
            >
              🔓 解锁结算
            </button>
            <button
              v-if="isAdmin && settlementUnlocked"
              class="h-9 px-4 rounded-lg border border-amber-300 bg-amber-50 text-amber-800 text-sm font-semibold hover:bg-amber-100"
              @click="lockSettlement"
            >
              🔒 锁定结算（{{ settlementMap.size }} 条已解密）
            </button>
            <span v-if="!isAdmin" class="inline-flex items-center h-9 px-3 rounded-lg bg-slate-100 text-xs text-slate-500">
              🔒 结算金额仅 owner 可解密查看
            </span>
            <button
              class="h-9 px-3 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
              @click="copyAsTable"
            >
              复制为表格
            </button>
            <span v-if="toolbarMessage" class="text-xs text-emerald-700">{{ toolbarMessage }}</span>
            <span v-if="toolbarError" class="text-xs text-red-600">{{ toolbarError }}</span>
          </div>
        </div>

        <!-- Main ledger table -->
        <div class="rounded-2xl border border-indigo-100 bg-white shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full text-sm">
              <thead class="bg-indigo-50/80 text-gray-700">
                <tr>
                  <th class="w-10 px-2 py-3"></th>
                  <th class="px-3 py-3 text-left text-xs font-semibold">合作编码</th>
                  <th class="px-3 py-3 text-left text-xs font-semibold">品牌 / 项目</th>
                  <th class="px-3 py-3 text-left text-xs font-semibold">合作内容</th>
                  <th class="px-3 py-3 text-left text-xs font-semibold">当前进度</th>
                  <th class="px-3 py-3 text-left text-xs font-semibold">推荐人</th>
                  <th class="px-3 py-3 text-left text-xs font-semibold">承接人</th>
                  <th class="px-3 py-3 text-left text-xs font-semibold">最近沟通</th>
                  <th class="px-3 py-3 text-left text-xs font-semibold">结算</th>
                  <th class="px-3 py-3 text-center text-xs font-semibold">报告</th>
                  <th class="px-3 py-3 text-center text-xs font-semibold">操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(deal, idx) in filteredDeals" :key="deal.id || `deal-${idx}`">
                  <tr class="border-t border-gray-100 hover:bg-gray-50/70">
                    <td class="px-2 py-3 text-center align-top">
                      <button
                        v-if="dealReports(deal).length > 0"
                        class="text-indigo-600 hover:text-indigo-800 text-sm"
                        @click="toggleExpanded(deal.id)"
                      >
                        {{ isExpanded(deal.id) ? '▾' : '▸' }}
                      </button>
                      <span v-else class="text-gray-300 text-sm">·</span>
                    </td>
                    <td class="px-3 py-3 align-top font-mono text-xs font-semibold text-slate-800 whitespace-nowrap">
                      {{ deal.id }}
                      <span v-if="deal.reportCooperationId && deal.reportCooperationId !== deal.id" class="block text-[10px] text-slate-500 font-normal mt-0.5">
                        ↳ 引用 {{ deal.reportCooperationId }}
                      </span>
                    </td>
                    <td class="px-3 py-3 align-top font-medium text-slate-900">{{ deal.brand }}</td>
                    <td class="px-3 py-3 align-top text-slate-700">{{ deal.service }}</td>
                    <td class="px-3 py-3 align-top">
                      <span
                        class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                        :class="progressBadgeClass(deal.progress)"
                      >
                        {{ deal.progress || '—' }}
                      </span>
                      <p v-if="deal.remark" class="mt-1 text-xs text-slate-500 leading-5">{{ deal.remark }}</p>
                    </td>
                    <td class="px-3 py-3 align-top text-slate-600 whitespace-nowrap">{{ deal.referrer || '—' }}</td>
                    <td class="px-3 py-3 align-top text-slate-600">{{ deal.owner || '—' }}</td>
                    <td class="px-3 py-3 align-top text-slate-600 font-mono text-xs whitespace-nowrap">{{ deal.updatedAt || '—' }}</td>

                    <!-- 结算列：默认打码；owner 解锁后本地解密展示 -->
                    <td class="px-3 py-3 align-top text-xs whitespace-nowrap">
                      <template v-if="!hasSettlement(deal)">
                        <span class="text-slate-300">—</span>
                      </template>
                      <template v-else-if="!isAdmin">
                        <span class="inline-flex items-center rounded bg-slate-100 px-1.5 py-0.5 text-slate-400" title="仅 owner 可解密">🔒 ••••</span>
                      </template>
                      <template v-else-if="!settlementUnlocked || !settlementMap.has(deal.id)">
                        <span class="inline-flex items-center rounded bg-amber-50 px-1.5 py-0.5 text-amber-600 font-mono">••••</span>
                      </template>
                      <template v-else>
                        <div class="space-y-0.5 font-mono text-slate-700">
                          <div v-if="settlementMap.get(deal.id).forward">前 {{ settlementMap.get(deal.id).forward }}</div>
                          <div v-if="settlementMap.get(deal.id).backward">后 {{ settlementMap.get(deal.id).backward }}</div>
                          <div v-if="settlementMap.get(deal.id).opsSupport">运 {{ settlementMap.get(deal.id).opsSupport }}</div>
                          <p
                            v-if="settlementMap.get(deal.id).detail"
                            class="font-sans text-[11px] text-slate-500 leading-5 max-w-[16rem] whitespace-pre-line"
                          >{{ settlementMap.get(deal.id).detail }}</p>
                        </div>
                      </template>
                    </td>

                    <td class="px-3 py-3 align-top text-center">
                      <span class="inline-flex items-center rounded-full bg-violet-50 px-2 py-0.5 text-xs font-semibold text-violet-700">
                        {{ dealReports(deal).length }}
                      </span>
                    </td>
                    <td class="px-3 py-3 align-top text-center whitespace-nowrap">
                      <button
                        v-if="dealReports(deal).length > 0"
                        class="text-xs text-violet-600 hover:text-violet-800"
                        @click="openDealReports(deal)"
                      >
                        查看报告
                      </button>
                      <span v-else class="text-xs text-slate-300">—</span>
                    </td>
                  </tr>

                  <!-- Expanded reports row -->
                  <tr v-if="isExpanded(deal.id) && dealReports(deal).length > 0" class="bg-indigo-50/30 border-t border-indigo-100">
                    <td></td>
                    <td colspan="10" class="px-3 py-4">
                      <div class="space-y-3">
                        <div
                          v-for="report in dealReports(deal)"
                          :key="report.id"
                          class="rounded-xl border border-violet-100 bg-white p-4"
                        >
                          <div class="flex items-start justify-between gap-3 mb-2">
                            <div class="min-w-0 flex-1">
                              <h4 class="text-sm font-semibold text-slate-900">{{ report.project }}</h4>
                              <p v-if="report.articleTitle" class="mt-0.5 text-xs text-slate-500">{{ formatArticleTitle(report.articleTitle) }}</p>
                              <div class="mt-1 flex flex-wrap gap-3 text-[11px] text-slate-500">
                                <span>执行人：<span class="text-slate-700 font-medium">{{ report.author }}</span></span>
                                <span v-if="report.period">周期：<span class="text-slate-700">{{ report.period }}</span></span>
                                <span v-if="report.platforms?.length">平台：<span class="text-slate-700">{{ report.platforms.join(' / ') }}</span></span>
                              </div>
                            </div>
                            <div class="flex shrink-0 gap-2">
                              <button class="text-xs text-violet-600 hover:text-violet-800" @click="openViewReport(report)">查看</button>
                              <router-link class="text-xs text-slate-600 hover:text-slate-800" :to="reportSharePath(report)">分享页</router-link>
                            </div>
                          </div>
                          <div class="rounded-lg bg-teal-50/70 px-3 py-2 text-xs text-teal-900">
                            {{ formatNumber(report.stats?.reads) }} 阅读 ·
                            {{ formatNumber(report.stats?.likes) }} 点赞 ·
                            {{ formatNumber(report.stats?.favorites) }} 收藏 ·
                            {{ formatNumber(report.stats?.comments) }} 评论 ·
                            {{ formatNumber(report.stats?.shares) }} 转发
                          </div>
                          <p v-if="report.content" class="mt-2 text-xs text-slate-600 leading-6 whitespace-pre-line line-clamp-6">{{ report.content }}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </template>

                <tr v-if="filteredDeals.length === 0">
                  <td colspan="11" class="px-4 py-10 text-center text-sm text-gray-500">
                    未找到匹配合作，请调整筛选条件。
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Orphan reports (no matching deal) -->
        <div v-if="orphanReports.length > 0" class="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <h3 class="text-sm font-semibold text-amber-900 mb-2">未匹配合作的报告（{{ orphanReports.length }}）</h3>
          <p class="text-xs text-amber-700 mb-3">以下报告的 cooperationId 未在合作列表中找到对应条目，建议在 data/ledger 中补全对应合作或修正报告。</p>
          <div class="space-y-2">
            <div
              v-for="report in orphanReports"
              :key="report.id"
              class="flex items-center justify-between gap-3 rounded-lg bg-white border border-amber-100 px-3 py-2 text-xs"
            >
              <div class="min-w-0">
                <span class="font-mono font-semibold text-slate-800">{{ report.cooperationId || '（空）' }}</span>
                <span class="mx-2 text-slate-400">·</span>
                <span class="text-slate-700">{{ report.project }} / {{ report.author }}</span>
              </div>
              <div class="shrink-0 flex items-center gap-3">
                <button class="text-violet-600 hover:text-violet-800" @click="openViewReport(report)">查看</button>
                <router-link class="text-slate-600 hover:text-slate-800" :to="reportSharePath(report)">分享页</router-link>
              </div>
            </div>
          </div>
        </div>
      </template>
    </section>

    <!-- 结算解锁弹窗（仅 owner） -->
    <div
      v-if="unlockModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4"
      @click.self="closeUnlock"
    >
      <div class="w-full max-w-sm rounded-2xl bg-white shadow-2xl p-5" role="dialog" aria-modal="true" aria-label="解锁结算">
        <h3 class="text-base font-bold text-slate-900">解锁结算金额</h3>
        <p class="mt-1 text-xs text-slate-500 leading-5">
          输入结算密码短语，仅在本浏览器内存中解密，不会上传、不会保存。关闭页面或点「锁定结算」即清除。
        </p>
        <form @submit.prevent="submitUnlock">
          <input
            ref="passphraseInputRef"
            v-model="passphraseInput"
            type="password"
            autocomplete="off"
            placeholder="结算密码短语"
            class="mt-3 w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
          <p v-if="unlockError" class="mt-2 text-xs text-red-600">{{ unlockError }}</p>
          <div class="mt-4 flex justify-end gap-2">
            <button
              type="button"
              class="h-9 px-3 rounded-lg border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50"
              @click="closeUnlock"
            >
              取消
            </button>
            <button
              type="submit"
              class="h-9 px-4 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 disabled:opacity-60"
              :disabled="isUnlocking || !passphraseInput"
            >
              {{ isUnlocking ? '解密中...' : '解锁' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 报告查看弹窗（只读） -->
    <div
      v-if="reportViewerOpen && viewingReports.length"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4"
      @click.self="closeViewReport"
    >
      <div
        ref="reportViewerDialogRef"
        role="dialog"
        aria-modal="true"
        :aria-label="viewingReportsTitle"
        tabindex="-1"
        class="w-full max-w-4xl max-h-[85dvh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        @keydown.esc="closeViewReport"
      >
        <div class="sticky top-0 flex items-start justify-between gap-4 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur">
          <div class="min-w-0">
            <p class="text-xs font-medium uppercase tracking-wide text-violet-600">数据报告</p>
            <h3 class="mt-1 text-lg font-bold text-slate-900">{{ viewingReportsTitle }}</h3>
            <p v-if="viewingReports.length === 1 && viewingReports[0].articleTitle" class="mt-1 text-sm text-slate-500">{{ formatArticleTitle(viewingReports[0].articleTitle) }}</p>
          </div>
          <div class="shrink-0 flex items-center gap-2">
            <button
              v-if="viewingReports.length === 1"
              class="min-h-11 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              @click="copyViewingReportShareLink"
            >
              分享链接
            </button>
            <router-link
              v-if="viewingReports.length === 1"
              class="inline-flex min-h-11 items-center rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              :to="reportSharePath(viewingReports[0])"
            >
              打开分享页
            </router-link>
            <button
              v-if="viewingReports.length === 1"
              class="min-h-11 rounded-lg border border-violet-200 bg-violet-50 px-3 py-1.5 text-sm font-medium text-violet-700 hover:bg-violet-100"
              @click="exportViewingReportPdf"
            >
              导出 PDF
            </button>
            <button class="min-h-11 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50" @click="closeViewReport">
              关闭
            </button>
          </div>
        </div>

        <div class="space-y-4 px-5 py-4">
          <section
            v-for="(report, index) in viewingReports"
            :key="report.id || index"
            class="rounded-2xl border border-slate-200 bg-white px-4 py-4"
          >
            <div v-if="viewingReports.length > 1" class="mb-4 border-b border-slate-100 pb-3">
              <p class="text-xs font-medium text-violet-600">报告 {{ index + 1 }}</p>
              <h4 class="mt-1 text-base font-bold text-slate-900">{{ report.project || report.title || '未命名报告' }}</h4>
              <p v-if="report.articleTitle" class="mt-1 text-sm text-slate-500">{{ formatArticleTitle(report.articleTitle) }}</p>
            </div>

            <div class="mb-4 flex flex-wrap items-center gap-2">
              <button
                class="min-h-10 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                @click="copyReportShareLink(report)"
              >
                分享链接
              </button>
              <router-link
                class="inline-flex min-h-10 items-center rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                :to="reportSharePath(report)"
              >
                打开分享页
              </router-link>
              <button
                class="min-h-10 rounded-lg border border-violet-200 bg-violet-50 px-3 py-1.5 text-sm font-medium text-violet-700 hover:bg-violet-100"
                @click="exportReportPdf(report)"
              >
                导出 PDF
              </button>
            </div>

            <div class="flex flex-wrap gap-4 text-sm text-slate-600">
              <span>报告 ID：<span class="font-mono text-slate-800">{{ report.id || '—' }}</span></span>
              <span>合作编码：<span class="font-mono text-slate-800">{{ report.cooperationId || '—' }}</span></span>
              <span>执行人：<span class="text-slate-800">{{ report.author || '—' }}</span></span>
              <span v-if="report.period">周期：<span class="text-slate-800">{{ report.period }}</span></span>
            </div>

            <div v-if="report.platforms?.length" class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="platform in report.platforms"
                :key="`${report.id || index}-${platform}`"
                class="inline-flex items-center rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700"
              >
                {{ platform }}
              </span>
            </div>

            <div class="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
              <div class="rounded-xl bg-teal-50 px-3 py-3">
                <p class="text-xs text-teal-700">阅读</p>
                <p class="mt-1 text-lg font-semibold text-teal-900">{{ formatNumber(report.stats?.reads) }}</p>
              </div>
              <div class="rounded-xl bg-rose-50 px-3 py-3">
                <p class="text-xs text-rose-700">点赞</p>
                <p class="mt-1 text-lg font-semibold text-rose-900">{{ formatNumber(report.stats?.likes) }}</p>
              </div>
              <div class="rounded-xl bg-amber-50 px-3 py-3">
                <p class="text-xs text-amber-700">收藏</p>
                <p class="mt-1 text-lg font-semibold text-amber-900">{{ formatNumber(report.stats?.favorites) }}</p>
              </div>
              <div class="rounded-xl bg-sky-50 px-3 py-3">
                <p class="text-xs text-sky-700">评论</p>
                <p class="mt-1 text-lg font-semibold text-sky-900">{{ formatNumber(report.stats?.comments) }}</p>
              </div>
              <div class="rounded-xl bg-fuchsia-50 px-3 py-3">
                <p class="text-xs text-fuchsia-700">转发</p>
                <p class="mt-1 text-lg font-semibold text-fuchsia-900">{{ formatNumber(report.stats?.shares) }}</p>
              </div>
            </div>

            <div class="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <p class="mb-2 text-sm font-semibold text-slate-900">报告正文</p>
              <p class="whitespace-pre-line text-sm leading-7 text-slate-700">{{ report.content || '暂无正文。' }}</p>
              <figure v-if="getReportEvidenceImage(report)" class="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
                <img
                  :src="getReportEvidenceImage(report).src"
                  :alt="getReportEvidenceImage(report).alt"
                  class="w-full object-contain"
                >
                <figcaption class="border-t border-slate-200 px-4 py-2 text-xs text-slate-500">{{ getReportEvidenceImage(report).caption }}</figcaption>
              </figure>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import AppNav from '../../components/AppNav.vue'
import { useAuth } from '../../composables/useAuth.js'
import { AUTH_COPY } from '../../utils/authMessages.js'
import {
  explainInternalDataError,
  fetchCommercialDeals,
  fetchPromotionReports
} from '../../utils/internalDataApi'
import { decryptDealsSettlement, isEncryptedSettlement } from '../../utils/settlementCrypto.js'

const { initAuth, isInternal, isAdmin, getAccessToken, loading: authLoading } = useAuth()

const deals = ref([])
const reports = ref([])
const accessToken = ref('')
const isUnlocked = ref(false)
const isBootstrapping = ref(false)
const bootstrapError = ref('')
const isRefreshing = ref(false)

const serviceFilter = ref('all')
const progressFilter = ref('all')
const yearFilter = ref('all')
const keyword = ref('')

const expanded = reactive(new Set())
const toolbarMessage = ref('')
const toolbarError = ref('')
let toolbarTimer = null

// ---- 结算解锁（仅 owner，明文只活在内存） ----
const settlementUnlocked = ref(false)
const settlementMap = reactive(new Map())
const unlockModalOpen = ref(false)
const passphraseInput = ref('')
const unlockError = ref('')
const isUnlocking = ref(false)
const passphraseInputRef = ref(null)

const reportViewerOpen = ref(false)
const viewingReport = ref(null)
const viewingReports = ref([])
const reportViewerDialogRef = ref(null)
let previousBodyOverflow = ''

const reportEvidenceImages = {
  'report-20260527-buildsom-tweet': {
    src: '/report-assets/buildsom-geo-effect-20260527.png',
    alt: 'BuildSOM GEO 效果截图',
    caption: 'GEO 效果截图：BuildSOM 已在 AI 回答引用内容中形成品牌露出。'
  },
  'report-20260710-buildsom-tweet': {
    src: '/report-assets/buildsom-geo-effect-20260527.png',
    alt: 'BuildSOM GEO 效果截图',
    caption: 'GEO 效果截图：BuildSOM 已在 AI 回答引用内容中形成品牌露出。'
  }
}

const viewingReportsTitle = computed(() => {
  if (viewingReports.value.length === 1) {
    const report = viewingReports.value[0]
    return report.project || report.title || '未命名报告'
  }
  if (viewingReports.value.length > 1) {
    const first = viewingReports.value[0]
    const project = first?.project || first?.title || '数据报告'
    return `${project} 等 ${viewingReports.value.length} 份报告`
  }
  return '数据报告'
})

watch(reportViewerOpen, async (open) => {
  if (open) {
    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    await nextTick()
    reportViewerDialogRef.value?.focus()
    return
  }
  document.body.style.overflow = previousBodyOverflow
})

onBeforeUnmount(() => {
  if (reportViewerOpen.value) {
    document.body.style.overflow = previousBodyOverflow
  }
  // 离开页面即清空内存中的结算明文。
  lockSettlement()
})

function setToolbarMessage(text, isError = false) {
  if (toolbarTimer) clearTimeout(toolbarTimer)
  if (isError) {
    toolbarError.value = text
    toolbarMessage.value = ''
  } else {
    toolbarMessage.value = text
    toolbarError.value = ''
  }
  toolbarTimer = setTimeout(() => {
    toolbarMessage.value = ''
    toolbarError.value = ''
  }, 3200)
}

async function loadAll() {
  const [d, r] = await Promise.all([
    fetchCommercialDeals(accessToken.value),
    fetchPromotionReports(accessToken.value)
  ])
  deals.value = Array.isArray(d) ? d : []
  reports.value = Array.isArray(r) ? r : []
  // 数据刷新后，已解密的明文不再保证与新密文对应，重新锁定更安全。
  lockSettlement()
}

async function bootstrapInternalPage() {
  bootstrapError.value = ''
  isBootstrapping.value = true

  try {
    await initAuth()

    if (!isInternal.value) {
      isUnlocked.value = false
      return
    }

    const token = await getAccessToken()
    if (!token) {
      bootstrapError.value = AUTH_COPY.sessionMissing
      isUnlocked.value = false
      return
    }

    accessToken.value = token
    await loadAll()
    isUnlocked.value = true
  } catch (error) {
    bootstrapError.value = explainInternalDataError(error, 'read')
    isUnlocked.value = false
    accessToken.value = ''
  } finally {
    isBootstrapping.value = false
  }
}

async function refreshAll() {
  if (!accessToken.value) return
  isRefreshing.value = true
  try {
    accessToken.value = await getAccessToken() || accessToken.value
    await loadAll()
    setToolbarMessage('已刷新最新数据。')
  } catch (error) {
    setToolbarMessage(explainInternalDataError(error, 'read'), true)
  } finally {
    isRefreshing.value = false
  }
}

// ---- 结算解锁逻辑 ----
function hasSettlement(deal) {
  return isEncryptedSettlement(deal?.settlement)
}

function openUnlock() {
  unlockError.value = ''
  passphraseInput.value = ''
  unlockModalOpen.value = true
  nextTick(() => passphraseInputRef.value?.focus())
}

function closeUnlock() {
  unlockModalOpen.value = false
  passphraseInput.value = ''
  unlockError.value = ''
}

async function submitUnlock() {
  const passphrase = passphraseInput.value
  if (!passphrase) return
  isUnlocking.value = true
  unlockError.value = ''
  try {
    const decrypted = await decryptDealsSettlement(deals.value, passphrase)
    if (decrypted.size === 0) {
      unlockError.value = '没有可解密的结算数据。'
      return
    }
    settlementMap.clear()
    for (const [id, plain] of decrypted) settlementMap.set(id, plain)
    settlementUnlocked.value = true
    closeUnlock()
    setToolbarMessage(`已解锁 ${decrypted.size} 条结算（仅本设备内存）。`)
  } catch (error) {
    if (error?.message === 'SETTLEMENT_DECRYPT_FAILED') {
      unlockError.value = '密码短语不正确，无法解密。'
    } else {
      unlockError.value = '解密失败，请重试。'
    }
  } finally {
    isUnlocking.value = false
    passphraseInput.value = ''
  }
}

function lockSettlement() {
  settlementMap.clear()
  settlementUnlocked.value = false
  passphraseInput.value = ''
}

// ---- Filter options ----
const serviceOptions = computed(() => {
  const s = new Set()
  for (const d of deals.value) {
    if (d.service) s.add(String(d.service).trim())
  }
  return Array.from(s).filter(Boolean).sort()
})

const progressOptions = [
  { label: '沟通中', value: 'communicating' },
  { label: '执行中', value: 'executing' },
  { label: '待结算', value: 'settlement' },
  { label: '已完成', value: 'completed' },
  { label: '暂停/作废', value: 'inactive' }
]

function progressGroup(deal) {
  const progress = String(deal.progress || '').trim()
  const remark = String(deal.remark || '').trim()
  const text = `${progress} ${remark}`

  if (!progress || progress === '/') return 'inactive'
  if (text.includes('暂不推进') || text.includes('暂停') || text.includes('取消') || text.includes('作废') || text.includes('无效') || text.includes('测试')) return 'inactive'
  if (text.includes('待结算') || text.includes('待付款') || text.includes('待支付') || text.includes('开票') || text.includes('结算中')) return 'settlement'
  if (text.includes('已完成') || text.includes('已闭环') || text.includes('已结算') || text.includes('已收款')) return 'completed'
  if (text.includes('执行') || text.includes('待执行') || text.includes('已发布') || text.includes('待出数据') || text.includes('持续计费') || text.includes('投放中')) return 'executing'
  if (text.includes('沟通') || text.includes('需求') || text.includes('报价') || text.includes('待确认') || text.includes('确认中')) return 'communicating'

  return 'communicating'
}

function dealMatchesProgressFilter(deal, filter) {
  if (filter === 'all') return true
  return progressGroup(deal) === filter
}

const yearOptions = computed(() => {
  const s = new Set()
  for (const d of deals.value) {
    const m = String(d.updatedAt || '').match(/(\d{4})/)
    if (m) s.add(m[1])
  }
  return Array.from(s).sort((a, b) => Number(b) - Number(a))
})

// Reports by deal
const reportsByDeal = computed(() => {
  const map = new Map()
  for (const r of reports.value) {
    const key = String(r.cooperationId || '').trim().toUpperCase()
    if (!key) continue
    if (!map.has(key)) map.set(key, [])
    map.get(key).push(r)
  }
  return map
})

function dealReports(deal) {
  const reportKey = String(deal.reportCooperationId || deal.id || '').trim().toUpperCase()
  const primaryKey = String(deal.id || '').trim().toUpperCase()
  const found = new Map()
  for (const key of [primaryKey, reportKey]) {
    if (!key) continue
    const list = reportsByDeal.value.get(key) || []
    for (const r of list) {
      if (!found.has(r.id)) found.set(r.id, r)
    }
  }
  return Array.from(found.values())
}

const orphanReports = computed(() => {
  const knownKeys = new Set()
  for (const d of deals.value) {
    if (d.id) knownKeys.add(String(d.id).toUpperCase())
    if (d.reportCooperationId) knownKeys.add(String(d.reportCooperationId).toUpperCase())
  }
  return reports.value.filter((r) => {
    const k = String(r.cooperationId || '').toUpperCase()
    return !k || !knownKeys.has(k)
  })
})

// Filters
function dealMatchesKeyword(deal, kw) {
  if (!kw) return true
  const blob = [deal.id, deal.brand, deal.service, deal.progress, deal.remark, deal.referrer, deal.owner, deal.reportCooperationId, deal.updatedAt]
    .filter(Boolean).join(' ').toLowerCase()
  if (blob.includes(kw)) return true
  const reps = dealReports(deal)
  return reps.some((r) => {
    const rb = [r.id, r.project, r.author, r.period, r.articleTitle, r.content, r.cooperationId,
      Array.isArray(r.platforms) ? r.platforms.join(' ') : '']
      .filter(Boolean).join(' ').toLowerCase()
    return rb.includes(kw)
  })
}

const filteredDeals = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  return deals.value.filter((d) => {
    if (serviceFilter.value !== 'all' && d.service !== serviceFilter.value) return false
    if (!dealMatchesProgressFilter(d, progressFilter.value)) return false
    if (yearFilter.value !== 'all') {
      const m = String(d.updatedAt || '').match(/(\d{4})/)
      if (!m || m[1] !== yearFilter.value) return false
    }
    if (!dealMatchesKeyword(d, kw)) return false
    return true
  }).sort((a, b) => {
    const ad = String(a.updatedAt || '')
    const bd = String(b.updatedAt || '')
    return bd.localeCompare(ad)
  })
})

const filteredReportsCount = computed(() => {
  let n = 0
  for (const d of filteredDeals.value) n += dealReports(d).length
  return n
})

const filteredStats = computed(() => {
  const sum = { reads: 0, likes: 0, favorites: 0, comments: 0, shares: 0 }
  for (const d of filteredDeals.value) {
    for (const r of dealReports(d)) {
      sum.reads += Number(r.stats?.reads) || 0
      sum.likes += Number(r.stats?.likes) || 0
      sum.favorites += Number(r.stats?.favorites) || 0
      sum.comments += Number(r.stats?.comments) || 0
      sum.shares += Number(r.stats?.shares) || 0
    }
  }
  return sum
})

// Expansion
function isExpanded(id) {
  return expanded.has(id)
}
function toggleExpanded(id) {
  if (expanded.has(id)) expanded.delete(id)
  else expanded.add(id)
}

// Formatting helpers
function formatNumber(value) {
  const n = Number(value)
  if (!Number.isFinite(n) || n < 0) return '0'
  return Math.floor(n).toLocaleString('zh-CN')
}

function formatArticleTitle(raw) {
  const t = String(raw || '').trim()
  if (!t) return ''
  if (t.startsWith('《') && t.endsWith('》')) return t
  return `《${t}》`
}

function progressBadgeClass(progress) {
  const group = progressGroup({ progress })
  if (group === 'inactive') return 'bg-slate-100 text-slate-700'
  if (group === 'settlement') return 'bg-amber-50 text-amber-800'
  if (group === 'completed') return 'bg-emerald-50 text-emerald-700'
  if (group === 'executing') return 'bg-sky-50 text-sky-700'
  return 'bg-indigo-50 text-indigo-700'
}

// Copy as table（不含结算金额，避免明文外泄）
async function copyAsTable() {
  const headers = ['合作编码', '品牌/项目', '合作内容', '当前进度', '备注', '推荐人', '承接人', '最近沟通', '报告数']
  const rows = filteredDeals.value.map((d) => [
    d.id || '', d.brand || '', d.service || '', d.progress || '', d.remark || '',
    d.referrer || '', d.owner || '', d.updatedAt || '', String(dealReports(d).length)
  ])
  const tsv = [headers, ...rows].map((r) => r.map((c) => String(c).replace(/\t/g, ' ')).join('\t')).join('\n')
  try {
    await navigator.clipboard.writeText(tsv)
    setToolbarMessage('已复制为 TSV 表格（不含结算金额），可直接粘贴到飞书 / Excel。')
  } catch {
    setToolbarMessage('复制失败，请检查剪贴板权限。', true)
  }
}

// Report viewer（只读）
function openDealReports(deal) {
  const list = dealReports(deal)
  if (list.length === 0) return
  openViewReports(list)
}
function openViewReport(report) {
  openViewReports([report])
}
function openViewReports(reportList) {
  viewingReports.value = reportList.filter(Boolean).map((report) => ({ ...report }))
  viewingReport.value = viewingReports.value[0] || null
  if (!viewingReport.value) return
  reportViewerOpen.value = true
}
function reportSharePath(report) {
  return `/tob/reports/${encodeURIComponent(report?.id || '')}`
}
function reportShareUrl(report) {
  return new URL(reportSharePath(report), window.location.origin).href
}
async function copyViewingReportShareLink() {
  if (viewingReports.value.length !== 1) return
  await copyReportShareLink(viewingReports.value[0])
}
async function copyReportShareLink(report) {
  if (!report) return
  try {
    await navigator.clipboard.writeText(reportShareUrl(report))
    setToolbarMessage('已复制分享链接。')
  } catch {
    setToolbarMessage('复制失败，请检查剪贴板权限。', true)
  }
}
function closeViewReport() {
  reportViewerOpen.value = false
  viewingReport.value = null
  viewingReports.value = []
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderMetricCard(label, value) {
  return `<div class="metric"><span>${escapeHtml(label)}</span><strong>${escapeHtml(formatNumber(value))}</strong></div>`
}

function getReportEvidenceImage(report) {
  const image = reportEvidenceImages[report?.id || '']
  if (!image) return null
  return {
    ...image,
    src: new URL(image.src, window.location.origin).href
  }
}

function buildReportPrintHtml(report) {
  const platforms = Array.isArray(report.platforms) ? report.platforms : []
  const title = report.project || report.title || '数据报告'
  const articleTitle = report.articleTitle ? formatArticleTitle(report.articleTitle) : ''
  const stats = report.stats || {}
  const evidenceImage = getReportEvidenceImage(report)
  const contentBlocks = String(report.content || '暂无正文。')
    .split(/\n{2,}/)
    .map((block) => `<p>${escapeHtml(block).replace(/\n/g, '<br>')}</p>`)
    .join('')

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title)} - PDF</title>
  <style>
    @page { size: A4; margin: 18mm 16mm; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif; line-height: 1.72; }
    .page { max-width: 760px; margin: 0 auto; }
    .eyebrow { color: #6d28d9; font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
    h1 { margin: 8px 0 4px; font-size: 26px; line-height: 1.25; }
    .article-title { margin: 0 0 14px; color: #64748b; font-size: 14px; }
    .meta { display: flex; flex-wrap: wrap; gap: 8px 18px; margin: 14px 0; color: #475569; font-size: 12px; }
    .platforms { display: flex; flex-wrap: wrap; gap: 6px; margin: 12px 0 18px; }
    .platform { border: 1px solid #ddd6fe; border-radius: 999px; padding: 3px 9px; color: #6d28d9; background: #f5f3ff; font-size: 12px; }
    .metrics { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin: 18px 0; }
    .metric { border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px; background: #f8fafc; }
    .metric span { display: block; color: #64748b; font-size: 12px; }
    .metric strong { display: block; margin-top: 4px; color: #0f172a; font-size: 18px; }
    .content { margin-top: 18px; border-top: 1px solid #e2e8f0; padding-top: 14px; font-size: 14px; }
    .content p { margin: 0 0 12px; }
    .evidence { break-inside: avoid; margin-top: 18px; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #f8fafc; }
    .evidence img { display: block; width: 100%; height: auto; }
    .evidence figcaption { margin: 0; border-top: 1px solid #e2e8f0; padding: 8px 12px; color: #64748b; font-size: 12px; }
    @media print { .page { max-width: none; } }
  </style>
</head>
<body>
  <main class="page">
    <div class="eyebrow">数据报告</div>
    <h1>${escapeHtml(title)}</h1>
    ${articleTitle ? `<p class="article-title">${escapeHtml(articleTitle)}</p>` : ''}
    <div class="meta">
      <span>报告 ID：${escapeHtml(report.id || '-')}</span>
      <span>合作编码：${escapeHtml(report.cooperationId || '-')}</span>
      <span>执行人：${escapeHtml(report.author || '-')}</span>
      ${report.period ? `<span>周期：${escapeHtml(report.period)}</span>` : ''}
    </div>
    ${platforms.length ? `<div class="platforms">${platforms.map((platform) => `<span class="platform">${escapeHtml(platform)}</span>`).join('')}</div>` : ''}
    <section class="metrics">
      ${renderMetricCard('阅读', stats.reads)}
      ${renderMetricCard('点赞', stats.likes)}
      ${renderMetricCard('收藏', stats.favorites)}
      ${renderMetricCard('评论', stats.comments)}
      ${renderMetricCard('转发', stats.shares)}
    </section>
    <section class="content">${contentBlocks}</section>
    ${evidenceImage ? `<figure class="evidence"><img src="${escapeHtml(evidenceImage.src)}" alt="${escapeHtml(evidenceImage.alt)}"><figcaption>${escapeHtml(evidenceImage.caption)}</figcaption></figure>` : ''}
  </main>
</body>
</html>`
}

function exportViewingReportPdf() {
  if (!viewingReport.value) return
  exportReportPdf(viewingReport.value)
}
function exportReportPdf(report) {
  if (!report) return
  const printWindow = window.open('', '_blank', 'width=960,height=720')
  if (!printWindow) {
    setToolbarMessage('无法打开 PDF 导出窗口，请允许浏览器弹窗后重试。', true)
    return
  }
  printWindow.document.open()
  printWindow.document.write(buildReportPrintHtml(report))
  printWindow.document.close()
  printWindow.focus()
  printWindow.setTimeout(() => {
    printWindow.print()
  }, 250)
}

onMounted(() => {
  bootstrapInternalPage()
})
</script>
