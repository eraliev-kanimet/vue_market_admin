<template>
  <form @submit.prevent class="form">
    <div class="form_group">
      <p class="form_group_title">Картинка</p>
      <div class="image" :class="{active: category.picture}">
        <img v-show="category.picture" :src="category.picture" alt="picture">
        <div class="btns">
          <label for="file-upload-update" class="btn green">
            Загрузить
          </label>
          <input @input="setUpdatePicture" id="file-upload-update" type="file"/>
          <button @click="setUpdatePictureRemove" v-show="picture_remove" class="btn red">
            <p>Удалить</p>
          </button>
        </div>
      </div>
    </div>
    <div class="form_group">
      <p class="form_group_title">Название</p>
      <div class="title">
        <input :value="category.title" @input="setTitle" type="text">
      </div>
      <span class="error" v-show="errors.title.active">{{errors.title.message}}</span>
    </div>
    <categories-select :mode="mode" :categories="categories"/>
    <div class="buttons">
      <div @click="updateCategory" class="btn">Обновить</div>
      <div @click="modalInactive" class="btn">Отмена</div>
    </div>
  </form>
</template>

<script>
import {mapActions, mapMutations, mapState, mapGetters} from "vuex";

export default {
  name: "categories-update-form",
  data() {
    return {
      mode: 'update'
    }
  },
  methods: {
    ...mapActions({
      modalInactive: 'categories/modalUpdateInactive',
      updateCategory: 'categories/updateCategory'
    }),
    ...mapMutations({
      setTitle: 'categories/setUpdateTitle',
      setUpdatePicture: 'categories/setUpdatePicture',
      setUpdatePictureRemove: 'categories/setUpdatePictureRemove'
    }),
  },
  computed: {
    ...mapState({
      category: state => state.categories._update,
      errors: state => state.categories.errors
    }),
    ...mapGetters({
      categories: "categories/getSelectCategoriesList",
      picture_remove: "categories/getPictureRemove"
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
      position: relative;
      height: 80px;
      border: 2px dashed #DDDDDD;
      border-radius: 10px;
      img {
        width: 100%;
        height: 100%;
      }
      .btns {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .btn {
          width: 60%;
          height: 33px;
          position: relative;
          border: none;
          border-radius: 5px;
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
      &.active {
        height: 340px;
        .btns {
          opacity: 0;
        }
      }
      &:hover {
        .btns {
          opacity: 1;
        }
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
      border-radius: 6px;
    }
  }
}
</style>