<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <div>
        <CustomForm :on-submit="processForm" :validated="validated" autocomplete="off">
            <h3 class="pb-0 mb-0">Сдать флаг</h3>
            <FormInput placeholder="Введи флаг"
                       label=""
                       id="flag"
                       ref="flag"
                       v-model="flag"
                       :disabled="disabled"
                       :type="flagHidden ? 'password' : 'text'"
                       :error="flagError"
                       :force-validity="forceValidity">
                <div class="valid-feedback">
                    {{ flagError }}
                </div>
            </FormInput>
            <template v-if="!disabled">
                <SubmitButton class="d-inline-block mr-2"/>
                <button class="btn mr-2"
                        @click="flagHidden = !flagHidden"
                        type="button" :class="'btn-' + (flagHidden ? 'warning' : 'success')">
                    {{ flagHidden ? 'Показать' : 'Скрыть' }} флаг
                </button>
            </template>
            <template v-if="user !== null && user.is_admin">
                <div class="dropdown">
                    <button class="btn btn-outline-primary dropdown-toggle" type="button"
                            data-toggle="dropdown">
                        Управление таском
                    </button>
                    <div class="dropdown-menu bg-primary">
                        <ModalTriggerLink for-modal="addTask"
                                          class="dropdown-item bg-primary text-light">
                            Изменить задание
                        </ModalTriggerLink>
                        <ModalTriggerLink for-modal="taskDeleteModal"
                                          class="dropdown-item bg-danger text-light">
                            Удалить задание
                        </ModalTriggerLink>
                    </div>
                </div>
                <TaskDeleteModal :task="task"/>
                <TaskModal @refresh-item="$emit('refresh-item')" :task="task"/>
            </template>
        </CustomForm>
    </div>
</template>

<script>
    import FormInput from "./forms/FormInput";
    import SubmitButton from "./SubmitButton";
    import CustomForm from "./forms/CustomForm";
    import helpers from "../helpers";
    import api from '../api'
    import ModalTriggerLink from "./modals/ModalTriggerLink";
    import TaskDeleteModal from "./modals/TaskDeleteModal";
    import TaskModal from "./modals/TaskModal";

    export default {
        name: "TaskFlag",
        components: {
            TaskModal,
            TaskDeleteModal,
            ModalTriggerLink,
            CustomForm,
            SubmitButton,
            FormInput
        },
        data() {
            return {
                flag: '',
                flagError: null,
                flagHidden: false,
                validated: false,
                forceValidity: null
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            flagField() {
                return this.$refs.flag.$refs.input;
            },
            solved() {
                if (this.user === null) {
                    return false;
                }
                return this.task.solved_by.find((el) => el.id === this.user.id) !== undefined;
            },
            cannotSolve() {
                if (this.user === null) {
                    return false;
                }
                return this.user.is_admin || this.task.author.id === this.user.id;
            },
            validity() {
                if (!this.disabled) {
                    return {validity: null, error: null};
                }
                let res = {
                    validity: 'valid',
                    error: null
                };
                if (this.solved) {
                    res.error = 'Задание решено!';
                } else if (this.cannotSolve) {
                    res.error = 'Ты не можешь решать это задание, так как у тебя есть доступ к флагу'
                } else {
                    // this.user === null
                    res.validity = 'invalid';
                    res.error = 'Чтобы решить задание, необходимо войти';
                }
                return res
            },
            disabled() {
                return this.solved || this.cannotSolve || this.user === null
            }
        },
        watch: {
            flag() {
                this.validated = false;
                this.flagError = null;
                this.flagField.setCustomValidity('');
            },
            validity() {
                this.forceValidity = this.validity.validity;
                this.flagError = this.validity.error;
                if (this.user === null) {
                    this.flagField.setCustomValidity(this.validity.error);
                }
            }
        },
        props: {
            task: {
                type: Object,
                required: true
            }
        },
        methods: {
            processForm(target) {
                this.validated = true;
                if (!target.checkValidity()) {
                    this.flagError = this.flagField.validationMessage;
                    return;
                }
                if (this.flag === '') {
                    const t = 'Флаг не может быть пустым';
                    this.flagError = t;
                    this.flagField.setCustomValidity(t);
                }
                const vm = this;
                api.post(api.method.task, {
                    data: {
                        id: this.task.id,
                        flag: this.flag
                    },
                    onSuccess() {
                        vm.$store.commit({
                            type: helpers.transactions.ADD_NOTIFICATION,
                            text: 'Задание решено!',
                            color: 'success'
                        });
                        vm.flagError = 'Задание решено!';
                        vm.flag = '';
                        vm.$emit('refresh-item');
                        vm.$store.dispatch(helpers.transactions.UPDATE_USER);
                    },
                    onFail(r, status) {
                        const err = helpers.defaultErrorHandler(r, status);
                        vm.$store.commit(helpers.transactions.ADD_NOTIFICATION, err);
                    }
                })
            }
        },
        beforeMount() {
            this.forceValidity = this.validity.validity;
            this.flagError = this.validity.error;
            if (this.user === null) {
                this.flagField.setCustomValidity(this.validity.error);
            }
        }
    }
</script>

<style scoped>

</style>