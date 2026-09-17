/**
 * Règle unique « sommes-nous en ligne ? », partagée par le bandeau et l'exemple offline.
 *
 * expo-network renvoie des champs optionnels : tant que isConnected est undefined,
 * l'état est inconnu (premier rendu). Sur iOS, isInternetReachable vaut toujours isConnected ;
 * sur Android il n'est vrai que si le réseau est validé (accès Internet réel). On ne considère
 * donc hors ligne que s'il vaut explicitement false.
 */
import { useNetworkState } from 'expo-network';

export function useIsOnline(): boolean | undefined {
  const { isConnected, isInternetReachable } = useNetworkState();
  if (isConnected === undefined) {
    return undefined;
  }
  return isConnected && isInternetReachable !== false;
}
