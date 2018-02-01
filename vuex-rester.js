import axios from 'axios';
import RouteParser from '@funjs/route-parser';

export const IDENTITY = x => x;
export const ONLY_MUT_PARAM = (x, y) => x;
export const ONLY_RESPONSE = (x, y) => y;

export function newIntId(elems, idField='_id') {
  return newIntIdArr(Object.values(elems), idField);
}

export function newIntIdArr(elems, idField='_id') {
  return elems.filter(el => el[idField] !== undefined).map(el => el[idField]).reduce((a,b) => Math.max(a,b), -1)+1;
}

export function arrayToMapById(arr, idField='_id') {
  const result = {};
  for (const el of arr) {
    if (el[idField] !== undefined) {
      result[el[idField]] = el;
    }
  }
  return result;
}

function parseDummyResponses(dr) {
  const result = {
    GET: [],
    POST: [],
    PUT: [],
    PATCH: [],
    DELETE: []
  };
  for (const route of Object.keys(dr)) {
    let split = /(GET|POST|PUT|PATCH|DELETE) (.*)/.exec(route);
    const routeParsed = RouteParser(split[2]);
    result[split[1]].push({
      route: routeParsed,
      response: dr[route]
    })
  }
  return result;
}

function routeRequest(verb, dummies, ctx, apiPath, configExtractor, mutParam, apiParam) {
  const routes = dummies[verb];
  for (const dummyResponse of routes) {
    const urlParams = dummyResponse.route.match(apiPath);
    if (urlParams) {
      let result = dummyResponse.response;
      if (typeof result === "function") {
        return result(ctx, urlParams, mutParam, apiParam, apiPath)
      } else {
        return result;
      }
    }
  }
  return undefined;
}


export default function ({dummy=false, baseUrl='', dummyResponses={}, axiosDefaults={}, configExtractor=null}) {
  axiosDefaults.baseUrl = baseUrl;
  console.log(axiosDefaults);
  const ax = axios.create(axiosDefaults);
  if (dummy) {
    dummyResponses = parseDummyResponses(dummyResponses);
  }

  return {
    apiGet(ctx, apiPath, mutation, respMap=IDENTITY) {
      if (dummy) {
        const resp = routeRequest('GET', dummyResponses, ctx, apiPath, configExtractor);
        ctx.commit(mutation, respMap(resp));
        return Promise.resolve();
      }
      const conf = configExtractor ? configExtractor(ctx) : {};
      return new Promise((resolve, reject) => {
        ax.get(baseUrl+apiPath, conf)
          .then(resp => {
            ctx.commit(mutation, respMap(resp.data));
            resolve();
          }, reject)
      })
    },

    apiPost(ctx, apiPath, apiParam, mutation, mutParam, respCombine=ONLY_MUT_PARAM) {
      if (dummy) {
        const resp = routeRequest('POST', dummyResponses, ctx, apiPath, configExtractor, mutParam, apiParam);
        ctx.commit(mutation, respCombine(mutParam, resp));
        return Promise.resolve();
      }
      const conf = configExtractor ? configExtractor(ctx) : {};
      return new Promise((resolve, reject) => {
        ax.post(baseUrl+apiPath, apiParam, conf)
          .then(resp => {
            ctx.commit(mutation, respCombine(mutParam, resp.data));
            resolve();
          }, reject)
      })
    },

    apiPatch(ctx, apiPath, apiParam, mutation, mutParam, respCombine=ONLY_MUT_PARAM) {
      if (dummy) {
        const resp = routeRequest('PATCH', dummyResponses, ctx, apiPath, configExtractor, mutParam, apiParam);
        ctx.commit(mutation, respCombine(mutParam, resp));
        return Promise.resolve();
      }
      const conf = configExtractor ? configExtractor(ctx) : {};
      return new Promise((resolve, reject) => {
        ax.patch(baseUrl+apiPath, apiParam, conf)
          .then(resp => {
            ctx.commit(mutation, respCombine(mutParam, resp.data));
            resolve();
          }, reject)
      })
    },

    apiPut(ctx, apiPath, apiParam, mutation, mutParam, respCombine=ONLY_MUT_PARAM) {
      if (dummy) {
        const resp = routeRequest('PUT', dummyResponses, ctx, apiPath, configExtractor, mutParam, apiParam);
        ctx.commit(mutation, respCombine(mutParam, resp));
        return Promise.resolve();
      }
      const conf = configExtractor ? configExtractor(ctx) : {};
      return new Promise((resolve, reject) => {
        ax.put(baseUrl+apiPath, apiParam, conf)
          .then(resp => {
            ctx.commit(mutation, respCombine(mutParam, resp.data));
            resolve();
          }, reject)
      })
    },

    apiDelete(ctx, apiPath, mutation, mutParam) {
      if (dummy) {
        const resp = routeRequest('PUT', dummyResponses, ctx, apiPath, configExtractor, mutParam);
        ctx.commit(mutation, mutParam);
        return Promise.resolve();
      }
      const conf = configExtractor ? configExtractor(ctx) : {};
      return new Promise((resolve, reject) => {
        ax.delete(baseUrl+apiPath, conf)
          .then(() => {
            ctx.commit(mutation, mutParam);
            resolve();
          }, reject)
      })
    }
  }
}
