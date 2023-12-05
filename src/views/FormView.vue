<template>
  <main class="form-view"
    :style="{ '--bg-color': formStyle.bgColor, '--textColor': formStyle.textColor, '--button-color': formStyle.buttonColor }">
    <ProgressBar :totalItems=fields.length :currentIndex=currentStepIndex />

    <template v-if="fields && fields.length" v-for="(field, index) in fields">
      <div v-if="field.type !== 'endScreen'" class="field-container" :class="{ 'active': index == currentStepIndex }">
        <h2 class="form-title">{{ field.title }}</h2>
        <div>{{ field.description }}</div>
        <div v-if="field.type == 'checkbox'">
          <CheckboxField :field="field" fieldTip='Selecione quantos itens desejar.'
            @selectedOptionsChange="receivedSelectedOptions" />
        </div>
        <input v-else maxlength="130" :class="{ 'error': errorMessage }" :type="field.type" v-model=field.value
          placeholder="Sua resposta...">
        <div class="error-message" v-if="errorMessage">
          {{ errorTextMessage }}
        </div>
        <SubmitButton @submitField="submitField" :formStyle=formStyle :totalItens=fields.length :index=currentStepIndex />
      </div>
      <div v-else class="end-screen field-container" :class="{ 'active': index == currentStepIndex }">
        <font-awesome-icon class="icon" :icon="['fas', 'paper-plane']" />
        <h3>{{ field.title }}</h3>
        <p>{{ field.description }}</p>
      </div>
    </template>

    <NavigationContainer @next="submitField" @back="back" :index="currentStepIndex" :fieldsLength="fields.length" />
  </main>
</template>

<script>

import axios from "axios";
import NavigationContainer from "../components/NavigationContainer.vue";
import ProgressBar from "../components/ProgressBar.vue";
import CheckboxField from "../components/CheckboxField.vue";
import SubmitButton from "../components/SubmitButton.vue";

export default {
  data() {
    return {
      formId: "",
      fields: [],
      checkboxValues: [],
      formStyle: {
        bgColor: "#000",
        buttonColor: "#fff",
        textColor: "#ffffff",
      },
      errorMessage: false,
      errorTextMessage: "Essa resposta é obrigatória.",
      currentStepIndex: 0,
    };
  },
  mounted: async function () {
    const id = this.$route.params.id;
    console.log(id);
    const url = `https://65665153eb8bb4b70ef3297d.mockapi.io/api/forms/${id}`
    try {
      const response = await axios.get(url);

      this.formStyle = { ...this.formStyle, ...response.data.style };
      this.fields = response.data.fields;
      this.formId = response.data.id;
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  },
  methods: {
    async submitField() {
      // Captura o campo que está sendo manipulado com base no index
      const currentField = this.fields[this.currentStepIndex];
      console.log("checkboxValues", this.checkboxValues)

      if (!currentField.value && currentField.type == "text") {
        this.errorMessage = true;
        return false;
      }

      if (currentField.type == "email" && currentField.value) {
        // Verifica se é um e-mail valido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(currentField.value)) {
          this.errorMessage = true;
          this.errorTextMessage = "Preencha um e-mail válido."
          return false;
        }
      }

      if (currentField.value || this.checkboxValues.length) {
        const url = 'https://65665153eb8bb4b70ef3297d.mockapi.io/api/respondents';
        const value = currentField.type == "checkbox" ? this.checkboxValues : currentField.value;
        try {
          const localStorageValue = localStorage.getItem(currentField.id);
          if (!localStorageValue || localStorageValue !== currentField.value) {
            // Se o campo não existe no localStorage executa a requisição POST

            //Comentei para possibilitar os testes
            // const responsePost = await axios.post(url, {
            //   formId: this.formId,
            //   fieldId: currentField.id,
            //   value
            // });
            const responsePut = await axios.put(`${url}/${this.formId}`, {
              formId: this.formId,
              fieldId: currentField.id,
              value
            });
            console.log('Resposta da API [PUT]:', responsePut);
            localStorage.setItem(currentField.id, currentField.value);
          } else {
            // Se o campo já existe no localStorage e o valor é diferente, executa a requisição PUT
            const responsePut = await axios.put(`${url}/${this.formId}`, {
              formId: this.formId,
              fieldId: currentField.id,
              value
            });
            console.log('Resposta da API [PUT]:', responsePut);
          }
          this.checkboxValues = [];
          this.next();
          this.errorMessage = false;
        } catch (error) {
          console.error('Erro na requisição:', error);
        }
      }
    },
    receivedSelectedOptions(options) {
      this.checkboxValues = options;
      console.log("push checkbox", this.checkboxValues);
    },
    next() {
      // Lida com a nevegação entre campos
      this.setCurrentStepIndex(this.currentStepIndex + 1);
    },
    back() {
      // Lida com a nevegação entre campos
      this.setCurrentStepIndex(this.currentStepIndex - 1);
    },
    setCurrentStepIndex(index) {
      if (index >= 0 && index < this.fields.length) {
        this.currentStepIndex = index;
      }
    },
  },
  components: { NavigationContainer, ProgressBar, SubmitButton, CheckboxField }
}
</script>


<style lang="scss">
main.form-view {
  background-color: var(--bg-color);
  color: var(--textColor);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  stroke: var(--textColor);


  @media only screen and (max-width: 768px) {
    align-items: initial;
  }

  .field-container {
    margin: auto;
    max-width: 700px;
    width: 100%;
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
    position: absolute;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    top: calc(50% - 50px);
    transform: translateY(-50%);
    overflow: hidden;
    transition: .4s ease-in-out;

    @media only screen and (max-width: 768px) {
      max-width: 90%;
      padding: 0 5%;
    }

    &.active {
      visibility: visible;
      opacity: 1;
      pointer-events: all;
      top: 50%;

    }

    input[type=text],
    input[type=email] {
      width: 100%;
      display: block;
      background-color: transparent;
      border: 0;
      border-bottom: 1px solid var(--textColor);
      margin: 12px 0;
      padding: 0;
      outline: none;
      height: 30px;
      font-size: 20px;
      margin-bottom: 0;
      color: var(--textColor);

      @media only screen and (max-width: 768px) {
        width: 90%;
      }

      &.error {
        border-color: #ff1744;
      }

      &::placeholder {
        font-size: inherit;
        color: inherit;
        opacity: 0.5;
      }
    }
  }

  .end-screen {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;

    .icon {
      width: 50px;
      height: 50px;
      margin-bottom: 16px;
    }
  }
}

.error-message {
  background: #ff1744;
  border-radius: 0 0 5px 5px;
  color: #fff;
  display: inline-block;
  font-size: 12px;
  margin-top: 0;
  padding: 4px 8px;
  margin-bottom: 16px;
  width: fit-content;
}
</style>