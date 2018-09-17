<template>
<div class="table">
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
            <el-breadcrumb-item>基础表格</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="handle-box">
        <el-button type="primary" @click="dialogVisible = true">新增采集链接</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column type="index" width="55"></el-table-column>
        <el-table-column prop="name" label="类名">
        </el-table-column>
        <el-table-column prop="url" label="采集地址">
        </el-table-column>
        <el-table-column prop="" label="添加时间">
            <template slot-scope="scope">
            {{scope.row.createdAt | formatTime}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
            <template scope="scope">
                    <!-- <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.row)">删除</el-button>
                </template>
        </el-table-column>
    </el-table>
    <!-- <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
        </el-pagination>
    </div> -->

    <el-dialog title="新增" :visible.sync="dialogVisible" width="30%">
        <el-form class="" label-width="30%" style="text-align:left">
            <el-row :gutter="20">
                <el-col :span="20">
                    <el-form-item label="模块名">
                        <el-input placeholder="请输入模块名" v-model="news.name" style="width:80%"></el-input>
                    </el-form-item>
                    <el-form-item label="链接地址">
                        <el-input placeholder="请输入链接地址" v-model="news.url" style="width:80%"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveUrl(news)">确 定</el-button>
  </span>
    </el-dialog>
</div>
</template>

<script>
import {
    collectionUrl,
    collectionUrlAdd,
    delUser
} from '@/api/collection'
export default {
    data() {
        return {
            url: './static/vuetable.json',
            dialogVisible: false,
            input: {
                priceMix: '',
                priceMax: '',
                startdataValue: '',
                enddataValue: '',
            },
            tableData: [],
            cur_page: 1,
            multipleSelection: [],
            select_word: '',
            del_list: [],
            is_search: false,
            news: {
                name: '',
                url: ''
            }
        }
    },
    created() {
        this.loadPageList();
    },
    computed: {
        // data(){
        //     const self = this;
        //     return self.tableData.filter(function(d){
        //         let is_del = false;
        //         for (let i = 0; i < self.del_list.length; i++) {
        //             if(d.name === self.del_list[i].name){
        //                 is_del = true;
        //                 break;
        //             }
        //         }
        //         if(!is_del){
        //             if(d.address.indexOf(self.select_cate) > -1 &&
        //                 (d.name.indexOf(self.select_word) > -1 ||
        //                 d.address.indexOf(self.select_word) > -1)
        //             ){
        //                 return d;
        //             }
        //         }
        //     })
        // }
    },
    methods: {
        async loadPageList() {
            if (this.input) {
                // this.input.page = this.listQuery.page
                // this.input.limit = this.listQuery.limit
            }
            let {
                data,
                success
            } = await collectionUrl(this.input)
            if (success) {
                this.loading = false
                this.tableData = data.rows
            }
        },
        async saveUrl(obj) {
            let {
                data,
                success
            } = await collectionUrlAdd(obj)
            if (success) {
                this.$message({
                    type: 'success',
                    message: '新增成功'
                });
                this.dialogVisible = false
                this.loadPageList();
            }
        },
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
        },
        getData() {
            let self = this;
            if (process.env.NODE_ENV === 'development') {
                self.url = '/ms/table/list';
            };
            self.$axios.post(self.url, {
                page: self.cur_page
            }).then((res) => {
                self.tableData = res.data.list;
            })
        },
        search() {
            this.loadPageList()
            this.is_search = true;

        },
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        handleEdit(index, row) {
            this.$message('编辑第' + (index + 1) + '行');
        },
        handleDelete(item) {
            this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let del = await delUser(item.id)
                this.tableData.splice(this.tableData.indexOf(item), 1)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.loadPageList();
                // this.splice(data.id, 1);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        delAll() {
            const self = this,
                length = self.multipleSelection.length;
            let str = '';
            self.del_list = self.del_list.concat(self.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += self.multipleSelection[i].name + ' ';
            }
            self.$message.error('删除了' + str);
            self.multipleSelection = [];
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    }
}
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
</style>
