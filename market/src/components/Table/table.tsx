import { useEffect, useState } from "react"
import { Products, getProfile } from "../../services/getProducts"

export const TableRead = () => {
    const [products, setProducts] = useState<Products[] | undefined>([])

    useEffect(() => {
        (async () => {
         const data = await getProfile()
         setProducts(data)
        })()
    })

    return (
    <table className="border-separate border-spacing-x-1 p-5 m-5 table-fixed">
      <thead>
        <tr>
          <th className="border border-slate-300 p-2.5">Item</th>
          <th className="border border-slate-300 p-2.5">Preço</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product) => {
            return (
            <tr key={product.code}>
              <td className="border border-slate-300 p-2.5">{product.name}</td>
              <td className="border border-slate-300 p-2.5">{product.sales_price}</td>
            </tr>
            )
        })}

      </tbody>
    </table>
    )
}