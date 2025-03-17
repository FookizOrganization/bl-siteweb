"use client"
import React from 'react';
import { Carousel, Image } from 'antd';


interface PhotoGridProps {
    photos: string[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
    return (
            <Carousel className="photoGrid"
                      autoplay={{ dotDuration: true }}
                      autoplaySpeed={4000}
                      arrows
                      infinite
            >
                {photos.map((src, index) => (
                        <Image src={src} key={index} style={{
                            width: '100%',
                            aspectRatio: 1,// L'image remplit le conteneur horizontalement
                            objectFit: 'cover', // Assure qu'elle ne soit pas déformée
                        }}

                        />
                ))}
            </Carousel>
    );
};

export default PhotoGrid;