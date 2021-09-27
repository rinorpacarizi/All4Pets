<template>
  <div>
    <div class="nav-div">
      <img id="logo-image" src="../assets/logo.png" alt="logo" />
      <div id="profile-div">
        <p style="color: orange; padding-top: 8px; padding-right: 10px">
          User Profile
        </p>
        <img id="profile-image" src="../assets/profile-pic.png" />
      </div>
    </div>
    <div class="tab-pane" id="tab-container">
      <el-tabs v-model="activeName">
        <el-tab-pane name="first"
          ><span slot="label"
            ><router-link to="/">
              <img
                class="tab-image"
                size="small"
                src="../assets/paw.png" /></router-link></span
        ></el-tab-pane>
        <el-tab-pane name="second"
          ><span slot="label"
            ><router-link to="/activity"
              ><img
                class="tab-image"
                src="../assets/fork.png" /></router-link></span
        ></el-tab-pane>
        <el-tab-pane name="third"
          ><span slot="label">
            <router-link to="/medical"
              ><img
              style="height:42px;position:relative;top:0px;"
                id="medecine-image"
                class="tab-image"
                src="../assets/medecine.png" /></router-link></span
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: "NavBar",
  data() {
    return {
      activeName: "first",
    };
  },
};
</script>

<style scoped>
.nav-div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.tab-pane {
background-color: black;
position: relative;
top: 55px;
width: 230px;
left: 615px;
}
#profile-div {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
#logo-image {
  height: 80px;
  width: 100px;
}

#profile-image {
  height: 60px;
  width: 60px;
}
.tab-image {
  height: 50px;
  width: 50px;
  position: relative;
  top: 5px;
}
</style>