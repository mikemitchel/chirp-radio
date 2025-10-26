// HeroCarousel.tsx
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import CrCard from '../stories/CrCard'
import './HeroCarousel.css'

interface HeroCarouselProps {
  slides?: Array<{
    backgroundImage: string
    imageCaption?: string
    preheader?: string
    title: string
    dateTime?: string
    venue?: string
    ageRestriction?: string
    contentSummary?: string
    bannerButtonText?: string
    shareButtonText?: string
    slug?: string
  }>
  autoplay?: boolean
  autoplayDelay?: number
}

export default function HeroCarousel({
  slides = [],
  autoplay = true,
  autoplayDelay = 8000,
}: HeroCarouselProps) {
  const navigate = useNavigate()
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    autoplay ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: true })] : []
  )
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="hero-carousel">
      <div className="hero-carousel__viewport" ref={emblaRef}>
        <div className="hero-carousel__container">
          {slides.map((slide, index) => (
            <div
              className={`hero-carousel__slide ${index === selectedIndex ? 'hero-carousel__slide--active' : ''}`}
              key={index}
              style={{ '--carousel-duration': `${autoplayDelay}ms` } as React.CSSProperties}
            >
              <CrCard
                variant="default"
                bannerHeight="tall"
                textLayout="stacked"
                backgroundImage={slide.backgroundImage}
                imageCaption={slide.imageCaption}
                preheader={slide.preheader}
                title={slide.title}
                dateTime={slide.dateTime}
                venue={slide.venue}
                ageRestriction={slide.ageRestriction}
                contentSummary={slide.contentSummary}
                bannerButtonText={slide.bannerButtonText}
                shareButtonText={slide.shareButtonText}
                onClick={() => slide.slug && navigate(`/events/${slide.slug}`)}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className="hero-carousel__button hero-carousel__button--prev"
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <button
        className="hero-carousel__button hero-carousel__button--next"
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <div className="hero-carousel__dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-carousel__dot ${index === selectedIndex ? 'hero-carousel__dot--active' : ''}`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
