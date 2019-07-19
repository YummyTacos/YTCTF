<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <div>
        <h1>404 Not Found</h1>
        <p><b>Извините!</b> Страница, которую Вы ищете, не может быть найдена.</p>
        <p><i>
            Возможно, запрашиваемая Вами страница была перенесена или удалена. Также возможно, Вы
            допустили небольшую опечатку при вводе адреса &mdash; такое случается даже с нами,
            поэтому еще раз внимательно проверьте. Ну или Вам просто нравится изучать 404 страницы :)
        </i></p>
        <p><i>
            Если вы считаете, что этого не должно было произойти, напишите Евгению в
            <a href="tg://resolve?domain=evgfilim1">Telegram</a>.
        </i></p>
        <button class="btn btn-outline-info mr-2" @click="$router.go(-1)">&larr; Назад</button>
        <router-link class="btn btn-outline-success" to="/">
            На главную
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "NotFound"
    }
</script>

<style scoped>

</style>