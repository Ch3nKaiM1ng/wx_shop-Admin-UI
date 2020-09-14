/* eslint-disable vue/order-in-components */
<template>
  <div class="app-container">
    <el-form ref="dataform" :model="form" status-icon :rules="rules" label-width="120px">
      <el-form-item label="商家登陆账号" prop="name">
        <el-input v-model="form.name" placeholder="商家登陆账号" />
      </el-form-item>
      <el-form-item label="登陆密码" prop="password">
        <el-input v-model="form.password" placeholder="登陆密码" />
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="form.realName" placeholder="真实姓名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('dataform')">提交</el-button>
        <el-button @click="onCancel('dataform')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { shopAccountObj, shopAccountUpdateObj, shopAccountAddObj } from '@/api/shop'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['shopId'])
  },
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      form: {
        name: '',
        password: '',
        realName: '',
        headImg: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        type: 2,
        shopId: this.$route.query.id
      },
      doctorImgTxt: '318*396',
      doctorHeadImgTxt: '1:1',
      shopWxpayData: [{ id: 0, value: '不开通' }, { id: 1, value: '开通微信支付' }],
      doctorclassList: null,
      classOptions: null, // 医生分类
      ImgAmount: 'Single',
      isAdd: true, // 添加(true)或者修改
      rules: {
        name: [
          { required: true, message: '请填写商家账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写登陆密码', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '请填写真实姓名', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.$route.query.id != null) {
      this.Obtain()
      this.isAdd = false
    }
  },
  mounted() {},
  methods: {
    Obtain() {
      shopAccountObj({
        shopId: this.$route.query.id
      }).then(response => {
        if (response.data == null) {
          this.isAdd = true
          return
        }
        this.form = response.data
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message('submit!')
          this.DataSubmit()
        } else {
          this.$message('你东西都没填完呢!')
          return false
        }
      })
    },
    onCancel(formName) {
      this.$message({
        message: '清除了!',
        type: 'warning'
      })
      this.$refs[formName].resetFields()
    },
    DataSubmit() {
      if (this.isAdd) {
        shopAccountAddObj(this.form).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          // 跳转判断
          this.jumpui()
        })
      } else {
        shopAccountUpdateObj(this.form).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.jumpui()
        })
      }
    },
    jumpui() {
      // this.$router.push({
      //   path: '/doctors/doctorsList'
      // })
    },
    // 选择器改变
    doctorsBtn(value) {
      this.form.classList = value.join()
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
.doctorRate {
  margin-top: 10px;
}
</style>

