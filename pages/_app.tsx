import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="var(--light-red)" />
        <meta
          name="description"
          content="Struggling with your local newspaper Sudoku puzzles? Solve them fast with this simple 9x9 Sudoku puzzle solver."
        />
        <title>Sudoku Puzzle Solver</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
