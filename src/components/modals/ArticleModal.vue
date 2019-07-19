<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <CustomForm :on-submit="processForm">
        <Modal :header="header" id="articleModal">
            <FormInput ref="title"
                       id="title"
                       placeholder="Заголовок"
                       v-model="title.text"
                       :error="title.error"/>
            <FormSelect ref="category"
                        id="category"
                        default-option-text="Выберите категорию"
                        label="Категория"
                        v-model="category.text"
                        :error="category.error"
                        :options="categories"/>
            <FormTextArea ref="text"
                          id="text"
                          placeholder="Текст"
                          v-model="text.text"
                          :error="text.error"
                          :mde="true"/>
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
    import SubmitButton from "../SubmitButton";
    import ModalDismiss from "./ModalDismiss";
    import jQuery from "jquery";
    import FormValidatorMixin from "../mixins/FormValidatorMixin";

    export default {
        name: "ArticleModal",
        mixins: [FormValidatorMixin],
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
            article: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                title: { ...this.field },
                category: { ...this.field },
                text: { ...this.field },
                dataArticle: null,
                categories: []
            }
        },
        watch: {
            title() {
                this.resetError('title');
            },
            category() {
                this.resetError('category');
            },
            text() {
                this.resetError('text');
            }
        },
        computed: {
            effectiveArticle() {
                return this.dataArticle || this.article;
            },
            user() {
                return this.$store.state.user
            },
            header() {
                return this.buttonText + ' статью';
            },
            buttonText() {
                return this.effectiveArticle !== null ? 'Редактировать' : 'Добавить';
            }
        },
        methods: {
            processForm(target) {
                this.preValidateForm(target);
                const vm = this;
                api.post(api.method.admin.article, {
                    data: {
                        title: this.title.text,
                        text: this.text.text,
                        category: this.category.text
                    },
                    onSuccess() {
                        const sel = jQuery('#articleModal');
                        sel.modal('hide');
                        vm.$emit('refresh-list');
                    },
                    onFail(r, status) {
                        vm.defaultOnFail(r, status);
                    }
                });
            }
        },
        beforeMount() {
            const vm = this;
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
        }
    }
</script>

<style scoped>

</style>