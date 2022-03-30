import { client } from "../../utils/api-client";
interface IProduct {
 token?: string;
 name?: string;
 email?: string;
 password?: string;
}

class ProductService {
 public serverUrl = process.env.REACT_APP_BACKEND_URL;

 async getProducts(
  category = "",
  vendor = "",
  isActive = ""
 ): Promise<IProduct> {
  try {
   return await client(
    `${this.serverUrl}/products?${category}&${vendor}&${isActive}`,
    { data: null, type: null, headers: {} }
   );
  } catch (e) {
   throw e;
  }
 }

 async getAdminProducts(category = "", vendor = ""): Promise<IProduct> {
  try {
   return await client(
    `${this.serverUrl}/products/admin?${category}&${vendor}`,
    {
     data: null,
     type: null,
     headers: {},
    }
   );
  } catch (e) {
   throw e;
  }
 }

 async getBrands(params: any): Promise<IProduct> {
  try {
   return await client(`${this.serverUrl}/products/brands?${params}`, {
    data: null,
    type: null,
    headers: {},
   });
  } catch (e) {
   throw e;
  }
 }

 async deleteBrands(brandId: string): Promise<IProduct> {
  try {
   return await client(`${this.serverUrl}/products/brand/delete`, {
    data: { brandId },
    type: null,
    headers: {},
   });
  } catch (e) {
   throw e;
  }
 }

 async updateBrand(data: any): Promise<IProduct> {
  try {
   return await client(`${this.serverUrl}/products/brand/update`, {
    data: { ...data },
    type: null,
    headers: {},
   });
  } catch (e) {
   throw e;
  }
 }

 async getCategories(): Promise<IProduct> {
  try {
   return await client(`${this.serverUrl}/category`, {
    data: null,
    type: null,
    headers: {},
   });
  } catch (e) {
   throw e;
  }
 }

 async uploadCategoryCsv(formData: any): Promise<IProduct> {
  try {
   const response = await client(`${this.serverUrl}/category/upload`, {
    data: formData,
    type: true,
    headers: {},
   });
   if (!response) throw new Error("Cannot login");
   return response;
  } catch (e) {
   throw e;
  }
 }

 async uploadBrandCsv(formData: any): Promise<IProduct> {
  try {
   const response = await client(`${this.serverUrl}/products/brand/upload`, {
    data: formData,
    type: true,
    headers: {},
   });
   if (!response) throw new Error("Cannot login");
   return response;
  } catch (e) {
   throw e;
  }
 }

 async searchProducts(searchTerm: any): Promise<IProduct> {
  try {
   let search = {
    searchTerm,
    query: {
     limit: 20,
    },
    type: "products",
   };
   return await client(`${this.serverUrl}/search`, {
    data: search,
    type: null,
    headers: {},
   });
  } catch (e) {
   throw e;
  }
 }

 async chaneProductStatus(product: any): Promise<IProduct> {
  try {
   return await client(`${this.serverUrl}/products/update`, {
    data: { ...product },
    type: null,
    headers: {},
   });
  } catch (e) {
   throw e;
  }
 }

 async deleteCategory(categoryId: string): Promise<IProduct> {
  try {
   return await client(`${this.serverUrl}/category/remove`, {
    data: { categoryId },
    type: null,
    headers: {},
   });
  } catch (e) {
   throw e;
  }
 }

 async getVariants(params: any): Promise<IProduct> {
  try {
   return await client(`${this.serverUrl}/products/variants?${params}`, {
    data: null,
    type: null,
    headers: {},
   });
  } catch (e) {
   throw e;
  }
 }

 async uploadVariantCsv(formData: any): Promise<IProduct> {
  try {
   const response = await client(`${this.serverUrl}/products/variants/upload`, {
    data: formData,
    type: true,
    headers: {},
   });
   if (!response) throw new Error("Cannot login");
   return response;
  } catch (e) {
   throw e;
  }
 }

 async deleteVariant(variantId: string): Promise<IProduct> {
  try {
   return await client(`${this.serverUrl}/products//variant/delete`, {
    data: { variantId },
    type: null,
    headers: {},
   });
  } catch (e) {
   throw e;
  }
 }

 async updateCategory(data: any): Promise<IProduct> {
  try {
   return await client(`${this.serverUrl}/products/variant/update`, {
    data: { ...data },
    type: null,
    headers: {},
   });
  } catch (e) {
   throw e;
  }
 }
 async uploadProductCsv(formData: any): Promise<IProduct> {
  try {
   const response = await client(`${this.serverUrl}/products/upload`, {
    data: formData,
    type: true,
    headers: {},
   });
   if (!response) throw new Error("Cannot login");
   return response;
  } catch (e) {
   throw e;
  }
 }
}

export default new ProductService();
