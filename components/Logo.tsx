import React from "react"
import LogoSVG from "@/public/images/X.svg"
import Image from "next/image"

const Logo = () => {
  return (
    <div className="flex font-bold">
      <div>Todo</div>
      <Image src={LogoSVG} alt="Logo" />
    </div>
  )
}

export default Logo
