// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import dbPerpusOpen from "../../../database/dbPerpusOpen";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        let db = await dbPerpusOpen()
        let result = await db.all(`SELECT deskripsi.gambar_buku, deskripsi.judul_buku, deskripsi.pengarang, deskripsi.jumlah_halaman, deskripsi.isbn FROM peminjaman_buku JOIN buku ON peminjaman_buku.kode_buku = buku.kode_buku JOIN deskripsi ON buku.isbn = deskripsi.isbn GROUP BY deskripsi.judul_buku ORDER BY COUNT(deskripsi.isbn) DESC;`)
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