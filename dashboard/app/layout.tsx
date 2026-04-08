"use client"
import { Provider } from "react-redux";
import Header from "./components/layout/Nav";
import "./globals.css"
import { store } from "./store/store";
import { ApiContext } from "@/app/context/providers"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <Provider store={store} >
        <ApiContext>
          <body className=" bg-bg flex items-center justify-center ">
            <section className=" w-[90%]">
              <section className=" ">
                <Header />
                {children}
              </section>
            </section>
          </body>
        </ApiContext>
      </Provider>
    </html>
  );
}
