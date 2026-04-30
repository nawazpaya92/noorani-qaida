import { Audio } from 'expo-av';

let currentSound: Audio.Sound | null = null;

type PlaybackStatusSnapshot = {
  positionMillis: number;
  durationMillis: number;
  isPlaying: boolean;
  didJustFinish: boolean;
};

export async function playArabicLetter(
  source: any,
  options?: {
    onFinish?: () => void;
    onStatusUpdate?: (status: PlaybackStatusSnapshot) => void;
  }
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

      options?.onStatusUpdate?.({
        positionMillis: status.positionMillis ?? 0,
        durationMillis: status.durationMillis ?? 0,
        isPlaying: status.isPlaying ?? false,
        didJustFinish: status.didJustFinish ?? false,
      });

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
