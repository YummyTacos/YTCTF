<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <!-- TODO: login by token -->
    <CustomForm :on-submit="processForm" :validated="validated">
        <Modal :header="firstButtonText" id="loginModal">
            <FormInput v-if="!isLogin"
                       ref="email"
                       v-model="email.text"
                       id="email"
                       placeholder="Электронная почта"
                       type="email"
                       :error="email.error"/>
            <FormInput ref="username"
                       v-model="username.text"
                       id="username"
                       placeholder="Имя пользователя"
                       :error="username.error"/>
            <FormInput v-if="!isLogin"
                       ref="first_name"
                       v-model="first_name.text"
                       id="first_name"
                       placeholder="Имя"
                       :error="first_name.error"/>
            <FormInput v-if="!isLogin"
                       ref="last_name"
                       v-model="last_name.text"
                       id="last_name"
                       placeholder="Фамилия (необязательно)"
                       label="Фамилия"
                       :required="false"/>
            <FormInput ref="password"
                       v-model="password.text"
                       id="password"
                       placeholder="Пароль"
                       type="password"
                       :error="password.error"/>
            <div class="form-group" v-if="captcha_url !== null">
                <img :src="captcha_url" alt="captcha">
                <FormInput ref="captcha_data"
                           v-model="captcha_data.text"
                           id="captcha_data"
                           placeholder="Введите текст с картинки"
                           :error="captcha_data.error"/>
            </div>
            <label for="second-button" class="mt-2 d-block">
                {{ secondButtonLabel }}
            </label>
            <button class="btn btn-primary"
                    type="button"
                    id="second-button"
                    @click="isLogin = !isLogin">
                {{ secondButtonText }}
            </button>
            <!--suppress HtmlUnknownAttribute -->
            <template #footer>
                <SubmitButton btn-color="success">{{ firstButtonText }}</SubmitButton>
                <ModalDismiss/>
            </template>
        </Modal>
    </CustomForm>
</template>

<script>
    import jQuery from 'jquery'
    import Modal from "./Modal";
    import FormInput from "../forms/FormInput";
    import SubmitButton from "../SubmitButton";
    import CustomForm from "../forms/CustomForm";
    import helpers from '../../helpers';
    import api from '../../api'
    import ModalDismiss from "./ModalDismiss";
    import FormValidatorMixin from "../mixins/FormValidatorMixin";

    export default {
        name: "LoginModal",
        mixins: [FormValidatorMixin],
        components: {
            ModalDismiss,
            CustomForm,
            SubmitButton,
            FormInput,
            Modal
        },
        data() {
            return {
                email: { ...this.field },
                username: { ...this.field },
                first_name: { ...this.field },
                last_name: { ...this.field },
                password: { ...this.field },
                captcha_data: { ...this.field },
                captcha_id: null,
                captcha_url: null,
                isLogin: true
            }
        },
        watch: {
            email() {
                this.resetError('email');
            },
            login() {
                this.resetError('login');
            },
            first_name() {
                this.resetError('first_name');
            },
            last_name() {
                this.resetError('last_name');
            },
            password() {
                this.resetError('password');
            },
            isLogin() {
                this.modalSel.modal('handleUpdate');
            }
        },
        computed: {
            firstButtonText() {
                return this.isLogin ? 'Войти' : 'Зарегистрироваться'
            },
            secondButtonLabel() {
                return this.isLogin ? 'Ещё нет аккаунта?' : 'Уже есть аккаунт?'
            },
            secondButtonText() {
                return this.isLogin ? 'Зарегистрироваться' : 'Войти'
            },
            modalSel: () => jQuery('#loginModal')
        },
        methods: {
            processForm(target) {
                this.preValidateForm(target);
                let data = null;
                let endpoint = null;
                if (this.isLogin) {
                    data = {
                        username: this.username.text,
                        password: this.password.text
                    };
                    endpoint = api.method.auth;
                } else {
                    data = {
                        email: this.email.text,
                        username: this.username.text,
                        first_name: this.first_name.text,
                        last_name: this.last_name.text,
                        password: this.password.text
                    };
                    endpoint = api.method.register;
                    if (this.captcha_url !== null) {
                        data['captcha_data'] = this.captcha_data.text;
                        data['captcha_id'] = this.captcha_id
                    }
                }
                const vm = this;
                api.post(endpoint, {
                    data,
                    onSuccess(r) {
                        if (vm.isLogin) {
                            vm.modalSel.modal('hide');
                            vm.modalSel.on('hidden.bs.modal', () => {
                                vm.$store.dispatch(helpers.transactions.AUTH_USER, r.token)
                            })
                        } else {
                            api.get(api.method.user, {
                                data: {
                                    id: r.user_id
                                },
                                onSuccess(ri) {
                                    vm.isLogin = true;
                                    vm.username.text = ri.user.username;
                                    vm.password.text = '';
                                    vm.captcha_url = null;
                                },
                                onFail(ri, status) {
                                    const err = helpers.defaultErrorHandler(ri, status);
                                    vm.$store.commit(helpers.transactions.ADD_NOTIFICATION, err);
                                }
                            })
                        }
                    },
                    onFail(r, status) {
                        if (status.status === 400 && r.error_code === 22 || r.error_code === 23) {
                            vm.captcha_url = r.captcha_url;
                            vm.captcha_id = r.captcha_id;
                            vm.captcha_data.text = '';
                        } else {
                            vm.defaultOnFail(r, status);
                        }
                    }
                });
            }
        },
    }
</script>

<style scoped>

</style>