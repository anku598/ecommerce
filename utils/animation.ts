export const onClient = () => (
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value

  descriptor.value = function (...args: any[]) {
    if (process.browser && window) {
      originalMethod.apply(this, args)
    }
  }

  return descriptor
}

export function preloaderTransition (to: any, from: any) {
  if (!from) {
    return {
      afterLeave (el: any) {
        console.log('first time enter')
      }
    }
  } else {
    return ''
  }
}
