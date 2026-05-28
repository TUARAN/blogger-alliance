<script setup>
import { partnerBrands } from '../data/bloggerInfo.js'
</script>

<template>
  <div class="relative overflow-hidden">
    <div class="flex animate-scroll">
      <div class="flex space-x-12 whitespace-nowrap">
        <!-- 渲染两组用于无缝循环 -->
        <div v-for="copy in 2" :key="copy" class="flex items-center space-x-8">
          <div v-for="brand in partnerBrands" :key="`${copy}-${brand.name}`" class="flex flex-col items-center">
            <div class="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-2 shadow-sm border border-gray-200">
              <img :src="brand.img" :alt="brand.name" class="w-12 h-12 object-contain" />
            </div>
            <span class="text-sm text-gray-600">{{ brand.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
