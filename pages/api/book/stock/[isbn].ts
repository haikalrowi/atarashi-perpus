// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import dbPerpusOpen from "../../../../database/dbPerpusOpen";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        let db = await dbPerpusOpen()
        let result = await db.all(`SELECT COUNT(buku.isbn) AS stok FROM buku WHERE buku.isbn = ${req.query.isbn};`)
        res.status(200).json(result)
        db.close()
      }
      catch (ex) {
        res.status(500).end(JSON.stringify(ex))
        console.log(JSON.stringify(ex))
      }
      break
    default:
      res.status(405).end()
      break
  }
}