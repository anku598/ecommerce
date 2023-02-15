import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-fetch'
// import ProductsQuery from "../apollo/sitemap/queries/Products.gql";
// import CollectionsQuery from "../apollo/sitemap/queries/Collections.gql";
// import CategoriesQuery from "../apollo/sitemap/queries/Categories.gql";
import {
  getCategoriesQuery,
  getCollectionsQuery,
  getProductsQuery
} from '../apollo/sitemap/queries'

const fetchItems = async (
  { query, uri, perPage = 100 }: any,
  callback: any
) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({ uri: uri + '/graphql/', fetch })
  })
  const next = async (cursor = null) => {
    const response = await client.query({
      query,
      variables: { perPage, cursor }
    })
    const data =
      response.data[query.definitions[0].selectionSet.selections[0].name.value]
    data.edges.map(({ node }: any) => callback(node))
    if (data.pageInfo.hasNextPage) {
      await next(data.pageInfo.endCursor)
    }
  }
  await next()
}

export const getCategories = async (uri: string, callback: any) => {
  await fetchItems(
    { query: getCategoriesQuery, uri },
    ({ slug, level }: any) => {
      callback({
        changefreq: 'weekly',
        priority: 0.8,
        url: `/store/${level === 0 ? 'for' : 'categories'}/${slug}`
      })
    }
  )
}

export const getCollections = async (uri: string, callback: any) => {
  await fetchItems({ query: getCollectionsQuery, uri }, ({ slug }: any) => {
    callback({ changefreq: 'weekly', priority: 0.8, url: '' })
  })
}

export const getProducts = async (uri: string, callback: any) => {
  await fetchItems(
    { uri, query: getProductsQuery },
    ({ updatedAt, slug }: any) => {
      callback({
        changefreq: 'daily',
        priority: 1,
        lastmod: updatedAt,
        url: `/store/products/${slug}`
      })
    }
  )
}
