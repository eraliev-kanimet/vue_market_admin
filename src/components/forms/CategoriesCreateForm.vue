<template>
  <form @submit.prevent class="form">
    <div class="form_group">
      <p class="form_group_title">Картинка</p>
      <div class="image">
        <label for="create-category" class="btn green">Загрузить</label>
        <input @input="setPicture" id="create-category" type="file"/>
        <button @click="setPictureRemove" v-show="category.picture" class="btn red">Удалить</button>
      </div>
    </div>
    <div class="form_group">
      <p class="form_group_title">Название</p>
      <div class="title">
        <input :value="category.title" @input="setTitle" type="text">
      </div>
      <span class="error" v-show="errors.title.active">{{errors.title.message}}</span>
    </div>
    <categories-select :categories="categories"/>
    <div class="buttons">
      <div @click="createCategory" class="btn">Создать</div>
      <div @click="modalInactive" class="btn">Отмена</div>
    </div>
  </form>
</template>

<script>
import {mapActions, mapState, mapMutations} from "vuex";

export default {
  name: "categories-create-form",
  methods: {
    ...mapActions({
      modalInactive: 'categories/modalCreateInactive',
      createCategory: 'categories/createCategory'
    }),
    ...mapMutations({
      setTitle: 'categories/setNewTitle',
      setPicture: 'categories/setNewPicture',
      setPictureRemove: 'categories/setNewPictureRemove',
    })
  },
  computed: {
    ...mapState({
      category: state => state.categories._new,
      errors: state => state.categories.errors,
      categories: state => state.categories.select_categories
    })
  }
}
</script>

<style scoped lang="scss">
.form {
  color: rgba(0, 0, 0, 0.7);
  width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  input[type="file"] {
    display: none;
  }
  .form_group {
    width: 100%;
    text-align: center;
    margin-bottom: 15px;
    .form_group_title {
      margin-bottom: 10px;
    }
    .image {
      border: 2px dashed #DDDDDD;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      .btn {
        width: 60%;
        height: 33px;
        position: relative;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        margin: 10px;
        text-transform: uppercase;
      }
      .green {
        background-color: #DDDDDD;
        font-size: 14px;
        padding: 7px 0 0 0;
      }
      .red {
        background-color: #ef4f61;
        color: #f8f9fa;
      }
    }
    input {
      width: 100%;
      height: 36px;
      border: 1px solid #DDDDDD;
      outline: none;
      padding-left: 11px;
    }
    .error {
      font-size: 14px;
      color: #ff0018;
    }
  }
  .buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .btn {
      background-color: #DDDDDD;
      padding: 3px 14px;
      cursor: pointer;
      border-radius: 3px;
    }
  }
}
</style>