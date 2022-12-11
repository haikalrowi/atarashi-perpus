// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import dbPerpusOpen from "../../../../public/databases/dbPerpusOpen";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        let db = await dbPerpusOpen()
        let result = await db.all(`SELECT * FROM deskripsi WHERE judul_buku LIKE '%${req.query.name}%';`)
        res.status(200).json(result)
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