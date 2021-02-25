<template>
  <div>
    <v-btn
      color="#042956"
      @click="nextStep"
      class="white--text"
    >
      {{message}}
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
  },
  props: {
    message: String,
  }
}
</script>