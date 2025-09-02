import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combine class names with proper Tailwind CSS merging
 * @param {...string} classes - Class names to combine
 * @returns {string} - Merged class names
 */
export function cn(...classes) {
  return twMerge(clsx(...classes))
}

export default cn