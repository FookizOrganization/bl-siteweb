import React from 'react';
import styles from '@/components/header/header.module.css';
import Contact from "@/components/contact/contact";
import Image from "next/image";
function Header() {
    return (
        <div className={styles.header}>
            <Image src="/logo.svg" alt="logo" width="121" height="44" />
            <Contact />
        </div>
    );
}

export default Header;