import PropTypes from 'prop-types'
import { Post } from './Post'
import { Fragment } from 'react'

export const PostList = ({ posts = [] }) => {
  return (
    <div>
      {posts.map((post) => (
        <Fragment key={post._id}>
          <Post {...post} />
          <hr />
        </Fragment>
      ))}
    </div>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(Post.propTypes).isRequired,
}
