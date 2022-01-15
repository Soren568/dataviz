import Navbar from "./Navbar"
import Head from 'next/head'
const Layout = ({ children }) => {

    return (
        <>
            <Head>
                <title>DataViz</title>
                <meta name="description" content="Algorithm and data visualizer" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col h-screen">
                <Navbar />
                {children}
            </div>
        </>
    )
}

export default Layout
