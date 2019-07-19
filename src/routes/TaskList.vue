<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <div v-if="loaded" class="task-grid">
        <template v-if="tasks.length">
            <TaskCard v-for="task in tasks"
                      :task="task"
                      :key="task.id"/>
        </template>
        <template v-if="user !== null && user.is_admin">
            <AddTaskCard/>
            <TaskModal/>
        </template>
        <p v-else-if="!tasks.length">
            <i>Список пуст</i>
        </p>
    </div>
    <FetchingAnimation v-else/>
</template>

<script>
    import TaskCard from '../components/TaskCard'
    import FetchingAnimation from "../components/FetchingAnimation";
    import AddTaskCard from "../components/AddTaskCard";
    import helpers from '../helpers';
    import api from '../api';
    import TaskModal from "../components/modals/TaskModal";

    export default {
        name: 'TaskList',
        components: {
            TaskModal,
            AddTaskCard,
            FetchingAnimation,
            TaskCard
        },
        data() {
            return {
                tasks: [],
                loaded: false,
                error: null,
                interval: null
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            }
        },
        methods: {
            fetch() {
                const vm = this;
                api.get(api.method.tasks, {
                    onSuccess(r) {
                        vm.tasks = r.tasks;
                        vm.loaded = true;
                        if (vm.error !== null) {
                            vm.error = null;
                            vm.$store.commit({
                                type: helpers.transactions.ADD_NOTIFICATION,
                                text: 'Соединение восстановлено',
                                color: 'success'
                            })
                        }
                    },
                    onFail(r, status) {
                        const err = helpers.defaultErrorHandler(r, status);
                        if (vm.error === null || !helpers.objCmp(vm.error, err)) {
                            vm.error = err;
                            vm.$store.commit(helpers.transactions.ADD_NOTIFICATION, err);
                        }
                    }
                });
            }
        },
        beforeMount() {
            setTimeout(() => this.fetch(), 0);
            this.interval = setInterval(this.fetch, 5000);
        },
        beforeDestroy() {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
</script>

<style scoped lang="scss">
    @import "~bootstrap/scss/bootstrap";

    .task-grid {
        display: grid;
        grid-gap: 0.75rem 1rem;
        grid-template-columns: 1fr;
    }

    @include media-breakpoint-up(md) {
        .task-grid {
            grid-template-columns: 1fr 1fr;
            grid-gap: 1.5rem 1rem;
        }
    }

    @include media-breakpoint-up(lg) {
        .task-grid {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
</style>