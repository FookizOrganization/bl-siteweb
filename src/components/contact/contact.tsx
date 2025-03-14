"use client";

import styles from "./contact.module.css";
import React, { useState } from "react";
import ProvisionDropdown from "@/components/contact/provisionDropdown";

function Contact() {


    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form data:", formData);
        setIsOpen(false);
        alert("Message envoyé !");
    };

    return (
        <div className={styles.container}>
            <button
                className={`${styles.btn} ${styles.validBtn}`}
                onClick={() => setIsOpen(true)}
            >
                Contactez-nous
            </button>

            {isOpen && (
                    <div
                        className={styles.backgroundModal}
                        onClick={() => setIsOpen(false)}
                    >
                        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.closeIcon} onClick={() => setIsOpen(false)}>
                                <svg width="24px" height="24px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 21.32L21 3.32001" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M3 3.32001L21 21.32" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <div className={styles.containerModal}>
                                <div className={styles.headerModal}>
                                    <div className={styles.titleModal}>Prise de contact</div>
                                </div>
                                <div className={styles.content}>
                                    <form onSubmit={handleSubmit}>
                                        <div className={styles.formGroupContainer}>
                                            <div className={styles.formGroup}>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Votre nom"
                                                    className={styles.input}
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Votre email"
                                                    className={styles.input}
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <input
                                                    type="phone"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Votre téléphone"
                                                    className={styles.input}
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.formGroupContainer}>
                                            <div className={styles.formGroup}>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Votre message"
                                                    className={styles.textarea}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                    <div className={styles.provisionContainer}>
                                        <ProvisionDropdown />
                                    </div>
                                </div>
                                <div className={styles.footer}>
                                    <button
                                        type="submit"
                                        className={`${styles.btnForm} ${styles.validBtn}`}
                                        onClick={handleSubmit}
                                    >
                                        Envoyer
                                    </button>
                                    <button
                                        className={`${styles.btnForm} ${styles.cancelBtn}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            )}
        </div>
    );
}

export default Contact;