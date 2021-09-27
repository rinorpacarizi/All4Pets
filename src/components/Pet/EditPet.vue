<template>
  <div style="padding-left: 120px">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item id="name-input" label="Pet Name" method="post" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Pet Type" prop="type">
        <el-select v-model="ruleForm.type">
          <el-option
            v-for="type in typesP"
            v-bind:key="type.id"
            v-bind:value="type.name"
          >
            {{ type.name }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Gender" prop="gender">
        <el-radio-group v-model="ruleForm.gender">
          <el-radio label="Male"></el-radio>
          <el-radio label="Female"></el-radio>
          <el-radio label="Other"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item id="age-input" label="Age" prop="age">
        <el-input type="text" v-model="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item style="padding-left: 30px">
        <el-button
          type="primary"
          method="post"
          @click="
            submitForm('ruleForm');
            resetForm('ruleForm');
          "
          >Edit</el-button
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
  name: "EditPet",
  props: ["id"],
  data() {
    return {
      typesP: [],
      petId: this.id,
      ruleForm: {
        name: "",
        type: "",
        gender: "",
        age: "",
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
            trigger: "blur",
          },
        ],
        gender: [
          {
            type: "string",
            required: true,
            message: "Please select Animal's Gender",
            trigger: "blue",
          },
        ],
        age: [
          {
            required: true,
            message: "Please input Animal's Age",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.put(
            "http://localhost:3000/pets/" + this.petId,
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
    await Vue.axios.get("http://localhost:3000/typesP").then((res) => {
      this.typesP = res.data;
    });
    await Vue.axios
      .get("http://localhost:3000/pets/" + this.petId)
      .then((res) => {
        this.ruleForm = res.data;
      });
  }
  
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