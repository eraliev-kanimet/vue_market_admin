<template>
  <div class="navbar">
    <ul>
      <li @click="$router.push('/admin')">Главная</li>
      <li @click="$router.push('/admin/store')">Витрина</li>
    </ul>
    <ul>
      <li @click="logout">Выход</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "base-navbar",
  methods: {
    logout() {
      localStorage.clear();
      window.location.href = '/admin';
    }
  }
}
</script>

<style scoped lang="scss">
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 41px;
  background-color: rgb(1,143,253, 0.9);
  text-transform: uppercase;
  z-index: 9998;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px;
  ul {
    display: flex;
    transition: 0.4s all ease;
    li {
      cursor: pointer;
      padding: 7px 10px;
      border-radius: 2px;
      position: relative;
    }
  }
  & > ul > li {
    color: #f8f9fa;
    width: 100%;
    font-weight: 600;
    font-size: 13px;
    &:hover {
      background-color: rgba(248, 249, 250, 0.2);
      ul {
        opacity: 1;
        visibility: visible;
        background-color: rgba(255, 255, 255, 0.8);
      }
    }
    & > ul {
      opacity: 0;
      visibility: hidden;
      width: auto;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translate(-50%, 0);
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
      border-radius: 2px;
      & > li {
        margin-top: 5px;
        color: rgb(1,143,253, 0.9);
        font-weight: 500;
        font-size: 12px;
        border: 1px solid rgb(1,143,253, 0.9);
        text-align: center;
        &:hover {
          background-color: rgb(1,143,253, 0.9);
          color: #f8f9fa;
        }
      }
    }
  }
}
</style>