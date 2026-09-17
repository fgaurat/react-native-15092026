/**
 * Thème partagé par tous les écrans du TP.
 * Centraliser les couleurs et les espacements évite les valeurs magiques
 * dispersées dans les StyleSheet.
 */
export const colors = {
  primary: '#4F46E5',
  primaryLight: '#EEF2FF',
  accent: '#F59E0B',
  success: '#16A34A',
  danger: '#DC2626',
  background: '#F8FAFC',
  card: '#FFFFFF',
  border: '#E2E8F0',
  text: '#0F172A',
  muted: '#64748B',
  boxA: '#60A5FA',
  boxB: '#F472B6',
  boxC: '#34D399',
  boxD: '#FBBF24',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radius = {
  sm: 6,
  md: 12,
  lg: 20,
} as const;
