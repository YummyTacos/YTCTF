<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <Modal header="Подтвердите удаление" id="taskDeleteModal">
        <p>
            Вы действительно хотите удалить задание <i>{{ task.title }}</i>?
        </p>
        <p class="irreversible">Это действие необратимо!</p>
        <!--suppress HtmlUnknownAttribute -->
        <template #footer>
            <ModalDismiss>Нет, я ошибся</ModalDismiss>
            <button class="btn btn-danger" @click="rmTask">Да, удалить</button>
        </template>
    </Modal>
</template>

<script>
    import Modal from "./Modal";
    import ModalDismiss from "./ModalDismiss";
    import api from "../../api";
    import jQuery from "jquery";
    import helpers from "../../helpers";

    export default {
        name: "TaskDeleteModal",
        components: {
            ModalDismiss,
            Modal
        },
        props: {
            task: {
                type: Object,
                required: true
            }
        },
        methods: {
            rmTask() {
                const vm = this;
                api.delete(api.method.admin.task, {
                    data: {
                        id: this.task.id
                    },
                    onSuccess() {
                        jQuery('#taskDeleteModal').modal('hide');
                        vm.$store.commit(helpers.transactions.ADD_NOTIFICATION, {
                            text: 'Задание удалено!',
                            color: 'success'
                        });
                        vm.$router.go(-1);
                    },
                    onFail(r, status) {
                        jQuery('#taskDeleteModal').modal('hide');
                        const err = helpers.defaultErrorHandler(r, status);
                        vm.$store.commit(helpers.transactions.ADD_NOTIFICATION, err);
                    }
                })
            }
        },
    }
</script>

<style scoped>
    .irreversible {
        font-weight: bold;
        font-style: italic;
        text-decoration: underline;
    }
</style>