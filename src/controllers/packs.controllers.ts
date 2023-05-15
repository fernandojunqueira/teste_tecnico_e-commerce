import { Response , Request } from "express"
import { db } from "../db"

export const getPacks = async (req:Request,res: Response) => {
  const packs = "SELECT * FROM packs;"

  db.query(packs, (err, data) => {
    if(err) return res.json(err)

    return res.status(200).json(data)
  })
}