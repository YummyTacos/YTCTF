<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <CustomForm :on-submit="processForm">
        <Modal :header="header" id="addTask">
            <FormInput ref="task"
                       id="task"
                       placeholder="Название"
                       v-model="taskName"/>
            <div class="form-row">
                <div class="col-8">
                    <FormSelect ref="category"
                                id="category"
                                default-option-text="Выберите категорию"
                                label="Категория"
                                v-model="category"
                                :options="categories"/>
                </div>
                <div class="col-4">
                    <FormInput ref="points"
                               id="points"
                               placeholder="0"
                               label="Баллы"
                               type="number"
                               min="0"
                               step="25"
                               v-model.number="points"/>
                </div>
            </div>
            <FormTextArea ref="description"
                          id="description"
                          placeholder="Описание"
                          v-model="description"
                          :mde="true"/>
            <!--<FormFile ref="files"
                      id="files"
                      label="Выберите файл"/>-->
            <FormSelect ref="author"
                        id="author"
                        default-option-text="Выберите автора"
                        label="Автор"
                        v-model="author"
                        v-if="user.is_admin"
                        :options="users"/>
            <FormTextArea ref="writeup"
                          id="writeup"
                          placeholder="Решение"
                          v-model="writeup"
                          :mde="true"/>
            <FormInput ref="flag"
                       id="flag"
                       placeholder="Флаг"
                       v-model="flag"
                       :type="'text'"/>
            <!--suppress HtmlUnknownAttribute -->
            <template #footer>
                <SubmitButton btn-color="success">{{ buttonText }}</SubmitButton>
                <ModalDismiss/>
            </template>
        </Modal>
    </CustomForm>
</template>

<script>
    import Modal from "./Modal";
    import CustomForm from "../forms/CustomForm";
    import FormInput from "../forms/FormInput";
    import FormSelect from "../forms/FormSelect";
    import FormTextArea from "../forms/FormTextArea";
    import api from "../../api";
    import helpers from "../../helpers";
    import jQuery from "jquery";
    import SubmitButton from "../SubmitButton";
    import ModalDismiss from "./ModalDismiss";

    export default {
        name: "TaskModal",
        components: {
            ModalDismiss,
            SubmitButton,
            FormTextArea,
            FormSelect,
            FormInput,
            CustomForm,
            Modal
        },
        props: {
            task: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                taskName: '',
                category: '',
                points: '',
                description: '',
                files: [],
                author: '',
                writeup: '',
                flag: '',
                categories: [],
                users: []
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            header() {
                return this.buttonText + ' задание';
            },
            buttonText() {
                if (this.user === null) {
                    return '';
                }
                if (this.task !== null) {
                    return 'Редактировать';
                }
                return this.user.is_admin ? 'Добавить' : 'Предложить';
            }
        },
        methods: {
            processForm() {
                const vm = this;
                const httpMethod = this.task !== null ? 'patch' : 'post';
                api.request(httpMethod, api.method.admin.task, {
                    data: {
                        id: vm.task !== null ? vm.task.id : null,
                        title: vm.taskName,
                        category: vm.category,
                        points: vm.points,
                        description: vm.description,
                        author: vm.author,
                        writeup: vm.writeup,
                        flag: vm.flag
                    },
                    onSuccess() {
                        jQuery('#addTask').modal('hide');
                        if (vm.task !== null) {
                            vm.emit('refresh-item');
                        } else {
                            vm.emit('refresh-list');
                        }
                    },
                    onFail(r, status) {
                        const err = helpers.defaultErrorHandler(r, status);
                        vm.$store.commit(helpers.transactions.ADD_NOTIFICATION, err);
                    }
                })
            }
        },
        beforeMount() {
            const vm = this;
            if (this.user === null) {
                return
            }
            if (this.user.is_admin) {
                api.get(api.method.users, {
                    onSuccess(r) {
                        vm.users = [];
                        for (const user of r.users) {
                            vm.users.push({text: user.username, value: user.id})
                        }
                    },
                    onFail(r, status) {
                        const err = helpers.defaultErrorHandler(r, status);
                        vm.$store.commit(helpers.transactions.ADD_NOTIFICATION, err);
                    }
                })
            }
            api.get(api.method.categories, {
                onSuccess(r) {
                    vm.categories = [];
                    for (const category of r.categories) {
                        vm.categories.push({text: category.name, value: category.id});
                    }
                },
                onFail(r, status) {
                    const err = helpers.defaultErrorHandler(r, status);
                    vm.$store.commit(helpers.transactions.ADD_NOTIFICATION, err);
                }
            });
            if (this.task !== null) {
                this.taskName = this.task.title;
                this.category = this.task.category.id;
                this.points = this.task.points;
                this.description = this.task.description;
                this.author = this.task.author.id;
                this.writeup = this.task.writeup;
                this.flag = this.task.flag || '';
            }
        }
    }
</script>

<style scoped>

</style>