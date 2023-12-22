<template>
    <div>
        <span class="field-tip" v-if="fieldTip">
            <font-awesome-icon :icon="['fas', 'list']" />
            {{ fieldTip }}
        </span>
        <ul class="checkbox-options" v-if="field && field.options">
            <li v-for="(option, index) in field.options"  :key="index"
                :class="{ 'selected': selectedOptions.find((item) => item == option.value) }" data-cy="checkbox-option">
                <label :for="option.id">
                    <input type="checkbox" v-model="selectedOptions" :value="option.value" :id="option.id">
                    {{ option.value }}
                </label>
            </li>
        </ul>
    </div>
</template> 
  
<script>
export default {
    props: {
        field: {},
        fieldTip: String,
    },
    data() {
        return {
            selectedOptions: []
        }
    },
    watch: {
        selectedOptions: function (val) {
            this.$emit("selectedOptionsChange", this.selectedOptions)
        },
    },
}
</script>
  
<style lang="scss">
.field-tip {
    color: #b0bec5;
    font-size: 14px;
    margin-top: 24px;
    display: block;
}

.checkbox-options {
    list-style: upper-alpha;
    margin: 0;
    padding: 0;
    counter-reset: item;
    list-style: none;
    padding: 0;
    margin-top: 12px;
    overflow-y: auto;
    max-height: 560px;
    >li {
        display: block;
        border: 1px solid #fff;
        font-size: 19px;
        border-radius: 4px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        padding: 3px 8px;

        &:last-child {
            margin-bottom: 0;
        }

        &:hover {
            background-color: rgba($color: #fff, $alpha: 0.1);

            &::before {
                border: 1px solid #fff;
            }
        }

        &.selected {
            background-color: rgba($color: #fff, $alpha: 0.1);

            &::before {
                background-color: #fff;
                color: #000;
            }

            input {
                border: 1px solid #fff;
            }

            label {
                font-weight: 600;
            }
        }

        &::before {
            background-color: rgba($color: #fff, $alpha: 0.15);
            color: #fff;
            width: 21px;
            height: 20px;
            display: inline-block;
            font-size: 12px;
            font-weight: 600;
            counter-increment: item;
            content: counter(item, upper-latin);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 3px;
            margin-right: 7px;
            transition: .2s ease-in;
            cursor: pointer;
        }

        input {
            display: none;
        }

        label {
            cursor: pointer;
            width: 100%;
            height: 100%;
        }
    }
}
</style>
  