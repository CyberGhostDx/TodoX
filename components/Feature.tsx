import React, { useState, useCallback, useEffect } from "react"
import { Element } from "react-scroll"
import ShowFeature from "@/components/ShowFeature"
import featureLists from "@/libs/features"

const Feature = () => {
  const [featureIndex, setFeatureIndex] = useState<number | null>(null)

  const onScroll = useCallback(() => {
    const numOfFeatures = featureLists.length
    const { scrollY } = window
    const featureEl = document.querySelector<HTMLElement>("#feature")
    const featureSectionEl =
      document.querySelector<HTMLElement>("#featureSection")
    if (!featureEl || !featureSectionEl) return
    const progress = scrollY - featureSectionEl.offsetTop - 136
    const featureElHeight = featureEl.offsetHeight
    const featureSectionElHeight = featureSectionEl.offsetHeight
    const heightPerFeature =
      (featureSectionElHeight - featureElHeight) / numOfFeatures
    const currentIndex = Math.floor(progress / heightPerFeature)
    if (featureIndex != currentIndex) setFeatureIndex(currentIndex)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <Element name="feature">
      <div id="featureSection" className="h-[300vh]">
        <div
          id="feature"
          className="h-[700px] flex flex-col items-center pt-20 space-y-10 sticky top-0"
        >
          <h1 className="text-4xl md:text-7xl font-bold">Features</h1>
          <div className="flex flex-col items-center">
            {featureLists.map((f, index) => (
              <ShowFeature
                {...f}
                key={f.title}
                index={index}
                currentIndex={featureIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </Element>
  )
}

export default Feature
