import { GetServerSideProps } from "next";
import Link from "next/link";

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
  let { req, query, params } = context
  let res = await fetch(`http://${req.headers.host}/api/book/isbn/${query && query.isbn}`)
  let json = await res.json()

  return {
    props: {
      data: json
    }
  }
}

export default function (props: { data: Buku[] }) {
  return (
    <div className={styles.book}>
      <div className={styles.book__image}>
        <img src={props.data[0]?.gambar_buku} alt="" />
        <button>Pinjam</button>
        <button>
          <Link href={{ pathname: '/' }} style={{ display: 'block', width: '100%' }}>
            Kembali
          </Link>
        </button>
      </div>
      <div className={styles.book__rightPane}>
        <div className={styles.book__title}>{props.data[0]?.judul_buku}</div>
        <div className={styles.book__author}>Oleh: {props.data[0].pengarang}</div>
        <div className={styles.book__description}>{props.data[0].deskripsi}</div>
        <div className={styles.book__others}>
          <table>
            <tbody>
              <tr>
                <td>Penerbit</td>
                <td>{props.data[0].penerbit}</td>
              </tr>
              <tr>
                <td>Jumlah Halaman</td>
                <td>{props.data[0].jumlah_halaman}</td>
              </tr>
              <tr>
                <td>ISBN</td>
                <td>{props.data[0].isbn}</td>
              </tr>
              <tr>
                <td>Stok</td>
                <td>{props.data[0].stok}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}