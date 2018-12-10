<template>
    <div>
        <nav>
            <router-link to="/">首页</router-link>
            <router-link to="/detail">详情页</router-link>
        </nav>
        <div id="container">
            <router-view></router-view>
        </div>
    </div>
</template>