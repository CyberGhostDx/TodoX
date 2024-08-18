import React from "react"
import { Button } from "@nextui-org/button"
import NextLink from "next/link"
import Image from "next/image"
import AppExample from "@/public/images/example.png"
import { Element } from "react-scroll"

const Hero = () => {
  return (
    <Element name="home">
      <div className="w-full pt-32 flex flex-col justify-center items-center space-y-5">
        <h1 className="font-bold text-2xl md:font-normal md:text-5xl lg:text-7xl">
          Stay Organized, Stay Productive
        </h1>
        <div className="md:text-2xl lg:text-3xl text-center">
          <h1>Stay on top of your tasks and boost productivity </h1>
          <h1>
            effortlessly with <span className="text-green-500">TodoX.</span>
          </h1>
        </div>
        <NextLink href="/tasks">
          <Button className="bg-green-500 text-white ">Let&apos;s try</Button>
        </NextLink>
        <Image src={AppExample} alt="TodoX" priority={true} width="1000" />
      </div>
    </Element>
  )
}

export default Hero
