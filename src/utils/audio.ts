import { Audio } from 'expo-av';

let currentSound: Audio.Sound | null = null;

export async function playArabicLetter(
  source: any,
  options?: { onFinish?: () => void }
) {
  /** 🛑 GLOBAL VALIDATION — fixes Murakkabat freeze */
  if (!source) {
    options?.onFinish?.(); // ensure animation cleanup
    return null;
  }

  // Stop previous audio
  if (currentSound) {
    await currentSound.stopAsync();
    await currentSound.unloadAsync();
    currentSound = null;
  }

  const sound = new Audio.Sound();
  currentSound = sound;

  try {
    await sound.loadAsync(source);
    await sound.playAsync();

    sound.setOnPlaybackStatusUpdate((status) => {
      if (!status.isLoaded) return;

      if (status.didJustFinish) {
        options?.onFinish?.();
        sound.unloadAsync();

        if (currentSound === sound) {
          currentSound = null;
        }
      }
    });
  } catch (e) {
    /** 🛡️ Safety: prevent permanent freeze */
    console.warn('Audio failed to play:', e);
    options?.onFinish?.();

    if (currentSound === sound) {
      currentSound = null;
    }
  }

  return {
    stop: async () => {
      if (currentSound === sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        currentSound = null;
      }
    },
  };
}
