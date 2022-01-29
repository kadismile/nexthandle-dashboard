import {client} from '../../utils/api-client'
interface IUser {
  token?: string,
  name?: string,
  email?: string,
  password?: string
}

class UserService {
  public serverUrl = process.env.REACT_APP_BACKEND_URL ;
  async login(email: string, password: string): Promise<IUser> {
    try {
      const response = await client(
        `${this.serverUrl}/users/login`,
        {data: { email, password }, type: null, headers: {}}
      );
      if (!response)
        throw new Error("Cannot login");
      return response
    } catch (e) {
      throw e
    }
  }

  async verifyToken(email: string, loginToken: string): Promise<IUser> {
    try {
      const response = await client(
        `${this.serverUrl}/users/login-token`,
        {data: {email, loginToken}, type: null, headers: {}}
      );
      return response
    } catch (e) {
      throw e
    }
  }

  async fetchUser(): Promise<IUser> {
    try {
      return await client(
        `${this.serverUrl}/users/get`,
        {data: null, type: null, headers: {}}
      );
    } catch (e) {
      throw e
    }
  }

}

export default new UserService();