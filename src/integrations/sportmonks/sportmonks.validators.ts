export const isArray = (v: unknown): v is unknown[] => Array.isArray(v)

export const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null

export const getArray = <T>(v: unknown): T[] =>
  isArray(v) ? (v as T[]) : []

export const getObject = <T>(v: unknown): T | null =>
  isObject(v) ? (v as T) : null

export const getString = (v: unknown): string | null =>
  typeof v === "string" ? v : null

export const getNumber = (v: unknown): number | null =>
  typeof v === "number" ? v : null
