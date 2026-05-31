<script setup>
const releases = [
  {
    version: 'v0.1.0',
    period: '2025-06-19',
    title: '项目启动',
    summary: '完成 Vue 3 + Tailwind 基础工程、静态部署配置与 README 项目愿景说明。',
    commits: ['05dab57 init', '404f1fb static base', '249f82 README']
  },
  {
    version: 'v0.2.0',
    period: '2025-07-02 至 2025-07-10',
    title: '联盟名录与贡献流程成型',
    summary: '更新品牌为开发者博主联盟，完善首页统计、PV/UV 展示、Fork + PR 加入流程，并重构数据文件结构。',
    commits: ['8cf781d brand', '8f9224a analytics', '978c07b workflow', 'c97d521 data']
  },
  {
    version: 'v0.3.0',
    period: '2025-07-18 至 2025-09-03',
    title: '博主生态扩容',
    summary: '持续接入新博主与社交资料，修正头像和平台链接，补充 TOB 页面伙伴、统计与群体数据说明。',
    commits: ['bd5b9cc blogger', '38b00cf Alex', 'c3c1cf3 TOB', '2dc4eee blogger']
  },
  {
    version: 'v0.4.0',
    period: '2025-11-07 至 2025-12-31',
    title: '品牌、学院与统计体系刷新',
    summary: '扩展博主名单和 KOL/KOC 标识，重构导航与联盟学院，接入 Busuanzi 统计并优化二维码和统计卡片体验。',
    commits: ['a36d845 roster', '93d0a57 academy', 'b686170 stats', 'dbeeeb6 brand']
  },
  {
    version: 'v0.5.0',
    period: '2026-01-13 至 2026-02-28',
    title: '服务商业化页面完善',
    summary: '上线表格视图、筛选与排序，新增 TOB 服务子页面、CPC 详情、合作流程、受众定位与花名册下载。',
    commits: ['8e7441a table', '4c0c445 services', 'c773a1e copy', '654e914 roster']
  },
  {
    version: 'v0.6.0',
    period: '2026-03-09 至 2026-03-27',
    title: '商单、矩阵、案例与报告闭环',
    summary: '新增合作进度页、凭证解密、矩阵联盟模块、Why Us、案例页、GEO 文案、加密推广报告和年度报告入口。',
    commits: ['97ca696 deals', 'f98c6c1 matrix', 'dad1064 cases', '4985352 annual']
  },
  {
    version: 'v0.7.0',
    period: '2026-04-02 至 2026-04-29',
    title: '工作台智能化与数据底座',
    summary: '加入工作台 WebGPU LLM、完善知识库与生成流程，完成 D1 迁移、管理页、健康检查和访问锁定策略。',
    commits: ['c7e139f WebLLM', '55e0241 D1', 'f6c1f68 admin', '894a39c lockout']
  },
  {
    version: 'v0.8.0',
    period: '2026-05-06 至 2026-05-29',
    title: '后台化、报告分享与首页改版',
    summary: '同步 WebLLM 视觉，抽取 AppNav 与服务组件，增强专项服务和分类案例，上线安全报告分享、商单 owner、Excel 导入、移动端交互与合作品牌轮播。',
    commits: ['e3ff76c WebLLM', '2b11eda cases', '5beb46c sharing', '0be662c ledger', '7957550 carousel']
  }
]
</script>

<template>
  <section class="mt-12 sm:mt-16" aria-labelledby="workspace-changelog-title">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Git changelog</p>
        <h2 id="workspace-changelog-title" class="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
          更新日志
        </h2>
        <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          基于 git 提交历史整理的里程碑版本，按时间线记录联盟工作台、服务页、案例、报告与数据底座的关键演进。
        </p>
      </div>
      <div class="rounded-lg border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm">
        最近同步：2026-05-29
      </div>
    </div>

    <ol class="mt-8 space-y-4">
      <li
        v-for="release in releases"
        :key="release.version"
        class="relative rounded-lg border border-white/80 bg-white/90 p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
      >
        <div class="grid gap-4 lg:grid-cols-[12rem_1fr] lg:gap-6">
          <div>
            <div class="inline-flex items-center rounded-lg bg-slate-950 px-3 py-1.5 text-sm font-semibold text-white">
              {{ release.version }}
            </div>
            <p class="mt-3 text-sm font-medium text-slate-500">{{ release.period }}</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-slate-950">{{ release.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-slate-600">{{ release.summary }}</p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="commit in release.commits"
                :key="commit"
                class="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-600"
              >
                {{ commit }}
              </span>
            </div>
          </div>
        </div>
      </li>
    </ol>
  </section>
</template>
