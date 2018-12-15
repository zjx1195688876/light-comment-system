<template>
    <div id="app">
        <!-- <nav>
            <router-link to="/">首页</router-link>
            <router-link to="/detail">详情页</router-link>
        </nav> -->
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
body {
    background-color: #f2f2f2;
}
</style>
