import React from "react";
import Zoom from "react-medium-image-zoom";

import styles from "./modal.module.css";

interface PhotoGridProps {
    photos: string[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
    // Fonction pour décider de la classe CSS à appliquer en fonction du nombre de photos
    const getGridClass = (photoCount: number) => {
        if (photoCount === 1) return styles.gridOne;
        if (photoCount === 2) return styles.gridTwo;
        if (photoCount === 3) return styles.gridThree;
        if (photoCount === 4) return styles.gridFour;
        if (photoCount === 5) return styles.gridFive;
        if (photoCount === 6) return styles.gridSix;
        if (photoCount >= 7) return styles.gridSeven;
        return ""; // Cas par défaut
    };

    return (
        <div className={`${styles.photoGrid} ${getGridClass(photos.length)}`}>
            {photos.map((src, index) => (
                <div key={index} className={styles.photoContainer}>
                    <Zoom>
                        <img
                            src={src}
                            alt={`Photo ${index + 1}`}
                            className={styles.zoomedPhoto}
                        />
                    </Zoom>
                </div>
            ))}
        </div>
    );
};

export default PhotoGrid;