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

            <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-100">
                <h1 className="text-5xl font-bold text-gray-800 mb-6">
                    Welcome to Custom Wordle!
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Create your own Wordle or try solving one.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Link href="/create-wordle">
                        <h2 className="text-2xl font-bold mb-2">Create Wordle &rarr;</h2>
                        <p>Create a new custom Wordle puzzle.</p>
                    </Link>

                    <Link href="/solve-wordle">
                        <h2 className="text-2xl font-bold mb-2">Solve Wordle &rarr;</h2>
                        <p>Try solving an existing Wordle puzzle.</p>
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
