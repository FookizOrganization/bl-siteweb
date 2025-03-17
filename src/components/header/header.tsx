import React from 'react';
import styles from '@/components/header/header.module.css';
import Contact from "@/components/contact/contact";
import Image from "next/image";
function Header() {
    return (
        <div className={styles.header}>
            <Image src="/logo.svg" alt="logo" width="121" height="44" />
            <div className={styles.title}>
                B.L - Portes & Fenêtres
            </div>
            <div className={styles.rightContainer}>
                <div className={styles.numberPhone}>
                    <div>Bastien - 07.81.73.83.30</div>
                    <div>Quentin - 07.67.71.10.46</div>
                </div>
                <Contact />
            </div>
        </div>
    );
}

export default Header;