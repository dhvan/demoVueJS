<template>
  <div class="dp">
    <div class="d-flex justify-content-center w-100">
      <div class="dp__name">DP01</div>
    </div>
    <div class="d-flex justify-content-center w-100">
      <div class="dp__manager">Manager</div>
    </div>
    <div class="dp__team-container">
      <div class="dp__team">
        <p>Team A Ka Na Ha Mu Ya Mi No YU</p>
      </div>
      <div class="dp__team">
        <p>Team B</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DepartmentInfo",
};
</script>

<style lang="scss" scoped>
.dp {
  max-width: 20%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 5px 10px;
  font-size: 0.875rem;

  .dp__name {
    color: #fff;
    background-color: #60bdd2;
    border-radius: 3px;
    padding: 5px 20px;
    margin: 10px 0px;
  }

  .dp__manager {
    color: #fff;
    background-color: #66b33b;
    border-radius: 3px;
    padding: 5px 30px;
    margin: 10px 0px;
  }

  .dp__team-container {
    display: flex;

    .dp__team {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70px;
      height: 70px;
      padding: 15px;
      border-radius: 50%;
      background-color: #929292;
      margin: 10px 5px;

      p {
        color: #fff;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 0px;
      }
    }
  }
}
</style>
