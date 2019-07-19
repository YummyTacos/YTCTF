<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <div v-if="task !== null">
        <div class="row mx-0">
            <TaskInfo class="col-md-6 col-12"
                      :task="task"/>
            <TaskFlag class="col-md-6 col-12 mt-2 mt-md-0 px-2 px-md-3"
                      :task="task" @refresh-item="fetch(id)"/>
        </div>
        <TaskSolved class="mt-4" :task="task"/>
    </div>
    <FetchingAnimation v-else :error="failed"/>
</template>

<script>
    import TaskInfo from "../components/TaskInfo";
    import TaskFlag from "../components/TaskFlag";
    import FetchingAnimation from "../components/FetchingAnimation";
    import helpers from "../helpers";
    import api from '../api';
    import TaskSolved from "../components/TaskSolved";

    export default {
        name: "Task",
        components: {
            TaskSolved,
            FetchingAnimation,
            TaskFlag,
            TaskInfo
        },
        props: {
            id: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                task: null,
                failed: false
            }
        },
        methods: {
            fetch(id) {
                const vm = this;
                api.get(api.method.task, {
                    data: {
                        id
                    },
                    onSuccess(r) {
                        vm.task = r.task;
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