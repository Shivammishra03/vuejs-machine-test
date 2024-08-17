  
<script setup>
    import { ref } from 'vue';
    import apiClient from '@/utils/httpClient';
    import { useVuelidate } from '@vuelidate/core'
    import { required, minLength, maxLength, helpers } from '@vuelidate/validators'
  
    const name = ref('');
    const image = ref(null);
    const continent = ref('');
    const rank = ref('');
    const emit = defineEmits(['country-added']);
    const props = defineProps({
        continents: Object
    });

    const rules = {
        name: { 
            required: helpers.withMessage('This value is required', required),
            minLength: minLength(3), 
            maxLength: maxLength(20),
        },
        image: { required: helpers.withMessage('This value is required', required) },
        continent: { required: helpers.withMessage('This value is required', required) },
        rank: { required: helpers.withMessage('This value is required', required) },
    }
    const $v = useVuelidate(rules, {name, image, continent,rank})
  
    const handleFileUpload = (event) => {
        const imageFile = event.target.files[0];
        let imageValues = document.getElementById('imageValue');
        if (imageFile && (imageFile.type === 'image/jpeg' || imageFile.type === 'image/png') && imageFile.size <= 4 * 1024 * 1024) {
            image.value = imageFile;
        } else {
            alert("Please upload maximum 4mb of image! ")
            image.value = '';
            imageValues.value = '';
        }
    };

    const submitForm = async () => {
        const isFormCorrect = await $v.value.$validate();
        let imageValues = document.getElementById('imageValue');
        if (isFormCorrect) {
            const formData = new FormData();
            formData.append('name', name.value);
            formData.append('image', image.value);
            formData.append('continent', continent.value);
            formData.append('rank', rank.value);
        
            try {
                await apiClient.post('api/country', formData);
                emit('country-added');
                alert('Country added successfully!');
                name.value = '';
                image.value = null;
                imageValues.value = '';
                continent.value = '';
                rank.value = '';
                $v.value.$reset();
            } catch (error) {
                alert('Error adding country: ' + error.response.data.error);
            }
        }
    };
</script>

<template>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Country Name<span class="required">*</span></label>
        <input type="text" v-model="name" />
        <div class="input-errors" v-for="error of $v.name.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
      <div>
        <label for="continent">Continent<span class="required">*</span></label>
        <select v-model="continent">
          <option v-for="c in props.continents" :key="c">{{ c }}</option>
        </select>
        <div class="input-errors" v-for="error of $v.continent.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
      <div>
        <label for="rank">Rank<span class="required">*</span></label>
        <input type="number" v-model="rank" />
        <div class="input-errors" v-for="error of $v.rank.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
      <div>
        <label for="image">Country Image<span class="required">*</span></label>
        <input id="imageValue" type="file" @change="handleFileUpload" accept=".jpg,.png" />
        <div v-if="$v.image.$error">
            <div class="input-errors" v-for="error of $v.image.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
      </div>
      <button type="submit" class="submit-btn">Add Country</button>
    </form>
</template>

<style  scoped>
.input-errors .error-msg {
    color: red;
    font-size: .875rem;
}
.required {
    color: red;
}
.submit-btn {
    color: #fff;
    border-radius: 6px;
    padding: 5px;
    border: 1px solid;
    background-color: #0404fcbf;
    margin-top: 8px;
    cursor: pointer;
}
</style>
  