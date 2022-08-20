import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
                <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
                {/* TODO: Enable this font in tailwind */}
                {/* <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;500;700&display=swap"
                    rel="stylesheet"
                /> */}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
