<script setup>
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength, helpers } from '@vuelidate/validators';
import apiClient from '@/utils/httpClient';

const name = ref('');
const image = ref(null);
const continent = ref('');
const rank = ref('');
const emit = defineEmits(['country-added']);
const props = defineProps({
  continents: Array
});

const rules = {
  name: { required, minLength: minLength(3), maxLength: maxLength(20) },
  image: { required },
  continent: { required },
  rank: { required }
};

const $v = useVuelidate(rules, { name, image, continent, rank });

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file && (file.type === 'image/jpeg' || file.type === 'image/png') && file.size <= 4 * 1024 * 1024) {
    image.value = file;
  } else {
    alert('Invalid file! Only JPEG/PNG under 4MB are allowed.');
    image.value = null;
  }
};

const submitForm = async () => {
  if (await $v.value.$validate()) {
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('image', image.value);
    formData.append('continent', continent.value);
    formData.append('rank', rank.value);

    try {
      await apiClient.post('api/country', formData);
      emit('country-added');
      name.value = '';
      image.value = null;
      continent.value = '';
      rank.value = '';
      $v.value.$reset();
    } catch (error) {
      alert('Failed to add country!');
    }
  }
};
</script>

<template>
  <form @submit.prevent="submitForm" class="form-container">
    <div class="form-group">
      <label>Country Name</label>
      <input v-model="name" type="text" />
    </div>
    <div class="form-group">
      <label>Continent</label>
      <select v-model="continent">
        <option v-for="c in props.continents" :key="c">{{ c }}</option>
      </select>
    </div>
    <div class="form-group">
      <label>Rank</label>
      <input v-model="rank" type="number" />
    </div>
    <div class="form-group">
      <label>Country Flag</label>
      <input type="file" @change="handleFileUpload" />
    </div>
    <button type="submit" class="submit-button">Add Country</button>
  </form>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-group label {
  font-weight: bold;
}

.submit-button {
  padding: 8px 16px;
  background-color: #6200ea;
  color: #fff;
  border: none;
  border-radius: 4px;
}
</style>