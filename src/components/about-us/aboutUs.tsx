"use client"
import React from 'react';
import styles from './abousUs.module.css';
import CardProfile from "@/components/about-us/cardProfile";

function AboutUs() {


    return (
        <div className={styles.container}>
            <div className={styles.cardContainer} >
                <div className={styles.primaryContainer}>
                    <div
                        className={styles.title}
                    >Qui sommes-nous ?</div>
                    <div className={styles.description} >
                        {'Dans un monde en constante évolution, il est essentiel de se démarquer et d\'apporter de la valeur à nos clients.'}
                        <br />
                        <br />
                        {'Imaginez des fenêtres qui laissent entrer la lumière tout en offrant une isolation thermique optimale,' +
                            ' des portails qui allient sécurité et élégance, ou encore des portes qui accueillent vos invités avec style. ' +
                            'Chaque produit que nous proposons est conçu pour allier performance et design, garantissant ainsi un confort inégalé à votre domicile.'}
                        <br />
                        <br />
                        {'Faisons de votre projet une réalité ! '}
                    </div>
                </div>
                <CardProfile name={'Bastien Letouq'}
                             job={'Gérant / Artisan'}
                             phone={"07 81 73 83 30"}
                             url_photo={'/photos/profile.png'}
                             description={'Hello, moi c’est Bastien ! \n ' +
                                 'J’ai fais une formation dans la menuiserie à Fontainebleau pendant 2 ans, et ensuite appris mon métier de fenêtrier, avec l’entreprise FMP OuvertureS durant 5 ans. J’ai pu acquérir l’ensembles des connaissances au niveau de la pose, en apprenant sur le terrain.' +
                                 ' J’ai également appris à établir un contact avec les clients, faire les métrages, gérer, organiser et nettoyer mon chantier etc…' +
                                 '' +
                                 '\nFort de cette expérience, j’ai décidé de créer mon entreprise'}
                />
                <CardProfile name={'Quentin MONTEIRO'}
                             job={'Technico-commercial'}
                             phone={"07 81 73 83 30"}
                             reverse={true}
                             url_photo={'/photos/profile.png'}
                             description={'Bonjour, je m’appelle Quentin, commercial spécialisé et aujourd’hui je souhaite vous partager comment on peut répondre à vos besoins spécifiques pour transformer vos projets d’aménagement et d’amélioration de votre habitat. \n' +
                                 'Mon rôle est de vous accompagner dans vos choix de solutions esthétiques et fonctionnelles.\n' +
                                 'Ensemble, nous allons créer un espace qui vous ressemble et qui répond à vos attentes en matière de qualité, de sécurité et d’esthétique, qui s’harmonise avec votre style de vie et votre budget.'}
                />
            </div>
        </div>
    );
}

export default AboutUs;