import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'FPLBall',
  description: 'Enhanced FPL statistics',
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
