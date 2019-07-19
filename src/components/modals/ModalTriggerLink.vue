<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <a data-toggle="modal"
       :href="'#' + forModal">
        <slot>Открыть диалоговое окно</slot>
    </a>
</template>

<script>
    export default {
        name: "ModalTriggerLink",
        props: {
            forModal: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>