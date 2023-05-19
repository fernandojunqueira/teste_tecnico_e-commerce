import { useEffect, useState } from "react"
import { ProductsValidation, getProductsValitation } from "../../services/getProductsValitation"

export interface Props {
    file: any
}

export const Modal = (props:Props) => {

    const {file} = props

    const [listProducts, setListProducts] = useState<ProductsValidation[] | undefined>([])

    useEffect(() => {
        (async () => {
            const data = await getProductsValitation(file)
            console.log(data)
            setListProducts(data.responseProducts)
           })()
    }, [])
    return (
        <h2>Modal</h2>
    )
}