import React from "react"
import Logo from "@/components/Logo"
import NextLink from "next/link"
import { Link } from "react-scroll"
import { Button } from "@nextui-org/button"

const Navbar = () => {
  return (
    <div className="h-12 border-b fixed w-full bg-white z-50">
      <div className="h-full container mx-auto flex items-center justify-between px-4 md:px-0">
        <div className="flex space-x-5">
          <Logo />
          <div className="space-x-5 hidden md:block">
            <Link
              to="home"
              spy={true}
              smooth={true}
              isDynamic={true}
              activeClass="text-green-500"
              className="cursor-pointer"
            >
              Home
            </Link>
            <Link
              to="feature"
              spy={true}
              smooth={true}
              offset={-40}
              isDynamic={true}
              activeClass="text-green-500"
              className="cursor-pointer"
            >
              Feature
            </Link>
            <Link
              to="pricing"
              spy={true}
              smooth={true}
              isDynamic={true}
              activeClass="text-green-500"
              className="cursor-pointer"
            >
              Pricing
            </Link>
          </div>
        </div>
        <NextLink href="/tasks">
          <Button
            size="md"
            className="bg-black text-white "
            disableRipple={true}
          >
            Let&apos;s try
          </Button>
        </NextLink>
      </div>
    </div>
  )
}

export default Navbar
