<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <div class="custom-file bg-dark text-light">
        <input ref="input"
               v-bind="$attrs"
               class="custom-file-input bg-dark text-light"
               type="file"
               :value="value"
               :id="id"
               @input="$emit('input', $event.target.value)">
        <label :for="id" class="custom-file-label bg-dark text-light">
            {{ label }}
        </label>

        <div class="invalid-feedback" v-if="error !== null">
            {{ error }}
        </div>
        <slot></slot>
    </div>
</template>

<script>
    import bsCustomFileInput from 'bs-custom-file-input';

    export default {
        name: "FormFile",
        inheritAttrs: false,
        props: {
            id: {
                type: String,
                required: true
            },
            label: {
                type: String,
                default: null
            },
            value: {
                default: null
            },
            error: {
                type: String,
                default: null
            }
        },
        mounted() {
            bsCustomFileInput.init();
        }
    }
</script>

<style scoped>

</style>