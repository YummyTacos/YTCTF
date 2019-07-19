<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <div class="modal fade" :id="id" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content bg-dark text-light">
                <div class="modal-header">
                    <h5 class="modal-title">{{ header }}</h5>
                    <button type="button" class="close text-light" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer">
                        <ModalDismiss/>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ModalDismiss from "./ModalDismiss";
    export default {
        name: "Modal",
        components: {
            ModalDismiss
        },
        props: {
            id: {
                type: String,
                required: true
            },
            header: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>