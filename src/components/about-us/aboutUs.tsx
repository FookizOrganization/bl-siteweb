"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./abousUs.module.css";
import CardProfile from "@/components/about-us/cardProfile";

function AboutUs() {
    // Animation settings
    const fadeInFromBottom = {
        hidden: { opacity: 0, y: 50 }, // État initial : invisible, décalé en bas
        visible: { opacity: 1, y: 0 }, // État final : visible, position d'origine
    };

    return (
        <div className={styles.container}>
            <div className={styles.cardContainer}>
                <motion.div
                    className={styles.primaryContainer}
                    initial="hidden"
                    whileInView="visible" // Animation déclenchée quand l'élément est visible
                    variants={fadeInFromBottom}
                    transition={{ duration: 0.6 }} // Durée de l'animation
                    viewport={{ once: true, amount: 0.2 }} // "once" : joue une seule fois | "amount": 20% visible
                >
                    <div className={styles.title}>Qui sommes-nous ?</div>
                    <div className={styles.description}>
                        {
                            "Dans un monde en constante évolution, il est essentiel de se démarquer et d'apporter de la valeur à nos clients."
                        }
                        <br />
                        <br />
                        {
                            "Imaginez des fenêtres qui laissent entrer la lumière tout en offrant une isolation thermique optimale," +
                            " des portails qui allient sécurité et élégance, ou encore des portes qui accueillent vos invités avec style. " +
                            "Chaque produit que nous proposons est conçu pour allier performance et design, garantissant ainsi un confort inégalé à votre domicile."
                        }
                        <br />
                        <br />
                        {"Faisons de votre projet une réalité ! "}
                    </div>
                </motion.div>
                <motion.div
                    initial="hidden"
                    whileInView="visible" // Animation déclenchée quand visible
                    variants={fadeInFromBottom}
                    transition={{ duration: 0.6, delay: 0.3 }} // Retard léger pour un effet séquentiel
                    viewport={{ once: true, amount: 0.2 }} // 20% visible déclenche l'animation
                >
                    <CardProfile
                        name={"Bastien Letouq"}
                        job={"Gérant / Artisan"}
                        phone={"07 81 73 83 30"}
                        url_photo={"/photos/profile.png"}
                        description={
                            "Hello, moi c’est Bastien ! \n " +
                            "J’ai fais une formation dans la menuiserie à Fontainebleau pendant 2 ans, et ensuite appris mon métier de fenêtrier, avec l’entreprise FMP OuvertureS durant 5 ans. J’ai pu acquérir l’ensembles des connaissances au niveau de la pose, en apprenant sur le terrain." +
                            " J’ai également appris à établir un contact avec les clients, faire les métrages, gérer, organiser et nettoyer mon chantier etc…" +
                            "" +
                            "\nFort de cette expérience, j’ai décidé de créer mon entreprise"
                        }
                    />
                </motion.div>
            </div>
        </div>
    );
}

export default AboutUs;