<script setup>
  const props = defineProps({
    message: String
  });
  
</script>

<template>
    <div v-if="message" class="error-notification">
      <p>{{ message }}</p>
    </div>
</template>

<style scoped>
  .error-notification {
    color: white;
    background-color: red;
    padding: 10px;
    border-radius: 5px;
    margin: 10px 0;
  }
</style>
  