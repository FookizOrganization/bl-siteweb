import React from 'react';
import styles from './homeContent.module.css';

function HomeContent() {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <div className={styles.title}>
                    B<span>.</span>L
                </div>
                <div className={styles.subtitle}>
                    Portes & Fenêtres
                </div>
                <div className={styles.smallSubtitle}>
                    Fourniture - Pose
                </div>
                <div className={styles.dataContainer}>
                    <div>
                        <div className={styles.dataTitle}>{"Année d'expérience"}</div>
                        <div className={styles.dataValue}>{"10"}</div>
                    </div>
                    <div>
                        <div className={styles.dataTitle}>{"Projects réalisés"}</div>
                        <div className={styles.dataValue}>{"99+"}</div>
                    </div>
                </div>
                <div className={styles.description}>
                    <div>{"portail - cloture - portillon - fenêtres"}</div>
                    <div>{"porte de garage - porte d'entrée - store banne"}</div>
                    <div>{"volet roulant - volet battant - motorisation"}</div>
                </div>
            </div>
        </div>
    );
}

export default HomeContent;