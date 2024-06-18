import { useQuery } from '@tanstack/react-query'
import { CreatePost } from './components/CreatePost'
import { PostFilter } from './components/PostFilter'
import { PostList } from './components/PostList'
import { PostSorting } from './components/PostSorting'
import { getPosts } from './api/post'
import { useState } from 'react'

export function Blog() {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  const postsQuery = useQuery({
    queryKey: ['posts', { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  })

  const posts = postsQuery.data?.data || []
  console.log({ posts })

  return (
    <div style={{ padding: 8 }}>
      <CreatePost />
      <br />
      <hr />
      Filter by:
      <PostFilter field='author' value={author} onChange={setAuthor} />
      <br />
      <PostSorting
        fields={['createdAt', 'updatedAt']}
        value={sortBy}
        onChange={setSortBy}
        orderValue={sortOrder}
        onOrderChange={setSortOrder}
      />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}
