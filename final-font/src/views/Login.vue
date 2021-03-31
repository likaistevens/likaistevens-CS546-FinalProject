<template>
  <div class="login-layout">
    <div v-if="status==='login'" class="login-container">
      <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="100px" label-position="left" class="login-form">
        <el-form-item label="User Name" prop="userName">
          <el-input v-model="loginForm.userName" />
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input v-model="loginForm.password" type="password" />
        </el-form-item>
      </el-form>
      <el-button type="text" @click="onSignUp">Sign Up</el-button>
      <el-button type="primary" @click="onLogin">Login</el-button>
    </div>
    <div v-if="status==='signUp'" class="signUp-container">
      <el-form ref="signUpForm" :model="signUpForm" :rules="rules" label-width="100px" label-position="left" class="signUp-form">
        <el-form-item label="User Name" prop="userName">
          <el-input v-model="signUpForm.userName" />
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input v-model="signUpForm.password" type="password" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="signUpForm.email" />
        </el-form-item>
        <el-form-item label="Phone" prop="phone">
          <el-input v-model.number="signUpForm.phone" />
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" @click="onCreateAccount">Create Account</el-button>
        <div>
          Already have an account?
          <el-button type="text" @click="onBackToLogin">Login</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  data() {
    return {
      status: 'login',
      loginForm: {
        userName: 'admin',
        password: 'admin'
      },
      signUpForm: {
        userName: '',
        password: '',
        email: '',
        phone: ''
      },
      rules: {
        userName: [
          { required: true, message: 'please enter your user name', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'please enter your password', trigger: ['blur', 'change'] },
          { min: 5, max: 12, message: '5 ~ 12 charts', trigger: ['blur', 'change'] }
        ],
        email: [
          { required: true, message: 'please enter your email address', trigger: ['blur', 'change'] },
          { type: 'email', message: 'email is invalid', trigger: ['blur', 'change'] }
        ],
        phone: [
          { required: true, message: 'please enter your phone number', trigger: ['blur', 'change'] },
          { type: 'number', message: 'phone number must be Number', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    onSignUp() {
      this.status = 'signUp'
      this.$refs.loginForm.resetFields()
    },
    onBackToLogin() {
      this.status = 'login'
      this.$refs.signUpForm.resetFields()
    },
    onLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.API.login({
            ...this.loginForm
          }).then(() => {
            this.$message({
              message: 'success!',
              type: 'success'
            })
            this.$store.commit('setUserId', this.loginForm.userName)
            this.$router.push({ name: 'Bill', params: { userName: 'Kai Li' } })
          }).catch(err => {
            this.$message.error(err)
          })
        } else {
          this.$message({
            message: 'Please fill the form!',
            type: 'error'
          })
          return false
        }
      })
    },
    onCreateAccount() {
      this.$refs.signUpForm.validate((valid) => {
        if (valid) {
          this.API.signUp({
            ...this.signUpForm
          }).then(() => {
            this.$message({
              message: 'success!',
              type: 'success'
            })
            this.status = 'login'
          }).catch(err => {
            this.$message.error(err)
          })
        } else {
          this.$message({
            message: 'Please fill the form!',
            type: 'error'
          })
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-layout{
    width: 400px;
    padding: 50px;
    .login-form{
        height: 270px;
    }
    .signUp-form{
        height: 270px;
    }
}
</style>
