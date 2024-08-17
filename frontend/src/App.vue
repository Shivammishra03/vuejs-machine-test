<script setup>
import { ref, onMounted, computed } from 'vue';
import apiClient from './utils/httpClient';
import CountryList from '@/components/countryList.vue';
import CountryDetails from '@/components/countryDetails.vue';
import CountryForm from '@/components/countryForm.vue';


const selectedCountryId = ref('');
const countries = ref([]);
const uniqueContinents = ref([]);

const setCountryId = (id) => {
  selectedCountryId.value = id;
  console.log(selectedCountryId.value)
};

const numberCountryId = computed(() => Number(selectedCountryId.value));

const refreshCountries = async () => {
  const response = await apiClient.get('api/countries');
  countries.value = response.data;
  uniqueContinents.value = [...new Set(countries.value.map(c => c.continent))];
};

onMounted(() => {
  refreshCountries()
});

</script>

<template>
  <div class="main-section">
    <div class="preview-section">
      <h3 class="text-center">Preview</h3>
      <CountryList @country-selected="setCountryId"  :countriesData="countries"/>
      <CountryDetails :countryId="numberCountryId" />
    </div>
    <div class="form-section">
      <h3 class="text-center">Add Country</h3>
      <CountryForm @country-added="refreshCountries" :continents="uniqueContinents" />
    </div>
  </div>
</template>

<style scoped>
.text-center {
  text-align: center;
}
.preview-section {
  margin-right: 16px;
}
.preview-section, .form-section {
  border: 1px solid #BDBDBD;
  border-radius: 8px;
  padding: 16px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
