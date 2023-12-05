<template>
    <div class="progress-bar">
        <div class="progress" :style="{ width: `${percentage}%` }"></div>
    </div>
</template>
  
<script>
export default {
    props: {
        formStyle: {},
        currentIndex: {
            type: Number,
            default: 0
        },
        totalItems: {
            type: Number,
            default: 0
        }
    },
    computed: {
        percentage() {
            return (this.currentIndex + 1) / this.totalItems * 100;
        }
    }
}
</script>
  
<style scoped>
.progress-bar {
    width: 100%;
    height: 4px;
    background: hsla(0, 0%, 100%, .3);
    overflow: hidden;
    position: absolute;
    top: 0;
    z-index: 10;
}

.progress {
    height: 100%;
    transition: width 0.3s ease;
    overflow: hidden;
    background-color: var(--button-color);
}
</style>
  