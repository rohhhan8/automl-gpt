import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/components/auth-provider';
import { EmailJSProvider } from '@/components/emailjs-provider';
import { Toaster } from '@/components/ui/sonner';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AutoML Pro - AI-Powered Machine Learning Platform',
  description: 'Transform your data into intelligent models with natural language. No-code ML platform for everyone.',
  keywords: 'AutoML, Machine Learning, AI, No-Code, Data Science',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <EmailJSProvider>
            <AuthProvider>
              <div className="flex min-h-screen flex-col">
                <Navigation />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
              <Toaster />
            </AuthProvider>
          </EmailJSProvider>
        </ThemeProvider>

        {/* Suppress MetaMask detection errors from Bolt.new environment */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', function(e) {
                if (e.message && e.message.includes('MetaMask')) {
                  e.preventDefault();
                  return false;
                }
              });

              window.addEventListener('unhandledrejection', function(e) {
                if (e.reason && e.reason.message && e.reason.message.includes('MetaMask')) {
                  e.preventDefault();
                  return false;
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}