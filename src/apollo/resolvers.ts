import { ApolloCache } from 'apollo-cache'
import { GET_FAV_ITEMS } from './query'
import { judgeIsFavItem } from '../utils'
import { IssueItem } from '../types'

interface State {
  favItems: IssueItem[]
}

interface Cache {
  cache: ApolloCache<any>
}

export const initialState: State = {
  favItems: []
}

export const resolvers = {
  Mutation: {
    addFavItem: (_: any, variables: IssueItem, { cache }: Cache) => {
      const previous: State | null = cache.readQuery({ query: GET_FAV_ITEMS })
      const newFavItem = { ...variables, __typename: 'FavItem' }
      // validate
      const isDeplicatedItem =
        previous && judgeIsFavItem(newFavItem, previous.favItems)
      if (isDeplicatedItem) return newFavItem

      const data = {
        favItems: previous && previous.favItems.concat([newFavItem])
      }
      cache.writeData({ data })
      return newFavItem
    },
    deleteFavItem: (_: any, variables: IssueItem, { cache }: Cache) => {
      const previous: State | null = cache.readQuery({ query: GET_FAV_ITEMS })
      const data = {
        favItems:
          previous &&
          previous.favItems.filter(favItem => favItem.id !== variables.id)
      }
      cache.writeData({ data })
      return null
    }
  }
}
