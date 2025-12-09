<template>
  <div class="relative min-h-screen w-full overflow-hidden bg-[#FFF9F0]">
    
    <div class="absolute inset-0 pointer-events-none z-0">
       <div class="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-yellow-300/20 blur-[100px] rounded-full animate-pulse-slow"></div>
       <div class="absolute bottom-[-20%] right-[-20%] w-[80vw] h-[80vw] bg-blue-300/20 blur-[100px] rounded-full animate-pulse-slow" style="animation-delay: 2s;"></div>
    </div>

    <router-view v-slot="{ Component }">
      <transition name="fly-zoom" mode="out-in">
        <component :is="Component" class="absolute inset-0 w-full h-full z-10" />
      </transition>
    </router-view>
    
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #FFF9F0;
}

/* --- ANIMASI FLY TO (INNOVATIVE) --- */

.fly-zoom-enter-active {
  /* Durasi cepat tapi elastis (seperti mainan) */
  animation: fly-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 50;
}

.fly-zoom-leave-active {
  /* Keluar memudar ke belakang */
  animation: fly-out 0.5s ease-in;
  z-index: 0;
}

@keyframes fly-in {
  0% {
    opacity: 0;
    /* Mulai dari kecil (seperti kartu) dan sedikit di bawah */
    transform: scale(0.3) translateY(100px);
    border-radius: 100px; /* Mulai bulat */
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
    border-radius: 0px; /* Menjadi kotak layar penuh */
  }
}

@keyframes fly-out {
  0% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0px);
  }
  100% {
    opacity: 0;
    transform: scale(1.1); /* Zoom in sedikit saat hilang */
    filter: blur(20px); /* Efek cinematic blur */
  }
}

@keyframes pulseSlow {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.2); opacity: 0.5; }
}
.animate-pulse-slow {
  animation: pulseSlow 8s infinite ease-in-out;
}
</style>