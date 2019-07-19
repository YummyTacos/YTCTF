<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <button type="button" class="btn" :class="'btn-' + btnColor" data-dismiss="modal">
        <slot>Отмена</slot>
    </button>
</template>

<script>
    export default {
        name: "ModalDismiss",
        props: {
            btnColor: {
                type: String,
                default: 'secondary'
            }
        }
    }
</script>

<style scoped>

</style>