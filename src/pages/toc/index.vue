<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
    <!-- 导航栏 -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <router-link to="/" class="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
              🚀 开发者博主联盟
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/" class="text-gray-600 hover:text-indigo-600 transition-colors">
              返回首页
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- 页面标题 -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          加入开发者博主联盟，开启技术变现之旅
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          无论你是想成为博主合伙人，还是寻找优质的技术工具，这里都能满足你的需求
        </p>
      </div>

      <!-- 页面说明 -->
      <div class="mb-12">
        <div class="text-center">
          <div class="inline-flex items-center px-6 py-3 bg-green-100 text-green-800 rounded-full font-semibold">
            <span class="mr-2">✨</span>
            已有 20+ 博主加入，写作兼职收入蹭蹭提升
            <svg class="ml-2 w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3L3 10h4v7h6v-7h4l-7-7z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- 主要内容 -->
      <div class="space-y-12">
        <!-- 简介说明 -->
        <div class="text-center bg-white rounded-2xl shadow-lg p-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">
            成为博主合伙人
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            如果你是程序员 C 端博主，欢迎加入我们的联盟！在这里，你可以分享推广资源，
            获得更多收入机会，与志同道合的技术博主一起成长。
          </p>
          
          <!-- 基本门槛 -->
          <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
            <h3 class="text-lg font-semibold text-blue-900 mb-3 flex items-center justify-center">
              <span class="mr-2">🎯</span>
              基本门槛
            </h3>
            <div class="text-blue-800 space-y-2">
              <p class="flex items-center justify-center">
                <span class="mr-2">•</span>
                技术社区 3K 粉以上的 KOL
              </p>
              <p class="flex items-center justify-center">
                <span class="mr-2">•</span>
                或者活跃的开发者 KOC
              </p>
            </div>
          </div>
        </div>

        <!-- 好处清单 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="benefit in partnerBenefits"
            :key="benefit.id"
            class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="text-center">
              <div class="text-4xl mb-4">{{ benefit.icon }}</div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ benefit.title }}</h3>
              <p class="text-gray-600 leading-relaxed">{{ benefit.description }}</p>
            </div>
          </div>
        </div>



        <!-- CTA 按钮 -->
        <div class="text-center">
          <a
            href="https://dxxbhlw7ws.feishu.cn/sheets/KlLBsxe7vhT2IYtajpJcfSJQnod?from=from_copylink"
            target="_blank"
            class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <span class="mr-2">🚀</span>
            申请加入开发者博主联盟
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { partnerBenefits } from '../../data/mockData.js'

// 页面数据
// 所有表单处理逻辑已移除，现在直接跳转到飞书文档
</script> 