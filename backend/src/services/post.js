import { Post } from '../db/models/post.js'

export async function createPost({ title, author, contents, tags }) {
  const post = new Post({ title, author, contents, tags })

  return post.save()
}

async function listPosts(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Post.find(query).sort({ [sortBy]: sortOrder })
}

export async function listAllPosts(options = {}) {
  return listPosts({}, options)
}

export async function listPostsByAuthor(author, options = {}) {
  return listPosts({ author }, options)
}

export async function listPostsByTag(tags, options = {}) {
  return listPosts({ tags }, options)
}

export async function getPostById(id) {
  return await Post.findById(id)
}

export async function updatePost(id, { title, author, contents, tags }) {
  return await Post.findByIdAndUpdate(
    id,
    { $set: { title, author, contents, tags } },
    { new: true },
  )
}

export async function deletePost(id) {
  return await Post.deleteOne({ _id: id })
}
