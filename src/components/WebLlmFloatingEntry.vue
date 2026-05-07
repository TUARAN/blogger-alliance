<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <RouterLink
    to="/workspace/web-llm"
    class="web-llm-nav-bot"
    aria-label="进入大模型问答"
    title="大模型问答"
  >
    <svg viewBox="0 0 64 64" width="26" height="26" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="32" cy="58" rx="14" ry="2.5" fill="rgba(15, 23, 42, 0.18)" />
      <rect x="14" y="20" width="36" height="28" rx="10" fill="#ffffff" stroke="#0f172a" stroke-width="2" />
      <line x1="32" y1="12" x2="32" y2="20" stroke="#0f172a" stroke-width="2" stroke-linecap="round" />
      <circle cx="32" cy="10" r="3" fill="#f59e0b" stroke="#0f172a" stroke-width="2" />
      <circle cx="24" cy="32" r="3.5" fill="#0ea5e9" />
      <circle cx="40" cy="32" r="3.5" fill="#0ea5e9" />
      <rect x="26" y="40" width="12" height="3" rx="1.5" fill="#0f172a" />
      <rect x="6" y="28" width="6" height="14" rx="3" fill="#ffffff" stroke="#0f172a" stroke-width="2" />
      <rect x="52" y="28" width="6" height="14" rx="3" fill="#ffffff" stroke="#0f172a" stroke-width="2" />
    </svg>
  </RouterLink>
</template>

<style>
.web-llm-nav-bot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  text-decoration: none;
  animation: web-llm-nav-bot-wobble 2.6s ease-in-out infinite;
  transform-origin: 50% 100%;
  filter: drop-shadow(0 2px 4px rgba(15, 23, 42, 0.15));
  transition: transform 200ms ease;
  flex-shrink: 0;
}

.web-llm-nav-bot:hover {
  animation-play-state: paused;
  transform: translateY(-1px) scale(1.08);
}

.web-llm-nav-bot:focus-visible {
  outline: 2px solid #f59e0b;
  outline-offset: 3px;
  border-radius: 6px;
}

@keyframes web-llm-nav-bot-wobble {
  0%,
  100% {
    transform: rotate(-4deg);
  }

  25% {
    transform: rotate(5deg);
  }

  50% {
    transform: rotate(-3deg);
  }

  75% {
    transform: rotate(4deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .web-llm-nav-bot {
    animation: none;
  }
}
</style>
