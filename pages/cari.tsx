import { GetServerSideProps } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";

import styles from "../styles/index.module.scss";
import { Buku } from "./index";

export let getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { query: context.query } }
}

export default function (props: { query: ParsedUrlQuery }) {
  let { query } = props
  let [data, setData] = useState<Buku[] | null>(null)

  useEffect(() => {
    switch (query.berdasarkan) {
      case 'isbn':
        fetch(`/api/book/isbn/${query.q}`)
          .then((res) => { return res.json() })
          .then((json) => { setData(json) })
        break
      case 'nama':
        console.log
        break
      default:
        break
    }
  }, [])

  if (data == null) {
    return <>Loading...</>
  }

  return (
    <main>
      <div className={styles.book__shelf}>
        <h2>Hasil dari: {JSON.stringify(query)}</h2>
        <div className={styles.book__container}>
          {data.map((v, i) => {
            return <div className={styles.book__item} key={i}>
              <Link href={{ pathname: `/book/${v?.isbn}` }}>
                <div className={styles.book__image}><img src={v?.gambar_buku} alt="next" /></div>
                <div className={styles.book__title}>{v?.judul_buku}</div>
                <div className={styles.book__author}>Oleh: {v?.pengarang}</div>
                <div className={styles.book__pageCount}>{v?.jumlah_halaman} Halaman</div>
              </Link>
            </div>
          })}
        </div>
      </div>
    </main>
  )
}