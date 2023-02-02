<template>
  <Layout>
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
const { Layout } = DefaultTheme
</script>