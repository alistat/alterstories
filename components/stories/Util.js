export function mapGettersParam(module, getters) {
  const result = {};
  for (const getter of Object.keys(getters)) {
    result[getter] = function (state) {
      let params = getters[getter];
      if (!Array.isArray(params)) {
        params = [params];
      }
      params = params.map(key => this[key]);
      return this.$store.getters[module+'/'+getter](...params);
    }
  }
  return result;
}
