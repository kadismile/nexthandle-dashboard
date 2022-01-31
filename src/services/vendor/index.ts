import {client} from '../../utils/api-client'
interface IVendor {
  token?: string,
  name?: string,
  email?: string,
  password?: string
}

class VendorService {
  public serverUrl = process.env.REACT_APP_BACKEND_URL ;

  async getVendors(params: string): Promise<IVendor> {
    try {
      return await client(
        `${this.serverUrl}/vendors?${params}`,
        {data: null, type: null, headers: {}}
      );
    } catch (e) {
      throw e
    }
  }

  async searchVendors(searchTerm: any): Promise<IVendor> {
    try {
      let search = {
        searchTerm,
        query: {
          limit: 20
        },
        type: "vendors"
      }
      return await client(
        `${this.serverUrl}/search`,
        {data: search, type: null, headers: {}}
      );
    } catch (e) {
      throw e
    }
  }

  async updateVendor(data: any): Promise<IVendor> {
    try {
      return await client(
        `${this.serverUrl}/vendor/update`,
        {data: { ...data }, type: null, headers: {}}
      );
    } catch (e) {
      throw e
    }
  }

}

export default new VendorService();