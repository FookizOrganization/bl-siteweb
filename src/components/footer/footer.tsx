import React from 'react';
import styles from './footer.module.css';
import Link from "next/link";
function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.copyright}>Copyright © 2025. Tous droits réservés B.L - Portes & Fenêtres</div>
            <div className={styles.dev}>
                <Link href="https://www.linkedin.com/in/quentin-lepateley/" passHref={true}>
                   Made by Quentin LEPATELEY
                </Link>
            </div>
        </div>
    );
}

export default Footer;