import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import "../styles/globals.css";

export default function Home() {
    return (
        <Layout title="Home Page" description="Welcome to the Wordle App">
            <Head>
                <title>Custom Wordle</title>
                <meta name="description" content="Create and solve custom Wordle puzzles" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-background">
                <h1 className="text-5xl font-bold text-primary mb-6">
                    Welcome to Custom Wordle!
                </h1>
                <p className="text-xl text-copy mb-8">
                    Create your own Wordle or try solving one.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Link href="/create-wordle" className="text-2xl font-bold text-primary-dark hover:text-primary-light mb-2">
                        Create Wordle &rarr;
                    </Link>
                    <p>Create a new custom Wordle puzzle.</p>

                    <Link href="/solve-wordle" className="text-2xl font-bold text-secondary-dark hover:text-secondary-light mb-2">
                        Solve Wordle &rarr;
                    </Link>
                    <p>Try solving an existing Wordle puzzle.</p>
                </div>
            </div>
        </Layout>
    );
}
