<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <div class="progress mt-3" :style="{height: height + 'px'}">
        <div class="progress-bar progress-bar-striped progress-bar-animated bg-success"
             role="progressbar"
             :style="{width: progress + '%'}">
            {{ label }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ProgressBar',
        props: {
            height: {
                type: Number,
                default: 20
            },
            progress: {
                type: Number,
                default: 100
            },
            label: {
                type: String,
                default: 'Загрузка...'
            }
        }
    }
</script>

<style scoped>

</style>