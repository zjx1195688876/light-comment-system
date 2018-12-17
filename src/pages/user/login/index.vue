<template>
    <light-card
        :extend-style="'margin: 150px auto; width: 500px;'"
    >
        <el-tabs
            type="border-card"
            stretch
            @tab-click="onClearAllData"
        >
            <el-tab-pane label="登录">
                <div class="login">
                    <el-input placeholder="" v-model="loginUserName">
                        <template slot="prepend">用户名：</template>
                    </el-input>
                    <el-input type="password" placeholder="" v-model="loginPassword">
                        <template slot="prepend">密码：</template>
                    </el-input>
                    <el-button
                        type="primary"
                        @click="onLogin"
                    >
                        登 录
                    </el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="注册">
                <div class="register">
                    <el-input placeholder="" v-model="registerUserName">
                        <template slot="prepend">用户名：</template>
                    </el-input>
                    <el-input type="password" placeholder="" v-model="registerPassword">
                        <template slot="prepend">密码：</template>
                    </el-input>
                    <el-input type="password" placeholder="" v-model="registerPasswordAgain">
                        <template slot="prepend">确认密码：</template>
                    </el-input>
                    <el-button
                        type="primary"
                        @click="onRegister"
                    >
                        注 册
                    </el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
    </light-card>
</template>

<script>
import axios from 'axios';
import titleMixin from '@/mixin/title-mixin';
import Card from '@/components/Card.vue';

let ApiLock = false;

export default {
    name: 'login',
    mixins: [titleMixin],
    components: {
        'light-card': Card
    },
    title () {
        return '登录';
    },
    data () {
        return {
            loginUserName: '',
            loginPassword: '',
            registerUserName: '',
            registerPassword: '',
            registerPasswordAgain: ''
        }
    },
    methods: {
        onLogin () {
            const bool = this.checkLoginData();
            if (bool && !ApiLock) {
                ApiLock = true;
                axios.post('/user/login.json', {
                    userName: this.loginUserName,
                    password: this.loginPassword
                })
                .then(res => {
                    if (res && res.data && res.data.code === 200) {
                        location.href="/";
                    } else {
                        this.showMessage('登录失败，请重试', 'warning');
                    }
                    ApiLock = false;
                })
                .catch(err => {
                    this.showMessage('登录失败，请重试', 'warning');
                    ApiLock = false;
                });
            }
        },
        onRegister () {
            const bool = this.checkRegisterData();
            if (bool && !ApiLock) {
                ApiLock = true;
                axios.post('/user/register.json', {
                    userName: this.registerUserName,
                    password: this.registerPassword
                })
                .then(res => {
                    if (res && res.data && res.data.code === 200) {
                        this.showMessage('注册成功，请登录');
                    } else {
                        this.showMessage('注册失败，请重试', 'warning');
                    }
                    ApiLock = false;
                })
                .catch(err => {
                    this.showMessage('注册失败，请重试', 'warning');
                    ApiLock = false;
                });
            }
        },
        checkLoginData () {
            let message = '';
            let type = 'warning';
            if (!this.loginUserName) {
                message = '请输入用户名';
                this.showMessage(message, type);
                return false;
            }
            if (!this.loginPassword) {
                message = '请输入密码';
                this.showMessage(message, type);
                return false;
            }
            return true;
        },
        checkRegisterData () {
            let message = '';
            let type = 'warning';
            if (!this.registerUserName) {
                message = '请输入用户名';
                this.showMessage(message, type);
                return false;
            }
            if (!this.registerPassword) {
                message = '请输入密码';
                this.showMessage(message, type);
                return false;
            }
            if (!this.registerPasswordAgain) {
                message = '请再次输入密码';
                this.showMessage(message, type);
                return false;
            }
            if (this.registerPassword !== this.registerPasswordAgain) {
                message = '两次输入的密码应该相同';
                this.showMessage(message, type);
                return false;
            }
            return true;
        },
        showMessage (message ,type = "success") {
            this.$message({
                message,
                type
            });
        },
        onClearAllData () {
            this.loginUserName = '';
            this.loginPassword = '';
            this.registerUserName = '';
            this.registerPassword = '';
            this.registerPasswordAgain = '';
        }
    }
}
</script>

<style lang="scss" scoped>
.el-input {
    margin-bottom: 15px;
}
.login, .register {
    margin: 20px 20px 10px;
    text-align: center;
    .el-button {
        margin-top: 20px;
    }
}
</style>

