<template>
  <div
    class="min-h-screen relative overflow-hidden font-['Fredoka'] selection:bg-pink-300 selection:text-white bg-[#E0F7FA]"
  >
    <component is="style">
      @import
      url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;600;700&display=swap');
    </component>

    <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        :class="`absolute inset-0 bg-gradient-to-b ${
          card?.bgGradient || 'from-sky-200 via-white to-sky-100'
        } opacity-80`"
      ></div>

      <div
        v-for="n in 15"
        :key="n"
        class="absolute opacity-40 animate-float-random filter blur-[0.5px]"
        :style="getRandomStyle()"
      >
        {{ getThemeIcon(card?.id) }}
      </div>
    </div>

    <div
      v-if="!card"
      class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md"
    >
      <div class="text-9xl animate-bounce">🤔</div>
      <h2 class="mt-6 text-3xl font-black text-blue-500 tracking-wider">
        Sedang Menyiapkan...
      </h2>
    </div>

    <template v-else>
      <!-- 2D Image with 3D Effect (Portfolio Style) - RESPONSIF -->
      <div
        class="absolute inset-0 z-10 w-full h-full flex items-center justify-center pt-20 pb-[200px] md:pt-24 md:pb-[240px] px-4"
      >
        <div
          class="image-3d-container cursor-pointer"
          @click="goTo3DView"
          @mousemove="handleMouseMove"
          @mouseleave="handleMouseLeave"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
          :style="getImageStyle()"
        >
          <img :src="card.image2D" :alt="card.title" class="responsive-image" />
          <div class="image-overlay" :class="getOverlayClass()">
            <div class="view-3d-badge">
              <span class="text-2xl">🔍</span>
              <span class="font-black">Lihat Model 3D</span>
            </div>
          </div>
        </div>
      </div>

      <div
        class="absolute top-0 left-0 w-full p-3 md:p-6 z-50 pointer-events-none"
      >
        <div class="flex justify-between items-start gap-2">
          <router-link to="/" class="pointer-events-auto group">
            <div
              :class="`border-[3px] border-slate-800 shadow-[4px_4px_0_#1e293b] active:shadow-none active:translate-x-1 active:translate-y-1 p-2.5 md:p-3 rounded-2xl transition-all flex items-center justify-center group-hover:rotate-3 ${
                card?.bgGradient === 'from-rose-100 to-rose-300'
                  ? 'bg-rose-50 hover:bg-rose-100'
                  : card?.bgGradient === 'from-blue-100 to-blue-300'
                  ? 'bg-blue-50 hover:bg-blue-100'
                  : card?.bgGradient === 'from-red-100 to-red-300'
                  ? 'bg-red-50 hover:bg-red-100'
                  : card?.bgGradient === 'from-sky-100 to-sky-300'
                  ? 'bg-sky-50 hover:bg-sky-100'
                  : card?.bgGradient === 'from-orange-100 to-orange-300'
                  ? 'bg-orange-50 hover:bg-orange-100'
                  : card?.bgGradient === 'from-green-100 to-green-300'
                  ? 'bg-green-50 hover:bg-green-100'
                  : 'bg-white hover:bg-red-100'
              }`"
            >
              <ArrowLeft
                class="w-7 h-7 md:w-8 md:h-8 text-slate-800"
                stroke-width="4"
              />
            </div>
          </router-link>

          <!-- Title Badge + Fun Fact Button Container (Sama seperti Model3DView) -->
          <div class="flex flex-col items-end gap-2 flex-1">
            <!-- Title Badge -->
            <div
              class="bg-white/90 backdrop-blur-sm border-[3px] border-blue-400 shadow-[4px_4px_0_#60A5FA] px-4 py-2 md:px-6 md:py-3 rounded-[2rem] transform -rotate-2 animate-float-y pointer-events-auto"
            >
              <div
                class="text-[10px] md:text-xs font-black text-blue-400 uppercase tracking-widest mb-0.5 md:mb-1"
              >
                ✨ Ruang Belajar ✨
              </div>
              <div
                class="text-base md:text-3xl font-black text-slate-700 leading-none"
              >
                {{ card?.title }}
              </div>
            </div>

            <!-- Fun Fact Button (Sejajar dengan AR Button di Model3DView) -->
            <button
              @click="toggleFunFact"
              class="pointer-events-auto bg-gradient-to-r from-red-500 to-yellow-400 hover:from-red-400 hover:to-yellow-300 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full font-black text-xs md:text-sm shadow-[3px_3px_0_#000] border-2 border-white transition-all active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center gap-2 animate-float-y"
            >
              <Lightbulb class="w-4 h-4 md:w-5 md:h-5" />
              <span>FUN FACT</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Box Deskripsi Diperkecil & Diturunkan -->
      <div
        class="absolute bottom-3 md:bottom-6 left-0 w-full z-50 px-3 md:px-4 pointer-events-none flex justify-center"
      >
        <div
          :class="`border-[4px] border-slate-800 shadow-[0_8px_0_rgba(0,0,0,0.2)] rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-5 w-full max-w-3xl relative overflow-hidden pointer-events-auto ${
            card?.bgGradient === 'from-rose-100 to-rose-300'
              ? 'bg-rose-50/95'
              : card?.bgGradient === 'from-blue-100 to-blue-300'
              ? 'bg-blue-50/95'
              : card?.bgGradient === 'from-red-100 to-red-300'
              ? 'bg-red-50/95'
              : card?.bgGradient === 'from-sky-100 to-sky-300'
              ? 'bg-sky-50/95'
              : card?.bgGradient === 'from-orange-100 to-orange-300'
              ? 'bg-orange-50/95'
              : card?.bgGradient === 'from-green-100 to-green-300'
              ? 'bg-green-50/95'
              : 'bg-white'
          }`"
        >
          <div class="flex flex-col md:flex-row gap-3 md:gap-4 items-center">
            <div
              class="flex-shrink-0 flex flex-row md:flex-col items-center gap-3 md:gap-4 w-full md:w-auto justify-center"
            >
              <button
                @click="playAudio"
                :class="`w-14 h-14 md:w-16 md:h-16 rounded-full border-[4px] border-slate-800 shadow-[4px_4px_0_#000] flex items-center justify-center transition-all active:translate-y-1 active:shadow-none ${
                  isPlaying
                    ? 'bg-pink-400 animate-pulse'
                    : 'bg-[#FFD93D] hover:bg-[#FFC107]'
                }`"
              >
                <component
                  :is="isPlaying ? Pause : Play"
                  class="w-6 h-6 md:w-8 md:h-8 text-slate-900 fill-current"
                  stroke-width="3"
                />
              </button>

              <button
                @click="goToQuiz"
                class="flex-1 md:w-full bg-blue-400 hover:bg-blue-300 text-white border-[3px] border-slate-800 px-4 py-2.5 md:py-3 rounded-xl font-black text-xs md:text-sm shadow-[4px_4px_0_#1e293b] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
              >
                <span class="text-lg md:text-xl">🎮</span>
                <span>KUIS</span>
              </button>
            </div>

            <div class="flex-1 text-center md:text-left w-full min-w-0">
              <div
                class="relative bg-slate-50 border-2 border-slate-200 rounded-2xl p-3 md:p-4 h-[100px] md:h-[120px] overflow-y-auto custom-scrollbar group"
              >
                <span
                  class="absolute top-1 left-1 md:top-2 md:left-2 text-3xl md:text-4xl text-blue-200 opacity-50 font-serif leading-none"
                  >"</span
                >

                <p
                  class="text-sm md:text-base text-slate-600 font-bold leading-relaxed relative z-10 pr-2 whitespace-pre-line"
                >
                  {{ currentContent }}
                </p>

                <button
                  v-if="!showFullContent && card.fullContent"
                  @click="showFullContent = true"
                  class="mt-2 text-blue-500 font-black text-xs md:text-sm hover:text-blue-600 transition-colors underline"
                >
                  Baca Selengkapnya 📖
                </button>
              </div>

              <div
                class="mt-2 md:mt-3 flex items-center justify-center md:justify-between gap-2 px-2"
              >
                <div class="flex items-center gap-2">
                  <span class="text-base md:text-xl animate-bounce">{{
                    isPlaying ? "🗣️" : "😶"
                  }}</span>
                  <span
                    class="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wide"
                  >
                    {{
                      isPlaying ? "Sedang bercerita..." : "Klik tombol kuning!"
                    }}
                  </span>
                </div>

                <div class="flex gap-1 h-4 items-end">
                  <div
                    v-for="n in 5"
                    :key="n"
                    class="w-1.5 bg-slate-300 rounded-full transition-all"
                    :class="
                      isPlaying ? 'animate-music-bar bg-pink-400' : 'h-1.5'
                    "
                    :style="{ animationDelay: `${n * 0.1}s` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="isPlaying"
            class="absolute bottom-0 left-0 h-1.5 w-full bg-slate-100"
          >
            <div
              class="h-full bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 animate-loading-bar w-full"
            ></div>
          </div>
        </div>
      </div>

      <transition name="modal-fade">
        <div
          v-if="showFunFact"
          @click="showFunFact = false"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <div
            @click.stop
            class="bg-white rounded-3xl border-4 border-slate-800 shadow-[8px_8px_0_#000] p-6 md:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto custom-scrollbar transform transition-all"
            :class="showFunFact ? 'scale-100 rotate-0' : 'scale-75 rotate-12'"
          >
            <div class="flex justify-between items-start mb-6">
              <div class="flex items-center gap-3">
                <div
                  class="bg-gradient-to-r from-red-500 to-yellow-400 p-3 rounded-2xl"
                >
                  <Lightbulb class="w-8 h-8 text-white" />
                </div>
                <h3 class="text-2xl md:text-3xl font-black text-slate-800">
                  Fun Facts!
                </h3>
              </div>
              <button
                @click="showFunFact = false"
                class="bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"
              >
                <X class="w-6 h-6" />
              </button>
            </div>

            <div class="space-y-4">
              <div
                v-for="(fact, index) in card.funFacts"
                :key="index"
                class="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-orange-400 rounded-xl p-4 transform transition-all hover:scale-[1.02] hover:shadow-lg"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                <p class="text-lg font-bold text-slate-700 leading-relaxed">
                  {{ fact }}
                </p>
              </div>
            </div>

            <div class="mt-6 flex justify-center">
              <button
                @click="playFunFactsAudio"
                class="bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-2xl font-black shadow-[4px_4px_0_#15803d] border-2 border-green-700 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2"
              >
                <Volume2 class="w-5 h-5" />
                <span>Dengarkan Semua!</span>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </template>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { cardsData } from "../data/cards";
import { ArrowLeft, Play, Pause, Lightbulb, X, Volume2 } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const card = computed(() => cardsData.find((c) => c.id === route.params.id));
const isPlaying = ref(false);
const showFunFact = ref(false);
const showFullContent = ref(false);

// Parallax effect state
const mouseX = ref(0);
const mouseY = ref(0);
const isHovering = ref(false);

const currentContent = computed(() => {
  if (!card.value) return "";
  if (showFullContent.value && card.value.fullContent) {
    return card.value.fullContent;
  }
  return card.value.description;
});

const goTo3DView = () => {
  router.push(`/model3d/${card.value.id}`);
};

const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  mouseX.value = ((x - centerX) / centerX) * 15; // Max 15deg rotation
  mouseY.value = ((y - centerY) / centerY) * -15;
  isHovering.value = true;
};

const handleMouseLeave = () => {
  mouseX.value = 0;
  mouseY.value = 0;
  isHovering.value = false;
};

// Touch handlers untuk mobile
const handleTouchStart = (e) => {
  isHovering.value = true;
};

const handleTouchMove = (e) => {
  e.preventDefault(); // Prevent scrolling while dragging

  const touch = e.touches[0];
  const rect = e.currentTarget.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  mouseX.value = ((x - centerX) / centerX) * 15; // Max 15deg rotation
  mouseY.value = ((y - centerY) / centerY) * -15;
};

const handleTouchEnd = () => {
  // Reset position smoothly after touch ends
  mouseX.value = 0;
  mouseY.value = 0;
  isHovering.value = false;
};

const getImageStyle = () => {
  return {
    transform: `perspective(1000px) rotateY(${mouseX.value}deg) rotateX(${
      mouseY.value
    }deg) scale(${isHovering.value ? 1.05 : 1})`,
    transition: isHovering.value
      ? "transform 0.1s ease-out"
      : "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
    touchAction: "none", // Prevent default touch behaviors
  };
};

// Function untuk mendapatkan class overlay sesuai warna card
const getOverlayClass = () => {
  if (!card.value) return "";

  const gradientMap = {
    "from-rose-100 to-rose-300": "overlay-rose",
    "from-blue-100 to-blue-300": "overlay-blue",
    "from-red-100 to-red-300": "overlay-red",
    "from-sky-100 to-sky-300": "overlay-sky",
    "from-orange-100 to-orange-300": "overlay-orange",
    "from-green-100 to-green-300": "overlay-green",
  };

  return gradientMap[card.value.bgGradient] || "overlay-default";
};

const getThemeIcon = (id) => {
  if (!id) return "✨";
  if (id.includes("jantung")) return "🫀";
  if (id.includes("pembuluh")) return "💉";
  if (id.includes("darah")) return "🩸";
  if (id.includes("kecil")) return "🌬️";
  if (id.includes("besar")) return "🧠";
  if (id.includes("gangguan")) return "🦠";
  if (id.includes("sehat")) return "🥗";
  return "🌟";
};

const getRandomStyle = () => {
  const top = Math.random() * 100;
  const left = Math.random() * 100;
  const size = Math.random() * 3 + 2;
  const duration = Math.random() * 15 + 10;
  const delay = Math.random() * 5;
  return {
    top: `${top}%`,
    left: `${left}%`,
    fontSize: `${size}rem`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
  };
};

const getBestVoice = () => {
  const voices = speechSynthesis.getVoices();
  let bestVoice = voices.find(
    (v) => v.lang === "id-ID" && v.name.includes("Google")
  );
  if (!bestVoice) bestVoice = voices.find((v) => v.lang === "id-ID");
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
  const utterance = new SpeechSynthesisUtterance(currentContent.value);
  const selectedVoice = getBestVoice();
  if (selectedVoice) utterance.voice = selectedVoice;
  utterance.lang = "id-ID";
  utterance.rate = 0.9;
  utterance.pitch = 1.1;
  utterance.onstart = () => (isPlaying.value = true);
  utterance.onend = () => (isPlaying.value = false);
  speechSynthesis.speak(utterance);
};

const playFunFactsAudio = () => {
  if (!card.value || !card.value.funFacts) return;
  speechSynthesis.cancel();
  const allFacts = card.value.funFacts.join(". ");
  const utterance = new SpeechSynthesisUtterance(allFacts);
  const selectedVoice = getBestVoice();
  if (selectedVoice) utterance.voice = selectedVoice;
  utterance.lang = "id-ID";
  utterance.rate = 0.9;
  utterance.pitch = 1.1;
  speechSynthesis.speak(utterance);
};

const toggleFunFact = () => {
  showFunFact.value = !showFunFact.value;
};

const goToQuiz = () => {
  speechSynthesis.cancel();
  isPlaying.value = false;
  router.push(`/quiz/${card.value.id}`);
};

onMounted(() => {
  setTimeout(() => {
    playAudio();
  }, 1500);
});

onUnmounted(() => {
  speechSynthesis.cancel();
  isPlaying.value = false;
});
</script>

<style scoped>
@keyframes floatRandom {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  20% {
    opacity: 0.3;
  }
  80% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(-120px) rotate(360deg);
    opacity: 0;
  }
}
.animate-float-random {
  animation: floatRandom linear infinite;
}

@keyframes floatY {
  0%,
  100% {
    transform: translateY(0) rotate(-2deg);
  }
  50% {
    transform: translateY(-6px) rotate(-2deg);
  }
}
.animate-float-y {
  animation: floatY 3s infinite ease-in-out;
}

@keyframes musicBar {
  0%,
  100% {
    height: 30%;
  }
  50% {
    height: 100%;
  }
}
.animate-music-bar {
  animation: musicBar 0.4s ease-in-out infinite alternate;
}

@keyframes loadingBar {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
.animate-loading-bar {
  animation: loadingBar 2s infinite linear;
}

@keyframes pulseSlow {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
.animate-pulse-slow {
  animation: pulseSlow 2s ease-in-out infinite;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-from .bg-white,
.modal-fade-leave-to .bg-white {
  transform: scale(0.8) rotate(12deg);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
  margin: 10px 0;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
  border: 2px solid #f1f5f9;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Portfolio Style 3D Image Container - RESPONSIF */
.image-3d-container {
  position: relative;
  width: 100%;
  max-width: 340px;
  height: auto;
  aspect-ratio: 4/3;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  border: 3px solid rgba(255, 255, 255, 0.8);
  background: white;
  transform-style: preserve-3d;
  will-change: transform;
}

@media (min-width: 768px) {
  .image-3d-container {
    max-width: 500px;
    aspect-ratio: 16/9;
    border-radius: 24px;
    border: 4px solid rgba(255, 255, 255, 0.8);
  }
}

.image-3d-container:hover {
  box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.35);
}

.responsive-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  user-select: none;
  pointer-events: none;
}

.image-overlay {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Overlay colors matching card backgrounds */
.overlay-rose {
  background: linear-gradient(
    135deg,
    rgba(251, 113, 133, 0.9),
    rgba(244, 63, 94, 0.9)
  );
}

.overlay-blue {
  background: linear-gradient(
    135deg,
    rgba(96, 165, 250, 0.9),
    rgba(59, 130, 246, 0.9)
  );
}

.overlay-red {
  background: linear-gradient(
    135deg,
    rgba(248, 113, 113, 0.9),
    rgba(239, 68, 68, 0.9)
  );
}

.overlay-sky {
  background: linear-gradient(
    135deg,
    rgba(125, 211, 252, 0.9),
    rgba(56, 189, 248, 0.9)
  );
}

.overlay-orange {
  background: linear-gradient(
    135deg,
    rgba(251, 146, 60, 0.9),
    rgba(249, 115, 22, 0.9)
  );
}

.overlay-green {
  background: linear-gradient(
    135deg,
    rgba(74, 222, 128, 0.9),
    rgba(34, 197, 94, 0.9)
  );
}

.overlay-default {
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.9),
    rgba(147, 51, 234, 0.9)
  );
}

.image-3d-container:hover .image-overlay {
  opacity: 1;
}

.view-3d-badge {
  background: white;
  padding: 0.75rem 1.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transform: translateY(20px);
  transition: transform 0.3s ease;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  font-size: 0.875rem;
}

@media (min-width: 768px) {
  .view-3d-badge {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
}

.image-3d-container:hover .view-3d-badge {
  transform: translateY(0);
}
</style>
