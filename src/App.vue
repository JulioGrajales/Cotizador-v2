<template>
  <v-app>
    <div v-if="errored">
      Error en la consulta
    </div>
    <div v-else>
      <div v-if="loading">
        <v-overlay
          color="#383858"
          opacity="1"
        >
          <v-progress-circular
            indeterminate
            size="64"
          ></v-progress-circular>
        </v-overlay>
      </div>
      <div v-else>
        <v-container>


          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step
                :complete="e1 > 1"
                step="1"
              >
                Selecciona las propiedades
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                :complete="e1 > 2"
                step="2"
              >
                Name of step 2
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3">
                Name of step 3
              </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">

                <v-autocomplete
                  :items="items"
                  v-model="values"
                  clearable
                  solo-inverted
                  chips
                  label="Propiedades"
                  multiple
                  deletable-chips></v-autocomplete>

                <v-btn text>
                  Cancel
                </v-btn>


                <v-btn
                  color="primary"
                  @click="e1 = 2"
                >
                  Continue
                </v-btn>

                
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card
                  class="mb-12"
                  color="grey lighten-1"
                  height="200px"
                ></v-card>

                <v-btn text>
                  Cancel
                </v-btn>


                <v-btn
                  color="primary"
                  @click="e1 = 3"
                >
                  Continue
                </v-btn>

                
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card
                  class="mb-12"
                  color="grey lighten-1"
                  height="200px"
                ></v-card>

                <v-btn text>
                  Cancel
                </v-btn>

                <v-btn
                  color="primary"
                  @click="e1 = 1"
                >
                  Continue
                </v-btn>

                
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>

        </v-container>
      </div>
    </div>

    
  </v-app>
</template>

<script>

import axios from 'axios';

export default {
  name: 'App',
  data: () => ({
    info: null,
    loading: true,
    errored: false,
    items: [],
    values: [],
    overlay: true,
    e1: 1,
  }),
  mounted() {
    const Token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YmE5NGRhNTM3MDEyYzNlMjFjYTg3YWYiLCJuYW1lIjoiVGhlIEJvYXQgU2l0aW8gV2ViIiwib3JpZ2luIjoid2Vic2l0ZSIsInJvbGUiOiJhZG1pbiIsImFjY2Vzc19ncm91cCI6IjVkZjhlMDg0MGVhMmEwNjkwMGJlYjdlMyJ9.Ab1e8I9zz8CRgtsO597VqJ5LYtOGxYIvQtzKpGT1T68';

    const config = {
      headers: { Authorization: `Bearer ${Token}`}
    };

    const bodyParameters = {
      real_estate_development_code: 'the-boat'
    };

    axios.post(
      'https://dev.api.capital28.investments/api/property/list',
      bodyParameters,
      config)
    .then(response => {

      this.info = response.data.Data;

      for (const propiedad of response.data.Data.Property) {
        if (propiedad.contract_status === 'disponible') {
          this.items.push(propiedad.code);
        }
      }

    })
    .catch(err => {
      console.error(err);
      this.errored = true;
    })
    .finally(() => this.loading = false);

  }
};
</script>
