import { Response , Request } from "express"
import { db } from "../db"
import multer from "multer"
import { Readable } from "stream"
import readline from "readline"

interface IProduct {
  name: string
  sales_price: string
  cost_price: string
}

interface IFile {
  product_code: string
  new_price: string
}

interface IProductResponse {
  code: string
  name: string
  old_price: string
  new_price: string
}

const multerConfig = multer()

export const getProducts = async (req:Request, res: Response) => {
  const products = "SELECT * FROM products;"

  db.query(products, (err, data) => {
    if(err) return res.json(err)

    return res.status(200).json(data)
  })
}

export const dataValidation = async (req:Request, res: Response) => {

  const file: Buffer | undefined = req.file?.buffer

  const readableFile: Readable = new Readable()
  readableFile.push(file)
  readableFile.push(null)

  const productsLine: readline.Interface = readline.createInterface({
    input: readableFile
  })

  const products: IFile[] = []

  for await( let line of productsLine) {
    const productLine: string[] = line.split(",")

    products.push({
      product_code: productLine[0],
      new_price: productLine[1]
    })
  }

  const header: IFile | undefined = products.shift()

  const conditional = header?.product_code !== "product_code" || header?.new_price !== "new_price"

  if (conditional) {
    return res.status(400).json({"message": " header missing product_code or new_price"})
  }

  const responseProducts: IProductResponse[] = []
  let areAllItemCorrect:boolean = true

  const queries = products.map( (product) => {
    return new Promise<void>((resolve,reject) => {
      const object: IProductResponse = {
        code: "",
        name: "",
        old_price: "",
        new_price: ""
      }

      const productInDataBase = `SELECT name, sales_price, cost_price FROM products WHERE code = ${product.product_code};`

      db.query(productInDataBase, (err: any, data: IProduct[]) => {
        if (err) reject(err)
        if (data[0]) {
          object.code = product.product_code
          object.name = data[0].name
          object.old_price = data[0].sales_price

          if ( +product.new_price < +data[0].cost_price ){

            object.new_price = product.new_price + " -" + " New price less than cost price"
            areAllItemCorrect = false

          }

          if (Math.abs( +product.new_price - +data[0].sales_price) < +data[0].sales_price * 0.1) {

            object.new_price = product.new_price

          }else {
            areAllItemCorrect = false

            object.new_price.includes("New price")
            ?
            object.new_price = object.new_price + "/" + "The difference between the new value and the sale value exceeds 10%"
            :
            object.new_price = product.new_price + " -" + " The difference between the new value and the sale value exceeds 10%"
          }

          responseProducts.push(object)
        }
        resolve()
      })
    })
  })

  try {
    await Promise.all(queries)
    return res.json({areAllItemCorrect, responseProducts})
  } catch (error) {
    return res.json(error)
  }

}