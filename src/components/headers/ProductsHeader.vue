<template>
  <div class="header">
    <div class="left"><p>{{category.category_id ? 'Продукты категории: ' + category.title : 'Продукты'}}</p></div>
    <ul class="right">
      <li>Создать продукт</li>
      <li>Искать продукт</li>
    </ul>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "products-header",
  computed: {
    ...mapState({
      category: state => state.categories.select
    })
  }
}
</script>

<style scoped lang="scss">
.header {
  min-height: 65px;
  margin: 25px auto;
  padding: 15px;
  background-color: #ffffff;
  border: 1px solid rgba(221, 221, 221, 0.7);
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    font-size: 26px;
    text-align: left;
    width: 70%;
  }
  .right {
    display: flex;
    flex-wrap: wrap;
    justify-content: right;
    li {
      width: auto;
      margin: 3px;
      padding: 5px 12px;
      background-color: rgba(221, 221, 221, 0.7);
      border-radius: 2px;
      color: rgba(0,0,0,0.7);
      cursor: pointer;
      font-size: 14px;
      text-transform: uppercase;
      &:hover {
        background-color: #DDDDDD;
      }
    }
  }
}
</style>