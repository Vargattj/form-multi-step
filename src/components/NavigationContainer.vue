<template  v-if="fields">
    <nav class="navigation-container"  v-if="index != fieldsLength - 1">
        <button @click="back()" class="btn-navigation">
            <font-awesome-icon class="icon" :icon="['fas', 'arrow-up']" />
        </button>
        <Button @click="next()" class="btn-navigation">
            <font-awesome-icon class="icon" :icon="['fas', 'arrow-down']" />
        </Button>
    </nav>
</template>
  
<style lang="scss">
.navigation-container {
    position: absolute;
    right: 12px;
    display: flex;
    flex-direction: column;
    top: 50%;
    transform: translateY(-50%);

    .btn-navigation {
        margin: 5px 0;
        border: 0;
        background-color: transparent;
        cursor: pointer;
        transition: .2s ease-in;
        padding: 5px;
        color: var(--textColor);

        &:hover {
            color: var(--button-color);
        }

        >.icon {
            width: 18px;

            height: 21px;
        }
    }
}
</style>

<script>
export default {
    props: {
        fieldsLength: Number,
        index: Number,
    },
    methods: {
        next() {
            this.$emit("next")
        },
        back() {
            this.$emit("back")
        },
    }
};
</script>
  