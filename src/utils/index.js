import store from '../../store';

/*
  Query Builder
  @queryInp {object} - contains main querying parameters ie: category_id: 2.
  @paginated {object} - explained in details below.
  @params {object} - explained in details below.

*/
export const createQueryString = (queryInp, paginated, params) => {
  // const { localized, ...queryInpModified } = queryInp;

  let queryObj = Object.assign({}, queryInp);

  if (paginated !== undefined) {
    queryObj = Object.assign(queryObj, {
      page: paginateQuery(params, paginated)
    });
  }

  let queryString = Object.keys(queryObj).reduce(
    (query, currentKey) =>
      currentKey === 'localized'
        ? `${`${query}locale`}=${store.getState().languageReducer.language}&`
        : `${query + currentKey}=${queryObj[currentKey]}&`,
    '?'
  );

  queryString = queryString.slice(0, -1);
  return queryString;
};

/*
  Localization Handler
  @customConfig {object} - contains the method of the request
                           to decide adding a locale or not.
*/
export const localizeQuery = customConfig => {
  const locale = store.getState().languageReducer.language;
  return customConfig.method === 'GET' ? `/${locale}` : '';
};

/*
  Pagination Handler
  @params {object} - contains multiple significant inputs from the actions scope to be passed
                     back to the component. For example it can contain boolean indicating whether
                     this request is for a data refresh purpose or the opposite.
  @paginated {object} - contains multiple parameters for pagination automation in the middleware
                        @reducer {string} - key of the reducer name in store
                        @location {string} - key of the container in the reducer param
                        @id {string} - id of the sub container in the location param
                        @page {string} - key of the pagination element in the sub container
                        ie: paginated: {
                              reducer: 'productsReducer',
                              location: 'products',
                              id: <dynammic>,
                              page: 'productPaging'
                            }
                            The pagination variable we are looking for is found at
                            "store.getState().productsReducer.products[id].page"
                            = the number of the page to be fetched automatically.
*/

export const paginateQuery = (params, paginated) => {
  const { reducer, page, location, id } = paginated;
  const obtainedLocation =
    reducer && page && location
      ? store.getState()[`${reducer}`][`${location}`].find(key => `${key.id}` === `${id}`)
      : store.getState()[`${reducer}`];
  const pageNumber = obtainedLocation[`${page}`];
  return params && params.refresh ? 1 : pageNumber;
};
