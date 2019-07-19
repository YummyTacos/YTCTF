<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <div class="my-1">
        <button class="btn" :class="'btn-' + btnColor" type="submit">
            <slot>Отправить</slot>
        </button>
    </div>
</template>

<script>
    export default {
        name: "SubmitButton",
        props: {
            btnColor: {
                type: String,
                default: 'primary'
            }
        }
    }
</script>

<style scoped>

</style>