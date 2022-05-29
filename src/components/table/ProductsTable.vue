<template>
  <div class="table_products">
    <ul class="table_products-th">
      <li class="id">#</li>
      <li class="picture">Картинка</li>
      <li class="title">Название</li>
      <li class="price">Цена</li>
      <li class="count">Количество</li>
      <li class="action">Действие</li>
    </ul>
    <ul @click="downloadProduct" v-for="product in products" :key="product.id" class="table_products-td">
      <li class="id">{{product.id}}</li>
      <li class="picture"><img :src="product.picture" alt="picture"></li>
      <li class="title">{{product.title}}</li>
      <li class="price">{{product.price}}</li>
      <li class="count">{{product.count}}</li>
      <li class="action">
        <ul @click.stop class="table_products-td-action">
          <li>Изменить</li>
          <li>Удалить</li>
        </ul>
      </li>
    </ul>
    <div v-if="empty.active" class="table_products-empty">{{ empty.message }}</div>
    <div v-show="isLoading" class="table_products-empty">Идет загрузка...</div>
    <div v-show="!empty.active" @click="loadMoreProducts" class="table_products-empty link">Загрузить еще</div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "products-table",
  methods: {
    ...mapActions({
      loadMoreProducts: 'products/loadMoreProducts',
      downloadProduct: 'products/downloadProduct'
    }),
  },
  computed: {
    ...mapState({
      products: state => state.products.products,
      isLoading: state => state.products.isLoading,
      empty: state => state.products.empty
    })
  }
}
</script>

<style scoped lang="scss">
.table_products {
  margin: 30px auto;
  background-color: #ffffff;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
  border: 1px solid rgba(221, 221, 221, 0.7);
  border-top: none;
  border-radius: 5px;
  position: relative;
  ul {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(221, 221, 221, 0.7);
    background-color: #f8f9fa;
    li {
      text-align: center;
    }
    .id {
      width: 35px;
      padding-left: 3px;
    }
    .picture {
      width: 100px;
    }
    .title {
      text-align: left;
      margin-left: 15px;
    }
    .price {
      width: 100px;
      margin-left: auto;
    }
    .count {
      margin-left: 30px;
      width: 100px;
    }
    .action {
      margin-left: 30px;
    }
  }
  .table_products-th {
    border-top: 1px solid rgba(221, 221, 221, 0.7);
    padding: 10px 20px 10px 0;
  }
  .table_products-td {
    padding-right: 6px;
    cursor: pointer;
    .picture {
      height: 100px;
      padding: 5px;
    }
    &:hover {
      background-color: rgba(222, 222, 222, 0.3);
      ul {
        background-color: rgb(222, 222, 222, 0.05);
      }
    }
    .table_products-td-action {
      flex-direction: column;
      border: none;
      li {
        text-align: center;
        width: 90px;
        margin: 5px 0;
        padding: 5px 11px;
        background-color: rgba(221, 221, 221, 0.7);
        border-radius: 2px;
        color: rgba(0,0,0,0.7);
        cursor: pointer;
        font-size: 12px;
        text-transform: uppercase;
        &:hover {
          background-color: #DDDDDD;
        }
      }
    }
  }
  .table_products-empty {
    text-align: center;
    padding: 6px;
    &.link {
      cursor: pointer;
    }
    &.link:hover {
      background-color: rgba(222, 222, 222, 0.4);
    }
  }
}
</style>