(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"3e50":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-card",[a("q-card-section",{staticClass:"bg-primary text-white"},[a("div",{staticClass:"text-h6"},[t._v("Contatos por Estado")])]),a("q-separator"),a("q-card-section",[a("apexchart",{attrs:{type:"pie",height:"150",options:t.chartOptions,series:t.series}})],1)],1)},o=[],r=(a("13d5"),{name:"APMChartContatosPorEstado",props:{setContatos:{type:Array,default:()=>[]}},data(){return{contatos:this.setContatos,series:[],chartOptions:{chart:{type:"pie",toolbar:{show:!0}},labels:[],legend:{labels:{colors:this.$q.dark.isActive?"#FFF":"#000"}}}}},methods:{setValues(){const t=this;let e=Object.values(t.contatos.reduce(((t,{estado:e})=>(t[e]=t[e]||{label:e,value:0},t[e].value++,t)),{}));t.series=e.map((t=>t.value)),t.chartOptions.labels=e.map((t=>t.label))}},created(){const t=this;t.setValues()},watch:{setContatos(t){this.contatos=t}}}),n=r,c=a("2877"),i=a("f09f"),l=a("a370"),p=a("eb85"),d=a("eebe"),h=a.n(d),u=Object(c["a"])(n,s,o,!1,null,null,null);e["default"]=u.exports;h()(u,"components",{QCard:i["a"],QCardSection:l["a"],QSeparator:p["a"]})}}]);