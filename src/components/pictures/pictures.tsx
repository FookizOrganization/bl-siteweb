"use client"
import React from 'react';
import styles from './pictures.module.css';
import {getPictures} from "@/components/pictures/getPictures";
import EmblaCarousel from "@/components/carousel/EmblaCarousel";

function Pictures() {
    const pictures = getPictures();

    return (
        <div className={styles.container}>
            <div className={styles.picturesContainer}>
                <div className={styles.title}>Nos Réalisations</div>
                <div className={styles.carouselContainer}>
                    <EmblaCarousel slides={Array.from(pictures)} options={{
                        dragFree: true,
                        direction: 'rtl',
                        loop: true
                    }} />
                </div>
            </div>
        </div>
    );
}

export default Pictures;