declare module 'virtual:pwa-register' {
  export function registerSW(options?: { immediate?: boolean }): void
}

;(async () => {
  const { registerSW } = await import('virtual:pwa-register')
  registerSW({ immediate: true })
})()