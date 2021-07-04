import axios from 'axios'

const url = 'https://viacep.com.br/ws'

const viacep = {
  validaCEP(cep) {
    let aux = cep.replace(/\D/g, '')
    if (aux != "") {
      var validaCEP = /^[0-9]{8}$/;
      if(validaCEP.test(aux)) {
        return true
      }
    }
    return false;
  },
  getByCEP(cep) {
    return axios({
      method: 'GET',
      url: `${url}/${cep}/json`
    })
    .then((response) => {
      return response.data;
    });
  },
  getByLogradouro(estado, cidade, logradouro) {
    return axios({
      method: 'GET',
      url: `${url}/${estado}/${cidade}/${logradouro}/json`
    })
    .then((response) => {
      return response.data;
    });
  }
}
export default async ({ Vue }) => {
  Vue.prototype.$service = {
    viacep
  }
}
