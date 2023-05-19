import api from "./api"

export interface Products{
    code: number;
    name: string;
    cost_price: string;
    sales_price: string;
}

export async function getProducts(): Promise<Products[]> {

    const {data} = await api.get<Products[]>(`/products`)

    return data
}