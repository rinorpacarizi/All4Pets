<template>
  <div class="main-div-activity">
    <div>
      <el-button
        class="add-activity-pet"
        type="warning"
        @click="dialogAddVisible = true"
        round
      >
        <i id="add-activity-icon" class="el-icon-circle-plus-outline"></i
      ></el-button>
      <el-dialog title="Add an Activity" :visible.sync="dialogAddVisible"
        ><AddActivity
          v-on:changeDisplay="dialogAddNotVisible($event)"
        ></AddActivity
      ></el-dialog>
    </div>
    <div
      id="activity-item-div"
      v-for="activity in activities"
      v-bind:key="activity.id"
    >
      <label
        style="color: #d67112; width: 135px; font-size: 30px; padding-top: 25px"
        >{{ activity.name }}</label
      >
      <div id="type-activity">
        <label class="default-attrib" style="padding-bottom: 20px">{{
          activity.type
        }}</label>
        <label style="width: 440px" class="default-attrib">{{
          activity.notes
        }}</label>
      </div>
      <div id="element-div-tn">
        <div style="display: flex; flex-direction: row">
          <div id="notes-activity">
            <label class="default-attrib" style="padding-bottom: 20px">{{
              activity.sdate
            }}</label>
            <label class="default-attrib">{{ activity.edate }}</label>
          </div>
          <div id="notes-activity">
            <label class="default-attrib" style="padding-bottom: 20px">{{
              activity.stime
            }}</label>
            <label class="default-attrib">{{ activity.etime }}</label>
          </div>
          <div id="edit-activity-div">
            <div style="padding-right: 10px; padding-bottom: 13px">
              <el-button
                @click="
                  dialogEditVisible = true;
                  changeId(activity.id);
                "
                type="primary"
                icon="el-icon-edit"
                circle
                size="small"
              ></el-button>
              <el-dialog
                title="Edit an Activity"
                :visible.sync="dialogEditVisible"
                ><EditActivity
                  v-on:changeDisplay="dialogEditNotVisible($event)"
                  :id="id"
                ></EditActivity
              ></el-dialog>
            </div>
            <el-button
              type="danger"
              size="small"
              @click="
                deleteActivity(activity.id);
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
import EditActivity from "./EditActivity.vue";
import AddActivity from "./AddActivity.vue";
Vue.use(VueAxios, axios);
export default {
  name: "ActivityTab",
  components: {
    EditActivity,
    AddActivity,
  },
  data() {
    return {
      activities: [],
      id: 0,
      dialogAddVisible: false,
      dialogEditVisible: false,
    };
  },
  methods: {
    getData() {
      Vue.axios.get("http://localhost:3000/activity").then((res) => {
        this.activities = res.data;
      });
    },
    deleteActivity(id) {
      this.axios.delete("http://localhost:3000/activity/" + id).then(() => {
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
        title: "Activity Removal",
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
.main-div-activity {
  position: relative;
  top: 100px;
  left: 232px;
  width: 1000px;
}
#activity-item-div {
  display: flex;
  flex-direction: row;
  border-bottom: 3px solid #d67112;
  padding: 10px;
}
#edit-activity-div {
  padding-left: 20px;
}
#element-div-tn {
  position: relative;
  left: 11%;
}
#type-activity {
  position: relative;
  left: 45px;
  display: flex;
  flex-direction: column;
}
#notes-activity {
  display: flex;
  flex-direction: column;
  padding-right: 10px;
}
.add-activity-pet {
  position: relative;
  height: 48px;
  top: -110px;
  left: 78vw;
  width: 50px;
  background-color: #fe8a2e;
  border-radius: 50%;
}
#add-activity-icon {
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