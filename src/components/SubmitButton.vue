<template>
    <button data-cy="submit" class="submit-button" @click.prevent.stop="next()"
        :style="{ '--bg-color': formStyle.bgColor, '--textColor': formStyle.textColor, '--button-color': formStyle.buttonColor }">
        <span v-if="index === totalItens - 2">
            <font-awesome-icon icon='check' />
            Enviar respostas
        </span>
        <span v-else>
            {{ btnText }}
        </span>
    </button>
</template>
  
<style lang="scss">
.submit-button {
    width: fit-content;
    border: 0;
    font-size: 16px;
    padding: 8px 16px;
    border-radius: 5px;
    box-shadow: 0 0 6px rgba(0, 0, 0, .2);
    margin-top: 16px;
    cursor: pointer;
    color: var(--bg-color);
    background-color: var(--button-color);
}
</style>

<script>
export default {
    props: {
        totalItens: Number,
        index: Number,
        btnText: String,
        formStyle: {},
    },
    methods: {
        next() {
            this.$emit("submitField")
        },
    }
}
</script>
  
<style scoped></style>
  