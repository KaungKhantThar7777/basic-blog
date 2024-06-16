import mongoose from 'mongoose'
import { describe, test, expect, beforeEach } from '@jest/globals'
import {
  createPost,
  deletePost,
  getPostById,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  updatePost,
} from '../services/post'
import { Post } from '../db/models/post'

describe('creating posts', () => {
  test('with all parameters should succeed', async () => {
    const post = {
      title: 'Post from test',
      author: 'KKT',
      contents: 'This is my first post',
      tags: ['first', 'post'],
    }

    const createdPost = await createPost(post)

    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)

    const foundPost = await Post.findById(createdPost._id)

    expect(foundPost).toEqual(expect.objectContaining(post))

    expect(foundPost.createdAt).toBeInstanceOf(Date)
    expect(foundPost.updatedAt).toBeInstanceOf(Date)
  })

  test('without title should fail', async () => {
    const post = {
      author: 'KKT',
      contents: 'This is my first post',
      tags: ['first', 'post'],
    }

    try {
      await createPost(post)
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(error.message).toContain('`title` is required')
    }
  })

  test('with minimum parameters should succeed', async () => {
    const post = {
      title: 'My first post',
    }

    const createdPost = await createPost(post)

    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})

const samplePosts = [
  {
    title: 'My first post',
    author: 'KKT',
    contents: 'This is my first post',
    tags: ['first', 'nodejs'],
  },
  {
    title: 'My second post',
    author: 'KKT',
    contents: 'This is my second post',
    tags: ['second', 'react'],
  },
  {
    title: 'My third post',
    author: 'John Doe',
    contents: 'This is my third post',
    tags: ['third', 'next.js'],
  },
]

let createdSamplePosts = []

beforeEach(async () => {
  await Post.deleteMany({})
  createdSamplePosts = []
  for (const post of samplePosts) {
    const createdPost = new Post(post)

    createdSamplePosts.push(await createdPost.save())
  }
})

describe('listing posts', () => {
  test('should return all posts', async () => {
    const posts = await listAllPosts()

    expect(posts.length).toEqual(createdSamplePosts.length)
  })

  test('should return posts sorted by creation date descending by default', async () => {
    const posts = await listAllPosts()

    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => b.createdAt - a.createdAt,
    )

    expect(posts.map((post) => post.createdAt)).toEqual(
      sortedSamplePosts.map((post) => post.createdAt),
    )
  })

  test('should take into account provided sorting options', async () => {
    const posts = await listAllPosts({
      sortBy: 'updatedAt',
      sortOrder: 'ascending',
    })

    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => a.updatedAt - b.updatedAt,
    )

    expect(posts.map((post) => post.updatedAt)).toEqual(
      sortedSamplePosts.map((post) => post.updatedAt),
    )
  })

  test('should be able to filter by author', async () => {
    const posts = await listPostsByAuthor('KKT')
    expect(posts.length).toEqual(2)
  })

  test('should be able to filter by tag', async () => {
    const posts = await listPostsByTag('nodejs')

    expect(posts.length).toEqual(1)
  })
})

describe('getting a post', () => {
  test('should return a post', async () => {
    const post = await getPostById(createdSamplePosts[0]._id)

    expect(post.toObject()).toEqual(createdSamplePosts[0].toObject())
  })

  test('should fail if id does not exist', async () => {
    const post = await getPostById(new mongoose.Types.ObjectId())

    expect(post).toBeNull()
  })
})

describe('updating a post', () => {
  test('should update the specified property', async () => {
    await updatePost(createdSamplePosts[0]._id, {
      author: 'Test author',
    })

    const updatedPost = await Post.findById(createdSamplePosts[0]._id)

    expect(updatedPost.author).toEqual('Test author')
    expect(updatedPost.title).toEqual('My first post')
  })

  test('should update the updatedAt', async () => {
    await updatePost(createdSamplePosts[0]._id, {
      author: 'Test author',
    })

    const updatedPost = await Post.findById(createdSamplePosts[0]._id)

    expect(updatedPost.updatedAt.getTime()).toBeGreaterThan(
      createdSamplePosts[0].updatedAt.getTime(),
    )
  })

  test('should fail if id does not exist', async () => {
    const post = await updatePost(new mongoose.Types.ObjectId(), {
      author: 'Test author',
    })
    expect(post).toBeNull()
  })
})

describe('deleting a post', () => {
  test('should delete a post', async () => {
    const result = await deletePost(createdSamplePosts[0]._id)
    expect(result.deletedCount).toEqual(1)

    const post = await Post.findById(createdSamplePosts[0]._id)
    expect(post).toBeNull()
  })

  test('should fail if id does not exist', async () => {
    const result = await deletePost(new mongoose.Types.ObjectId())
    expect(result.deletedCount).toEqual(0)
  })
})
