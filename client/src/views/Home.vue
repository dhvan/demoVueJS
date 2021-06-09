<template>
  <div class="wrapper">
    <b-card>
      <div class="title">Company Management</div>
      <div class="sub-title mb-4">Roles & Responsibilities</div>

      <div class="shareholder">Shareholders of the Company</div>
      <div class="d-flex justify-content-center">
        <div class="board">Board of Directors</div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="ceo">CEO</div>
      </div>
      <div class="d-flex justify-content-center">
        <department-info />
        <department-info />
        <department-info />
        <department-info />
      </div>
    </b-card>
  </div>
</template>

<script>
import DepartmentInfo from "../components/DepartmentInfo.vue";
export default {
  components: { DepartmentInfo },
  name: "Home",
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: 3rem;
  text-align: center;

  .title {
    color: #67b53b;
    font-size: 2rem;
  }

  .sub-title {
    color: #8d8d8d;
    font-size: 1.25rem;
  }

  .shareholder {
    font-weight: 700;
    font-size: 1.2rem;
    background-color: #fff;
    text-align: center;
    border: 3px solid #e0af63;
    margin: 10px 0px;
    padding: 5px 0px;
    border-radius: 5px;
  }

  .board {
    color: #fff;
    border-radius: 3px;
    font-size: 1.2rem;
    padding: 10px 30px;
    background-color: #67b53b;
    margin: 15px 0px;
  }

  .ceo {
    color: #fff;
    padding: 5px 30px;
    border-radius: 3px;
    background-color: #39484f;
    margin: 10px 0px;
  }
}
</style>
