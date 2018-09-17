<template>
<div class="login-wrap">
    <div class="ms-title">采集系统</div>
    <div class="ms-login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
            <el-form-item prop="userName">
                <el-input v-model="ruleForm.userName" placeholder="userName"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm"></el-input>
            </el-form-item>
            <div class="login-btn">
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </div>
        </el-form>
    </div>
</div>
</template>

<script>
import {
    login,
} from '@/api/login'
export default {
    data: function() {
        return {
            ruleForm: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        async submitForm() {
            let {
                data,
                success,
                mes
            } = await login(this.ruleForm)
            if (success) {
              this.$message({
                  type: 'success',
                  message: mes
              });
              localStorage.setItem('ms_userName', this.ruleForm.userName);
              if(data){
                localStorage.setItem('ms_userNameID', data.rows[0].id);
              }
              this.$router.push('/collectionList');
            }else{
              this.$message({
                  type: 'error',
                  message: mes
              });
            }


        }
    }
}
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
}

.ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;

}

.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 160px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 36px;
}
</style>
