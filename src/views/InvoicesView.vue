<template>
  <div class="title">
    <h1>Invoices</h1>
  </div>
</template>
<script>
import { onBeforeRouteLeave } from "vue-router";
export default {
  setup() {
    onBeforeRouteLeave(() => {
      const answer = window.confirm("Tem certeza que deseja sair?");
      if (!answer) return false;
    });
  },
};
</script>
