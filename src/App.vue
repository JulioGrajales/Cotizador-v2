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
                  :items="languagesList"
                  color="#042956"
                  label="Language"
                  v-model="selectedLanguage"
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
                {{paso1TextoCabezera}}
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                :complete="stepNumber > 2"
                step="2"
                color="#042956"
                editable
              >
                {{paso2TextoCabezera}}
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                :complete="stepNumber > 3"
                step="3"
                color="#042956"
                editable
              >
                {{paso3TextoCabezera}}
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                :complete="stepNumber > 4"
                step="4"
                color="#042956"
                editable
              >
                {{paso4TextoCabezera}}
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                :complete="stepNumber > 5"
                step="5"
                color="#042956"
                editable
              >
                {{paso5TextoCabezera}}
              </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <div>
                  
                  <v-text-field
                    :label="nombreProspectoLabel"
                    prepend-inner-icon="account_circle"
                    color="#042956"
                    v-model="nombreProspecto"
                    clearable
                  ></v-text-field>
                </div>

                <btnNextStep v-on:nextStep="nextStep" :message="msgBtnSig"/>

              </v-stepper-content>

              <v-stepper-content step="2">
                <v-autocomplete
                  :items="listaPropiedadesIDs"
                  v-model="listaPropiedadesSeleccionadas"
                  clearable
                  chips
                  color="#042956"
                  prepend-inner-icon="apartment"
                  :label="propiedadesLabel"
                  multiple
                  deletable-chips></v-autocomplete>


                <div class="d-flex justify-space-between">
                  <btnPreviousStep v-on:previousStep="previousStep" :message="msgBtnPrev"/>
                  <btnNextStep v-on:nextStep="nextStep" :message="msgBtnSig"/>
                </div>

              </v-stepper-content>

              <v-stepper-content step="3">
                
                <div class="pl-3">
                  <p>
                    <v-icon>
                      monetization_on
                    </v-icon>
                    {{elijeMoneda}}
                  </p>
                
                  <v-radio-group
                    v-model="moneda"
                    row
                  >
                    
                    <v-radio
                      :label="usDollarLabel"
                      value="USD"
                      color="#042956"
                    ></v-radio>

                    <v-radio
                      :label="mxPesoLabel"
                      value="MXN"
                      color="#042956"
                    ></v-radio>
                  </v-radio-group>


                  <div v-show="moneda == 'MXN'">
                    <v-text-field
                      :label="tipoCambioLabel"
                      v-model="tipoCambio"
                      prefix="$"
                      type="number"
                      step="0.01"
                      color="#042956"
                    ></v-text-field>
                  </div>
                </div>

                <div class="d-flex justify-space-between">
                  <btnPreviousStep v-on:previousStep="previousStep" :message="msgBtnPrev"/>
                  <btnNextStep v-on:nextStep="nextStep" :message="msgBtnSig"/>
                </div>
                
              </v-stepper-content>

              <v-stepper-content step="4">
                
                <div class="pl-3">
                  <p>
                    <v-icon>
                      credit_card
                    </v-icon>
                    {{metodoPagoLabel}}
                  </p>
                
                  <v-radio-group
                    v-model="formaPago"
                    row
                  >
                    
                    <v-radio
                      :label="financiamientoLabel"
                      value="financiamiento"
                      color="#042956"
                    ></v-radio>

                    <v-radio
                      :label="contadoLabel"
                      value="contado"
                      color="#042956"
                    ></v-radio>
                  </v-radio-group>


                  <div>
                    <!-- Enganche,numeroFinanciamientoMeses,Reserva,Descuento(porcentajeLabel,fijoLabel) -->
                    <v-row>
                      <v-col cols="4">
                        <v-select
                          :items="porcentajesEnganche"
                          :label="engancheLabel"
                          v-model="porcentajeEnganche"
                          color="#042956"
                        ></v-select>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          :label="reservaLabel"
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
                            :label="mesesLabel"
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
                  {{tipoDescuentoLabel}}
                  <v-radio-group
                    v-model="tipoDescuento"
                    row
                  >
                    
                    <v-radio
                      :label="porcentajeLabel"
                      value="porcentaje"
                      color="#042956"
                    ></v-radio>

                    <v-radio
                      :label="fijoLabel"
                      value="fijo"
                      color="#042956"
                    ></v-radio>
                  </v-radio-group>
                  <v-text-field
                    :label="tipoDescuento == 'porcentaje' ? descuentoLabel+' %' : descuentoLabel+' $' "
                    v-model="cantidadDescuento"
                    type="number"
                    step="0.01"
                    color="#042956"
                  ></v-text-field>
                </div>

                

                <div class="d-flex justify-space-between">
                  <btnPreviousStep v-on:previousStep="previousStep" :message="msgBtnPrev"/>
                  <btnNextStep v-on:nextStep="nextStep" :message="msgBtnSig"/>
                </div>

              </v-stepper-content>


              <v-stepper-content step="5">
                
                <div v-if="listaPropiedadesSeleccionadas.length == 0">
                  {{noHayNada}}
                </div>
                <div v-else>
                  <div v-show="formaPago == 'financiamiento'">
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">
                              
                            </th>
                            <th class="text-left">
                              {{porcentajeLabel}}
                            </th>
                            <th class="text-left">
                              {{moneda}}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{{reservaLabel}}</td>
                            <td>{{porcentajeFormatter.format(porcentajeReserva)}}</td>
                            <td>{{moneda+' '+monedaFormatter.format(cantidadReserva)}}</td>
                          </tr>
                          <tr>
                            <td>{{engancheLabel}}</td>
                            <td>{{porcentajeFormatter.format(porcentajeEnganche-porcentajeReserva)}}</td>
                            <td>{{moneda+' '+monedaFormatter.format(precioEnganche)}}</td>
                          </tr>
                          <tr>
                            <td>{{financiamientoLabel}}</td>
                            <td>{{porcentajeFormatter.format(porcentajeFinanciamiento)}}</td>
                            <td>{{moneda+' '+monedaFormatter.format(cantidadFinanciamiento)}}</td>
                          </tr>
                          <tr>
                            <td>
                              <span class="font-weight-bold">
                                {{mesesFinanciamientoSeleccionados}}
                              </span>
                              {{' '+mesesLabel}}
                            </td>
                            <td></td>
                            <td>
                              {{moneda+' '+monedaFormatter.format(cantidadFinanciamiento/mesesFinanciamientoSeleccionados)}}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Total
                              <span v-if="cantidadDescuento > 0" class="font-weight-bold">
                                {{menosDescuentoLabel}}
                              </span>
                            </td>
                            <td>100%</td>
                            <td>{{moneda+' '+monedaFormatter.format(precioTotal)}}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </div>
                  
                  <div v-show="formaPago == 'contado'">
                    <!-- Contado -->
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">
                              
                            </th>
                            <th class="text-left">
                              {{porcentajeLabel}}
                            </th>
                            <th class="text-left">
                              {{moneda}}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{{reservaLabel}}</td>
                            <td>{{porcentajeFormatter.format(porcentajeReserva)}}</td>
                            <td>{{moneda+' '+monedaFormatter.format(cantidadReserva)}}</td>
                          </tr>
                          <tr>
                            <td>{{engancheLabel}}</td>
                            <td>{{porcentajeFormatter.format(porcentajeEnganche-porcentajeReserva)}}</td>
                            <td>{{moneda+' '+monedaFormatter.format(precioEnganche)}}</td>
                          </tr>
                          <tr>
                            <td>{{contadoLabel}}</td>
                            <td>{{porcentajeFormatter.format(porcentajeFinanciamiento)}}</td>
                            <td>{{moneda+' '+monedaFormatter.format(cantidadFinanciamiento)}}</td>
                          </tr>
                          
                          <tr>
                            <td>
                              Total
                              <span v-if="cantidadDescuento > 0" class="font-weight-bold">
                                {{menosDescuentoLabel}}
                              </span>
                            </td>
                            <td>100%</td>
                            <td>{{moneda+' '+monedaFormatter.format(precioTotal)}}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </div>

                </div>

                

                

                <div class="d-flex justify-space-between">
                  <btnPreviousStep v-on:previousStep="previousStep" :message="msgBtnPrev"/>
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
    listaPropiedadesInfo: null,
    loading: true,
    errored: false,
    listaPropiedadesIDs: [],
    listaPropiedadesSeleccionadas: ['A101','A104'],
    overlay: true,
    stepNumber: 1,
    languagesList: ['English','Español'],
    selectedLanguage: 'Español',
    moneda: 'USD',
    tipoCambio: 20,
    formaPago: 'financiamiento',
    porcentajesEnganche: [
      {text: '10%', value: 0.10},{text: '20%', value: 0.20},{text: '30%', value: 0.30},{text: '40%', value: 0.40},
      {text: '50%', value: 0.50},{text: '60%', value: 0.60},{text: '70%', value: 0.70},{text: '80%', value: 0.80},
      {text: '90%', value: 0.90},{text: '100%', value: 1},
    ],
    porcentajeEnganche: 0.50,
    mesesFinanciamientoSeleccionados: 36,
    mesesFinanciamiento: [6,12,18,24,30,36],
    cantidadReserva: 5000,
    tipoDescuento: 'porcentaje',
    cantidadDescuento: 10,
    nombreProspecto: null,
    monedaFormatter: new Intl.NumberFormat('en-US' , {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }),
    porcentajeFormatter: new Intl.NumberFormat('en-US', {style: 'percent',maximumFractionDigits:2}),
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

      this.listaPropiedadesInfo = response.data.Data.Property;
      console.log(this.listaPropiedadesInfo);

      for (const propiedad of response.data.Data.Property) {
        if (propiedad.contract_status === 'disponible') {
          this.listaPropiedadesIDs.push(propiedad.code);
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
  },
  computed: {
    paso1TextoCabezera() {
      return this.selectedLanguage == 'Español' ? 'Ingresa nombre del prospecto' : "Enter the prospect's name";
    },
    paso2TextoCabezera() {
      return this.selectedLanguage == 'Español' ? 'Selecciona las propiedades' : 'select the properties';
    },
    paso3TextoCabezera() {
      return this.selectedLanguage == 'Español' ? 'Elegir moneda' : 'Choose currency';
    },
    paso4TextoCabezera() {
      return this.selectedLanguage == 'Español' ? 'Forma de pago' : 'Payment method';
    },
    paso5TextoCabezera() {
      return this.selectedLanguage == 'Español' ? 'Esquema de pagos' : 'Payment scheme';
    },
    msgBtnSig() {
      return this.selectedLanguage == 'Español' ? 'Siguiente' : 'Next';
    },
    msgBtnPrev() {
      return this.selectedLanguage == 'Español' ? 'Atras' : 'Previous';
    },
    nombreProspectoLabel() {
      return this.selectedLanguage == 'Español' ? 'Nombre del prospecto' : "Prospect's name";
    },
    propiedadesLabel() {
      return this.selectedLanguage == 'Español' ? 'Propiedades' : "Properties";
    },
    elijeMoneda() {
      return this.selectedLanguage == 'Español' ? 'Elije la moneda' : "Choose the currency";
    },
    tipoCambioLabel() {
      return this.selectedLanguage == 'Español' ? 'Tipo de cambio' : "Exchange rate";
    },
    usDollarLabel() {
      return this.selectedLanguage == 'Español' ? 'Dolares Estadounidenses' : "US Dollars";
    },
    mxPesoLabel() {
      return this.selectedLanguage == 'Español' ? 'Pesos Mexicanos' : "Mexican Peso";
    },
    metodoPagoLabel() {
      return this.selectedLanguage == 'Español' ? 'Elije tu forma de pago' : 'Choose your payment method';
    },
    financiamientoLabel() {
      return this.selectedLanguage == 'Español' ? 'Financiamiento' : 'Financing';
    },
    contadoLabel() {
      return this.selectedLanguage == 'Español' ? 'Contado' : 'Cash';
    },
    engancheLabel() {
      return this.selectedLanguage == 'Español' ? 'Enganche' : 'DownPayment';
    },
    reservaLabel() {
      return this.selectedLanguage == 'Español' ? 'Reserva' : 'Reserve';
    },
    mesesLabel() {
      return this.selectedLanguage == 'Español' ? 'Pagos mensuales' : 'Monthly payments';
    },
    tipoDescuentoLabel() {
      return this.selectedLanguage == 'Español' ? 'Elije el tipo de descuento' : 'Choose the discount type';
    },
    porcentajeLabel() {
      return this.selectedLanguage == 'Español' ? 'Porcentaje' : 'Percentage';
    },
    fijoLabel() {
      return this.selectedLanguage == 'Español' ? 'Fijo' : 'Fixed';
    },
    descuentoLabel() {
      return this.selectedLanguage == 'Español' ? 'Descuento' : 'Discount';
    },
    noHayNada() {
      return this.selectedLanguage == 'Español' ? 'Favor de seleccionar las propiedades' : 'Please select your properties';
    },

    precioTotal() {
      let precioTotalSum = 0;
      for(const propiedadInfo of this.listaPropiedadesInfo) {
        for(const propId of this.listaPropiedadesSeleccionadas) {
          if(propiedadInfo.code == propId) {
            precioTotalSum+= propiedadInfo.pricing.price;
          }
        }
      }
      if(this.moneda == 'MXN') {
        precioTotalSum = precioTotalSum * this.tipoCambio;
      }

      if(this.tipoDescuento == 'porcentaje') {
        return precioTotalSum - precioTotalSum * this.cantidadDescuento / 100;
      } else {
        return precioTotalSum - this.cantidadDescuento;
      }
    },
    porcentajeFinanciamiento() {
      return 1 - this.porcentajeEnganche;
    },
    cantidadFinanciamiento() {
      return this.precioTotal * this.porcentajeFinanciamiento;
    },
    porcentajeReserva() {
      return this.cantidadReserva / this.precioTotal;
    },
    precioEnganche() {
      return this.porcentajeEnganche*this.precioTotal-this.cantidadReserva
    },
    menosDescuentoLabel() {
      if(this.selectedLanguage == 'Español') {
        return this.tipoDescuento == 'porcentaje' 
        ? `(Menos ${this.cantidadDescuento}% de descuento)` 
        : `(Menos ${this.moneda + ' '+this.monedaFormatter.format(this.cantidadDescuento)} de descuento)`;
      } else {
        return this.tipoDescuento == 'porcentaje' 
        ? `(Minus ${this.cantidadDescuento}% discount)` 
        : `(Minus ${this.moneda + ' '+this.monedaFormatter.format(this.cantidadDescuento)} discount)`;
      }
    }
  },
};
// moneda+' '+monedaFormatter.format(
</script>
