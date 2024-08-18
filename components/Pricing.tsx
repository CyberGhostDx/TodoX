import React from "react"
import { Element } from "react-scroll"
import { Button } from "@nextui-org/button"
import NextLink from "next/link"

const Pricing = () => {
  return (
    <Element name="pricing">
      <div className="max-w-4xl mx-auto h-screen flex flex-col items-center justify-center space-y-5">
        <h1 className="text-4xl md:text-7xl font-bold">Pricing</h1>
        <div className="text-center px-5">
          Experience the power of productivity at{" "}
          <span className="text-blue-500">no cost</span> with{" "}
          <span className="font-bold text-green-500">TodoX</span>. Our app is
          completely free, allowing you to manage your tasks, set reminders, and
          stay organized without spending a dime. Download{" "}
          <span className="font-bold text-green-500">TodoX</span> today and
          start achieving your goals effortlessly,{" "}
          <span className="text-blue-500">all for free!</span>{" "}
        </div>
        <NextLink href="/tasks">
          <Button className="bg-green-500 text-white ">Let&apos;s try</Button>
        </NextLink>
      </div>
    </Element>
  )
}

export default Pricing
