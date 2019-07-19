<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <div v-if="article !== null">
        <h1>{{ article.title }}</h1>
        <VueShowdown :markdown="article.text"/>
    </div>
    <FetchingAnimation v-else :error="failed"/>
</template>

<script>
    import FetchingAnimation from "../components/FetchingAnimation";
    import helpers from "../helpers";
    import api from '../api';

    export default {
        name: "Article",
        components: {
            FetchingAnimation
        },
        props: {
            id: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                article: null,
                failed: false
            }
        },
        methods: {
            fetch(id) {
                this.article = null;
                const vm = this;
                api.get(api.method.article, {
                    data: {
                        id
                    },
                    onSuccess(r) {
                        vm.article = r.article;
                    },
                    onFail(r, status) {
                        const err = helpers.defaultErrorHandler(r, status);
                        vm.$store.commit(helpers.transactions.ADD_NOTIFICATION, err);
                        vm.failed = true;
                    }
                })
            }
        },
        watch: {
            '$route'() {
                this.fetch(this.$route.params.id);
            }
        },
        beforeMount() {
            this.fetch(this.id);
        }
    }
</script>

<style scoped>

</style>