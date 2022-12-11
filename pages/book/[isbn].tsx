import { GetServerSideProps } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";

import styles from "../../styles/book.module.scss";

export interface Buku {
  isbn: string;
  judul_buku: string;
  gambar_buku: string;
  penerbit: string;
  jumlah_halaman: number;
  deskripsi: string;
  pengarang: string;
  created_at: Date;
  stok: number;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { query: context.query } }
}

export default function (props: { query: ParsedUrlQuery }) {
  let { query } = props
  let [data, setData] = useState<Buku[] | null>(null)

  useEffect(() => {
    fetch(`/api/book/isbn/${query.isbn}`)
      .then((res) => { return res.json() })
      .then((json) => { setData(json) })
  }, [])

  if (data == null) {
    return <>Loading...</>
  }

  return (
    <div className={styles.book}>
      <div className={styles.book__image}>
        <img src={data[0]?.gambar_buku} alt="" />
        <button>Pinjam</button>
        <button>
          <Link href={{ pathname: '/' }} style={{ display: 'block', width: '100%' }}>
            Kembali
          </Link>
        </button>
      </div>
      <div className={styles.book__rightPane}>
        <div className={styles.book__title}>{data[0]?.judul_buku}</div>
        <div className={styles.book__author}>Oleh: {data[0].pengarang}</div>
        <div className={styles.book__description}>{data[0].deskripsi}</div>
        <div className={styles.book__others}>
          <table>
            <tbody>
              <tr>
                <td>Penerbit</td>
                <td>{data[0].penerbit}</td>
              </tr>
              <tr>
                <td>Jumlah Halaman</td>
                <td>{data[0].jumlah_halaman}</td>
              </tr>
              <tr>
                <td>ISBN</td>
                <td>{data[0].isbn}</td>
              </tr>
              <tr>
                <td>Stok</td>
                <td>{data[0].stok}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}