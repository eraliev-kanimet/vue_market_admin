<template>
<div class="modal" :class="{active: visible}">
  <div class="modal_content" @click.stop>
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: "base-modal",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 9999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition: 0.4s opacity ease;
}
.modal_content {
  background-color: #f8f9fa;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  font-size: 20px;
  padding: 10px;
}
.modal.active {
  opacity: 1;
  visibility: visible;
}
</style>