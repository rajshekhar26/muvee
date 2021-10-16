import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import * as Styled from './MovieItem.styles'
import {
  addWatchlistAction,
  removeWatchlistAction
} from '../../store/watchlist/actions'

const imgURL = 'https://image.tmdb.org/t/p/original'

const MovieItem = ({ movieId, movie }) => {
  const dispatch = useDispatch()

  const moviesInWatchlist = useSelector(({ watchlist }) => watchlist.movies)

  const addedToWatchlist = moviesInWatchlist.find(m => {
    const id = m.movieId || m.id
    return id === movieId
  })

  const title =
    movie.title.length > 25 ? movie.title.slice(0, 25) + '...' : movie.title

  const releaseYear = movie.releaseYear || movie.release_date?.slice(0, 4)
  const imgPath = movie.imgPath || movie.backdrop_path
  const voteAvg = movie.voteAvg || movie.vote_average

  const handleWatchlist = () => {
    const movieToAdd = {
      movieId,
      releaseYear,
      imgPath,
      voteAvg,
      title: movie.title
    }

    addedToWatchlist
      ? dispatch(removeWatchlistAction(addedToWatchlist.id))
      : dispatch(addWatchlistAction(movieToAdd))
  }

  return (
    <Styled.Container>
      <img src={`${imgURL}/${imgPath}`} alt={movie.title} />

      <Styled.Title title={movie.title}>
        {title} ({releaseYear})
      </Styled.Title>

      <Styled.IconsContainer>
        <Styled.Rating>
          <Styled.StarIcon />
          <Styled.RatingText>{voteAvg}</Styled.RatingText>
        </Styled.Rating>

        <Styled.WatchlistButton onClick={handleWatchlist}>
          {addedToWatchlist ? (
            <Styled.PlaylistAddedIcon aria-label='remove from watchlist' />
          ) : (
            <Styled.PlaylistAddIcon aria-label='add to watchlist' />
          )}
        </Styled.WatchlistButton>
      </Styled.IconsContainer>
    </Styled.Container>
  )
}

MovieItem.propTypes = {
  movieId: PropTypes.number,
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    release_date: PropTypes.string,
    releaseYear: PropTypes.string,
    vote_average: PropTypes.number,
    voteAvg: PropTypes.number,
    backdrop_path: PropTypes.string,
    imgPath: PropTypes.string
  })
}

export default MovieItem
