"use client";

import styles from "./contact.module.css"
import React, { useState } from 'react';

function Contact() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.container}>
            <button className={styles.btn} onClick={() => setIsOpen(true)}>Contactez-moi</button>

            {isOpen && (
                <div className={styles.modal}>
                    modal
                </div>
            )}
        </div>
    );
}

export default Contact;