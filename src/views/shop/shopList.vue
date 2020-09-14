<template>
  <div class="app-container">
    <!-- 评论列表 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="Id" width="50px">
        <template slot-scope="scope">
          <span>{{ scope.row.shopId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商家logo" min-width="100px">
        <template slot-scope="scope">
          <img
            fit="cover"
            style="width: 50px; height: 50px"
            :src="scope.row.shopImg"
            :lazy="true"
          >
        </template>
      </el-table-column>
      <el-table-column label="商家名称" min-width="100px">
        <template slot-scope="scope">{{ scope.row.shopName }}</template>
      </el-table-column>
      <el-table-column label="商家联系人" width="100px">
        <template slot-scope="scope">{{ scope.row.shopMobile }}</template>
      </el-table-column>
      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleLogin(scope.row.shopId)">管理账号</el-button>
          <el-button size="mini" type="primary" @click="handleEdit(scope.row.shopId)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.shopId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <span class="demonstration" @click="goAddCommodity">商家添加</span>
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
import { findAllPage, updateObj } from '@/api/shop'
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
      findAllPage(this.listQuery).then(res => {
        this.tableData = res.data.dataList
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
      this.$router.push({ path: '/shop/shopDetail' })
    },
    // 去编辑修改
    handleEdit(row) {
      console.log(row)
      this.$router.push({ path: '/shop/shopDetail', query: { id: row }})
    },
    // 去编辑修改
    handleLogin(row) {
      console.log(row)
      this.$router.push({ path: '/shop/shopLogin', query: { id: row }})
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
          updateObj({ shopId: vm.id, status: 0 })
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

