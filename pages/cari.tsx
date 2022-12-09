import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "../styles/index.module.scss";
import { Buku } from "./index";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { req, query } = context
  let res, json

  switch (query.berdasarkan) {
    case 'isbn':
      res = await fetch(`http://${req.headers.host}/api/book/isbn/${query.q}`)
      json = await res.json()
      break
    case 'nama':
      console.log(req, query)
  }

  return { props: { data: json } }
}

export default function (props: { data: Buku[] }) {
  let { query } = useRouter()

  return (
    <>
      <main>
        <div className={styles.book__shelf}>
          <h2>Hasil dari: {JSON.stringify(query)}</h2>
          <div className={styles.book__container}>
            {props.data?.map((v, i) => {
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
    </>
  )
}