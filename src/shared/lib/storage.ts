export const saveJSON = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore quota/serialization errors in prototype
  }
}

export const loadJSON = <T>(key: string): T | null => {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch {
    // ignore
  }
}
