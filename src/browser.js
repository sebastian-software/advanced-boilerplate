// This file is just for exporting infrastructure to applications built upon this.
export { createReduxStore, createApolloClient,
  emptyReducer, emptyMiddleware, emptyEnhancer,
  ssrReducer } from "./common/Data"

import "./client/addServiceWorker"

export { default as RouterConnector, routerReducer } from "./common/RouterConnector"
