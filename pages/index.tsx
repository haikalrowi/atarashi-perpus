import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";

import rb from "../public/reading-book.png";
import styles from "../styles/index.module.scss";

export interface Buku {
  gambar_buku: string;
  judul_buku: string;
  pengarang: string;
  jumlah_halaman: number;
  isbn: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let res1 = await fetch(new URL(`http://${context.req.headers.host}/api/book/latest`))
  let json1 = await res1.json()
  let res2 = await fetch(new URL(`http://${context.req.headers.host}/api/book/popular`))
  let json2 = await res2.json()

  return {
    props: {
      buku_terbaru: json1,
      buku_terkenal: json2
    }
  }
}

export default function (
  props: {
    buku_terbaru: Buku[],
    buku_terkenal: Buku[]
  }
) {
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
            {props.buku_terbaru.map((v, i) => {
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
            {props.buku_terkenal.map((v, i) => {
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
