<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <CustomForm :on-submit="processForm" :validated="validated">
        <Modal header="Добавить категорию" id="categoryModal">
            <FormInput ref="name"
                       id="name"
                       placeholder="Название"
                       v-model="name"
                       :error="error"/>
            <!--suppress HtmlUnknownAttribute -->
            <template #footer>
                <SubmitButton btn-color="success">Добавить</SubmitButton>
                <ModalDismiss/>
            </template>
        </Modal>
    </CustomForm>
</template>

<script>
    import Modal from "./Modal";
    import CustomForm from "../forms/CustomForm";
    import FormInput from "../forms/FormInput";
    import api from "../../api";
    import helpers from "../../helpers";
    import SubmitButton from "../SubmitButton";
    import ModalDismiss from "./ModalDismiss";
    import jQuery from "jquery";


    export default {
        name: "CategoryModal",
        components: {
            ModalDismiss,
            SubmitButton,
            FormInput,
            CustomForm,
            Modal
        },
        data() {
            return {
                name: '',
                error: null,
                validated: false
            }
        },
        computed: {
            field() {
                return this.$refs.name.$refs.input;
            }
        },
        watch: {
            name() {
                this.validated = false;
                this.error = null;
                this.field.setCustomValidity('');
            }
        },
        methods: {
            processForm(target) {
                this.validated = true;
                if (!target.checkValidity()) {
                    this.error = this.field.validationMessage;
                    return;
                }
                const vm = this;
                api.post(api.method.admin.category, {
                    data: {
                        name: this.name
                    },
                    onSuccess() {
                        vm.name = '';
                        const sel = jQuery('#categoryModal');
                        sel.modal('hide');
                        vm.$emit('refresh-list');
                    },
                    onFail(r, status) {
                        if (status.status === 400 || status.status === 401) {
                            const error = r.message;
                            vm.error = error;
                            vm.field.setCustomValidity(error);
                        } else {
                            const err = helpers.defaultErrorHandler(r, status);
                            vm.$store.commit(helpers.transactions.ADD_NOTIFICATION, err);
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>