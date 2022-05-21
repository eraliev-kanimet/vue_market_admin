<template>
  <div class="notfound">
    <h1>404</h1>
    <p>Страница не найдена</p>
    <a @click="$router.push('/admin')">Назад на главную страницу</a>
  </div>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style scoped lang="scss">
.notfound {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: rgb(1,143,253, 0.9);
  overflow: hidden;
  color: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 10rem 0;
  text-align: center;
  h1 {
    font-size: 15rem;
  }
  p {
    font-size: 4rem;
  }
  a {
    border: 1px solid #f8f9fa;
    padding: 10px;
    color: #f8f9fa;
    &:hover {
      background-color: #f8f9fa;
      color: rgb(1,143,253, 0.9);
    }
  }
}
</style>