<template>
<div class="header">
    <div class="logo">SOUQ采集系统</div>
    <div class="user-info">
        <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    {{username}}
                </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                    <span @click="dialogFormVisible = true">密码修改</span>
                </el-dropdown-item>
                <el-dropdown-item command="loginout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>

    <el-dialog title="密码修改" :visible.sync="dialogFormVisible" width="30%" top='5%'>

        <el-form class="" label-width="30%" style="text-align:left">

            <el-row :gutter="24">

                <el-form-item label="旧密码">
                    <el-input type="password" v-model="obj.password" placeholder="请输入旧密码" style="width:80%"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input type="password" v-model="obj.newPassword" placeholder="请输入新密码" style="width:80%"></el-input>
                </el-form-item>
            </el-row>
        </el-form>

        <span slot="footer" class="dialog-footer">
        <el-button type="primary"  @click="savePaw(obj)">保存</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">关闭</el-button>
      </span>
    </el-dialog>
</div>
</template>
<script>
import {
    resetPwd
} from '@/api/login'
export default {
    data() {
        return {
            obj: {
                password: '',
                newPassword: '',
            },
            name: 'linxin',
            dialogFormVisible: false,
        }
    },
    computed: {
        username() {
            let username = localStorage.getItem('ms_userName');
            return username ? username : this.name;
        }
    },
    methods: {
        async savePaw(obj) {
            let uid = localStorage.getItem('ms_userNameID');
            let {
                mes,
                success
            } = await resetPwd(obj,uid)
            if (success) {
              this.$message({
                  type: 'success',
                  message: mes
              });
                this.dialogFormVisible = false

                this.obj = {
                    password: '',
                    newPassword: '',
                }
            } else {

                this.$message({
                    type: 'error',
                    message: mes
                });
            }
        },
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('ms_username')
                this.$router.push('/login');
            }
        }
    }
}
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    line-height: 70px;
    color: #fff;
}

.header .logo {
    float: left;
    width: 250px;
    text-align: center;
}

.user-info {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
}

.user-info .el-dropdown-link {
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
}

.user-info .user-logo {
    position: absolute;
    left: 0;
    top: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.el-dropdown-menu__item {
    text-align: center;
}
</style>
