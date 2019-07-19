<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <form @submit.prevent="onSubmit($event.target)"
          :class="{'was-validated': validated}"
          class="bg-dark text-light"
          novalidate>
        <slot></slot>
    </form>
</template>

<script>
    export default {
        name: "CustomForm",
        props: {
            validated: {
                type: Boolean,
                default: false
            },
            onSubmit: {
                type: Function,
                default() {
                    return () => null;
                }
            }
        }
    }
</script>

<style scoped>

</style>