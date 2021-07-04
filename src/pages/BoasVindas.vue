<template>
  <q-page padding>
    <q-timeline :layout="layout" color="secondary">
      <q-timeline-entry heading>
        Seja Bem Vindo
      </q-timeline-entry>

      <q-timeline-entry title="Autor" subtitle="Sobre" side="left">
        <div>
          Olá, me chamo André, eu tenho {{ minhaIdade }} anos e tenho contato
          com a programação a {{ anosProgramacao }} anos.
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="Gestão de Contatos"
        subtitle="Sobre"
        side="right"
      >
        <div>
          Objetivo principal do projeto é a consulta com a API do ViaCEP, onde
          deve-se utilizar a consulta tanto com o CEP quanto com o logradouro.
        </div>
      </q-timeline-entry>
      <q-timeline-entry heading>Manual do Usuário</q-timeline-entry>
      <q-timeline-entry title="Dashboard" subtitle="Menu" side="left">
        <div>
          Painel mostrando a gestão dos seus contatos. Atualmente por estado e
          situação.
        </div>
      </q-timeline-entry>
      <q-timeline-entry
        title="Cadastro de Contato"
        subtitle="Menu"
        side="right"
      >
        <div>
          Página onde é realizado todo o gerenciamento de seus contatos, desde a
          criação até a exclusão dos mesmos. Um ponto interessante é a
          possibilidade de consultar o CEP para preencher campos de endereço
          automaticamente.
        </div>
      </q-timeline-entry>
      <q-timeline-entry title="Consulta Endereço" subtitle="Menu" side="left">
        <div>
          Digamos que você não saiba o CEP de uma determinada rua, nesta página
          você pode localizar este dado e muitos outros, basta informar o
          estado, a cidade e parte do logradouro do endereço, que então será
          retornado uma lista em formato de cards com detalhes dos endereços
          localizados. Um ponto interessante é a possibilidade de abrir o
          endereço no google maps, clicando no botão ao lado do logradouro.
        </div>
      </q-timeline-entry>
    </q-timeline>
  </q-page>
</template>

<script>
import { date } from "quasar";

let dataAtual = new Date();
let dataNascimento = new Date(1998, 12, 19);
let dataAproximadaInicioProgramacao = new Date(2017, 1, 1);

let minhaIdadeData = date.getDateDiff(dataAtual, dataNascimento, "years");
let anosProgramacaoData = date.getDateDiff(
  dataAtual,
  dataAproximadaInicioProgramacao,
  "years"
);

export default {
  name: "BoasVindas",
  data() {
    return {
      minhaIdade: minhaIdadeData,
      anosProgramacao: anosProgramacaoData
    };
  },
  computed: {
    layout() {
      return this.$q.screen.lt.sm
        ? "dense"
        : this.$q.screen.lt.md
        ? "comfortable"
        : "loose";
    }
  }
};
</script>
