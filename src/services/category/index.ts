import {client} from '../../utils/api-client'
interface IUser {
  token?: string,
  name?: string,
  email?: string,
  password?: string
}

class CategoryService {
  public serverUrl = process.env.REACT_APP_BACKEND_URL ;

  async getCategories(): Promise<IUser> {
    try {
      return await client(
        `${this.serverUrl}/category`,
        {data: null, type: null, headers: {}}
      );
    } catch (e) {
      throw e
    }
  }

  async uploadCategoryCsv(formData: any): Promise<IUser> {
    try {
      const response = await client(
        `${this.serverUrl}/category/upload`,
        {data: formData , type: true, headers: {}}
      );
      if (!response)
        throw new Error("Cannot login");
      return response
    } catch (e) {
      throw e
    }
  }

  async deleteCategory(categoryId: string): Promise<IUser> {
    try {
      return await client(
        `${this.serverUrl}/category/remove`,
        {data: { categoryId }, type: null, headers: {}}
      );
    } catch (e) {
      throw e
    }
  }

  async updateCategory(data: any): Promise<IUser> {
    try {
      return await client(
        `${this.serverUrl}/category/update`,
        {data: { ...data }, type: null, headers: {}}
      );
    } catch (e) {
      throw e
    }
  }

}

export default new CategoryService()