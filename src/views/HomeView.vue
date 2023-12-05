<template>
  <main class="home-view">
    <ul class="form-list">
      <li class="card" v-for="form in forms"
        :style="{ '--bg-color': form.style.bgColor, '--textColor': form.style.textColor, '--button-color': form.style.buttonColor }">
        <h2>
          {{ form.title }}
        </h2>
        <a class="btn" :href="'form/' + form.id">Acessar formulário</a>
      </li>
    </ul>
  </main>
</template>
<script>

import axios from "axios";

export default {
  data() {
    return {
      forms: []
    };
  },
  mounted: async function () {
    this.getForms();
  },
  methods: {
    async getForms() {
      const url = `https://65665153eb8bb4b70ef3297d.mockapi.io/api/forms/`
      try {
        const response = await axios.get(url);
        console.log("resposta", response.data)
        this.forms = response.data;
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    }
  }
}
</script>

<style lang="scss">
main.home-view {
  padding: 5%;
  background-color: rgba($color: #536dfe, $alpha: 0.8);
  height: 100vh;

  .form-list {
    padding: 0;
    border: 1;
    display: flex;
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;

    @media only screen and (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .card {
      min-height: 140px;
      font-style: none;
      border-radius: 7px;
      background-color: var(--bg-color);
      color: var(--textColor);
      padding: 16px;
      display: flex;
      justify-content: center;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      border: 2px solid var(--button-color);
      align-items: center;
      flex-direction: column;
      width: 460px;
      margin: auto;

      @media only screen and (max-width: 768px) {
        width: 100%;
      }

      .btn {
        background-color: var(--button-color);
        color: #fff;
        border-radius: 4px;
        font-size: 14px;
        text-decoration: unset;
        padding: 6px 10px;
        margin-top: 10px;
        transition: .3s ease-in;
        border: 1px solid transparent;

        &:hover {
          border: 1px solid var(--button-color);
          color: var(--button-color);
          background: transparent;
        }
      }
    }
  }
}</style>
