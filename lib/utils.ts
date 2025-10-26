import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get full image URL from backend
 * @param imagePath - Path from database (e.g., "/uploads/wisata/xxx.jpg")
 * @returns Full URL to backend image or placeholder
 */
export const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) {
    return '/assets/images/placeholder.jpg';
  }

  // If already full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // If placeholder path, return as is
  if (imagePath.startsWith('/assets/')) {
    return imagePath;
  }

  // Build full backend URL
  // Use production URL if available, otherwise fallback to local
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://webdesa.dikadev.id/api';
  const BASE_URL = API_BASE_URL.replace('/api', ''); // Remove /api suffix
  
  // Remove leading slash if exists
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  return `${BASE_URL}/${cleanPath}`;
};

/**
 * Handle image error by setting placeholder
 */
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = '/assets/images/placeholder.jpg';
  e.currentTarget.onerror = null; // Prevent infinite loop
};
