<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <div v-if="doc !== null">
        <h1>Документация API</h1>
        <VueShowdown :markdown="header"/>
        <VueShowdown v-for="(md, method) in doc"
                     :key="method"
                     :markdown="md"/>
    </div>
    <FetchingAnimation v-else :error="failed"/>
</template>

<script>
    import FetchingAnimation from "../components/FetchingAnimation";
    import api from "../api";
    import helpers from "../helpers";
    export default {
        name: "APIDocumentation",
        components: {
            FetchingAnimation
        },
        data() {
            return {
                doc: null,
                header: null,
                failed: false
            }
        },
        beforeMount() {
            const vm = this;
            api.get(api.method.docs, {
                onSuccess(r) {
                    vm.header = r.doc._;
                    delete r.doc._;
                    vm.doc = r.doc;
                },
                onFail(r, status) {
                    const err = helpers.defaultErrorHandler(r, status);
                    vm.$store.commit(helpers.transactions.ADD_NOTIFICATION, err);
                    vm.failed = true;
                }
            })
        }
    }
</script>

<style scoped>

</style>