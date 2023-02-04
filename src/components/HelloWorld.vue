<template>
<!-- form-validator -->
<div class="formValidator">
  <div class="container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="form"
    >
      <h2>Register With Us</h2>
      <el-form-item label="Username" prop="username" class="form-container">
        <el-input
          v-model.trim="ruleForm.username"
          placeholder="Enter username"
        ></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="email" class="form-container">
        <el-input
          type="email"
          v-model.trim="ruleForm.email"
          placeholder="Enter email"
        ></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password" class="form-container">
        <el-input
          v-model.trim="ruleForm.password"
          placeholder="Enter password"
        ></el-input>
      </el-form-item>
      <el-form-item label="Confirm Password" prop="passwordTwo" class="form-container">
        <el-input
          v-model.trim="ruleForm.passwordTwo"
          placeholder="Enter password again"
        ></el-input>
      </el-form-item>
      <el-button native-type="submit" @click.prevent="submit('ruleForm')"
        >Submit</el-button
      >
    </el-form>
  </div>
</div>
</template>

<script lang="js">

export default {
  name: "HelloWorld",
  props: {},
  data() {
    var checkUserName = (rule, value, callback) => {
      if(value.length < 3){
         callback(new Error('Username must be at least 3 characters'));
      }else if(value.length > 15){
         callback(new Error('Username must be less than 15 characters'));
      }else{
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      if(value === ''){
        callback(new Error('Email is not valid'));
      }else{
        callback();
      }
    };
    var checkPassword = (rule, value, callback) => {
      if(value === '' || value.length < 6){
        callback(new Error('Password must be at least 6 characters')); 
      }else if(value.length > 25){
        callback(new Error('Password must be less than 25 characters')); 
      }else{
        callback();
      }
    };
    var checkPasswordTwo = (rule, value, callback) => {
      if(value === ''){
        callback(new Error('Password2 is required')); 
      }else if(value !== this.ruleForm.password){
        callback(new Error('Passwords do not match'));
      }else{
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        email: "",
        password: "",
        passwordTwo: "",
      },
      rules: {
        username: [
          { validator: checkUserName, trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: 'Email is not valid' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' }
        ],
        passwordTwo: [
         { validator: checkPasswordTwo, trigger: 'blur' }
        ],
      },
    };
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          return;
        } else {
          return false;
        }
      });
    }
    // submit() {
    //   // name 验证
    //   if (this.username.length < 3) {
    //     this.usernameError = "Username must be at least 3 characters";
    //   } else if (this.username.length > 15) {
    //     this.usernameError = "Username must be less than 15 characters";
    //   } else {
    //     this.usernameError = "";
    //   }

    //   // email 验证
    //   const re = new RegExp(
    //     "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$"
    //   );
    //   if (re.test(this.email)) {
    //     this.emailError = "";
    //   } else {
    //     this.emailError = "Email is not valid";
    //   }

    //   // password 验证
    //   if (this.password.length < 6) {
    //     this.passwordError = "Password must be at least 6 characters";
    //   } else if (this.password.length > 25) {
    //     this.passwordError = "Password must be less than 25 characters";
    //   } else {
    //     this.passwordError = "";
    //   }

    //   //passwordTwo 验证
    //   if (this.passwordTwo === "") {
    //     this.passwordTwoError = "Password2 is required";
    //   } else if (this.password !== this.passwordTwo) {
    //     this.passwordTwoError = "Passwords do not match";
    //   } else {
    //     this.passwordTwoError = "";
    //   }
    // },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  background-color: #fff;
  width: 400px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
h2 {
  text-align: center;
  margin: 0 0 20px;
}
.form {
  padding: 30px 40px;
}
.form-container {
  margin-bottom: 10px;
  padding-bottom: 20px;
  position: relative;
}
.el-form-item__label{
  margin-bottom: 5px;
  color: #777;
}
.form-container input {
  border: 2px solid #f0f0f0;
  padding: 10px;
  font-size: 14px;
  border-radius: 8px;
  width: 100%;
}
.form-container input:focus {
  outline: none;
  border-color: #777;
}
.form-container small {
  color: var(--error-color);
  position: absolute;
  bottom: 0;
  left: 0;
  /* visibility: hidden; */
}
.form-container.success input {
  border-color: var(--success-color);
}
.form-container.error input {
  border-color: var(--error-color);
}
/* .form-container.error small {
  visibility: visible;
} */
.form button {
  width: 100%;
  color: #fff;
  margin-top: 20px;
  padding: 10px;
  background: #3498db;
  border-radius: 4px;
  display: block;
  font-size: 16px;
  border: 2px solid #3498db;
  cursor: pointer;
}
</style>
