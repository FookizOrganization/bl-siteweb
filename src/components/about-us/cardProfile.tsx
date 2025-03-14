import React from 'react';
import styles from './cardProfile.module.css';

type CardProfileProps = {
    name: string;
    job: string;
    phone: string;
    description: string;
    reverse?: boolean;
    url_photo: string;
}

function CardProfile({ name, job, phone, description, url_photo, reverse = false}: Readonly<CardProfileProps>) {
    return (
        <div
            className={`${styles.container} ${reverse ? styles.reverse : ''}`}
        >
            <div
                style={{ backgroundImage: `url('${url_photo}')` }}
                className={styles.photo_deco}
            />
            <div className={styles.div_info}>
                <div className={styles.details}>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.job}>{job}<span>{` ( ${phone} )` }</span></div>
                    <div className={styles.description}>
                        {description.split('\n').map((line, index) => (
                            <div key={index} className={styles.paragraph}>
                                {line}
                                <br />
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardProfile;