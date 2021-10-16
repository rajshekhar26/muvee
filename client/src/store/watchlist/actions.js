import * as types from './constants'
import * as watchlistService from './services'

export const getWatchlistAction = () => {
  return async dispatch => {
    try {
      const { data } = await watchlistService.getWatchlist()

      dispatch({
        type: types.SET_WATCHLIST,
        payload: data
      })
    } catch (err) {
      console.error(err)
    }
  }
}

export const addWatchlistAction = movie => {
  return async dispatch => {
    try {
      const { data } = await watchlistService.addWatchlist(movie)

      dispatch({
        type: types.ADD_WATCHLIST,
        payload: data
      })
    } catch (err) {
      console.error(err)
    }
  }
}

export const removeWatchlistAction = id => {
  return async dispatch => {
    try {
      const { data } = await watchlistService.removeWatchlist(id)

      dispatch({
        type: types.REMOVE_WATCHLIST,
        payload: data
      })
    } catch (err) {
      console.error(err)
    }
  }
}
