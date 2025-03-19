"use client"
import React, {useCallback} from 'react'
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
import {Image} from "antd";
import ModalCarousel from "@/components/carousel/modal";

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
                <ModalCarousel contentModal={contentModal} setContentModal={setContentModal} />
            }
        </>
    )
}

export default EmblaCarousel
