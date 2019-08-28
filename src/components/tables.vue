<template>
  <div class="listCom">
    <section class="search">
      <input  v-model="name" placeholder="请输入关键字，例如：教室名称"/>
      <button class="addRoom">+ 添加教室</button>
    </section>
    <section class="list">
     <el-table :data="dataList.records" style="width: 100%">
      <el-table-column prop="name" label="教室名称"  width="180"></el-table-column>
      <el-table-column prop="capacity" label="容纳人数"  width="180"></el-table-column>
      <el-table-column  prop="roomTypeName" label="教室类型"></el-table-column>
      <el-table-column  prop="status" label="状态">
        <template slot-scope="scope">
         <el-switch v-model="scope.row.roomStatus" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column  prop="sort" label="排序"></el-table-column>
      <el-table-column  label="操作">
         <template slot-scope="scope">
         <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
         <el-button type="text" size="small">编辑</el-button>
      </template>
      </el-table-column>
    </el-table>
      <footer>
         <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange"
          :current-page="dataList.current"
          :page-sizes="[5, 20, 30]"
          :page-size="dataList.Size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataList.total">
        </el-pagination>
      </footer>
    </section>
  </div>
</template>

<script>
import $ajax from '../utils/$ajax'
export default {
  name: 'tables',
  data () {
    return {
      name: '',
      dataList: {
        records: [],
        total: 0, // 总共多少条
        pages: 0, // 总共多少页
        current: 1, // 当前页第几页
        size: 5 // 每页显示条数
      }
    }
  },
  created () {
    var that = this
    document.title = '列表'
    let params = {
      currentPage: 1,
      name: '',
      pageSize: 5
    }
    that.getRoomList(params)
  },
  methods: {
    // 调用列表
    getRoomList (params) {
      let that = this
      $ajax({
        async: true,
        type: 'post',
        api: '/demo/room/page',
        input: params,
        success: output => {
          if (output.code === 200) {
            output.data.records.map((n, i) => {
              if (n.teamFlag === '1' && n.privateFlag === '1') {
                output.data.records[i].roomTypeName = '团课，私教课'
              } else if (n.teamFlag === '1') {
                output.data.records[i].roomTypeName = '团课'
              } else if (n.privateFlag === '1') {
                output.data.records[i].roomTypeName = '私教课'
              }
              output.data.records[i].roomStatus = n.status === 'OPEN'
            })
            that.dataList = output.data
          }
        }
      })
    },
    handleClick (row) {
      console.log(row)
    },
    handleSizeChange (val) {
      let params = {
        currentPage: this.dataList.current,
        name: '',
        pageSize: val
      }
      this.getRoomList(params)
    },
    handleCurrentChange (val) {
      let params = {
        currentPage: val,
        name: '',
        pageSize: this.dataList.size
      }
      this.getRoomList(params)
    }
  }
}
</script>

<style lang="scss" scoped >
$btn-color: #8c67f8;
$btn-hover-color: #a789ff;
$btn-active-color: #896be1;
.listCom{
  .addRoom{
    float: right;
    color: #fff;
    font-size: 16px;
    height: 45px;
    line-height: 45px;
    padding: 0 30px;
    background: $btn-color;
    border: none;
    box-sizing: border-box;
    border-radius: 10pc;
    outline:none;
  }
  .addRoom:hover{
    background: $btn-hover-color
  }
  .addRoom:active{
    background: $btn-active-color
  }
}
</style>
