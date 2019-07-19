<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <div class="form-group">
        <label :for="id">
            {{ label !== null ? label : placeholder }}
        </label>
        <input ref="input"
               v-bind="$attrs"
               class="form-control bg-dark text-light"
               :value="value"
               :id="id"
               :required="required"
               :placeholder="placeholder"
               :class="validityClass"
               @input="$emit('input', $event.target.value)">
        <div class="invalid-feedback" v-if="error !== null">
            {{ error }}
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "FormInput",
        inheritAttrs: false,
        props: {
            id: {
                type: String,
                required: true
            },
            required: {
                type: Boolean,
                default: true
            },
            placeholder: {
                type: String,
                default: null
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
            },
            forceValidity: {
                type: String,
                default: null
            }
        },
        computed: {
            validityClass() {
                return this.forceValidity ? 'is-' + this.forceValidity : null;
            }
        }
    }
</script>

<style scoped>

</style>