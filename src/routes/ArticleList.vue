<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <div v-if="categories !== null">
        <template v-if="categories.length">
            <div class="row">
                <div class="col-12 col-md-3">
                    <div class="list-group" role="tablist">
                        <button v-for="category in nonEmptyCategories"
                                class="list-group-item list-group-item-action"
                                data-toggle="list"
                                role="tab"
                                :key="category.id"
                                :data-target="'#cat' + category.id">
                            {{ category.name }}
                        </button>
                        <ModalTrigger for-modal="categoryModal"
                                      class="list-group-item"
                                      v-if="user !== null && user.is_admin">
                            Добавить категорию
                        </ModalTrigger>
                    </div>
                </div>
                <div class="col-12 mt-2 col-md-9 mt-md-0">
                    <div class="tab-content">
                        <div v-for="category in nonEmptyCategories"
                             class="tab-pane fade"
                             role="tabpanel"
                             :key="category.id"
                             :id="'cat' + category.id">
                            <p v-for="article in category.articles" :key="article.id"
                               class="mb-1">
                                <router-link :to="{name: 'article', params: {id: article.id}}">
                                    {{ article.title }}
                                </router-link>
                            </p>
                            <ModalTriggerLink for-modal="articleModal"
                                              v-if="user !== null && user.is_admin">
                                Добавить статью
                            </ModalTriggerLink>
                        </div>
                    </div>
                </div>
            </div>
            <template v-if="user !== null && user.is_admin">
                <CategoryModal @refresh-list="fetch"/>
                <ArticleModal @refresh-list="fetch"/>
            </template>
        </template>
        <p v-else>
            <i>Список пуст</i>
        </p>
    </div>
    <FetchingAnimation v-else :error="failed"/>
</template>

<script>
    import FetchingAnimation from "../components/FetchingAnimation";
    import api from "../api";
    import ModalTrigger from "../components/modals/ModalTrigger";
    import helpers from "../helpers";
    import ArticleModal from "../components/modals/ArticleModal";
    import ModalTriggerLink from "../components/modals/ModalTriggerLink";
    import CategoryModal from "../components/modals/CategoryModal";

    export default {
        name: "ArticleList",
        components: {
            CategoryModal,
            ModalTriggerLink,
            ArticleModal,
            ModalTrigger,
            FetchingAnimation
        },
        data() {
            return {
                categories: null,
                failed: false
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            nonEmptyCategories() {
                if (this.categories === null) {
                    return [];
                }
                if (this.user !== null && this.user.is_admin) {
                    return this.categories;
                }
                return this.categories.filter((el) => el.articles.length > 0)
            }
        },
        methods: {
            fetch() {
                const vm = this;
                api.get(api.method.categories, {
                    onSuccess(r) {
                        vm.categories = r.categories
                    },
                    onFail(r, status) {
                        const err = helpers.defaultErrorHandler(r, status);
                        vm.$store.commit(helpers.transactions.ADD_NOTIFICATION, err);
                        vm.failed = true;
                    }
                })
            }
        },
        beforeMount() {
            this.fetch();
        }
    }
</script>

<style scoped lang="scss">
    @import "~bootstrap/scss/bootstrap";

    .list-group-item {
        background: $gray-700;
        color: $light;

        &:hover {
            background: rgba($info, .6);
            border-color: rgba($info, .6);
            color: $light;
        }

        &.active {
            background: $info;
            border-color: $info;
        }
    }
</style>