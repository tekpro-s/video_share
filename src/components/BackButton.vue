<template>
  <button class="back-button" @click="$router.push('/')">&lt;</button>
</template>

<style scoped>
.back-button {
  width: 50px;
  text-align: center;
  padding: 8px 0 10px;
  background-color: #0438ff;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
  color: white;
  border: none;
}
</style>