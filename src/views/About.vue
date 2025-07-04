<template>
  <div class="section-mobile">
    <div class="container-mobile max-w-4xl mx-auto">
      <!-- Page Header -->
      <div class="text-center mb-8 sm:mb-12">
        <h1 class="text-mobile-3xl sm:text-4xl font-bold text-gray-900 mb-4">关于开发者博主联盟</h1>
        <p class="text-mobile-lg sm:text-lg text-gray-600">
          连接优秀的技术博主，分享知识，共同成长
        </p>
      </div>

      <!-- Mission Section -->
      <section class="mb-12 sm:mb-16">
        <div class="card p-6 sm:p-8">
          <h2 class="text-mobile-2xl sm:text-2xl font-bold text-gray-900 mb-6">我们的使命</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">连接技术社区</h3>
              <p class="text-gray-700 leading-relaxed text-mobile">
                我们致力于连接优秀的技术博主，搭建一个展示和交流的平台，让技术知识能够更好地传播和分享。
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">促进技术交流</h3>
              <p class="text-gray-700 leading-relaxed text-mobile">
                通过开发者博主联盟，我们希望促进不同技术领域之间的交流，激发创新思维，推动技术社区的发展。
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Values Section -->
      <section class="mb-12 sm:mb-16">
        <h2 class="text-mobile-2xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">核心价值观</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div class="card p-6 text-center">
            <div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">知识分享</h3>
            <p class="text-gray-600 text-mobile">
              鼓励技术博主分享经验和见解，让知识在社区中自由流动
            </p>
          </div>
          
          <div class="card p-6 text-center">
            <div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">社区建设</h3>
            <p class="text-gray-600 text-mobile">
              构建一个开放、包容、互助的技术社区环境
            </p>
          </div>
          
          <div class="card p-6 text-center sm:col-span-2 lg:col-span-1">
            <div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">持续创新</h3>
            <p class="text-gray-600 text-mobile">
              鼓励技术创新和思维突破，推动技术发展
            </p>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="mb-12 sm:mb-16">
        <h2 class="text-mobile-2xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">核心团队</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div class="card p-6">
            <div class="flex items-center mb-4">
              <img src="https://via.placeholder.com/80x80/3B82F6/FFFFFF?text=团" alt="团队成员" class="w-16 h-16 sm:w-20 sm:h-20 rounded-full mr-4">
              <div>
                <h3 class="text-lg sm:text-xl font-semibold text-gray-900">技术团队</h3>
                <p class="text-gray-600 text-mobile">负责平台开发和维护</p>
              </div>
            </div>
            <p class="text-gray-700 text-mobile">
              我们拥有一支经验丰富的技术团队，专注于为用户提供最好的使用体验。
            </p>
          </div>
          
          <div class="card p-6">
            <div class="flex items-center mb-4">
              <img src="https://via.placeholder.com/80x80/10B981/FFFFFF?text=运" alt="运营团队" class="w-16 h-16 sm:w-20 sm:h-20 rounded-full mr-4">
              <div>
                <h3 class="text-lg sm:text-xl font-semibold text-gray-900">运营团队</h3>
                <p class="text-gray-600 text-mobile">负责社区运营和内容管理</p>
              </div>
            </div>
            <p class="text-gray-700 text-mobile">
              专业的运营团队确保社区内容质量，维护良好的交流环境。
            </p>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="mb-12 sm:mb-16">
        <div class="card p-6 sm:p-8">
          <h2 class="text-mobile-2xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">联系我们</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">联系方式</h3>
              <div class="space-y-3">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span class="text-gray-700 text-mobile break-all">contact@blogger-alliance.com</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span class="text-gray-700 text-mobile">400-123-4567</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="text-gray-700 text-mobile">北京市朝阳区科技园区</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">社交媒体</h3>
              <div class="space-y-3">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  <span class="text-gray-700 text-mobile break-all">@blogger-alliance</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span class="text-gray-700 text-mobile break-all">github.com/blogger-alliance</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span class="text-gray-700 text-mobile break-all">linkedin.com/company/blogger-alliance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Join Us Section -->
      <section class="text-center">
        <div class="card p-6 sm:p-8 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <h2 class="text-mobile-2xl sm:text-2xl font-bold mb-4">加入我们</h2>
          <p class="text-mobile-lg sm:text-lg mb-6 text-primary-100">
            如果你是一名技术博主，欢迎加入我们的联盟，与更多优秀的技术人一起交流成长
          </p>
          <button class="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 sm:px-8 rounded-lg transition-colors text-mobile btn-mobile">
            立即申请
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script> 