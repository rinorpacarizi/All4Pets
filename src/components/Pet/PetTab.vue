<template>
  <div>
    <div>
      <el-button
        class="add-button-pet"
        type="warning"
        @click="dialogAddVisible = true"
        round
      >
        <i id="add-pet-icon" class="el-icon-circle-plus-outline"></i
      ></el-button>
      <el-dialog title="Add a Pet" :visible.sync="dialogAddVisible"
        ><AddPet v-on:changeDisplay="dialogAddNotVisible($event)"></AddPet
      ></el-dialog>
    </div>
    <div id="main-pet-div">
      <el-row id="pet-row">
        <el-col
          id="pet-col"
          :span="6"
          col="3"
          v-for="pet in pets"
          v-bind:key="pet.id"
        >
          <div id="pet-content-div">
            <el-card id="pet-card">
              <img class="image" :src="url"/>
              <div style="display: flex; flex-direction: column">
                <span id="pet-name">{{ pet.name }}</span>
                <span ref="type" id="pet-type">{{pet.type}}</span>
                <div
                  style="
                    display: flex;
                    justify-content: space-around;
                    padding-top: 10px;
                  "
                >
                  <span id="pet-gender">Gender: {{ pet.gender }}</span>
                  <span id="pet-age">Age: {{ pet.age }}</span>
                </div>

                <div id="edit-pet-div">
                  <div style="padding-right: 10px">
                    <el-button
                      @click="
                        dialogEditVisible = true;
                        changeId(pet.id);
                      "
                      type="primary"
                      icon="el-icon-edit"
                      circle
                    ></el-button>
                    <el-dialog
                      title="Edit a Pet"
                      :visible.sync="dialogEditVisible"
                      ><EditPet
                        v-on:changeDisplay="dialogEditNotVisible($event)"
                        :id="id"
                      ></EditPet
                    ></el-dialog>
                  </div>
                  <el-button
                    type="danger"
                    @click="deletePet(pet.id);notify();"
                    icon="el-icon-delete"
                    circle
                  ></el-button>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import AddPet from "./AddPet.vue";
import EditPet from "./EditPet.vue";
import parrot from "../../assets/parrot.jpg"

Vue.use(VueAxios, axios);
export default {
  name: "PetTab",
  components: {
    AddPet,
    EditPet,
  },
  data() {
    return {
      pets: [],
      id: 0,
      idPic:0,
      url:parrot,
      dialogAddVisible: false,
      dialogEditVisible: false,
    };
  },
  methods: {
    getData() {
      Vue.axios.get("http://localhost:3000/pets").then((res) => {
        this.pets = res.data;
      });
    },
    deletePet(id) {
      this.axios.delete("http://localhost:3000/pets/" + id).then(() => {
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
          title: 'Pet Removal',
          message: 'Pet was succesfully removed',
          position: 'bottom-right'
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#pet-col {
  flex: 1 0 33%;
  padding-bottom: 30px;
}
#main-pet-div {
  padding: 30px;
}
#pet-content-div {
  display: flex;
  justify-content: space-evenly;
}
#pet-card {
  background-color: black;
  border: 5px #fe3600 solid;
  border-radius: 10px;
  height: 430px;
  width: 400px;
}
#pet-name {
  color: orange;
  font-size: 35px;
  display: flex;
  justify-content: center;
}
#pet-type{
   color: orange;
  font-size: 18px;
  display: flex;
  justify-content: center;
}
#pet-gender {
  color: wheat;
  font-size: 20px;
}
#pet-age {
  color: wheat;
  font-size: 20px;
}

#pet-row {
  display: flex;
  justify-content: space-between;
  background-color: black;
  padding-top: 20px;
  flex-wrap: wrap;
}
#medecine-image {
  width: 58px;
}
#tab-container {
  display: flex;
  justify-content: center;
  background-color: black;
  border: none;
  position: relative;
  top: 70px;
}
.image {
  width: 360px;
  height: 235px;
  border-radius: 20px;
}
.add-button-pet {
 position: relative;
  height: 48px;
  top: -10px;
  left: 93vw;
  width: 50px;
  background-color: #fe8a2e;
  border-radius: 50%;
}
#add-pet-icon {
  position: relative;
  bottom: 6px;
  right: 16px;
  color: black;
  font-weight: bold;
  font-size: 35px;
}
#edit-pet-div {
  padding-top: 15px;
  padding-left: 135px;
  display: flex;
  flex-direction: row;
}
</style>
