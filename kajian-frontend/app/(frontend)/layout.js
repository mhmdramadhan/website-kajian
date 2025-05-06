import Script from 'next/script';
import '../../public/css/theme.css';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <main className="main" id="top">
                    {children}
                </main>
                <Script src='/js/theme.js' strategy="beforeInteractive" />
                <Script src='/js/bootstrap.min.js' strategy="beforeInteractive" />
            </body>
        </html>
    );
}