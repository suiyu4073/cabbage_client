<template>
  <Layout>
    <template #doc-before>
      <ClientOnly>
        <ViewCounter />
      </ClientOnly>
    </template>
    <template #doc-after>
      <ClientOnly>
        <Comment />
      </ClientOnly>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import Comment from './Comment.vue'
import ViewCounter from './ViewCounter.vue'
const { Layout } = DefaultTheme
</script>