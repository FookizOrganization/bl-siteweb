"use client"

import React, {useCallback} from "react";
import Zoom from "react-medium-image-zoom";

import styles from "./embla.module.css";
import {Image} from "antd";
import {NextButton, PrevButton, usePrevNextButtons} from "@/components/carousel/EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import {EmblaCarouselType} from "embla-carousel";
import {useDotButton} from "@/components/carousel/EmblaCarouselDotButton";

interface ModalCarouselProps {
    contentModal: any;
    setContentModal: any;
}

const ModalCarousel: React.FC<ModalCarouselProps> = (props) => {

    const { contentModal, setContentModal } = props
    const [emblaRef, emblaApi] = useEmblaCarousel({
        dragFree: true,
        direction: 'rtl',
        loop: true
    })

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
        <div className={styles.backgroundModal} onClick={() => setContentModal(null)}>
            <div
                className={styles.pictureModal}
                onClick={(event) => event.stopPropagation()}
            >
                <div className={styles.closeIcon} onClick={() => setContentModal(null)}>
                    <svg width="24px" height="24px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 21.32L21 3.32001" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 3.32001L21 21.32" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <section className={styles.emblaModal} dir="rtl">
                    <div className={styles.embla__viewport} ref={emblaRef}>
                        <div className={styles.embla__container}>
                            {contentModal.photos.map((value: string, index: number) => (
                                <div className={`${styles.embla__slide} ${index === selectedIndex ? styles.slide_active : ''}`} key={index}>
                                    <div
                                        className={styles.embla__slide__number}
                                    >
                                        <Image src={value} key={index} style={{
                                            aspectRatio: 1,
                                            objectFit: 'cover',
                                        }} />
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
                </section>
                <div className={styles.informationsModal}>
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
    );
};

export default ModalCarousel;