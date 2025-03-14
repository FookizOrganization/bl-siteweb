"use client"
import React, {useCallback, useEffect} from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import styles from "./embla.module.css";
import { PictureWrapper } from "@/components/pictures/pictureWrapper";
import PhotoGrid from "@/components/pictures/modal";

type PropType = {
    slides: any[]
    options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])
    const [contentModal, setContentModal] = React.useState<any>(null);

    const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
        const autoplay = emblaApi?.plugins()?.autoplay
        if (!autoplay) return

        const resetOrStop =
            autoplay.options.stopOnInteraction === false
                ? autoplay.reset
                : autoplay.stop

        resetOrStop()
    }, [])

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
        emblaApi,
        onNavButtonClick
    )

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi, onNavButtonClick)

    return (
        <>
            <section className={styles.embla} dir="rtl">
                <div className={styles.embla__viewport} ref={emblaRef}>
                    <div className={styles.embla__container}>
                        {slides.map((value, index) => (
                            <div className={`${styles.embla__slide} ${index === selectedIndex ? styles.slide_active : ''}`} key={index}>
                                <div
                                    className={styles.embla__slide__number}
                                    onClick={() => {
                                        setContentModal(value)
                                    }}
                                >
                                   <PictureWrapper picture={value} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.embla__buttons}>
                        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                        <div />
                        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                    </div>
                </div>

                <div className={styles.embla__dots}>
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={`${styles.embla__dot} ${index === selectedIndex ? styles["embla__dot--selected"] : ''}`}
                        />
                    ))}
                </div>
            </section>
            {contentModal !== null &&
                <div className={styles.backgroundModal} onClick={() => setContentModal(null)}>
                    <div
                        className={styles.pictureModal}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className={styles.closeIcon} onClick={() => setContentModal(null)}>
                            <svg width="24px" height="24px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 21.32L21 3.32001" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M3 3.32001L21 21.32" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <PhotoGrid photos={contentModal.photos} />
                        <div className={styles.informations}>
                            <div className={styles.titleLocation}>
                                <div>
                                    <div className={styles.title}>{`${contentModal.title}`}</div>
                                    {contentModal.type && <div className={styles.type}>{contentModal.type}</div>}
                                </div>
                                <div className={styles.location}>{`📍 ${contentModal.location}`}</div>
                            </div>
                            <div className={styles.description}>
                                <ul >{(contentModal.description as string).split('--').map((line, index) => (
                                    <li key={index} className={styles.paragraph}>
                                        {line}
                                    </li>
                                ))}</ul>
                            </div>
                        </div>

                    </div>
                </div>
            }
        </>
    )
}

export default EmblaCarousel
