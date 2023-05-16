import { Response , Request } from "express"
import { db } from "../db"
import multer from "multer"
import { Readable } from "stream"
import readline from "readline"

interface IProduct {
  name: string
  sales_price: string
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

  const file = req.file?.buffer

  const readableFile = new Readable()
  readableFile.push(file)
  readableFile.push(null)

  const productsLine = readline.createInterface({
    input: readableFile
  })

  const products:any[] = []

  for await( let line of productsLine) {
    const productLine = line.split(",")

    products.push({
      product_code: productLine[0],
      new_price: productLine[1]
    })
  }

  const header = products.shift()

  
  const array:any[] = []
  
  console.log(array, "1")
  
    for ( let product of products){
      const productInDataBase =
      `SELECT name,sales_price FROM products
        WHERE code = 16;`
  
        db.query(productInDataBase, (err: any, data: IProduct[]) => {
          if(err) return res.json(err)
          console.log(data[0],"2")
          array.push(data[0])
        })
    }

    console.log( array, "4")



  return res.json(products)
}