<template>
  <div class="ui-toast-mask">
    <div class="ui-toast tc">
      <span class="fs30">123</span>
    </div>
  </div>
</template>

<script lang="ts" setup>

interface Props {
  text: string
}

withDefaults(defineProps<Props>(), {
  text: ''
})

</script>
