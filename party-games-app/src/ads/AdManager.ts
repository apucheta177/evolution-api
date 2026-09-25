import { Capacitor } from '@capacitor/core';
import { AdMob, type AdMobInitializationOptions } from '@capacitor-community/admob';

// IDs de test oficiales de Google. Reemplazar por los IDs reales de la cuenta
// de AdMob antes de publicar en las stores.
const TEST_INTERSTITIAL_ID = 'ca-app-pub-3940256099942544/1033173712';

let initialized = false;

export async function initAds() {
  if (!Capacitor.isNativePlatform() || initialized) return;
  const options: AdMobInitializationOptions = { testingDevices: [], initializeForTesting: true };
  await AdMob.initialize(options);
  initialized = true;
}

/**
 * Muestra un interstitial (pantalla completa). Se usa SOLO en dos momentos:
 * al abrir la app y al entrar a un juego desde el menú. Nunca entre rondas.
 * No hace nada si el usuario tiene premium o si no corre en un dispositivo nativo.
 */
export async function maybeShowInterstitial(isPremium: boolean) {
  if (isPremium || !Capacitor.isNativePlatform()) return;
  try {
    await initAds();
    await AdMob.prepareInterstitial({ adId: TEST_INTERSTITIAL_ID });
    await AdMob.showInterstitial();
  } catch {
    // Si el anuncio falla o no cargó, seguimos sin bloquear al usuario.
  }
}
