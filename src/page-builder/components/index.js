import { generateFormdata } from './utils'
import { getProps as getCaptionProps } from './caption'
import { getProps as getSeparatorProps } from './separator'

export const components = {
  CaptionItem: () => import('./CaptionItem.vue'),
  CaptionForm: () => import('./CaptionForm.vue'),
  CaptionView: () => import('./CaptionView.vue'),
  SeparatorItem: () => import('./SeparatorItem.vue'),
  SeparatorForm: () => import('./SeparatorForm.vue'),
  SeparatorView: () => import('./SeparatorView.vue'),
}

export const metas = [
  {
    name: 'caption',
    label: '标题文字',
    data: generateFormdata(getCaptionProps()),
  },
  {
    name: 'separator',
    label: '辅助分割',
    data: generateFormdata(getSeparatorProps()),
  },
]
