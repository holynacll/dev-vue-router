<template>
  <div class="home">
    <h1>All Destinations</h1>
    <button class="btn" @click="triggerRouteError">Trigger Router Erro</button>
    <div class="destinations">
      <router-link
        v-for="destination in destinations"
        :key="destination.id"
        :to="{
          name: 'destination.show',
          params: {
            id: destination.id,
            slug: destination.slug,
          },
        }"
      >
        <h2>{{ destination.name }}</h2>
        <img :src="`/images/${destination.image}`" :alt="destination.name" />
      </router-link>
    </div>
  </div>
</template>
<script>
import sourceData from "@/data.json";
import { isNavigationFailure, NavigationFailureType } from "vue-router";
export default {
  data() {
    return {
      destinations: sourceData.destinations,
    };
  },
  methods: {
    async triggerRouteError() {
      const result = await this.$router.push("/");
      if (isNavigationFailure(result, NavigationFailureType.duplicated)) {
        console.log(result.to);
        console.log(result.from);
      } else {
        console.log("its ok");
        console.log(result);
      }
    },
  },
};
</script>
