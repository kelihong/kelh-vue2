<template>
  <div class="test">
      test
  </div>
</template>


<script>

import { test,test2 } from '@api/home.js'
export default {
    created() {
      test().then(res =>{
        console.log(res)
      })

      
      test2().then(res =>{
        console.log(res)
      })
    },
}
</script>