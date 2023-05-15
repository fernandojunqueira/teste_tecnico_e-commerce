import { Response , Request } from "express"
import { db } from "../db"

export const getPacks = async (req:Request,res: Response) => {
  const products = "SELECT * FROM packs;"

  db.query(products, (err, data) => {
    if(err) return res.json(err)

    return res.status(200).json(data)
  })
}