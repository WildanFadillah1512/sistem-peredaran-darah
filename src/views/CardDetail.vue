<template>
  <div class="min-h-screen relative overflow-hidden font-['Fredoka'] selection:bg-pink-300 selection:text-white bg-[#E0F7FA]">
    
    <component is="style">
      @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;600;700&display=swap');
    </component>

    <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div :class="`absolute inset-0 bg-gradient-to-b ${card?.bgGradient || 'from-sky-200 via-white to-sky-100'} opacity-80`"></div>
      
      <div v-for="n in 15" :key="n" 
           class="absolute opacity-40 animate-float-random filter blur-[0.5px]"
           :style="getRandomStyle()"
      >
        {{ getThemeIcon(card?.id) }}
      </div>
    </div>

    <div v-if="!card" class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
      <div class="text-9xl animate-bounce">🤔</div>
      <h2 class="mt-6 text-3xl font-black text-blue-500 tracking-wider">Sedang Menyiapkan...</h2>
    </div>

    <template v-else>
      
      <div class="absolute inset-0 z-10 w-full h-full cursor-grab active:cursor-grabbing">
        <model-viewer 
          :src="card.modelUrl"
          :alt="card.title"
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          auto-rotate
          rotation-per-second="20deg"
          shadow-intensity="1"
          shadow-softness="1"
          exposure="1.0"
          camera-orbit="0deg 75deg 105%" 
          field-of-view="30deg"
          min-camera-orbit="auto auto 5%" 
          max-camera-orbit="auto auto 200%"
          min-field-of-view="10deg"
          max-field-of-view="45deg"
          interpolation-decay="200"
          interaction-prompt="none"
          class="w-full h-full focus:outline-none"
          style="--poster-color: transparent; background-color: transparent;"
        >
          <button slot="ar-button" class="absolute top-24 right-4 md:right-8 bg-white text-slate-800 p-3 rounded-2xl font-black shadow-[4px_4px_0_#000] border-2 border-black flex flex-col items-center gap-1 animate-wiggle hover:bg-yellow-300 transition-colors pointer-events-auto">
            <span class="text-3xl">📱</span>
            <span class="text-[10px] uppercase tracking-wider">Lihat AR</span>
          </button>
        </model-viewer>

        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 animate-fade-in-out">
           <div class="bg-black/50 text-white px-4 py-2 rounded-full font-bold backdrop-blur-sm">
             👆 Putar aku!
           </div>
        </div>
      </div>

      <div class="absolute top-0 left-0 w-full p-4 md:p-6 z-50 flex justify-between items-start pointer-events-none">
        <router-link to="/" class="pointer-events-auto group">
          <div class="bg-white border-[3px] border-slate-800 shadow-[4px_4px_0_#1e293b] active:shadow-none active:translate-x-1 active:translate-y-1 p-3 rounded-2xl transition-all flex items-center justify-center hover:bg-red-100 group-hover:rotate-3">
            <ArrowLeft class="w-8 h-8 text-slate-800" stroke-width="4" />
          </div>
        </router-link>

        <div class="bg-white/90 backdrop-blur-sm border-[3px] border-blue-400 shadow-[4px_4px_0_#60A5FA] px-6 py-3 rounded-[2rem] transform -rotate-2 animate-float-y pointer-events-auto">
          <div class="text-[10px] md:text-xs font-black text-blue-400 uppercase tracking-widest mb-1">
              ✨ Ruang Belajar ✨
          </div>
          <div class="text-xl md:text-3xl font-black text-slate-700 leading-none">
            {{ card?.title }}
          </div>
        </div>
      </div>

      <div class="absolute bottom-4 md:bottom-8 left-0 w-full z-50 px-4 pointer-events-none flex justify-center">
        
        <div class="bg-white border-[4px] border-slate-800 shadow-[0_8px_0_rgba(0,0,0,0.2)] rounded-[2.5rem] p-5 md:p-6 w-full max-w-3xl relative overflow-hidden pointer-events-auto">
          
          <div class="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
            
            <div class="flex-shrink-0 flex flex-row md:flex-col items-center gap-4 w-full md:w-auto justify-center">
               
               <button 
                 @click="playAudio"
                 :class="`w-16 h-16 md:w-20 md:h-20 rounded-full border-[4px] border-slate-800 shadow-[4px_4px_0_#000] flex items-center justify-center transition-all active:translate-y-1 active:shadow-none ${isPlaying ? 'bg-pink-400 animate-pulse' : 'bg-[#FFD93D] hover:bg-[#FFC107]'}`"
               >
                 <component :is="isPlaying ? Pause : Play" class="w-8 h-8 text-slate-900 fill-current" stroke-width="3" />
               </button>

               <button 
                 @click="goToQuiz"
                 class="flex-1 md:w-full bg-blue-400 hover:bg-blue-300 text-white border-[3px] border-slate-800 px-4 py-3 rounded-xl font-black text-sm shadow-[4px_4px_0_#1e293b] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
               >
                 <span class="text-xl">🎮</span> 
                 <span>KUIS</span>
               </button>
            </div>

            <div class="flex-1 text-center md:text-left w-full min-w-0">
               
               <div class="relative bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 md:p-5 max-h-[30vh] md:max-h-[250px] overflow-y-auto custom-scrollbar group">
                 <span class="absolute top-2 left-2 text-4xl text-blue-200 opacity-50 font-serif leading-none">“</span>
                 
                 <p class="text-base md:text-lg text-slate-600 font-bold leading-relaxed relative z-10 pr-2">
                   {{ card.description }}
                 </p>
               </div>
               
               <div class="mt-3 flex items-center justify-center md:justify-between gap-2 px-2">
                  <div class="flex items-center gap-2">
                    <span class="text-xl animate-bounce">{{ isPlaying ? '🗣️' : '😶' }}</span>
                    <span class="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      {{ isPlaying ? 'Sedang bercerita...' : 'Klik tombol kuning!' }}
                    </span>
                  </div>
                  
                  <div class="flex gap-1 h-4 items-end">
                    <div v-for="n in 5" :key="n" 
                         class="w-1.5 bg-slate-300 rounded-full transition-all" 
                         :class="isPlaying ? 'animate-music-bar bg-pink-400' : 'h-1.5'" 
                         :style="{ animationDelay: `${n * 0.1}s` }">
                    </div>
                  </div>
               </div>
            </div>

          </div>

          <div v-if="isPlaying" class="absolute bottom-0 left-0 h-1.5 w-full bg-slate-100">
             <div class="h-full bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 animate-loading-bar w-full"></div>
          </div>

        </div>
      </div>

    </template>
  </div>
</template>

<script setup>
import '@google/model-viewer';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { cardsData } from '../data/cards';
import { ArrowLeft, Play, Pause } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const card = computed(() => cardsData.find(c => c.id === route.params.id));
const isPlaying = ref(false);

const getThemeIcon = (id) => {
  if (!id) return '✨';
  if (id.includes('jantung')) return '❤️';
  if (id.includes('pembuluh')) return '🛣️'; 
  if (id.includes('darah')) return '🩸';
  if (id.includes('paru') || id.includes('kecil')) return '🌬️';
  if (id.includes('besar')) return '🏃';
  if (id.includes('gangguan')) return '🦠';
  if (id.includes('sehat')) return '🥗';
  return '🌟';
};

const getRandomStyle = () => {
  const top = Math.random() * 100;
  const left = Math.random() * 100;
  const size = Math.random() * 3 + 2; // Lebih besar
  const duration = Math.random() * 15 + 10;
  const delay = Math.random() * 5;
  return {
    top: `${top}%`,
    left: `${left}%`,
    fontSize: `${size}rem`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`
  };
};

const getBestVoice = () => {
  const voices = speechSynthesis.getVoices();
  let bestVoice = voices.find(v => v.lang === 'id-ID' && v.name.includes('Google'));
  if (!bestVoice) bestVoice = voices.find(v => v.lang === 'id-ID');
  return bestVoice;
};

const playAudio = () => {
  if (!card.value) return;
  if (isPlaying.value) {
    speechSynthesis.cancel();
    isPlaying.value = false;
    return;
  }
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(card.value.description);
  const selectedVoice = getBestVoice();
  if (selectedVoice) utterance.voice = selectedVoice;
  utterance.lang = 'id-ID';
  utterance.rate = 0.9; 
  utterance.pitch = 1.1; 
  utterance.onstart = () => isPlaying.value = true;
  utterance.onend = () => isPlaying.value = false;
  speechSynthesis.speak(utterance);
};

const goToQuiz = () => {
  speechSynthesis.cancel();
  isPlaying.value = false;
  router.push(`/quiz/${card.value.id}`);
};

onMounted(() => {
  setTimeout(() => { playAudio(); }, 1500);
});

onUnmounted(() => {
  speechSynthesis.cancel();
  isPlaying.value = false;
});
</script>

<style scoped>
/* Animasi Float Random Background */
@keyframes floatRandom {
  0% { transform: translateY(0) rotate(0deg); opacity: 0; }
  20% { opacity: 0.3; }
  80% { opacity: 0.3; }
  100% { transform: translateY(-120px) rotate(360deg); opacity: 0; }
}
.animate-float-random { animation: floatRandom linear infinite; }

/* Animasi Float Y (Naik Turun Halus) */
@keyframes floatY {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-6px) rotate(-2deg); }
}
.animate-float-y { animation: floatY 3s infinite ease-in-out; }

/* Animasi Wiggle (Goyang) */
@keyframes wiggle {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}
.animate-wiggle { animation: wiggle 2s ease-in-out infinite; }

/* Animasi Music Bar */
@keyframes musicBar {
  0%, 100% { height: 30%; }
  50% { height: 100%; }
}
.animate-music-bar { animation: musicBar 0.4s ease-in-out infinite alternate; }

/* Animasi Loading Bar */
@keyframes loadingBar {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.animate-loading-bar { animation: loadingBar 2s infinite linear; }

/* Animasi Fade Hint */
@keyframes fadeOut {
  0% { opacity: 0; transform: translate(-50%, -40%); }
  20% { opacity: 1; transform: translate(-50%, -50%); }
  80% { opacity: 1; transform: translate(-50%, -50%); }
  100% { opacity: 0; transform: translate(-50%, -60%); }
}
.animate-fade-in-out { animation: fadeOut 4s ease-out forwards; animation-delay: 1s; }

/* Custom Scrollbar Lucu - Diperbesar sedikit agar mudah di-tap */
.custom-scrollbar::-webkit-scrollbar { width: 8px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; margin: 10px 0; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; border: 2px solid #f1f5f9; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>