export const DEFAULT_MODEL_ID = 'onnx-community/Qwen3.5-0.8B-ONNX'

export const MODEL_OPTIONS = [
  {
    id: 'onnx-community/Qwen3.5-0.8B-ONNX',
    label: 'Qwen3.5 0.8B',
    description: '默认模型，优先保证浏览器端可加载性',
    dtype: 'q4f16'
  },
  {
    id: 'onnx-community/Qwen3.5-2B-ONNX',
    label: 'Qwen3.5 2B',
    description: '更强文本能力，显存和加载时间更高',
    dtype: 'q4f16'
  },
  {
    id: 'onnx-community/Qwen3.5-4B-ONNX',
    label: 'Qwen3.5 4B',
    description: '更高质量输出，推荐桌面高性能 GPU',
    dtype: 'q4f16'
  }
]

export const MAX_NEW_TOKENS = 384
export const IMAGE_MAX_EDGE = 1024
