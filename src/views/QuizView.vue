<template>
  <div
    class="min-h-screen relative overflow-hidden font-sans selection:bg-yellow-300 flex flex-col items-center justify-center p-3 md:p-6"
    :class="`bg-gradient-to-b ${
      card?.bgGradient || 'from-indigo-100 via-purple-50 to-indigo-100'
    }`"
  >
    <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        v-for="n in 5"
        :key="`cloud-${n}`"
        class="absolute opacity-40 animate-float-slow"
        :style="getRandomCloudStyle()"
      >
        ☁️
      </div>
      <div
        v-for="n in 8"
        :key="`star-${n}`"
        class="absolute opacity-30 animate-twinkle text-2xl"
        :style="getRandomStarStyle()"
      >
        ✨
      </div>
    </div>

    <div
      v-if="card"
      class="relative w-full max-w-4xl z-10 flex flex-col h-full max-h-[95vh]"
    >
      <div class="flex justify-between items-center mb-4 px-2">
        <button
          @click="router.back()"
          class="bg-white hover:bg-yellow-100 text-slate-600 rounded-full p-3 transition-all border-4 border-slate-100 shadow-[0_4px_0_#cbd5e1] active:shadow-none active:translate-y-1"
        >
          <ArrowLeft class="w-6 h-6 stroke-[3px]" />
        </button>

        <div
          v-if="isRegistered"
          class="bg-[#F4EEB1] text-yellow-900 px-6 py-3 rounded-full border-[3px] border-yellow-600 shadow-[0_4px_0_#D97706] font-black flex gap-2 text-lg items-center"
        >
          <span class="text-xl">⭐</span>
          <span class="text-xl">{{ Math.round(finalScorePercentage) }}</span>
        </div>
      </div>

      <transition name="bounce-switch" mode="out-in">
        <div 
          v-if="!isRegistered" 
          key="registration"
          class="flex-1 flex flex-col items-center justify-center w-full"
        >
          <div class="bg-white border-[6px] border-white shadow-[0_10px_0_rgba(0,0,0,0.1)] rounded-[3rem] p-8 md:p-12 text-center w-full max-w-md">
            <div class="text-6xl mb-6 animate-bounce-slow">👋</div>
            <h2 class="text-3xl font-black text-slate-800 mb-2">Halo Teman!</h2>
            <p class="text-slate-500 font-bold mb-8">Masukkan namamu sebelum mulai kuis ya!</p>
            
            <input 
              v-model="userName"
              type="text"
              placeholder="Ketik namamu di sini..."
              class="w-full px-6 py-4 rounded-2xl border-4 border-slate-100 focus:border-yellow-400 outline-none text-center text-xl font-bold text-slate-700 transition-all mb-6"
              @keyup.enter="startQuiz"
            />

            <button
              @click="startQuiz"
              :disabled="!userName.trim()"
              class="w-full bg-indigo-500 disabled:bg-slate-300 text-white py-4 rounded-2xl font-black text-xl border-b-4 border-indigo-700 shadow-lg hover:bg-indigo-400 active:translate-y-1 active:border-b-0 transition-all"
            >
              MULAI KUIS 🚀
            </button>
          </div>
        </div>

        <div
          v-else-if="!showResult"
          key="question"
          class="flex-1 flex flex-col justify-center w-full relative"
        >
          <div class="relative w-full z-20 mt-8">
            <div
              class="absolute -top-16 left-1/2 -translate-x-1/2 z-30 transition-all duration-300 transform hover:scale-110 cursor-pointer"
              @click="playQuestionAudio"
            >
              <div class="text-[5rem] md:text-[6rem] filter drop-shadow-xl animate-float-y select-none">
                {{ mascotExpression }}
              </div>
            </div>

            <div class="bg-white/95 backdrop-blur-xl border-[6px] border-white shadow-[0_8px_0_rgba(0,0,0,0.1)] rounded-[3rem] p-6 pt-16 md:p-10 min-h-[220px] flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <button
                @click.stop="playQuestionAudio"
                class="absolute top-4 right-4 bg-blue-100 text-blue-500 p-2 rounded-full hover:bg-blue-200"
              >
                <Volume2 class="w-6 h-6" />
              </button>
              <h2 class="text-xl md:text-3xl font-black text-slate-700 leading-snug">
                {{ currentQuestion.question }}
              </h2>
            </div>
          </div>

          <div class="relative h-14 flex items-center justify-center -my-7 z-30 pointer-events-none">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-[6px] border-white">
              <div class="w-full h-full rounded-full flex items-center justify-center font-black text-2xl text-white shadow-inner" :class="card.color">
                {{ currentQuestionIndex + 1 }}
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 md:gap-4 mt-10 z-10 w-full pb-4">
            <button
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              @click="handleAnswer(index)"
              :disabled="isAnswered"
              class="relative group h-auto min-h-[80px] md:h-24 rounded-[1.5rem] md:rounded-[2rem] border-b-[4px] md:border-b-[6px] transition-all duration-200 transform active:scale-95 flex items-center overflow-hidden px-2 py-2 md:px-6"
              :class="getOptionClass(index)"
            >
              <div class="w-8 h-8 md:w-12 md:h-12 rounded-full flex-shrink-0 flex items-center justify-center font-black text-sm md:text-xl border-2 border-white/30 mr-2 md:mr-4" :class="getLabelClass(index)">
                {{ ["A", "B", "C", "D"][index] }}
              </div>
              <span class="text-xs md:text-xl font-bold text-left flex-1 leading-tight break-words">
                {{ option }}
              </span>
              <span v-if="isAnswered && index === currentQuestion.correctIndex" class="absolute right-1 md:right-4 text-2xl md:text-4xl animate-pop-in">🎉</span>
              <span v-if="isAnswered && selectedOption === index && index !== currentQuestion.correctIndex" class="absolute right-1 md:right-4 text-2xl md:text-4xl animate-shake">🙈</span>
            </button>
          </div>
        </div>

        <div v-else key="result" class="flex-1 flex flex-col items-center justify-center w-full">
          <div class="bg-white border-[6px] border-white shadow-[0_10px_0_rgba(0,0,0,0.1)] rounded-[3rem] p-8 md:p-12 text-center w-full max-w-2xl">
            <div class="mb-6 relative inline-block">
              <div class="text-[8rem] animate-bounce-slow">{{ resultEmoji }}</div>
              <div class="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 font-black px-4 py-1 rounded-full text-lg border-2 border-white rotate-12">
                {{ Math.round(finalScorePercentage) }}%
              </div>
            </div>

            <h2 class="text-3xl md:text-5xl font-black text-slate-800 mb-2 tracking-tight uppercase">
              {{ userName }}, {{ resultTitle }}
            </h2>
            <p class="text-slate-500 font-bold mb-8 text-xl">
              Kamu dapat <span class="text-yellow-500 text-2xl">⭐ {{ Math.round(finalScorePercentage) }}</span> poin!
            </p>

            <div class="flex flex-col gap-4 w-full">
              <button
                v-if="!hasSentWA"
                @click="finishAndSendWA"
                class="w-full bg-green-500 text-white py-6 rounded-2xl font-black text-2xl border-b-8 border-green-700 shadow-xl hover:bg-green-400 active:translate-y-2 active:border-b-0 transition-all animate-pulse"
              >
                📲 KIRIM HASIL KE WHATSAPP
              </button>

              <div v-else class="flex flex-col md:flex-row gap-4 animate-pop-in">
                <button
                  @click="restartQuiz"
                  class="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-black text-lg border-b-4 border-slate-200 hover:bg-slate-200 active:translate-y-1 transition-all"
                >
                  🔄 MAIN LAGI
                </button>
                <button
                  @click="router.push('/')"
                  class="flex-1 bg-indigo-500 text-white py-4 rounded-2xl font-black text-lg border-b-4 border-indigo-700 hover:bg-indigo-400 active:translate-y-1 transition-all"
                >
                  🏠 MENU UTAMA
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="showConfetti" class="absolute inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
          <div class="w-full h-full absolute top-0 left-0">
            <div v-for="n in 30" :key="n" class="confetti" :style="getConfettiStyle()"></div>
          </div>
          <div class="bg-white/90 backdrop-blur px-8 py-4 rounded-3xl shadow-2xl border-4 border-green-200 transform scale-125 animate-pop-in z-50">
            <h3 class="text-3xl font-black text-green-600">HEBAT! 🌟</h3>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { cardsData } from "../data/cards";
import { ArrowLeft, Volume2 } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();

// --- STATE ---
const card = computed(() => cardsData.find((c) => c.id === route.params.id));
const questions = computed(() => (card.value ? card.value.quiz : []));
const totalQuestions = computed(() => questions.value.length);

const userName = ref("");
const isRegistered = ref(false);
const hasSentWA = ref(false); 
const currentQuestionIndex = ref(0);
const score = ref(0);
const isAnswered = ref(false);
const selectedOption = ref(null);
const isCorrect = ref(false);
const showResult = ref(false);
const showConfetti = ref(false);

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);
const finalScorePercentage = computed(() => (score.value / totalQuestions.value) * 100);

// --- LOGIC ---
const startQuiz = () => {
  if (userName.value.trim()) isRegistered.value = true;
};

const finishAndSendWA = () => {
  const phoneNumber = "6281282803243";
  const finalScore = score.value; // Jumlah benar
  const finalPercentage = Math.round(finalScorePercentage.value);
  
  // PERBAIKAN: Menggunakan template literal murni dan encodeURIComponent
  const rawMessage = `*LAPORAN HASIL KUIS*

👤 *Nama:* ${userName.value}
📚 *Materi:* ${card.value.title}
✅ *Skor Akhir:* ${finalScore} poin
📊 *Persentase:* ${finalPercentage}%
🔥 *Status:* ${resultTitle.value}`;
  
  const encodedText = encodeURIComponent(rawMessage);
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
  
  window.open(waUrl, "_blank");
  hasSentWA.value = true;
};

const restartQuiz = () => {
  showResult.value = false;
  hasSentWA.value = false;
  currentQuestionIndex.value = 0;
  score.value = 0;
  isAnswered.value = false;
  selectedOption.value = null;
};

const handleAnswer = (index) => {
  if (isAnswered.value) return;
  speechSynthesis.cancel();
  selectedOption.value = index;
  isAnswered.value = true;
  isCorrect.value = index === currentQuestion.value.correctIndex;
  
  if (isCorrect.value) { 
    score.value++; 
    triggerConfetti(); 
  }
  
  setTimeout(() => {
    if (currentQuestionIndex.value < totalQuestions.value - 1) {
      currentQuestionIndex.value++;
      isAnswered.value = false;
      selectedOption.value = null;
    } else {
      showResult.value = true;
    }
  }, 2000);
};

// --- STYLING HELPERS ---
const mascotExpression = computed(() => {
  if (showResult.value) return "🥳";
  if (isAnswered.value) return isCorrect.value ? "🤩" : "😢";
  return "🤔";
});

const resultEmoji = computed(() => {
  if (finalScorePercentage.value === 100) return "👑";
  if (finalScorePercentage.value >= 80) return "🦸";
  return "🌱";
});

const resultTitle = computed(() => {
  if (finalScorePercentage.value === 100) return "SEMPURNA!";
  if (finalScorePercentage.value >= 80) return "KAMU KEREN!";
  return "AYO COBA LAGI!";
});

const getOptionClass = (index) => {
  const base = "bg-white border-slate-200 text-slate-600 shadow-sm";
  if (!isAnswered.value) return `${base} hover:bg-yellow-50 hover:border-yellow-300 cursor-pointer`;
  if (index === currentQuestion.value.correctIndex) return "bg-green-100 border-green-500 text-green-700 ring-4 ring-green-200/50 z-10 scale-[1.02]";
  if (selectedOption.value === index) return "bg-rose-100 border-rose-400 text-rose-700 opacity-80 animate-shake";
  return "bg-slate-50 border-transparent text-slate-300 opacity-40 grayscale scale-95";
};

const getLabelClass = (index) => {
  if (!isAnswered.value) return "bg-slate-100 text-slate-400 group-hover:bg-yellow-400 group-hover:text-yellow-900";
  if (index === currentQuestion.value.correctIndex) return "bg-green-500 text-white";
  if (selectedOption.value === index) return "bg-rose-500 text-white";
  return "bg-slate-200 text-slate-400";
};

const playQuestionAudio = () => {
  speechSynthesis.cancel();
  const ut = new SpeechSynthesisUtterance(currentQuestion.value.question);
  ut.lang = "id-ID"; ut.rate = 0.9; ut.pitch = 1.1;
  speechSynthesis.speak(ut);
};

const getRandomCloudStyle = () => ({ top: `${Math.random() * 80}%`, left: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 20 + 30}s` });
const getRandomStarStyle = () => ({ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s` });
const getConfettiStyle = () => ({
  left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s`,
  backgroundColor: ["#fbbf24", "#3b82f6", "#ef4444", "#10b981", "#f472b6"][Math.floor(Math.random() * 5)],
});
const triggerConfetti = () => { showConfetti.value = true; setTimeout(() => (showConfetti.value = false), 1500); };

onMounted(() => { if (!card.value) router.replace("/"); });
</script>

<style scoped>
@keyframes floatSlow { 0% { transform: translateX(-100px); } 100% { transform: translateX(100vw); } }
.animate-float-slow { animation: floatSlow linear infinite; }

@keyframes twinkle { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.5); } }
.animate-twinkle { animation: twinkle 3s ease-in-out infinite; }

@keyframes bounceSlow { 0%, 100% { transform: translateY(0) rotate(2deg); } 50% { transform: translateY(-4px) rotate(-2deg); } }
.animate-bounce-slow { animation: bounceSlow 3s infinite ease-in-out; }

.bounce-switch-enter-active { animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.bounce-switch-leave-active { animation: popIn 0.3s reverse; }

@keyframes popIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
.animate-pop-in { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px) rotate(-5deg); } 75% { transform: translateX(5px) rotate(5deg); } }
.animate-shake { animation: shake 0.4s ease-in-out; }

.confetti { position: absolute; width: 10px; height: 10px; top: -20px; animation: confetti-fall 1.5s linear forwards; }
@keyframes confetti-fall { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }

.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>