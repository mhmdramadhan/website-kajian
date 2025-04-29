import '../../public/css/theme.css';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}