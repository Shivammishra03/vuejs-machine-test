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
    <div>
        <label for="selectedCountryId">Select Country</label>
        <select v-model="selectedCountryId" @change="fetchCountryDetails">
            <option v-for="country in props.countriesData" :key="country.id" :value="country.id">{{ country.name }}</option>
        </select>
    </div>
</template> 