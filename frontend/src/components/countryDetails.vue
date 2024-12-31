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

const getFlagUrl = (imagePath) => `${import.meta.env.VITE_API_URL}${imagePath}`;
</script>

<template>
  <div class="country-details" v-if="country">
    <p><strong>Country Name:</strong> {{ country.name }}</p>
    <p><strong>Rank:</strong> {{ country.rank }}</p>
    <p><strong>Continent:</strong> {{ country.continent }}</p>
    <img :src="getFlagUrl(country.flag)" alt="Country Flag" class="flag-image" />
  </div>
</template>

<style scoped>
.country-details {
  margin-top: 16px;
  line-height: 1.6;
}

.flag-image {
  margin-top: 8px;
  width: 100px;
  border-radius: 4px;
}
</style>