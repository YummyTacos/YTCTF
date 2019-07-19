<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <div class="border border-secondary rounded py-1">
        <div class="d-flex w-100 justify-content-between">
            <h3>{{ task.title }}</h3>
            <small>
                {{ task.category.name }}{{ task.points }}, от {{ task.author.username }}
            </small>
        </div>
        <div class="mb-1" id="task-description">
            <VueShowdown :markdown="task.description"/>
            <details v-if="task.files.length">
                <summary>Файлы</summary>
                <a v-for="file in task.files"
                   :key="file.id"
                   :href="file.url"
                   :download="file.name"
                   target="_blank">
                    <i class="fa fa-paperclip"></i> {{ file.name }}
                </a>
            </details>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TaskInfo",
        props: {
            task: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
    #task-description {
        word-wrap: break-word;
        overflow-wrap: break-word;
    }
</style>