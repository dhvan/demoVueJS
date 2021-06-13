<template>
<div class="wrapper">
  <div class="title">Welcome New Member</div>
  <b-form class="formData" @submit="onSubmit">
    <b-alert :show="showSuccess" dismissible>Create Successful</b-alert>
    <b-alert variant="danger" :show="showFail">Please try again</b-alert>
    <b-form-group id="input-group-1" label="Full Name:" label-for="input-1">
      <b-form-input
        id="input-1"
        type="text"
        v-model="formData.name"
        placeholder="Input employee name"
        required
        size="sm"
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-2" label="Chucvu" label-for="input-2">
      <b-form-input
        id="input-2"
        v-model="formData.chucVu"
        placeholder="Enter Role"
        required
        size="sm"
      ></b-form-input>
    </b-form-group>
    <b-form-group id="input-group-3" label="Dept" label-for="input-3">
      <b-form-input
        id="input-3"
        placeholder="Enter your department"
        v-model="formData.dept"
        required
        size="sm"
      ></b-form-input>
    </b-form-group>
    <b-form-group id="input-group-4" label="Manafer" label-for="input-4">
      <b-form-input
        id="input-4"
        placeholder="Enter your manager"
        v-model="formData.manager"
        required
        size="sm"
      ></b-form-input>
    </b-form-group>
    <div>
      <label class="typo__label">Simple select / dropdown</label>
      <multiselect
        v-model="selectedTeam"
        :options="options"
        :multiple="true"
        label="name"
        track-by="teamId"
      />
    </div>
    <br />
    <b-button
      :disabled="isDisabled"
      type="submit"
      variant="primary"
      class="button"
      @click.prevent="onSubmit()"
      >Submit
      </b-button>
    <b-button
      :disabled="!isDisabled"
      type="submit"
      variant="primary"
      @click.prevent="onReset()"
      >Create new
      </b-button>      
  </b-form>
</div>
  
</template>

<script>
import EmployeesService from "@/services/EmployeesService";
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      isDisabled: false,
      showSuccess: false,
      showFail: false,
      options: [
        { name: "ABC", teamId: 1 },
        { name: "DEF", teamId: 2 },
      ],
      form: {
        Name: "",
        Chucvu: "",
        Team: "",
      },
      items: [],
      selectedTeam: null,
      formData: {},
    };
  },
  methods: {
    async onSubmit() {
      this.isDisabled = true;
      let response = {};
      try {
        response = await EmployeesService.post({
          Name: this.formData.name,
          Chucvu: this.formData.chucVu,
          Dept: this.formData.dept,
          Manager: this.formData.manager,
          Team: this.selectedTeam
        });
      } catch (e) {
        console.log(e);
      }
      if (response?.status === 200) {
        this.showSuccess = true
      } else {
        this.showFail = true
      }
      
    },
    onReset() {
      this.showSuccess = false
      this.showFail = false
      this.isDisabled = false
      this.formData.name = "";
      this.formData.chucVu = "";
      this.formDataa.team = "";
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
.wrapper {
  margin-top: 3rem;
  border: 1px solid #e0af63
}
.formData {
  margin: 20px 20px 20px 20px
}
.button {
  margin-right: 20px
}
  .title {
    color: #67b53b;
    font-size: 2rem;
    text-align: center;
  }
</style>

