import { GetServerSideProps } from "next";
import Link from "next/link";

import styles from "../styles/index.module.scss";

export interface Buku {
  gambar_buku: string;
  judul_buku: string;
  pengarang: string;
  jumlah_halaman: number;
  isbn: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let res = await fetch(new URL(`http://${context.req.headers.host}/api/book/latest`))
  let json = await res.json()

  return { props: { data: json } }
}

export default function (props: { data: Buku[] }) {
  return (
    <>
      <nav className={styles.nav__container}>
        <Link href={{ pathname: '/' }}>Perpustakaan STIKOM</Link>
        <form action="/cari" method="get">
          <input type="search" name='q' id="q" placeholder='Cari' />
          <select name="berdasarkan" id="berdasarkan">
            <option value="nama">Nama</option>
            <option value="isbn">ISBN</option>
          </select>
          <button type="submit">Cari</button>
        </form>
        <Link href={{ pathname: '/' }}>Login</Link>
      </nav>
      <header className={styles.banner}>
        <div className={styles.banner__text}>
          <h1>Baca Buku Di Manapun</h1>
          <div>Nikmati harimu dengan membaca buku</div>
          <button>Ayo mulai</button>
        </div>
        <div className={styles.banner__image}><img src="/vercel.svg" alt="" /></div>
      </header>
      <main>
        <div className={styles.book__shelf}>
          <h2>Buku Terbaru</h2>
          <div className={styles.book__container}>
            {props.data.map((v, i) => {
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
          <h2>Buku Populer</h2>
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
        <div className={styles.book__shelf}>
          <h2>Buku Populer</h2>
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
