"use client"
import React from 'react';
import styles from './homeContent.module.css';
import {motion, useMotionValueEvent, useScroll, useTransform} from "framer-motion";


function HomeContent() {

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        console.log("Page scroll: ", latest)
    })

    const radius = useTransform(scrollY, [0, 400], [0, 30]);

    return (
        <motion.div
            style={{
                margin: radius,
                height: "100%"
            }}
        >
            <motion.div
                style={{
                    borderRadius: radius,
                }}
                className={styles.container}
            >
                <div className={styles.textContainer}>
                    <div className={styles.maskeffect}>
                        <div className={styles.title}>
                            B<span>.</span>L
                        </div>
                        <div className={styles.subtitle}>
                            Portes & Fenêtres
                        </div>
                        <div className={styles.smallSubtitle}>
                            Fourniture - Pose
                        </div>
                        <div className={styles.description}>
                            <div>
                                {"portail - cloture - portillon - fenêtres"}
                            </div>
                            <div>
                                {"porte de garage - porte d'entrée - store banne"}
                            </div>
                            <div>
                                {"volet roulant - volet battant - motorisation"}
                            </div>
                        </div>
                        <div className={styles.dataContainer}>
                            <div>
                                <div className={styles.dataTitle}>{"Année d'expérience"}</div>
                                <div className={styles.dataValue}>{"10"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default HomeContent;