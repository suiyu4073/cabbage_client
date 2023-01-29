<template>
  <div
    class=" w-10 h-10 text-sm sm:w-12 sm:h-12 rounded-full flex-none flex items-center justify-center font-bold text-opacity-50 shadow-md"
    :style="{ backgroundColor: qolor.color }" :class="qolor.isLight ? 'text-black' : 'text-white'">
    {{ id.slice(0, 3) }}
  </div>
</template>

<script setup>
import { ref } from 'vue'
import uniqolor from 'uniqolor'

const qolor = ref(uniqolor(props.id))
const props = defineProps(['id'])
</script>