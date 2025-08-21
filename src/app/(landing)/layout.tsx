import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Navbar />
        {children}
        <Footer />
    </div>
  );
}