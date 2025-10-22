/**
 * Facility Icon Mapping
 * Maps facility icon keys to corresponding Heroicons
 */

import {
  MapPinIcon,
  HomeModernIcon,
  CameraIcon,
  BuildingLibraryIcon,
  ShoppingBagIcon,
  HomeIcon,
  SparklesIcon,
  FireIcon,
  MapIcon,
  WrenchScrewdriverIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  CubeIcon,
  CakeIcon,
  BeakerIcon,
  SunIcon,
  AcademicCapIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'

export const FACILITY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  // Common facilities
  parking: MapPinIcon,
  pool: FireIcon,
  photo: CameraIcon,
  mushola: BuildingLibraryIcon,
  food: ShoppingBagIcon,
  lodging: HomeIcon,
  
  // Adventure facilities
  adventure: SparklesIcon,
  trail: MapIcon,
  gear: WrenchScrewdriverIcon,
  safety: ShieldCheckIcon,
  guide: UserGroupIcon,
  
  // Nature & leisure
  sunrise: SunIcon,
  camping: HomeModernIcon,
  shelter: CubeIcon,
  gazebo: CubeIcon,
  
  // Garden & education
  garden: GlobeAltIcon,
  flower: SparklesIcon,
  education: AcademicCapIcon,
  workshop: WrenchScrewdriverIcon,
  playground: CakeIcon,
  greenhouse: HomeModernIcon,
  picnic: CakeIcon,
  
  // Fallback
  default: SparklesIcon,
}

export function getFacilityIcon(iconKey: string): React.ComponentType<{ className?: string }> {
  return FACILITY_ICONS[iconKey] || FACILITY_ICONS.default
}
