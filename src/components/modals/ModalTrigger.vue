<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <button type="button"
            class="btn"
            data-toggle="modal"
            :class="'btn-' + btnColor"
            :data-target="'#' + forModal">
        <slot>Открыть диалоговое окно</slot>
    </button>
</template>

<script>
    export default {
        name: "ModalTrigger",
        props: {
            btnColor: {
                type: String,
                default: 'primary'
            },
            forModal: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>