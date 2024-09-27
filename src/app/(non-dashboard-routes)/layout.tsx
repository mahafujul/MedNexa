import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="md:px-20">
        {/* Header */}
        <Header></Header>
        <div>{children}</div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
