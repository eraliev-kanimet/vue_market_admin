<template>
  <div class="form_group">
    <p class="form_group_title">Категория</p>
    <div class="category">
      <input type="text" disabled :placeholder="select.title === '' ? 'Выберите категорию' : select.title">
      <button @click="setSelectActive" class="category_btn"></button>
      <div v-show="select.title !== ''" class="clear" @click="setSelectTitleAndCategoryId({category: 'clear', mode: mode})"></div>
      <ul class="categories" :class="{active: select.active && select.mode === mode}">
        <li @click="setSelectTitleAndCategoryId({category: category, mode: mode})" v-for="category in categories">{{category.title}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "categories-select",
  props: {
    mode: {
      type: String,
      default: 'create'
    },
    categories: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapMutations({
      setSelectTitleAndCategoryId: 'categories/setSelectTitleAndCategoryId',
      setSelectActive: 'categories/setSelectActive'
    })
  },
  computed: {
    ...mapState({
      select: state => state.categories.select
    })
  }
}
</script>

<style scoped lang="scss">
.form_group {
  width: 100%;
  text-align: center;
  margin-bottom: 15px;
  .form_group_title {
    margin-bottom: 10px;
  }
  input {
    width: 100%;
    height: 36px;
    border: 1px solid #DDDDDD;
    outline: none;
    padding-left: 11px;
  }
  .category {
    position: relative;
    .categories {
      opacity: 0;
      visibility: hidden;
      width: 100%;
      background-color: #f8f9fa;
      position: absolute;
      top: 70px;
      left: 0;
      text-align: left;
      font-size: 17px;
      transition: 0.5s all ease;
      height: 130px;
      overflow: auto;
      li {
        border-bottom: 1px solid #DDDDDD;
        width: 100%;
        padding: 2px 2px 2px 10px;
        cursor: pointer;
        &:hover {
          background-color: rgba(221, 221, 221, 0.6);
        }
      }
      &.active {
        opacity: 1;
        visibility: visible;
        top: 40px;
      }
    }
    .category_btn {
      position: absolute;
      width: 100%;
      height: 36px;
      top: 0;
      left: 0;
      opacity: 0;
    }
    .clear {
      position: absolute;
      right: 10px;
      top: 8px;
      cursor: pointer;
      font-size: 16px;
      &:before {
        content: "\2715";
      }
    }
  }
}
</style>