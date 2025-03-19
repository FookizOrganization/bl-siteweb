
import React from "react";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import styles from './pictureWrapper.module.css';

export function PictureWrapper(props: { picture: any }) {

    return (
        <div
            className={styles.pictureWrapper}
            style={{ backgroundImage: `url('${props.picture.photos.at(0)}')` }}
        >
            <div className={styles.informations}>
                    <div className={styles.titleLocation}>
                        <div>
                            <div className={styles.title}>{`${props.picture.title}`}</div>
                            {props.picture.type && <div className={styles.type}>{props.picture.type}</div>}
                        </div>
                        <div className={styles.location}>{`📍 ${props.picture.location}`}</div>
                    </div>
                </div>
        </div>
    );
}