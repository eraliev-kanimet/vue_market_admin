<template>
  <form @click.stop class="product_form">
    <div class="product_form_group">
      <label for="product_title">Название:</label>
      <input id="product_title" :value="product.title" @input="setTitle" type="text"/>
    </div>
    <div class="product_form_group">
      <label>Картинки</label>
      <div class="images">
        <input id="product_image" @input="setImage({image: image, event: $event})" type="file"/>
        <div class="image" :class="{active: product.images[0]}">
          <img v-show="product.images[0]" :src="product.images[0]" :alt="product.images[0]">
          <div class="btns">
            <label for="product_image" @click="setImageMethod('image1')" class="btn grey">Загрузить</label>
            <div v-show="product.images[0] || product.image1" @click="setImageRemove({id: 0, image: 'image1'})" class="btn red">Удалить</div>
            <div v-show="product.images[0]" @click="setImageSrc(product.images[0])" class="btn green">Посмотреть</div>
          </div>
        </div>
        <div class="image" :class="{active: product.images[1]}">
          <img v-show="product.images[1]" :src="product.images[1]" :alt="product.images[1]">
          <div class="btns">
            <label for="product_image" @click="setImageMethod('image2')" class="btn grey">Загрузить</label>
            <div v-show="product.images[1] || product.image2" @click="setImageRemove({id: 1, image: 'image2'})" class="btn red">Удалить</div>
            <div v-show="product.images[1]" @click="setImageSrc(product.images[1])" class="btn green">Посмотреть</div>
          </div>
        </div>
        <div class="image" :class="{active: product.images[2]}">
          <img v-show="product.images[2]" :src="product.images[2]" :alt="product.images[2]">
          <div class="btns">
            <label for="product_image" @click="setImageMethod('image3')" class="btn grey">Загрузить</label>
            <div v-show="product.images[2] || product.image3" @click="setImageRemove({id: 2, image: 'image3'})" class="btn red">Удалить</div>
            <div v-show="product.images[2]" @click="setImageSrc(product.images[2])" class="btn green">Посмотреть</div>
          </div>
        </div>
        <div class="image" :class="{active: product.images[3]}">
          <img v-show="product.images[3]" :src="product.images[3]" :alt="product.images[3]">
          <div class="btns">
            <label for="product_image" @click="setImageMethod('image4')" class="btn grey">Загрузить</label>
            <div v-show="product.images[3] || product.image4" @click="setImageRemove({id: 3, image: 'image4'})" class="btn red">Удалить</div>
            <div v-show="product.images[3]" @click="setImageSrc(product.images[3])" class="btn green">Посмотреть</div>
          </div>
        </div>
      </div>
      <div class="image_block" :class="{active: image_block}">
        <img :src="image_src" alt="">
        <span @click="imageBlockClose" class="close"></span>
      </div>
    </div>
    <div class="product_form_group category">
      <label for="product_category">Категория:</label>
      <input id="product_category" type="text" disabled :placeholder="select.title === '' ? 'Выберите категорию' : select.title">
      <div @click="setSelectActive" class="category_btn"></div>
      <div v-show="select.title !== ''" class="clear" @click="setSelectTitleAndCategoryId('clear')"></div>
      <ul class="categories" :class="{active: select.active}">
        <li @click="setSelectTitleAndCategoryId(category)" v-for="category in categories">{{category.title}}</li>
      </ul>
    </div>
    <div class="product_form_group">
      <label for="product_desc">Описание:</label>
      <textarea id="product_desc" @input="setDesc" :value="product.desc"></textarea>
    </div>
    <div class="product_form_group">
      <label for="product_price">Цена:</label>
      <input id="product_price" :value="product.price" @input="setPrice" type="number" min="0" max="10000"/>
    </div>
    <div class="product_form_group">
      <label for="product_count">Количество:</label>
      <input id="product_count" :value="product.count" @input="setCount" type="number" min="0" max="10000"/>
    </div>
    <div class="product_form_group">
      <label for="product_manufacturer">Производитель:</label>
      <input id="product_manufacturer" :value="product.manufacturer" @input="setManufacturer" type="text"/>
    </div>
    <div class="product_form_group">
      <label>Характеристики:</label>
      <ul class="product_properties">
        <li class="property" v-for="property in properties">
          <input type="text" :value="property.title">
          <input type="text" :value="property.value">
          <span class="property_remove"></span>
        </li>
        <li class="property">
          <input v-if="new_property" type="text" @input="setNewPropertyTitle" :value="property.title" placeholder="Свойства">
          <input v-if="new_property" type="text" @input="setNewPropertyValue" :value="property.value" placeholder="Значение">
          <div class="new_property">Добавить</div>
        </li>
      </ul>
    </div>
  </form>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "product-form",
  data() {
    return {
      image: '',
      image_src: '',
      image_block: false
    }
  },
  methods: {
    ...mapMutations({
      setTitle: 'products/setProductTitle',
      setDesc: 'products/setProductDesc',
      setPrice: 'products/setProductPrice',
      setCount: 'products/setProductCount',
      setManufacturer: 'products/setProductManufacturer',
      setImage: 'products/setProductImage',
      setImageRemove: 'products/setProductImageRemove',
      setNewPropertyTitle: 'products/setNewPropertyTitle',
      setNewPropertyValue: 'products/setNewPropertyValue',
      setSelectTitleAndCategoryId: 'products/setSelectTitleAndCategoryId',
      setSelectActive: 'products/setSelectActive',
    }),
    setImageMethod(value) {
      this.image = value;
    },
    setImageSrc(value) {
      this.image_src = value;
      this.image_block = true;
    },
    imageBlockClose() {
      this.image_block = false;
    }
  },
  computed: {
    ...mapState({
      product: state => state.products.product,
      properties: state => state.products.properties,
      property: state => state.products.property,
      new_property: state => state.products.new_property,
      categories: state => state.categories.select_categories,
      select: state => state.products.select
    })
  }
}
</script>

<style scoped lang="scss">
  .product_form {
    padding: 60px 20px 10px 20px;
    font-size: 17px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .product_form_group {
      margin-bottom: 20px;
      width: 400px;
      display: flex;
      flex-direction: column;
      label {
        margin-bottom: 9px;
        margin-left: 5px;
      }
      input {
        border-radius: 8px;
        padding-left: 12px;
        outline: none;
        border: 1px solid #DDDDDD;
        height: 37px;
      }
      input[type="file"] {
        display: none;
      }
      textarea {
        border-radius: 8px;
        font-size: 20px;
        padding: 10px;
        max-width: 100%;
        min-width: 100%;
        height: 150px;
        outline: none;
        border: 1px solid #DDDDDD;
      }
      &.category {
        position: relative;
        .categories {
          opacity: 0;
          visibility: hidden;
          width: 100%;
          background-color: #f8f9fa;
          position: absolute;
          top: 90px;
          left: 0;
          text-align: left;
          font-size: 17px;
          transition: 0.5s all ease;
          height: 130px;
          overflow: auto;
          z-index: 8888;
          box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
          &::-webkit-scrollbar {
            width: 0;
          }
          li {
            border-bottom: 1px solid #DDDDDD;
            width: 100%;
            padding: 3px 3px 3px 10px;
            cursor: pointer;
            &:hover {
              background-color: rgba(221, 221, 221, 0.6);
            }
          }
          &.active {
            opacity: 1;
            visibility: visible;
            top: 70px;
          }
        }
        .category_btn {
          position: absolute;
          width: 100%;
          height: 36px;
          top: 45%;
          left: 0;
          opacity: 0;
        }
        .clear {
          position: absolute;
          right: 11px;
          top: 39px;
          cursor: pointer;
          font-size: 18px;
          &:before {
            content: "\2715";
          }
        }
      }
      .images {
        display: flex;
        overflow-x: auto;
        &::-webkit-scrollbar {
          width: 0;
          height: 0;
        }
        .image {
          position: relative;
          padding: 2px;
          min-width: 130px;
          min-height: 130px;
          margin: 5px;
          border: 1px dashed #DDDDDD;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          &.active:hover {
            .btn {
              opacity: 1;
            }
          }
          .btns {
            transition: 0.2s all ease;
            position: absolute;
            left: 50%;
            transform: translate(-50%, 0);
            display: flex;
            flex-direction: column;
            justify-content: center;
            .btn {
              width: 95px;
              height: 23px;
              border-radius: 3px;
              cursor: pointer;
              text-transform: uppercase;
              text-align: center;
              font-size: 12px;
              padding-top: 5px;
              margin: 2px 0;
              &.grey {
                background-color: #DDDDDD;
              }
              &.red {
                background-color: #ef4f61;
                color: #f8f9fa;
              }
              &.green {
                background-color: #198754;
                color: #f8f9fa;
              }
            }
          }
          &.active {
            .btns {
              opacity: 0;
            }
          }
        }
      }
      .image_block {
        opacity: 0;
        visibility: hidden;
        position: fixed;
        width: 400px;
        height: 400px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.3s ease;
        box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
        img {
          border-radius: 5px;
        }
        .close {
          position: absolute;
          right: 11px;
          top: 8px;
          cursor: pointer;
          font-size: 28px;
          color: #f8f9fa;
          &:before {
            content: "\2715";
          }
        }
        &.active {
          opacity: 1;
          visibility: visible;
        }
      }
      .product_properties {
        display: flex;
        flex-direction: column;
        .property {
          position: relative;
          display: flex;
          flex-direction: column;
          margin-bottom: 7px;
          input:first-child {
            border-bottom: none;
          }
          .new_property {
            margin: 10px auto;
            padding: 5px 10px;
            background-color: #198754;
            color: #f8f9fa;
            cursor: pointer;
            border-radius: 4px;
          }
          &:hover {
            .property_remove {
              opacity: 1;
            }
          }
          .property_remove {
            transition: all 0.3s ease;
            opacity: 0;
            position: absolute;
            right: -23px;
            top: 50%;
            transform: translate(0, -50%);
            cursor: pointer;
            font-size: 17px;
            width: 21px;
            text-align: center;
            border-radius: 20px;
            background-color: #ef4f61;
            color: #f8f9fa;
            &:before {
              content: "\2715";
            }
          }
        }
      }
    }
  }
</style>