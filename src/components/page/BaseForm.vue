<template>
<div class="table">
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
            <el-breadcrumb-item>基础表格</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <div class="" style="margin:10px;height: 40px;">
        <el-button type="primary" icon="search" @click="search" style="float:right;margin-left:20px;">搜索</el-button>
        <el-button type="primary" @click="getdata" style="float:right">获取最新数据</el-button>
    </div>
    <div class="handle-box">
        <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
        <!-- <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                <el-option key="1" label="广东省" value="广东省"></el-option>
                <el-option key="2" label="湖南省" value="湖南省"></el-option>
            </el-select> -->
        <el-select v-model="input.type" style="width:130px;height:30px" placeholder="请选择类目">
            <el-option label="请选择类目" key="" value="">
            </el-option>
            <el-option v-for="item in typeListData" :label="item.name" :key="item.name" :value="item.name">
            </el-option>
        </el-select>

        <!-- <el-input v-model="input.type" placeholder="类目筛选" class="handle-input mr10" style="width:80px;"></el-input> -->
        <el-input v-model="input.priceMix" placeholder="价格筛选" class="handle-input mr5" style="width:80px;"></el-input> -
        <el-input v-model="input.priceMax" placeholder="价格筛选" class="handle-input mr10" style="width:80px;"></el-input>

        <el-date-picker v-model="input.dateMix" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="width:130px;" placeholder="日期筛选">
        </el-date-picker> -
        <el-date-picker v-model="input.dateMax" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="width:130px;" placeholder="日期筛选">
        </el-date-picker>
        <el-input v-model="input2.priceDiffMix" placeholder="库存变动值筛选" class="handle-input mr10" style="width:150px;"></el-input> -
        <el-input v-model="input2.priceDiffMax" placeholder="库存变动值筛选" class="handle-input mr10" style="width:150px;"></el-input>
        <el-select v-model="input2.fulfilled_by_souq" style="width:130px;height:30px" placeholder="FBS筛选">
            <el-option label="自发" key="0" value="0">
            </el-option>
            <el-option label="FBS" key="1" value="1">
            </el-option>
        </el-select>
        <el-input v-model="input2.followNumMix" placeholder="跟卖数筛选" class="handle-input mr10" style="width:100px;"></el-input> -
        <el-input v-model="input2.followNumMax" placeholder="跟卖数筛选" class="handle-input mr10" style="width:100px;"></el-input>
        <el-input v-model="input2.reviews_countMix" placeholder="评价筛选" class="handle-input mr10" style="width:90px;"></el-input> -
        <el-input v-model="input2.reviews_countMax" placeholder="评价筛选" class="handle-input mr10" style="width:90px;"></el-input>
    </div>
    <el-table :data="tableData" border style="width: 100%;text-align: center;" ref="multipleTable" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column type="index" width="85"></el-table-column>
        <el-table-column prop="" label="商品图片">
            <template slot-scope="scope">
              <div style="text-align:center">
                <img :src="scope.row.image_url | sizeChange" alt="" style="width:50px;height:50px"></div>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="商品类型" width="150">
        </el-table-column>
        <el-table-column prop="seller" label="卖家" width="150">
        </el-table-column>
        <el-table-column prop="EAN" label="商品编码">
        </el-table-column>
        <el-table-column prop="price" label="价格" sortable='custom' width="120">
        </el-table-column>

        <el-table-column prop="priceDiff" label="库存变动值" sortable='custom' width="160">
        </el-table-column>

        <el-table-column prop="beforeAmount" label="库存变动前" sortable='custom' width="160">
        </el-table-column>
        <el-table-column prop="afterAmount" label="库存变动后" sortable='custom' width="160">
        </el-table-column>
        <el-table-column prop="" label="FBS" width="100">
            <template slot-scope="scope">
            <span v-show="scope.row.fulfilled_by_souq == 1">fbs</span>
            <span v-show="scope.row.fulfilled_by_souq == 0">自发</span>
          </template>
        </el-table-column>
        <el-table-column prop="followNum" label="跟卖数" sortable='custom' width="100">
        </el-table-column>
        <el-table-column prop="reviews_count" label="评价" sortable='custom' width="100">
        </el-table-column>
        <!-- <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column> -->
    </el-table>
    <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" :page-size="listQuery.limit" layout="prev, pager, next" :total="total">
        </el-pagination>
    </div>
</div>
</template>

<script>
import {
    collectionListd,
    typeList,
    setCollectionListd
} from '@/api/collection'
export default {
    data() {
        return {
            url: './static/vuetable.json',
            input: {
                type: '',
                priceMix: '',
                priceMax: '',
                dateMix: '',
                dateMax: '',
            },
            input2: {
                fulfilled_by_souq: '',
                followNumMix: '',
                followNumMax: '',
                reviews_countMix: '',
                reviews_countMax: '',
                priceDiffMax: '',
                priceDiffMix: '',

            },
            typeListData: [],
            tableData: [],
            cur_page: 1,
            multipleSelection: [],
            select_word: '',
            del_list: [],
            is_search: false,
            total: 1,
            listQuery: {
                page: 1,
                limit: 30,
                dateMix: '',
                dateMax: '',
            }
        }
    },
    created() {
        this.loadtypeList();
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

        handleSortChange(column) {
            this.loadPageList(column)
        },
        async loadtypeList() {
            let {
                txtData,
                success
            } = await typeList()
            if (success) {
                this.typeListData = JSON.parse(txtData)
            }
        },
        async loadPageList(column) {
            if (this.input.dateMix == "" && this.input.dateMax == "") {
                this.$message({
                    type: 'success',
                    message: '请进行时间筛选！'
                });
                return
            }

            if (this.input) {
                if (this.input.dateMix) this.listQuery.dateMix = this.getformatTime(this.input.dateMix)
                if (this.input.dateMax) this.listQuery.dateMax = this.getformatTime(this.input.dateMax)
                this.listQuery.priceMix = this.input.priceMix
                this.listQuery.priceMax = this.input.priceMax
                this.listQuery.type = this.input.type
            }

            if (column) {
                this.listQuery.order = column.order
                this.listQuery.prop = column.prop
            }
            let {
                data,
                success,
                mes
            } = await collectionListd(this.listQuery)
            if (success) {
                this.total = data.count
                this.tableData = this.Twofilter(data.rows)
                this.$message({
                    type: 'success',
                    message: mes
                });
            } else {
                this.$message({
                    type: 'success',
                    message: mes
                });
            }
        },

        async loadsetCollectionListd() {
            if (this.input.dateMix == "" && this.input.dateMax == "") {
                this.$message({
                    type: 'success',
                    message: '请进行时间筛选！'
                });
                return
            }
            const loading = this.$loading({
                lock: true,
                text: '数据分析中',
                spinner: 'el-icon-loading',
                background: 'rgba(127, 124, 124, 0.3);'
            });
            if (this.input) {
                if (this.input.dateMix) this.listQuery.dateMix = this.getformatTime(this.input.dateMix)
                if (this.input.dateMax) this.listQuery.dateMax = this.getformatTime(this.input.dateMax)
                this.listQuery.priceMix = this.input.priceMix
                this.listQuery.priceMax = this.input.priceMax
                this.listQuery.type = this.input.type
            }

            let {
                data,
                success,
                mes
            } = await setCollectionListd(this.listQuery)
            debugger
            if (success) {
                loading.close();
                this.$message({
                    type: 'success',
                    message: mes
                });
                this.loadPageList()
            } else {
                this.$message({
                    type: 'success',
                    message: mes
                });
            }
        },
        indexOfSmallest(a) { //找出时间最接近最大值
            return a.indexOf(Math.min.apply(Math, a));
        },
        DateDiff(sDate1, sDate2) { //sDate1和sDate2是"2002-12-18"格式
            var aDate, oDate1, oDate2, iDays;
            aDate = sDate1.split("-");
            oDate1 = new Date(aDate[0], aDate[1] - 1, aDate[2]);
            aDate = sDate2.split("-");
            oDate2 = new Date(aDate[0], aDate[1] - 1, aDate[2]);
            iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
            if ((oDate1 - oDate2) < 0) {
                return -iDays;
            }
            return iDays;
        },

        Twofilter(arr) {
            if (this.input.dateMix == "" && this.input.dateMax == "") {
                this.$message({
                    type: 'success',
                    message: '未选择时间筛选！'

                });
                return
            }


            if (this.input2.priceDiffMax != "") {
                arr = arr.filter(v => v.priceDiff <= parseInt(this.input2.priceDiffMax))
            }
            if (this.input2.priceDiffMix != "") {
                arr = arr.filter(v => v.priceDiff >= parseInt(this.input2.priceDiffMix))
            }
            if (this.input2.followNumMix != "") {
                arr = arr.filter(v => v.followNum >= parseInt(this.input2.followNumMix))
            }
            if (this.input2.followNumMax != "") {
                arr = arr.filter(v => v.followNum <= parseInt(this.input2.followNumMax))
            }

            if (this.input2.reviews_countMix != "") {
                arr = arr.filter(v => v.reviews_count >= parseInt(this.input2.reviews_countMix))
            }
            if (this.input2.reviews_countMax != "") {
                arr = arr.filter(v => v.reviews_count <= parseInt(this.input2.reviews_countMax))
            }

            if (this.input2.fulfilled_by_souq != "") {
                arr = arr.filter(v => v.fulfilled_by_souq == parseInt(this.input2.fulfilled_by_souq))
            }
            return arr

        },
        dateFormat(row, column, cellValue, index) {
            const daterc = row[column.property]
            if (daterc != null) {
                return timeFormat;
            }

        },
        handleCurrentChange(val) {
            if (!isNaN(val)) {
                this.listQuery.page = val
            }
            this.loadPageList()
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
        getdata() {
            this.loadsetCollectionListd()

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
        handleDelete(index, row) {
            this.$message.error('删除第' + (index + 1) + '行');
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
