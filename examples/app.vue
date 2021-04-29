<template>
  <div
    id="app"
    :class="{ 'is-component': isComponent }"
  >
    <div class="main-cnt">
      <router-view />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      isComponent() {
        return /^component-/.test(this.$route.name || '');
      }
    },
    mounted() {
      console.info(this.$route)
    },
    updated() {
      console.info(this.$route)
    },
    methods: {
      suggestJump() {
        if (process.env.NODE_ENV !== 'production') return;
      }
    }
  };
</script>
