<template>
  <div>
    <v-btn
      color="#042956"
      @click="nextStep"
      class="white--text"
    >
      Siguiente
      <v-icon
        right
      >
        arrow_forward
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'btnNextStep',
  methods: {
    nextStep() {
      this.$emit('nextStep');
    }
  }
}
</script>