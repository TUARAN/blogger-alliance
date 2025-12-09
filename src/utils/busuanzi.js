import { reactive } from 'vue'

export const busuanziStats = reactive({
  sitePv: 0,
  siteUv: 0,
  pagePv: 0,
  loading: true
})

export function initBusuanzi() {
  if (typeof document === 'undefined') return

  // 检查是否已经初始化
  if (document.getElementById('busuanzi-wrapper')) return

  // 创建隐藏的容器用于不蒜子回填数据
  const container = document.createElement('div')
  container.style.display = 'none'
  container.id = 'busuanzi-wrapper'
  
  const sitePvSpan = document.createElement('span')
  sitePvSpan.id = 'busuanzi_value_site_pv'
  container.appendChild(sitePvSpan)
  
  const siteUvSpan = document.createElement('span')
  siteUvSpan.id = 'busuanzi_value_site_uv'
  container.appendChild(siteUvSpan)
  
  const pagePvSpan = document.createElement('span')
  pagePvSpan.id = 'busuanzi_value_page_pv'
  container.appendChild(pagePvSpan)
  
  document.body.appendChild(container)

  // 监听变化
  const updateStats = () => {
    const pv = parseInt(sitePvSpan.innerText)
    const uv = parseInt(siteUvSpan.innerText)
    const page = parseInt(pagePvSpan.innerText)

    if (!isNaN(pv)) busuanziStats.sitePv = pv
    if (!isNaN(uv)) busuanziStats.siteUv = uv
    if (!isNaN(page)) busuanziStats.pagePv = page
    
    if (!isNaN(pv) || !isNaN(uv)) {
      busuanziStats.loading = false
    }
  }

  const observer = new MutationObserver(updateStats)

  observer.observe(sitePvSpan, { childList: true, characterData: true, subtree: true })
  observer.observe(siteUvSpan, { childList: true, characterData: true, subtree: true })
  observer.observe(pagePvSpan, { childList: true, characterData: true, subtree: true })

  // 引入脚本
  const script = document.createElement('script')
  script.async = true
  script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
  document.head.appendChild(script)
}
