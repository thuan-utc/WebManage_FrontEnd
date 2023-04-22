<template>
  <RouterView></RouterView>
</template>

<script>
  import { RouterLink, RouterView } from 'vue-router'
  import "../assets/vendors/js/vendor.bundle.base.js";
  import "../assets/js/off-canvas.js";
  import "../assets/js/hoverable-collapse.js";
  import "../assets/js/misc.js";
  import 'bootstrap/dist/css/bootstrap.css'
</script>
<style>
  @import url("./assets/vendors/mdi/css/materialdesignicons.min.css");
  @import url("./assets/vendors/css/vendor.bundle.base.css");
  @import url("./assets/css/style.css");
  
  #dropdown { 
    display: block !important;
  }
</style>