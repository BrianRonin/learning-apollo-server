import { GraphQLError } from 'graphql'
import { myRestDatasource } from '../datasource'
import { Post } from '../types'

export class datasource_post extends myRestDatasource {
  override baseURL = process.env.URI_LOCAL

  async getPosts(params = {}) {
    return this.get('/posts/', { params })
  }

  getPost = this.makeDataLoader(
    this.getPosts.bind(this),
    'id',
    (id: string, response: any[]) =>
      response.find((data) => data.id === id),
  )

  getPostsByUserId = this.makeDataLoader(
    this.getPosts.bind(this),
    'userId',
    (id: string, response: any[]) => {
      return response.filter(
        (post) => post.userId === id,
      )
    },
  )

  async createPost(post: Post) {
    await this.userExist(
      post.userId,
      'invalid userId',
    )
    const indexRef = await this.lastRef(
      '/posts/',
      true,
    )

    return await this.post('/posts/', {
      body: {
        ...post,
        indexRef: indexRef.toString(),
        createdAt: new Date().toISOString(),
      },
    })
  }

  async updatePost(id: string, post: Post) {
    if (!id)
      throw new GraphQLError('id is missing')
    if (post?.userId) {
      await this.userExist(
        post.userId,
        'invalid userId',
      )
    }
    return await this.patch('/posts/' + id, {
      body: { ...post },
    })
  }

  async deletePost(id: string) {
    if (!id)
      throw new GraphQLError('id is missing')
    await this.delete('/posts/' + id)
    return true
  }
}
