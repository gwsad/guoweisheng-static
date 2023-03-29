<template>
  <span class="es-textBtn" :class="getClass" :type="type" @click="onClick">{{ text }}</span>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { basicProps } from "../src/props";
const emit = defineEmits(['click'])
const props = defineProps(basicProps)

const getClass = computed({
  get() {
    let _result = `es-textBtn_${props.type}`
    props.disabled && (_result += '_disabled')
    return _result
  },
  set() {
    return
  }
})

const onClick = () => {
  !props.disabled && emit('click')
}

</script>
<style lang="scss">
.es-textBtn {
  font-weight: 400;
  font-size: 14px;
}

.es-textBtn_default {
  color: #919DB5;

  &:hover {
    cursor: pointer;
    color: #4080FF;
  }

  &:active {
    color: #0E42D2;
  }
}

.es-textBtn.es-textBtn_default_disabled {
  color: #C8CEDA;

  &:hover {
    cursor: not-allowed;
  }
}

.es-textBtn_primary {
  color: #165DFF;

  &:hover {
    cursor: pointer;
    color: #4080FF;
  }

  &:active {
    color: #0E42D2;
  }
}

.es-textBtn.es-textBtn_primary_disabled {
  color: #94BFFF;

  &:hover {
    cursor: not-allowed;
  }
}

.es-textBtn_danger {
  color: #F1463E;

  &:hover {
    cursor: pointer;
    color: #F26C66;
  }

  &:active {
    color: #D64741;
  }
}

.es-textBtn.es-textBtn_danger_disabled {
  color: #EDA09C;

  &:hover {
    cursor: not-allowed;
  }
}
</style>
