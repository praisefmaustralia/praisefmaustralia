declare module 'virtual:pwa-register' {
  export function registerSW(options?: { immediate?: boolean }): void
}

import { registerSW } from 'virtual:pwa-register'

registerSW({ immediate: true })