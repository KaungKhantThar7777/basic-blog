import { CreatePost } from './components/CreatePost'
import { PostFilter } from './components/PostFilter'
import { PostList } from './components/PostList'
import { PostSorting } from './components/PostSorting'

const posts = [
  {
    title: 'Fullstack React projects',
    contents: "Let's become fullstack developers ",
    author: 'KKT',
  },
  {
    title: 'Fullstack React projects 2 ',
    contents: "Let's become fullstack developers ",
    author: 'KKT',
  },
  {
    title: 'Fullstack React projects 3',
    contents: "Let's become fullstack developers ",
    author: 'KKT',
  },
]
export function App() {
  return (
    <div style={{ padding: 8 }}>
      <CreatePost />
      <br />
      <hr />
      Filter by:
      <PostFilter field='author' />
      <br />
      <PostSorting fields={['createdAt', 'updatedAt']} />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}
