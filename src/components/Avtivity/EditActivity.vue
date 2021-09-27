<template>
  <div style="padding-left: 120px">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
     <el-form-item style="width:340px;" label="Pet Name" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
       <el-form-item label="Activity Type" prop="type">
        <el-select v-model="ruleForm.type">
          <el-option
            v-for="type in typesA"
            v-bind:key="type.id"
            v-bind:value="type.type"
          >
            {{type.type}}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Starting time">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="Pick a date"
            v-model="ruleForm.sdate"
             value-format="dd-MM-yyyy"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker
            placeholder="Pick a time"
            v-model="ruleForm.stime"
            value-format="HH:mm:ss"
            style="width: 100%"
          ></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="Ending time">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="Pick a date"
            v-model="ruleForm.edate"
             value-format="dd-MM-yyyy"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker
            placeholder="Pick a time"
            v-model="ruleForm.etime"
            value-format="HH:mm:ss"
            style="width: 100%"
          ></el-time-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="Activity notes" prop="notes">
    <el-input style="width:340px;" type="textarea" v-model="ruleForm.notes"></el-input>
  </el-form-item>
      <el-form-item style="padding-left: 30px">
        <el-button type="primary" method="post" @click="submitForm('ruleForm')"
          >Add</el-button
        >
        <el-button type="info" @click="resetForm('ruleForm')" plain
          >Clear</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
export default {
  name: "EditActivity",
  props: ["id"],
  data() {
    return {
      typesA: [],
      activeId: this.id,
      ruleForm: {
        name: "",
        type: "",
        notes:"",
        sdate: "",
        edate: "",
        stime: "",
        etime: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input the Animal's Name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "Length should be 3 to 10",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "Please select Animal's Type",
            trigger: "change",
          },
        ],
        sdate: [
          {
            required: true,
            type: "date",
            
            message: "Please pick a date",
            trigger: "change",
             
          },
        ],
        edate: [
          {
            type: "date",
            required: true,
            message: "Please pick a date",
            trigger: "change",
          },
        ],stime: [
          {
            type: "date",
            required: true,
            message: "Please pick a time",
            trigger: "change",
          },
        ],
        etime: [
          {
            type: "date",
            required: true,
            message: "Please pick a time",
            trigger: "change",
          },
        ],
        notes: [
            { required: true, message: 'Please write a note', trigger: 'blur' }
          ]
      },
    };
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.put(
            "http://localhost:3000/activity/" + this.activeId,
            this.ruleForm
          );
          this.$emit("changeDisplay", false);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  async mounted() {
    await Vue.axios.get("http://localhost:3000/typesA").then((res) => {
      this.typesA = res.data;
    });
    await Vue.axios
      .get("http://localhost:3000/activity/" + this.activeId)
      .then((res) => {
        this.ruleForm = res.data;
      });
  },

};
</script>
<style scoped>
#name-input {
  width: 340px;
}
#age-input {
  width: 340px;
}
</style>