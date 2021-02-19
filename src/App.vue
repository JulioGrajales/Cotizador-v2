<template>
  <v-app>
    <div v-if="errored">
      Error en la consulta
    </div>
    <div v-else>
      <div v-if="loading">
        <v-overlay
          color="#042956"
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

          <div class="pb-2">

            <v-row>
              <v-col cols="3">
                <v-select
                  :items="languages"
                  color="#042956"
                  label="Language"
                  v-model="languageValue"
                ></v-select>
              </v-col>
            </v-row>

          </div>

          <v-stepper v-model="stepNumber">
            <v-stepper-header>
              <v-stepper-step
                :complete="stepNumber > 1"
                step="1"
                color="#042956"
                editable
              >
                Ingresa nombre de prospecto
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                :complete="stepNumber > 2"
                step="2"
                color="#042956"
                editable
              >
                Selecciona las propiedades
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                :complete="stepNumber > 3"
                step="3"
                color="#042956"
                editable
              >
                Elegir moneda
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                :complete="stepNumber > 4"
                step="4"
                color="#042956"
                editable
              >
                Forma de pago
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                :complete="stepNumber > 5"
                step="5"
                color="#042956"
                editable
              >
                Corrida financiera
              </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <div>
                  <v-text-field
                    label="Nombre del pospecto"
                    prepend-inner-icon="account_circle"
                    color="#042956"
                  ></v-text-field>
                </div>

                <btnNextStep v-on:nextStep="nextStep"/>

                
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-autocomplete
                  :items="items"
                  v-model="values"
                  clearable
                  chips
                  color="#042956"
                  prepend-inner-icon="apartment"
                  label="Propiedades"
                  multiple
                  deletable-chips></v-autocomplete>


                <div class="d-flex justify-space-between">
                  <btnPreviousStep v-on:previousStep="previousStep" />
                  <v-spacer></v-spacer>
                  <btnNextStep v-on:nextStep="nextStep"/>
                </div>


              </v-stepper-content>

              <v-stepper-content step="3">
                

                <div class="pl-3">
                  <p>
                    <v-icon>
                      monetization_on
                    </v-icon>
                    Elije tu moneda
                  </p>
                
                  <v-radio-group
                    v-model="moneda"
                    row
                  >
                    
                    <v-radio
                      label="US Dollar"
                      value="USD"
                      color="#042956"
                    ></v-radio>

                    <v-radio
                      label="Pesos Mexicanos"
                      value="MXN"
                      color="#042956"
                    ></v-radio>
                  </v-radio-group>


                  <div v-show="moneda == 'MXN'">
                    <v-text-field
                      label="Tipo de cambio"
                      v-model="tipoCambio"
                      prefix="$"
                      type="number"
                      step="0.01"
                      color="#042956"
                    ></v-text-field>
                  </div>
                </div>

                

                

                <div class="d-flex justify-space-between">
                  <btnPreviousStep v-on:previousStep="previousStep" />
                  <v-spacer></v-spacer>
                  <btnNextStep v-on:nextStep="nextStep"/>
                </div>
                
              </v-stepper-content>

              <v-stepper-content step="4">
                
                <div class="pl-3">
                  <p>
                    <v-icon>
                      credit_card
                    </v-icon>
                    Elije tu forma de pago
                  </p>
                
                  <v-radio-group
                    v-model="formaPago"
                    row
                  >
                    
                    <v-radio
                      label="Financiamiento"
                      value="financiamiento"
                      color="#042956"
                    ></v-radio>

                    <v-radio
                      label="Contado"
                      value="contado"
                      color="#042956"
                    ></v-radio>
                  </v-radio-group>


                  <div>
                    <!-- Enganche,numeroFinanciamientoMeses,Reserva,Descuento(porcentaje,fijo) -->
                    <v-row>
                      <v-col cols="4">
                        <v-select
                          :items="porcentajesEnganche"
                          label="Enganche"
                          v-model="porcentajeEnganche"
                          color="#042956"
                        ></v-select>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          label="Cantidad de reserva"
                          v-model="cantidadReserva"
                          prefix="$"
                          type="number"
                          step="0.01"
                          color="#042956"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        
                        <div v-show="formaPago == 'financiamiento'">
                          <v-select
                            :items="mesesFinanciamiento"
                            label="Meses en financiamiento"
                            v-model="mesesFinanciamientoSeleccionados"
                            color="#042956"
                          ></v-select>
                        </div>
                        
                      </v-col>
                    </v-row>

                  </div>
                  <v-icon>
                    sell
                  </v-icon>
                  Elije el tipo de descuento
                  <v-radio-group
                    v-model="tipoDescuento"
                    row
                  >
                    
                    <v-radio
                      label="Porcentaje"
                      value="porcentaje"
                      color="#042956"
                    ></v-radio>

                    <v-radio
                      label="Fijo"
                      value="fijo"
                      color="#042956"
                    ></v-radio>
                  </v-radio-group>
                  <v-text-field
                    :label="tipoDescuento == 'porcentaje' ? 'Descuento %' : 'Descuento $'"
                    v-model="cantidadDescuento"
                    type="number"
                    step="0.01"
                    color="#042956"
                  ></v-text-field>
                </div>

                <div>
                  <!-- <v-radio-group
                    v-model="tipoDescuento"
                    row
                  >
                    
                    <v-radio
                      label="Porcentaje"
                      value="porcentaje"
                      color="#042956"
                    ></v-radio>

                    <v-radio
                      label="Fijo"
                      value="fijo"
                      color="#042956"
                    ></v-radio>
                  </v-radio-group>
                  <v-text-field
                    :label="tipoDescuento == 'porcentaje' ? 'Descuento %' : 'Descuento $'"
                    v-model="cantidadDescuento"
                    type="number"
                    step="0.01"
                    color="#042956"
                  ></v-text-field> -->
                </div>

                <div class="d-flex justify-space-between">
                  <btnPreviousStep v-on:previousStep="previousStep" />
                  <v-spacer></v-spacer>
                  <btnNextStep v-on:nextStep="nextStep"/>
                </div>

              </v-stepper-content>


              <v-stepper-content step="5">
                
                <div v-show="formaPago == 'financiamiento'">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            
                          </th>
                          <th class="text-left">
                            Porcentaje
                          </th>
                          <th class="text-left">
                            Dolares
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Reserva</td>
                          <td>1.12%</td>
                          <td>$5000 USD</td>
                        </tr>
                        <tr>
                          <td>Enganche</td>
                          <td>48.88%</td>
                          <td>$217,768 USD</td>
                        </tr>
                        <tr>
                          <td>Financiamiento</td>
                          <td>50%</td>
                          <td>$222,768 USD</td>
                        </tr>
                        <tr>
                          <td>36 Mensualidades</td>
                          <td></td>
                          <td>$6188 USD</td>
                        </tr>
                        <tr>
                          <td>Total a pagar</td>
                          <td>100%</td>
                          <td>$445,536 USD</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </div>

                <div v-show="formaPago == 'contado'">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            
                          </th>
                          <th class="text-left">
                            Porcentaje
                          </th>
                          <th class="text-left">
                            Dolares
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Reserva</td>
                          <td>1.12%</td>
                          <td>$5000 USD</td>
                        </tr>
                        <tr>
                          <td>Enganche</td>
                          <td>48.88%</td>
                          <td>$217,768 USD</td>
                        </tr>
                        <tr>
                          <td>Total a pagar</td>
                          <td>100%</td>
                          <td>$445,536 USD</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </div>

                <div class="d-flex justify-space-between">
                  <btnPreviousStep v-on:previousStep="previousStep" />
                  <v-spacer></v-spacer>
                  <div>
                    <v-btn
                      color="#042956"
                      class="white--text"
                    >
                      Imprimir PDF
                      <v-icon
                        right
                      >
                        arrow_forward
                      </v-icon>
                    </v-btn>
                  </div>
                </div>


                

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
import btnNextStep from './components/btnNextStep';
import btnPreviousStep from './components/btnPreviousStep';

export default {
  name: 'App',
  data: () => ({
    info: null,
    loading: true,
    errored: false,
    items: [],
    values: [],
    overlay: true,
    stepNumber: 1,
    languages: ['English','Español'],
    languageValue: 'Español',
    moneda: 'USD',
    tipoCambio: 20,
    formaPago: 'financiamiento',
    porcentajesEnganche: ['10%','20%','30%','40%','50%','60%','70%','80%','90%','100%'],
    porcentajeEnganche: '10%',
    mesesFinanciamientoSeleccionados: 6,
    mesesFinanciamiento: [6,12,18,24,30,36],
    cantidadReserva: 5000,
    tipoDescuento: 'porcentaje',
    cantidadDescuento: 0,
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
  },
  methods: {
    nextStep() {
      this.stepNumber++;
    },
    previousStep() {
      this.stepNumber--;
    }
  },
  components: {
    btnNextStep,
    btnPreviousStep
  }
};
</script>
