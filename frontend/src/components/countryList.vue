<script setup>
import { ref } from 'vue';

const selectedCountryId = ref('');
const emit = defineEmits(['country-selected']);
const props = defineProps({
  countriesData: Object
});

const fetchCountryDetails = () => {
  emit('country-selected', selectedCountryId.value);
};
</script>

<template>
  <div class="country-list-container">
    <label for="selectedCountryId" class="country-list-label">Select a Country</label>
    <select
      v-model="selectedCountryId"
      @change="fetchCountryDetails"
      id="selectedCountryId"
      class="country-list-dropdown"
    >
      <option value="" disabled>Select a country</option>
      <option v-for="country in countriesData" :key="country.id" :value="country.id">
        {{ country.name }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.country-list-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
select {
  height: 35px;
}
.country-list-label {
  font-size: 1rem;
  color: #555;
}

.country-list-dropdown {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #f9f9f9;
}

.country-list-dropdown:focus {
  outline: none;
  border-color: #6200ea;
}
</style>