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

      <!-- Tab 切换 -->
      <div class="mb-12">
        <div class="flex justify-center">
          <div class="bg-white rounded-xl p-2 shadow-lg">
            <button
              @click="activeTab = 'partner'"
              class="px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              :class="activeTab === 'partner' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'"
            >
              🤝 成为博主合伙人
            </button>
            <button
              @click="activeTab = 'tools'"
              class="px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              :class="activeTab === 'tools' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'"
            >
              🛠️ 浏览工具库
            </button>
          </div>
        </div>
      </div>

      <!-- Tab 内容 -->
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 transform translate-y-4"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform translate-y-4"
      >
        <!-- 博主合伙人 Tab -->
        <div v-show="activeTab === 'partner'" class="space-y-12">
          <!-- 简介说明 -->
          <div class="text-center bg-white rounded-2xl shadow-lg p-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">
              成为博主合伙人
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              如果你是程序员 C 端博主，欢迎加入我们的联盟！在这里，你可以分享推广资源，
              获得更多收入机会，与志同道合的技术博主一起成长。
            </p>
            <div class="inline-flex items-center px-6 py-3 bg-green-100 text-green-800 rounded-full font-semibold">
              <span class="mr-2">✨</span>
              已有 50+ 博主加入，月均收入提升 40%
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
            <button
              @click="showPartnerModal = true"
              class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <span class="mr-2">🚀</span>
              申请加入开发者博主联盟
            </button>
          </div>
        </div>
      </transition>

      <transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 transform translate-y-4"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform translate-y-4"
      >
        <!-- 工具库 Tab -->
        <div v-show="activeTab === 'tools'" class="space-y-12">
          <!-- 简介说明 -->
          <div class="text-center bg-white rounded-2xl shadow-lg p-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">
              浏览我们的工具库
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              精选优质的技术工具和产品，帮助程序员提升开发效率，解决工作中的各种问题
            </p>
          </div>

          <!-- Loading 状态 -->
          <div v-if="toolsLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="i in 6" :key="i" class="bg-white rounded-xl shadow-lg p-6 animate-pulse">
              <div class="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div class="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>

          <!-- 工具卡片 -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="tool in tools"
              :key="tool.id"
              class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <!-- 工具封面 -->
              <div class="relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100">
                <img
                  :src="tool.cover"
                  :alt="tool.name"
                  class="w-full h-full object-cover"
                />
                <div class="absolute top-4 left-4 text-3xl">{{ tool.icon }}</div>
                <div class="absolute top-4 right-4 px-3 py-1 bg-white bg-opacity-90 rounded-full text-sm font-semibold text-gray-700">
                  {{ tool.category }}
                </div>
              </div>

              <!-- 工具信息 -->
              <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ tool.name }}</h3>
                <p class="text-gray-600 mb-4 leading-relaxed">{{ tool.description }}</p>
                
                <!-- 功能特性 -->
                <div class="mb-6">
                  <h4 class="font-semibold text-gray-900 mb-2">主要功能</h4>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="feature in tool.features.slice(0, 3)"
                      :key="feature"
                      class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                    >
                      {{ feature }}
                    </span>
                    <span v-if="tool.features.length > 3" class="px-2 py-1 bg-gray-100 text-gray-500 rounded text-sm">
                      +{{ tool.features.length - 3 }}
                    </span>
                  </div>
                </div>

                <!-- 跳转按钮 -->
                <a
                  :href="tool.url"
                  target="_blank"
                  class="block w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-center transition-colors"
                >
                  立即体验
                </a>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- 申请加入 Modal -->
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showPartnerModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click="showPartnerModal = false"
      >
        <div
          class="bg-white rounded-2xl p-8 max-w-md w-full transform transition-all"
          @click.stop
        >
          <div class="text-center">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">申请加入开发者博主联盟</h3>
            <p class="text-gray-600 mb-6">
              请填写以下信息，我们会尽快审核您的申请
            </p>
            
            <form @submit.prevent="submitPartnerApplication" class="space-y-4">
              <div>
                <label class="block text-left text-sm font-semibold text-gray-700 mb-2">姓名</label>
                <input
                  v-model="partnerForm.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="请输入您的姓名"
                />
              </div>
              
              <div>
                <label class="block text-left text-sm font-semibold text-gray-700 mb-2">联系方式</label>
                <input
                  v-model="partnerForm.contact"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="微信/邮箱/手机号"
                />
              </div>
              
              <div>
                <label class="block text-left text-sm font-semibold text-gray-700 mb-2">博主平台</label>
                <input
                  v-model="partnerForm.platform"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="掘金/知乎/CSDN等"
                />
              </div>
              
              <div>
                <label class="block text-left text-sm font-semibold text-gray-700 mb-2">粉丝数量</label>
                <input
                  v-model="partnerForm.followers"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="如：5K、10K等"
                />
              </div>
              
              <div>
                <label class="block text-left text-sm font-semibold text-gray-700 mb-2">个人简介</label>
                <textarea
                  v-model="partnerForm.description"
                  rows="3"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="请简要介绍您的技术背景和内容方向"
                ></textarea>
              </div>
              
              <div class="flex space-x-4 pt-4">
                <button
                  type="button"
                  @click="showPartnerModal = false"
                  class="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  class="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
                >
                  提交申请
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { toolsData, partnerBenefits } from '../../data/mockData.js'

// 响应式数据
const activeTab = ref('partner')
const toolsLoading = ref(true)
const tools = ref([])
const showPartnerModal = ref(false)
const partnerForm = ref({
  name: '',
  contact: '',
  platform: '',
  followers: '',
  description: ''
})

// 提交合伙人申请
const submitPartnerApplication = () => {
  // 这里可以添加表单验证和提交逻辑
  console.log('提交申请:', partnerForm.value)
  alert('申请提交成功！我们会尽快联系您。')
  showPartnerModal.value = false
  // 重置表单
  partnerForm.value = {
    name: '',
    contact: '',
    platform: '',
    followers: '',
    description: ''
  }
}

// 模拟加载工具数据
onMounted(() => {
  setTimeout(() => {
    tools.value = toolsData
    toolsLoading.value = false
  }, 1000)
})
</script> 