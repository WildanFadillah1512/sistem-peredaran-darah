<template>
  <div
    class="min-h-screen relative overflow-y-auto md:overflow-hidden font-['Fredoka'] selection:bg-pink-300 selection:text-white bg-[#E0F7FA]"
  >
    <!-- Background -->
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

    <!-- Loading State -->
    <div
      v-if="!card"
      class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md"
    >
      <div class="text-6xl md:text-9xl animate-bounce">🤔</div>
      <h2
        class="mt-6 text-2xl md:text-3xl font-black text-blue-500 tracking-wider"
      >
        Sedang Menyiapkan...
      </h2>
    </div>

    <template v-else>
      <!-- Sketchfab 3D Model Viewer (TAMPILAN NORMAL) -->
      <div v-show="!isARMode" class="absolute inset-0 z-10 w-full h-full">
        <iframe
          :src="getSketchfabUrl()"
          :title="card.title"
          frameborder="0"
          allowfullscreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking; vr; camera"
          xr-spatial-tracking
          execution-while-out-of-viewport
          execution-while-not-rendered
          web-share
          class="w-full h-full"
          style="background: transparent"
        ></iframe>

        <!-- Hint untuk user - Responsive -->
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 animate-fade-in-out z-20"
        >
          <div
            class="bg-black/50 text-white px-3 py-2 md:px-4 md:py-2 rounded-full text-sm md:text-base font-bold backdrop-blur-sm"
          >
            👆 Putar aku!
          </div>
        </div>
      </div>

      <!-- AR MODE - Video Background + Three.js Model -->
      <div
        v-show="isARMode"
        class="absolute inset-0 z-10 w-full h-full bg-black"
      >
        <!-- Video Background (Kamera) -->
        <video
          ref="videoRef"
          autoplay
          playsinline
          class="absolute inset-0 w-full h-full object-cover"
        ></video>

        <!-- Three.js Canvas (Model 3D di atas video) -->
        <canvas
          ref="canvasRef"
          class="absolute inset-0 w-full h-full"
          style="pointer-events: auto"
        ></canvas>

        <!-- AR Loading Indicator - Responsive -->
        <div
          v-if="isLoadingAR"
          class="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-30"
        >
          <div class="text-center px-4">
            <div class="text-4xl md:text-6xl mb-4 animate-bounce">📸</div>
            <p class="text-white font-black text-base md:text-lg">
              Mengaktifkan Kamera...
            </p>
          </div>
        </div>

        <!-- Camera Error - Responsive -->
        <div
          v-if="cameraError"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl font-black text-center max-w-[90%] md:max-w-md z-30 text-sm md:text-base"
        >
          <div class="text-3xl md:text-4xl mb-2">⚠️</div>
          <p>{{ cameraError }}</p>
        </div>

        <!-- AR Controls - Moved to Top Left -->
        <div
          v-if="isARMode"
          class="absolute top-20 md:top-24 left-2 md:left-4 z-30 flex flex-col gap-2"
        >
          <button
            @click="resetModelPosition"
            class="bg-white/90 hover:bg-white text-slate-800 px-3 py-2 md:px-5 md:py-3 rounded-full font-black text-xs md:text-sm shadow-lg border-2 border-slate-200 transition-all active:scale-95 flex items-center gap-1 md:gap-2"
          >
            <span class="text-base md:text-lg">🔄</span>
            <span class="hidden sm:inline">Reset</span>
          </button>

          <button
            @click="toggleAutoRotate"
            class="bg-white/90 hover:bg-white text-slate-800 px-3 py-2 md:px-5 md:py-3 rounded-full font-black text-xs md:text-sm shadow-lg border-2 border-slate-200 transition-all active:scale-95 flex items-center gap-1 md:gap-2"
          >
            <span class="text-base md:text-lg">{{
              autoRotate ? "⏸️" : "▶️"
            }}</span>
            <span class="hidden sm:inline">{{
              autoRotate ? "Pause" : "Putar"
            }}</span>
          </button>
        </div>
      </div>

      <!-- Top Bar - Responsive -->
      <div class="absolute top-0 left-0 w-full p-2 md:p-3 lg:p-6 z-50">
        <div class="flex items-center justify-between gap-2">
          <!-- Back Button (hanya muncul saat BUKAN AR mode) -->
          <button
            v-if="!isARMode"
            @click="router.back()"
            class="group pointer-events-auto"
          >
            <div
              class="bg-white border-2 md:border-[3px] border-slate-800 shadow-[3px_3px_0_#1e293b] md:shadow-[4px_4px_0_#1e293b] active:shadow-none active:translate-x-1 active:translate-y-1 p-2 md:p-2.5 lg:p-3 rounded-xl md:rounded-2xl transition-all flex items-center justify-center hover:bg-red-100 group-hover:rotate-3"
            >
              <ArrowLeft
                class="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-slate-800"
                stroke-width="4"
              />
            </div>
          </button>

          <!-- Title Badge + AR Button Container - Responsive -->
          <div class="flex flex-col items-end gap-1.5 md:gap-2 flex-1">
            <!-- Title Badge - Responsive -->
            <div
              class="bg-white/90 backdrop-blur-sm border-2 md:border-[3px] border-blue-400 shadow-[3px_3px_0_#60A5FA] md:shadow-[4px_4px_0_#60A5FA] px-3 py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-3 rounded-2xl md:rounded-[2rem] transform -rotate-2 animate-float-y pointer-events-auto"
            >
              <div
                class="text-[8px] md:text-[10px] lg:text-xs font-black text-blue-400 uppercase tracking-widest mb-0 md:mb-0.5 lg:mb-1"
              >
                {{ isARMode ? "📸 AR Aktif" : "🔍 Model 3D" }}
              </div>
              <div
                class="text-sm md:text-base lg:text-3xl font-black text-slate-700 leading-none"
              >
                {{ card?.title }}
              </div>
            </div>

            <!-- AR Button - Responsive -->
            <button
              @click="toggleAR"
              :class="`${
                isARMode
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400'
              } text-white px-3 py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 rounded-full font-black text-[10px] md:text-xs lg:text-sm shadow-[2px_2px_0_#000] md:shadow-[3px_3px_0_#000] border border-white md:border-2 transition-all active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center gap-1 md:gap-2 animate-float-y pointer-events-auto`"
            >
              <span class="text-xs md:text-base lg:text-lg">{{
                isARMode ? "❌" : "📱"
              }}</span>
              <span>{{ isARMode ? "TUTUP AR" : "AR MODE" }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- AR Development Modal - Responsive -->
      <transition name="modal-fade">
        <div
          v-if="showARModal"
          @click="showARModal = false"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <div
            @click.stop
            class="bg-white rounded-2xl md:rounded-3xl border-3 md:border-4 border-slate-800 shadow-[6px_6px_0_#000] md:shadow-[8px_8px_0_#000] p-5 md:p-6 lg:p-8 max-w-md w-full transform transition-all"
            :class="showARModal ? 'scale-100 rotate-0' : 'scale-75 rotate-12'"
          >
            <div class="text-center">
              <div
                class="text-5xl md:text-7xl mb-3 md:mb-4 animate-bounce-slow"
              >
                🚧
              </div>
              <h3
                class="text-xl md:text-2xl lg:text-3xl font-black text-slate-800 mb-2 md:mb-3"
              >
                Sabar Ya!
              </h3>
              <p
                class="text-slate-600 font-bold text-sm md:text-base lg:text-lg mb-4 md:mb-6 leading-relaxed"
              >
                Fitur AR untuk
                <span class="text-blue-500">Pembuluh Darah</span> masih dalam
                tahap pengembangan!
              </p>

              <div
                class="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-3 md:border-l-4 border-orange-400 rounded-lg md:rounded-xl p-3 md:p-4 mb-4 md:mb-6"
              >
                <p class="text-xs md:text-sm font-bold text-slate-700">
                  💡 Tip: Kamu bisa coba fitur AR di model yang lain dulu!
                </p>
              </div>

              <button
                @click="showARModal = false"
                class="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-base md:text-lg border-b-3 md:border-b-4 border-purple-700 shadow-lg active:translate-y-1 active:border-b-0 transition-all"
              >
                OKE, SIAP! 🙏
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
import { ArrowLeft } from "lucide-vue-next";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const route = useRoute();
const router = useRouter();
const card = computed(() => cardsData.find((c) => c.id === route.params.id));

// AR State
const isARMode = ref(false);
const isLoadingAR = ref(false);
const cameraError = ref(null);
const videoRef = ref(null);
const canvasRef = ref(null);
const showARModal = ref(false);
const autoRotate = ref(true);

// Three.js variables
let scene, camera, renderer, controls, model;
let stream = null;
let animationId = null;

// Mapping Sketchfab model IDs
const sketchfabModels = {
  jantung: "b4823f17e22047ae9d92b2380cd8af18",
  "pembuluh-darah": "b8f3b4d3dc9747ff8caab36ba360ccd3",
  darah: "e01a1817341c41cd849bed62a29e949b",
  "peredaran-kecil": "a8abc9df1d454ccf82242c43c9fe29f0",
  "peredaran-besar": "a8abc9df1d454ccf82242c43c9fe29f0",
  "fungsi-manfaat": "ceb72b4da5e84a0a82c56dfeb888e396",
};

// Mapping model lokal untuk AR
const arModelPaths = {
  jantung: new URL("../assets/models/heart.glb", import.meta.url).href,
  darah: new URL("../assets/models/blood.glb", import.meta.url).href,
  "peredaran-kecil": new URL(
    "../assets/models/circulation-system.glb",
    import.meta.url
  ).href,
  "peredaran-besar": new URL(
    "../assets/models/circulation-system.glb",
    import.meta.url
  ).href,
  "fungsi-manfaat": new URL("../assets/models/kids.glb", import.meta.url).href,
};

const getSketchfabUrl = () => {
  if (!card.value) return "";
  const modelId = sketchfabModels[card.value.id];
  if (!modelId) return "";
  return `https://sketchfab.com/models/${modelId}/embed?autostart=1&transparent=1&ui_theme=dark&dnt=1&annotations_visible=1`;
};

const getARModelPath = () => {
  if (!card.value) return "";
  return arModelPaths[card.value.id] || "";
};

// --- AR FUNCTIONS ---
const toggleAR = async () => {
  if (card.value.id === "pembuluh-darah") {
    showARModal.value = true;
    return;
  }

  if (!getARModelPath()) {
    alert("❌ Model 3D untuk AR belum tersedia.");
    return;
  }

  if (!isARMode.value) {
    await startAR();
  } else {
    stopAR();
  }
};

const startAR = async () => {
  isLoadingAR.value = true;
  cameraError.value = null;

  try {
    // Request camera dengan fallback untuk berbagai device
    const constraints = {
      video: {
        facingMode: "environment",
        width: { ideal: 1920, max: 1920 },
        height: { ideal: 1080, max: 1080 },
      },
      audio: false,
    };

    stream = await navigator.mediaDevices.getUserMedia(constraints);

    if (videoRef.value) {
      videoRef.value.srcObject = stream;

      videoRef.value.onloadedmetadata = () => {
        videoRef.value.play();
        isARMode.value = true;
        isLoadingAR.value = false;

        // Initialize Three.js setelah video siap
        setTimeout(() => {
          initThreeAR();
        }, 100);
      };
    }
  } catch (err) {
    console.error("AR Camera Error:", err);
    cameraError.value =
      "Gagal mengakses kamera. Pastikan Anda memberikan izin kamera.";
    isLoadingAR.value = false;
  }
};

const stopAR = () => {
  // Stop animation loop
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

  // Stop camera stream
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
  }
  if (videoRef.value) {
    videoRef.value.srcObject = null;
  }

  // Cleanup Three.js
  if (renderer) {
    renderer.dispose();
    if (controls) controls.dispose();
    if (scene) {
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    }
    renderer = null;
    scene = null;
    camera = null;
    controls = null;
    model = null;
  }

  isARMode.value = false;
  cameraError.value = null;
  autoRotate.value = true;
};

const initThreeAR = () => {
  if (!canvasRef.value) return;

  const w = window.innerWidth;
  const h = window.innerHeight;

  // Scene
  scene = new THREE.Scene();

  // Camera - Responsive FOV
  const fov = window.innerWidth < 768 ? 60 : 50; // FOV lebih besar untuk mobile
  camera = new THREE.PerspectiveCamera(fov, w / h, 0.1, 1000);

  // Posisi kamera yang responsive
  const cameraDistance = window.innerWidth < 768 ? 4 : 3;
  camera.position.set(0, 0, cameraDistance);

  // Renderer dengan alpha (transparan)
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0); // Transparan

  // Controls - Optimized untuk mobile
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.enablePan = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2.0;

  // Touch sensitivity untuk mobile
  controls.rotateSpeed = window.innerWidth < 768 ? 0.7 : 1.0;
  controls.zoomSpeed = window.innerWidth < 768 ? 0.7 : 1.2;

  // Lighting - Ditingkatkan untuk berbagai kondisi
  const ambientLight = new THREE.AmbientLight(0xffffff, 2);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight2.position.set(-5, -5, -5);
  scene.add(directionalLight2);

  const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight3.position.set(0, 5, 0);
  scene.add(directionalLight3);

  // Load Model
  const loader = new GLTFLoader();
  loader.load(
    getARModelPath(),
    (gltf) => {
      model = gltf.scene;

      // Scale model agar pas - Responsive
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);

      // Scale berbeda untuk mobile dan desktop
      const targetSize = window.innerWidth < 768 ? 1.8 : 2.5;
      const scale = targetSize / maxDim;
      model.scale.multiplyScalar(scale);

      // Center model
      box.setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      scene.add(model);
    },
    undefined,
    (error) => {
      console.error("Error loading model:", error);
      cameraError.value = "Gagal memuat model 3D.";
    }
  );

  // Animation loop
  const animate = () => {
    if (!isARMode.value) return;
    animationId = requestAnimationFrame(animate);

    if (controls) {
      controls.autoRotate = autoRotate.value;
      controls.update();
    }
    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  };
  animate();

  // Handle resize - Responsive
  const onResize = () => {
    if (!renderer || !camera) return;
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Update camera aspect dan FOV
    camera.aspect = w / h;
    const fov = w < 768 ? 60 : 50;
    camera.fov = fov;
    camera.updateProjectionMatrix();

    // Update renderer size
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Update controls sensitivity
    if (controls) {
      controls.rotateSpeed = w < 768 ? 0.7 : 1.0;
      controls.zoomSpeed = w < 768 ? 0.7 : 1.2;
    }
  };
  window.addEventListener("resize", onResize);
};

const resetModelPosition = () => {
  if (controls) {
    controls.reset();
  }
};

const toggleAutoRotate = () => {
  autoRotate.value = !autoRotate.value;
};

const getThemeIcon = (id) => {
  if (!id) return "✨";
  if (id.includes("jantung")) return "🫀";
  if (id.includes("pembuluh")) return "💉";
  if (id.includes("darah")) return "🩸";
  if (id.includes("paru") || id.includes("kecil")) return "🌬️";
  if (id.includes("besar")) return "🧠";
  if (id.includes("sehat")) return "🥗";
  return "🌟";
};

const getRandomStyle = () => {
  const top = Math.random() * 100;
  const left = Math.random() * 100;
  const size = Math.random() * 2 + 1.5; // Lebih kecil untuk mobile
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

onUnmounted(() => {
  stopAR();
});
</script>

<style scoped>
/* Modal transitions */

@keyframes fadeOut {
  0% {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  20% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  80% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -60%);
  }
}
.animate-fade-in-out {
  animation: fadeOut 4s ease-out forwards;
  animation-delay: 1s;
}

@keyframes bounceSlow {
  0%,
  100% {
    transform: translateY(0) rotate(2deg);
  }
  50% {
    transform: translateY(-10px) rotate(-2deg);
  }
}
.animate-bounce-slow {
  animation: bounceSlow 2s infinite ease-in-out;
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

/* Responsive Touch Improvements */
@media (max-width: 768px) {
  /* Improve touch target sizes on mobile */
  button {
    min-width: 44px;
    min-height: 44px;
  }
}

/* Prevent text selection during interactions */
canvas {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}

/* Optimize for mobile performance */
@media (max-width: 768px) {
  .animate-float-random {
    animation-duration: 20s !important; /* Lebih lambat untuk performa */
  }
}
</style>
