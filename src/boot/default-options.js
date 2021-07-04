// https://github.com/felipefdl/cidades-estados-brasil-json
import estados from './estados.json'
import cidades from './cidades.json'

export default async ({ Vue }) => {
  Vue.prototype.$defaultOptions = {
    estados,
    cidades,
    getCidadesByEstadoSigla: (sigla) => {
      let estado = estados.find(x => x.Sigla === sigla);

      if (estado) {
        return cidades.filter(
          x => x.Estado === estado.ID
        );
      }

      return [];
    }
  }
}
