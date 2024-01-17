import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css'; // Import the CSS module
import Layout from '../components/layout';


export default function Home() {
    return (
        <Layout title="Home Page" description="Welcome to the Wordle App">
            <div className={styles.container}>
                <Head>
                    <title>Custom Wordle</title>
                    <meta name="description" content="Create and solve custom Wordle puzzles" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Welcome to Custom Wordle!
                    </h1>
                    <p className={styles.description}>
                        Create your own Wordle or try solving one.
                    </p>
                    <div className={styles.grid}>
                        <Link href="/create-wordle">
                            <h2>Create Wordle &rarr;</h2>
                            <p>Create a new custom Wordle puzzle.</p>
                        </Link>
                        <Link href="/solve-wordle">
                            <h2>Solve Wordle &rarr;</h2>
                            <p>Try solving an existing Wordle puzzle.</p>
                        </Link>
                    </div>
                </main>
            </div>
        </Layout>
    )
}
