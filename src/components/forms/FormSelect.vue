<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <div class="form-group">
        <label :for="id">
            {{ label === null ? defaultOptionText : label }}
        </label>
        <select ref="input"
                class="custom-select bg-dark text-light"
                :id="id"
                @change="$emit('change', $event.target.value)">
            <option disabled :selected="value === ''" value="">{{ defaultOptionText }}</option>
            <option v-for="option in options"
                    v-bind="option.args || {}"
                    :key="option.value"
                    :value="option.value">
                {{ option.text }}
            </option>
        </select>
        <div class="invalid-feedback" v-if="error !== null">
            {{ error }}
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "FormSelect",
        inheritAttrs: false,
        model: {
            event: 'change'
        },
        props: {
            options: {
                type: Array,
                required: true
            },
            value: {
                type: String,
                default: ''
            },
            defaultOptionText: {
                type: String,
                default: 'Выберите элемент'
            },
            id: {
                type: String,
                required: true
            },
            label: {
                type: String,
                default: null
            },
            error: {
                type: String,
                default: null
            }
        }
    }
</script>

<style scoped>

</style>