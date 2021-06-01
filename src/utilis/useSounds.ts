import { useRef, useEffect } from 'react';
import { Audio } from 'expo-av';

type SoundType = 
  | "pop1"
  | "pop2"
  | "win"
  | "loss"
  | "draw"

export default function useSounds(): (soundType: SoundType) => void {
	const popSoundRef = useRef<Audio.Sound | null>(null);
	const pop2SoundRef = useRef<Audio.Sound | null>(null);
	const winSoundRef = useRef<Audio.Sound | null>(null);
	const loseSoundRef = useRef<Audio.Sound | null>(null);
	const drawSoundRef = useRef<Audio.Sound | null>(null);

  const playSound = async (soundType: SoundType): Promise<void> => {
    const soundsMap = {
      pop1: popSoundRef,
      pop2: pop2SoundRef,
      win: winSoundRef,
      loss: loseSoundRef,
      draw: drawSoundRef
    }
    try {
      const status = await soundsMap[soundType].current?.getStatusAsync()
      status && status.isLoaded && soundsMap[soundType].current?.replayAsync();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
		const popSoundObject = new Audio.Sound();
		const pop2SoundObject = new Audio.Sound();
		const winSoundObject = new Audio.Sound();
		const loseSoundObject = new Audio.Sound();
		const drawSoundObject = new Audio.Sound();
		// Load sounds
		const loadSounds = async () => {
			await popSoundObject.loadAsync(require('../../assets/pop_1.wav'));
			await pop2SoundObject.loadAsync(require('../../assets/pop_2.wav'));
			await winSoundObject.loadAsync(require('../../assets/win.mp3'));
			await loseSoundObject.loadAsync(require('../../assets/loss.mp3'));
			await drawSoundObject.loadAsync(require('../../assets/draw.mp3'));
			popSoundRef.current = popSoundObject;
			pop2SoundRef.current = pop2SoundObject;
			winSoundRef.current = winSoundObject;
			loseSoundRef.current = loseSoundObject;
			drawSoundRef.current = drawSoundObject;
		}
		loadSounds();
		return () => {
			// unload sounds on component unmount
			popSoundObject && popSoundObject.unloadAsync();
			pop2SoundObject && pop2SoundObject.unloadAsync();
			winSoundObject && winSoundObject.unloadAsync();
			loseSoundObject && loseSoundObject.unloadAsync();
			drawSoundObject && drawSoundObject.unloadAsync();
		}
	}, []);

  return playSound;
}