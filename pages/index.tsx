import React from "react"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Feature from "@/components/Feature"
import Pricing from "@/components/Pricing"
import { GetServerSideProps } from "next"
import { getCookie } from "cookies-next"

const Home = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Hero />
      <Feature />
      <Pricing />
    </React.Fragment>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tasks = getCookie("tasks", context)
  if (tasks)
    return {
      redirect: {
        destination: "/tasks",
        permanent: false,
      },
    }
  return { props: {} }
}
