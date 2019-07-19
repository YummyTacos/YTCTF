<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <router-link :to="{name: 'task', params: {'id': task.id}}" class="task-card rounded"
       :class="[task.category.name, {solved: task.solved || task.authored}]">
        <p class="name">{{ task.title }}</p>
        <span class="points">{{ task.points }}</span>
        <span class="category">{{ task.category.name }}</span>
        <br/>
        <span class="solved-count">
            {{ solved }}
        </span>
    </router-link>
</template>

<script>
    export default {
        name: 'TaskCard',
        props: {
            task: Object
        },
        computed: {
            solved() {
                let solvedLine = this.task.solved_by.length;
                const t = this.task.solved_by.length % 100;
                if (t % 10 === 0 || t % 10 >= 5 || (11 <= t && t <= 14)) {
                    solvedLine += ' человек решили';
                } else if (t % 10 === 1) {
                    solvedLine += ' человек решил';
                } else {
                    solvedLine += ' человека решили';
                }
                return solvedLine;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '~bootstrap/scss/bootstrap';
    @import "../assets/categories.css";

    .task-card {
        transition: 0.125s;
        padding: 1rem;
        position: relative;
        opacity: 0.75;
        background: #777777;
        text-decoration: none;
        color: inherit;

        &:hover {
            opacity: 1;
            text-decoration: none;
            color: inherit;
        }

        .name {
            font-size: 1.5rem;
        }

        .points {
            font-size: 2rem;
            float: right;
        }

        .category {
            font-size: 1.25rem;
        }

        &.solved {
            opacity: 0.5;
        }
    }

    @include media-breakpoint-down(sm) {
        .task-card {
            .name {
                display: inline;
                font-size: 1.25rem;
            }

            .solved-count {
                display: none;
            }

            .category {
                float: right;
                font-size: 1rem;
            }

            .points {
                margin-left: 0.25rem;
                font-size: 1.5rem;
            }
        }
    }
</style>