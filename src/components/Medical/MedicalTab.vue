<template>
  <div class="main-div-medical">
    <div>
      <el-button
        class="add-medical-pet"
        type="warning"
        @click="dialogAddVisible = true"
        round
      >
        <i id="add-medical-icon" class="el-icon-circle-plus-outline"></i
      ></el-button>
      <el-dialog title="Add a Medical Form" :visible.sync="dialogAddVisible"
        ><AddMedical
          v-on:changeDisplay="dialogAddNotVisible($event)"
        ></AddMedical
      ></el-dialog>
    </div>
    <div id="medical-item-div" v-for="item in items" v-bind:key="item.id">
      <label
        style="color: #d67112; width: 135px; font-size: 30px; padding-top: 25px"
        >{{ item.name }}</label
      >
      <div id="type-medical">
        <label class="default-attrib" style="padding-bottom: 20px">{{
          item.type
        }}</label>
        <label style="width: 440px" class="default-attrib">{{
          item.notes
        }}</label>
      </div>
      <div id="element-div-tn">
        <div style="display: flex; flex-direction: row">
          <div class="notes-medical">
            <label class="default-attrib" style="padding-bottom: 20px">{{
              item.sdate
            }}</label>
            <label class="default-attrib">{{ item.edate }}</label>
          </div>
          <div class="notes-medical">
            <label class="default-attrib" style="padding-bottom: 20px">{{
              item.stime
            }}</label>
            <label class="default-attrib">{{ item.etime }}</label>
          </div>
          <div id="edit-medical-div">
            <div style="padding-right: 10px; padding-bottom: 13px">
              <el-button
                @click="
                  dialogEditVisible = true;
                  changeId(item.id);
                "
                type="primary"
                icon="el-icon-edit"
                circle
                size="small"
              ></el-button>
              <el-dialog
                title="Edit a Medical Form"
                :visible.sync="dialogEditVisible"
                ><EditMedical
                  v-on:changeDisplay="dialogEditNotVisible($event)"
                  :id="id"
                ></EditMedical
              ></el-dialog>
            </div>
            <el-button
              type="danger"
              size="small"
              @click="
                deleteActivity(item.id);
                notify();
              "
              icon="el-icon-delete"
              circle
            ></el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import EditMedical from "./EditMedical.vue";
import AddMedical from "./AddMedical.vue";
Vue.use(VueAxios, axios);
export default {
  name: "MedicalTab",
  components: {
    EditMedical,
    AddMedical,
  },
  data() {
    return {
      items: [],
      id: 0,
      dialogAddVisible: false,
      dialogEditVisible: false,
    };
  },
  methods: {
    getData() {
      Vue.axios.get("http://localhost:3000/medical").then((res) => {
        this.items = res.data;
      });
    },
    deleteActivity(id) {
      this.axios.delete("http://localhost:3000/medical/" + id).then(() => {
        this.getData();
      });
    },
    dialogAddNotVisible(e) {
      this.dialogAddVisible = e;
      this.getData();
    },
    dialogEditNotVisible(e) {
      this.getData();
      this.dialogEditVisible = e;
    },
    changeId(val) {
      this.id = val;
    },
    notify() {
      this.$notify.error({
        title: "Medical Activity Removal",
        message: "Activity was succesfully removed",
        position: "bottom-right",
      });
    },
  },
  mounted() {
    this.getData();
  },
  updated() {
    this.getData();
  },
};
</script>
<style scoped>
.main-div-medical {
  position: relative;
  top: 100px;
  left: 232px;
  width: 1000px;
}
#medical-item-div {
  display: flex;
  flex-direction: row;
  border-bottom: 3px solid #d67112;
  padding: 10px;
}
#edit-medical-div {
  padding-left: 20px;
}
#element-div-tn {
  position: relative;
  left: 11%;
}
#type-medical {
  position: relative;
  left: 45px;
  display: flex;
  flex-direction: column;
}
.notes-medical {
  display: flex;
  flex-direction: column;
  padding-right: 10px;
}
.add-medical-pet {
  position: relative;
  height: 48px;
  top: -110px;
  left: 78vw;
  width: 50px;
  background-color: #fe8a2e;
  border-radius: 50%;
}
#add-medical-icon {
  position: relative;
  bottom: 6px;
  right: 16px;
  color: black;
  font-weight: bold;
  font-size: 35px;
}
.default-attrib {
  color: wheat;
  font-size: 25px;
}
</style>