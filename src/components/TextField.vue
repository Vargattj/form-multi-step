<template>
    <input :minlength="minlength" :maxlength="maxlength" :class="{ 'error': errorMessage }" :type="field.type"
        v-model=field.value placeholder="Sua resposta..." data-cy="text-input">
</template> 
  
<script>
export default {
    props: {
        field: {},
        minlength: Number,
        maxlength: Number,
        errorMessage: Boolean
    },
    data() {
        return {
        }
    },

}
</script>
  