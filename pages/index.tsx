import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import rb from "../public/reading-book.png";
import styles from "../styles/index.module.scss";

export interface Buku {
  gambar_buku: string;
  judul_buku: string;
  pengarang: string;
  jumlah_halaman: number;
  isbn: string;
}

export default function () {
  let [data1, setData1] = useState<Buku[] | null>(null)
  let [data2, setData2] = useState<Buku[] | null>(null)

  useEffect(() => {
    fetch('/api/book/latest')
      .then((res) => { return res.json() })
      .then((json) => { setData1(json) })
    fetch('/api/book/popular')
      .then((res) => { return res.json() })
      .then((json) => { setData2(json) })
  }, [])

  if (data1 == null || data2 == null) {
    return <>Loading...</>
  }

  return (
    <>
      <nav className={styles.nav__container}>
        <Link href={{ pathname: '/' }} className={styles.nav__head}>Perpustakaan STIKOM</Link>
        <form action="/cari" method="get">
          <input type="search" name='q' id="q" placeholder='Cari' />
          <select name="berdasarkan" id="berdasarkan">
            <option value="nama">Nama</option>
            <option value="isbn">ISBN</option>
          </select>
          <button type="submit">Cari</button>
        </form>
        <a href="/login" className={styles.nav__login}>Login</a>
      </nav>
      <header className={styles.banner}>
        <div className={styles.banner__text}>
          <h1>Baca Buku Di Manapun</h1>
          <div style={{ fontSize: 'large', color: 'gray' }}>Nikmati harimu dengan membaca buku</div>
          <button>Ayo mulai</button>
        </div>
        <div className={styles.banner__image}><Image src={rb} alt='person holding book' /></div>
      </header>
      <main>
        <div className={styles.book__shelf}>
          <h2>Buku Terbaru</h2>
          <div className={styles.book__container}>
            {data1.map((v, i) => {
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
        <div className={styles.book__shelf}>
          <h2>Paling sering dipinjam</h2>
          <div className={styles.book__container}>
            {data2.map((v, i) => {
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
        <div className={styles.book__shelf}>
          <h2>Daftar Buku</h2>
          <div className={styles.book__container}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v, i) => {
              return <div className={styles.book__item} key={i}>
                <Link href={{ pathname: '/' }}>
                  <div className={styles.book__image}><img src="/vercel.svg" alt="vercel" /></div>
                  <div className={styles.book__title}>Title</div>
                  <div className={styles.book__author}>Author</div>
                  <div className={styles.book__pageCount}>Page Count</div>
                </Link>
              </div>
            })}
          </div>
        </div>
      </main>
    </>
  )
}
