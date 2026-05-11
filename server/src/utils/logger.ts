export function info(message: string, ...args: any[]) {
  console.log(`[${new Date().toISOString()}] INFO:`, message, ...args);
}

export function error(message: string, ...args: any[]) {
  console.error(`[${new Date().toISOString()}] ERROR:`, message, ...args);
}

export function warn(message: string, ...args: any[]) {
  console.warn(`[${new Date().toISOString()}] WARN:`, message, ...args);
}

export function debug(message: string, ...args: any[]) {
  if (process.env.NODE_ENV === 'development') {
    console.debug(`[${new Date().toISOString()}] DEBUG:`, message, ...args);
  }
}
