import { myRestDatasource } from '../datasource'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { GraphQLError } from 'graphql'
export class datasource_auth extends myRestDatasource {
  override baseURL? = process.env.URI_LOCAL

  async auth(email: string, password: string) {
    const user = await this.exist(
      '/users/?email=' + encodeURI(email),
      {
        errorElseExist: 'email not exists',
      },
    )

    const passwordIsValid = await bcrypt.compare(
      password,
      user[0].password,
    )

    if (passwordIsValid) {
      const token = jwt.sign(
        { userId: user[0].id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' },
      )
      return {
        token,
        expires: '7d',
      }
    } else {
      throw new GraphQLError(
        'invalid credentials',
      )
    }
  }
}
