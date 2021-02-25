<template>
  <div>
    <v-btn
      @click="previousStep"
      text
    >
      <v-icon
        left
      >
        arrow_back
      </v-icon>
      {{message}}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'btnPreviousStep',
  methods: {
    previousStep() {
      this.$emit('previousStep');
    }
  },
  props: {
    message: String
  }
}
</script>