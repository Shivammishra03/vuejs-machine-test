<script setup>
import { ref, onMounted } from 'vue';
import apiClient from './utils/httpClient';
import CountryList from '@/components/CountryList.vue';
import CountryDetails from '@/components/CountryDetails.vue';
import CountryForm from '@/components/CountryForm.vue';

const selectedCountryId = ref('');
const countries = ref([]);
const uniqueContinents = ref([]);

const setCountryId = (id) => {
  selectedCountryId.value = id;
};

const refreshCountries = async () => {
  const response = await apiClient.get('api/countries');
  countries.value = response.data;
  uniqueContinents.value = [...new Set(countries.value.map(c => c.continent))];
};

onMounted(() => {
  refreshCountries();
});
</script>

<template>
  <div class="app-container">
    <div class="main-content">
      <section class="preview-section">
        <h3 class="section-title">Country Preview</h3>
        <CountryList @country-selected="setCountryId" :countriesData="countries" />
        <CountryDetails :countryId="selectedCountryId" />
      </section>
      <section class="form-section">
        <h3 class="section-title">Add a New Country</h3>
        <CountryForm @country-added="refreshCountries" :continents="uniqueContinents" />
      </section>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  padding: 16px;
  max-width: 1200px;
  margin: auto;
  font-family: Arial, sans-serif;
}

.main-content {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.section-title {
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 12px;
  text-align: center;
}

.preview-section, .form-section {
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
}
</style>