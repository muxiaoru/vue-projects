<template>
  <div class="menuSlider">
    <div class="slider-container" :class="{'show-nav': asideMenu}" style="transition: transform 0.3s ease;">
      <el-container>
        <el-aside width="200px" style="position:fixed;height: 100%;transform: translateX(-100%);">
          <div class="avatar">
            <el-avatar :size="75" :src="avatarUrl"></el-avatar>
          </div>
          <div class="list">
            <el-menu text-color="#fff">
              <el-menu-item v-for="(item, index) in items" :key="index">{{
                item.text
              }}</el-menu-item>
            </el-menu>
          </div>
        </el-aside>
        <el-container>
          <el-header height>
            <el-button
              @click="drawerAside"
              type="primary"
              style="margin-left: 16px"
              icon="el-icon-s-unfold"
              class="toggle"
            >
            </el-button>
            <h1>My Landing Page</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur,
              amet!
            </p>
            <el-button class="cta-btn" @click="dialogVisible = true"
              >Sign Up</el-button
            >
            <el-dialog
              title="Sign Up"
              :visible.sync="dialogVisible"
              width="30%"
            >
              <div class="dialog-container">
                <p>Register with us to get offers, support and more</p>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                  <el-form-item label="Name" prop="username">
                    <el-input
                      v-model.trim="ruleForm.username"
                      placeholder="Enter username"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="Email" prop="email">
                    <el-input
                      v-model.trim="ruleForm.email"
                      placeholder="Enter email"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="Password" prop="password">
                    <el-input
                      v-model.trim="ruleForm.password"
                      placeholder="Enter password"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="Confirm Password" prop="passwordTwo">
                    <el-input
                      v-model.trim="ruleForm.passwordTwo"
                      placeholder="Enter password again"
                    ></el-input>
                  </el-form-item>
                  <el-button
                    native-type="submit"
                    @click.prevent="submit('ruleForm')"
                    class="submitBtn"
                    >Submit</el-button
                  >
                </el-form>
              </div>
            </el-dialog>
          </el-header>
          <el-main>
            <h2>What is this landing page about?</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
              iure accusamus ab consectetur eos provident ipsa est perferendis
              architecto. Provident, quaerat asperiores. Quo esse minus repellat
              sapiente, impedit obcaecati necessitatibus.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              optio officia ipsa. Cum dignissimos possimus et non provident
              facilis saepe!
            </p>

            <h2>Tell Me More</h2>

            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat
              eaque delectus explicabo qui reprehenderit? Aspernatur ad
              similique minima accusamus maiores accusantium libero autem iusto
              reiciendis ullam impedit esse quibusdam, deleniti laudantium rerum
              beatae, deserunt nemo neque, obcaecati exercitationem sit. Earum.
            </p>

            <h2>Benefits</h2>
            <ul>
              <li>Lifetime Access</li>
              <li>30 Day Money Back</li>
              <li>Tailored Customer Support</li>
            </ul>

            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse
              quam nostrum, fugiat, itaque natus officia laborum dolorum id
              accusantium culpa architecto tenetur fuga? Consequatur provident
              rerum eius ratione dolor officiis doloremque minima optio
              dignissimos doloribus odio debitis vero cumque itaque excepturi a
              neque, expedita nulla earum accusamus repellat adipisci veritatis
              quam. Ipsum fugiat iusto pariatur consectetur quas libero dolor
              dolores dolorem, nostrum ducimus doloremque placeat accusamus
              iste, culpa quaerat consequatur?
            </p>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
export default {
  name: "MenuSlider",
  data() {
    var checkUserName = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("Username must be at least 3 characters"));
      } else if (value.length > 15) {
        callback(new Error("Username must be less than 15 characters"));
      } else {
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Email is not valid"));
      } else {
        callback();
      }
    };
    var checkPassword = (rule, value, callback) => {
      if (value === "" || value.length < 6) {
        callback(new Error("Password must be at least 6 characters"));
      } else if (value.length > 25) {
        callback(new Error("Password must be less than 25 characters"));
      } else {
        callback();
      }
    };
    var checkPasswordTwo = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Password2 is required"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("Passwords do not match"));
      } else {
        callback();
      }
    };
    return {
      drawer: false,
      avatarUrl: "https://randomuser.me/api/portraits/men/76.jpg",
      items: [
        { text: "Home" },
        { text: "Portfolio" },
        { text: "Blog" },
        { text: "Contact Me" },
      ],
      dialogVisible: false,
      ruleForm: {
        username: "",
        email: "",
        password: "",
        passwordTwo: "",
      },
      rules: {
        username: [{ validator: checkUserName, trigger: "blur" }],
        email: [
          { type: "email", message: "Email is not valid" },
          { validator: checkEmail, trigger: "blur" },
        ],
        password: [{ validator: checkPassword, trigger: "blur" }],
        passwordTwo: [{ validator: checkPasswordTwo, trigger: "blur" }],
      },
      asideMenu: false,
    };
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
        } else {
          return false;
        }
      });
    },
    drawerAside() {
      this.asideMenu = !this.asideMenu;
    },
  },
};
</script>
<style scoped>
.show-nav {
  transform: translateX(200px);
}
.menuSlider {
  width: 100%;
  background-color: #fff;
}
.el-aside {
  background-color: #30336b;
  border-right: 2px solid rgba(200, 200, 200, 0.1);
  color: #fff;
  display: flex;
  flex-direction: column;
}
.el-header {
  background-color: #30336b;
  position: relative;
  color: #fff;
  padding: 40px 15px;
  text-align: center;
  font-size: 130%;
}
.el-main {
  background-color: #fff;
  padding: 15px;
  margin: 0 auto;
  max-width: 100%;
  width: 800px;
}
.el-menu {
  background-color: #30336b;
  color: #fff;
  border: none;
}
.avatar {
  display: flex;
  justify-content: center;
  padding: 30px 0;
  border-bottom: 2px solid rgba(200, 200, 200, 0.1);
}
.el-menu-item {
  border-bottom: 2px solid rgba(200, 200, 200, 0.1);
  padding: 20px;
  display: flex;
  align-items: center;
}
.el-menu-item:focus,
.el-menu-item:hover {
  outline: 0;
  background-color: #30336b;
}
.el-button {
  outline: none;
  border: none;
  font-size: 1.5em;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}
.toggle {
  position: absolute;
  top: 20px;
  left: 4px;
  padding: 8px 12px;
  background-color: rgba(0, 0, 0, 0.3);
}
::v-deep .el-dialog {
  border-radius: 5px;
  box-shadow: 0 0 10px rgb(0 0 0 / 30%);
}
::v-deep .el-dialog__header {
  background-color: #30336b;

  padding: 15px;
  display: flex;
  justify-content: space-between;
}
::v-deep .el-dialog__title {
  color: #fff;
}
::v-deep .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
  font-weight: 900;
  font-size: 25px;
}
::v-deep .el-dialog__body {
  padding: 30px 20px;
}

::v-deep .el-dialog__footer {
  text-align: left;
}
::v-deep .el-button--default {
  background-color: #be2edd;
  border: 0;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  padding: 8px 12px;
  font-size: 14px;
}
.cta-btn {
  padding: 12px 30px;
  font-size: 20px;
  background-color: #be2edd;
}
.submitBtn {
  display: flex;
}
</style>