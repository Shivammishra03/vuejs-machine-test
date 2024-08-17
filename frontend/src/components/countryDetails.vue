<script setup>
  import { ref, watch } from 'vue';
  import apiClient from '@/utils/httpClient';
  
  const props = defineProps({
    countryId: Number
  });
  
  const country = ref(null); 

  watch(() => props.countryId, async (newId) => {
    if (newId) {
      const response = await apiClient.get(`api/country/${newId}`);
      country.value = response.data;
    }
  });
  const getFlagUrl = (imagePath) => {
    return `${(import.meta.env.VITE_API_URL) + imagePath }`;
  };
</script>

<template>
    <div v-if="country">
      <p>country Name: {{ country.name }}</p>
      <p>Rank: {{ country.rank }}</p>
      <p>Continent: {{ country.continent }}</p>
      <p>Flag:</p>
      <img :src="getFlagUrl(country.flag)" alt="Country Image" />
    </div>
</template>

<style scoped>
img{
  width: 125px;
}
</style>