<template>
  <div class="app-container">
    <!-- 订单列表 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="Id" width="50px">
        <template slot-scope="scope">
          <span>{{ scope.row.mainOrderId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.ctime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="微信订单ID" width="200px">
        <template slot-scope="scope">{{ scope.row.wxPayOrder }}</template>
      </el-table-column>
      <el-table-column prop="status" :formatter="statusFormatter" label="物流状态" min-width="100" />
      <el-table-column prop="payType" :formatter="payTypeFormatter" label="支付状态" min-width="100" />
      <el-table-column prop="payWay" :formatter="payWayFormatter" label="支付方式" min-width="100" />
      <el-table-column label="手机号码" width="120px">
        <template slot-scope="scope">{{ scope.row.mobile }}</template>
      </el-table-column>
      <el-table-column label="订单总价" width="80px">
        <template slot-scope="scope">{{ scope.row.totalPrice }} 元</template>
      </el-table-column>
      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row.mainOrderId)">编辑</el-button>
          <el-button size="mini" type="warning" @click="handleEvault(scope.row.mainOrderId)">查看评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        :current-page.sync="listQuery.offset"
        :page-size="listQuery.limit"
        layout="prev, pager, next, jumper"
        :total="countNum"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { findAllByLimit, modifymainOrder } from '@/api/mainOrder'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['shopId'])
  },
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      offset: 1, // 定义几页的数据
      limit: 10, // 一页几条数据
      tableData: [],
      parentId: 0,
      listQuery: {
        offset: 1,
        limit: 10,
        shopId: '',
        showNew: 1
      },
      countNum: null,
      isPage: true
    }
  },
  created() {
    this.initial()
    // articleAll({
    //   offset: 1,
    //   limit: 10
    // }).then(res => {
    //   console.log(res)
    //   this.tableData = res.data.dataList
    // })
  },
  methods: {
    initial() {
      this.listQuery.shopId = this.shopId
      findAllByLimit(this.listQuery).then(res => {
        this.tableData = res.data.dataList
        console.log(this.tableData)
        const { countNum, currpage, limit } = res.data
        this.listQuery.offset = currpage
        this.listQuery.limit = limit
        this.countNum = countNum
        if (countNum <= limit) {
          this.isPage = true
        } else if (countNum > limit) {
          this.isPage = false
        }
      })
    },
    // 设定每页的数据条数
    handleSizeChange(val) {
      this.listQuery.offset = val
      this.initial()
    },
    // 分页
    handleCurrentChange(val) {
      this.listQuery.offset = val
      this.initial()
    },
    // 去文章添加
    goAddCommodity() {
      this.$router.push({ path: '/mainOrder/orderDetail' })
    },
    // 去编辑修改
    handleEdit(row) {
      this.$router.push({ path: '/mainOrder/orderDetail', query: { id: row }})
    },
    handleEvault(row) {
      this.$router.push({ path: '/evaluate/evaluate', query: { id: row }})
    },
    handleDelete(del) {
      var vm = this
      this.id = del
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          modifymainOrder({ commodityId: vm.id, state: 0 })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          vm.initial()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    statusFormatter(row, column, cellValue, index) {
      let status = null
      switch (cellValue) {
        case '0':
          status = '商家准备'
          break
        case '1':
          status = '正在配送'
          break
        case '2':
          status = '已送达'
          break
        case '3':
          status = '确认收货'
          break
      }
      return status
    },
    payTypeFormatter(row, column, cellValue, index) {
      let payType = null
      switch (cellValue) {
        case '0':
          payType = '未支付'
          break
        case '1':
          payType = '已支付'
          break
      }
      return payType
    },
    payWayFormatter(row, column, cellValue, index) {
      let payWay = null
      switch (cellValue) {
        case '0':
          payWay = '商家收款'
          break
        case '1':
          payWay = '微信支付'
          break
      }
      return payWay
    }
    // /*复制地址*/
    // Preview(id) {
    //   console.log(id)
    //   const input = document.createElement('input')
    //   document.body.appendChild(input)

    //   input.setAttribute('value', 'http://new_test.szmlkq.com/#/detailsART?id=' + id)
    //   input.select()
    //   if (document.execCommand('copy')) {
    //     document.execCommand('copy')
    //     this.$message({
    //       message: '复制成功',
    //       type: 'success'
    //     })
    //   }
    //   document.body.removeChild(input)
    // }
  }
}
</script>
<style>
.block {
  width: 50%;
  float: right;
  margin-top: 1rem;
}
/* 内容超出显示。。。 */
.cell {
  text-overflow: ellipsis !important;
}
/* 文章添加按钮 */
.demonstration {
  width: 6rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  border-radius: 8px;
  display: block;
  background-color: rgba(19, 206, 102, 0.1);
  border: 1px solid rgba(19, 206, 102, 0.2);
  color: #13ce66;
  cursor: pointer;
}
</style>

