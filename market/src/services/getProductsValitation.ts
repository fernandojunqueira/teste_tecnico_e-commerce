import api from "./api"

export interface ResponseValidation {
  areAllItemCorrect: boolean;
  responseProducts: ProductsValidation[]
}

export interface ProductsValidation {
  code: string;
  name: string;
  old_price: string;
  new_price: string;
}

export async function getProductsValitation(file:any): Promise<ResponseValidation> {

  const formData = new FormData();
  formData.append('file', file);

    const {data} = await api.post<ResponseValidation>(`/products/validation`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })

    return data
}