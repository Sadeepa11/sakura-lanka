import "./globals.css";
import { Noto_Sans_JP } from "next/font/google";
const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});
export const metadata = {
  title: "Sakura Lanka",
  description: "Vehicles, bikes, electronics — plus visa & job consulting.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="ja" className={noto.className}>
      {" "}
      <body className="bg-white text-[var(--text)]"> {children} </body>{" "}
    </html>
  );
}
