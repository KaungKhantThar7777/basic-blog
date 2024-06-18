import PropTypes from 'prop-types'

export const Post = ({ title, author, contents }) => {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>

      {author && (
        <em>
          <br />
          Written by <strong>{author}</strong>
        </em>
      )}
    </article>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
}
