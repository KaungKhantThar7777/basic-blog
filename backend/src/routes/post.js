import { Router } from 'express'
import {
  createPost,
  deletePost,
  getPostById,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  updatePost,
} from '../services/post.js'

const postRouter = Router()

postRouter
  .route('/posts')
  .get(async (req, res) => {
    const { sortBy, sortOrder, author, tag } = req.query

    const options = { sortBy, sortOrder }

    try {
      if (author && tag) {
        return res
          .status(400)
          .json({ error: 'query by either author or tag, but not both' })
      } else if (author) {
        const posts = await listPostsByAuthor(author, options)
        return res.json({ data: posts })
      } else if (tag) {
        const posts = await listPostsByTag(tag, options)
        return res.json({ data: posts })
      } else {
        const posts = await listAllPosts(options)
        return res.json({ data: posts })
      }
    } catch (error) {
      console.error(`listing posts error: ${error.message}`)
      return res.status(500).end()
    }
  })
  .post(async (req, res) => {
    try {
      const post = await createPost(req.body)
      return res.status(201).json({ data: post })
    } catch (error) {
      console.error(`error creating post`, error.message)
      return res.status(500).end()
    }
  })

postRouter
  .route('/posts/:id')
  .get(async (req, res) => {
    const { id } = req.params

    try {
      const post = await getPostById(id)
      if (!post) {
        return res.status(404).end()
      }

      return res.json({ data: post })
    } catch (error) {
      return res.status(500).end()
    }
  })
  .patch(async (req, res) => {
    try {
      const post = await updatePost(req.params.id, req.body)
      return res.json({ data: post })
    } catch (error) {
      console.error(`error updating post`, error.message)
      return res.status(500).end()
    }
  })
  .delete(async (req, res) => {
    try {
      const { deletedCount } = await deletePost(req.params.id)
      if (deletedCount === 0) {
        return res.status(404).end()
      }
      return res.status(204).end()
    } catch (error) {
      console.error(`error deleting post`, error.message)
      return res.status(500).end()
    }
  })
export default postRouter
