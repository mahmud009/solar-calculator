import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { Box } from "@material-ui/core";
import Calculator from "module/Calculator";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>SOLAR CALCULATOR</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <main className={styles.main}>
        <Calculator />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
