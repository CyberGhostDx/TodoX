import React from "react"
import NextHead from "next/head"
import { NextUIProvider } from "@nextui-org/system"
import StoreProvider from "@/components/StoreProvider"
import "@/styles/globals.css"
import { AppProps } from "next/app"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <React.Fragment>
      <Head />
      <NextUIProvider>
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </NextUIProvider>
    </React.Fragment>
  )
}

const Head = () => {
  return (
    <NextHead>
      <title>TodoX</title>
    </NextHead>
  )
}

export default App
