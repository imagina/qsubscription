const moduleName = 'suscriptions';
const moduleVersion = 'v1';
const baseApiUrl = `${env('BASE_URL', 'http://localhost:8000')}/api`;
const urlBase = `/${moduleName}/${moduleVersion}`


export default {
  urlBase : urlBase,
  version: moduleVersion,
  features: `${urlBase}/features`,
  plans: `${urlBase}/plans`,
  products: `${urlBase}/products`,
  suscriptions: `${urlBase}/suscriptions`,
  paymentMethods: `${urlBase}/payment-methods`,
}
