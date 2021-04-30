import Head from 'next/head';
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle, { theme } from '../components/util/GlobalStyles';

// Layout Wrapper for all of our pages. Wraps sub-pages inside our header and footer.
const Layout = ( props ) => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Head>
                <title>{props.pageTitle ? `${props.pageTitle}` : "The SQL"}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />
            <main>
                {props.children}
            </main>
            <Footer />
        </ThemeProvider>
    )
};

export default Layout;