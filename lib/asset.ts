/** Bump when public/images change so returning visitors bypass stale browser cache. */
export const ASSET_VERSION = '2'

export function asset(path: string): string {
  const separator = path.includes('?') ? '&' : '?'
  return `${path}${separator}v=${ASSET_VERSION}`
}
