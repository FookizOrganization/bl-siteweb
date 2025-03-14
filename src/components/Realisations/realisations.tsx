"use client"
import React, {useState} from 'react';
import './realisations.css';
import { getPictures } from "@/components/pictures/getPictures";
import { Carousel, Modal } from "antd";
import { PictureWrapper } from "@/components/pictures/pictureWrapper";
import PhotoGrid from "@/components/pictures/modal";

function Realisations() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPicture, setSelectedPicture] = useState<any>(null);
    const pictures = getPictures();

    const showModal = (picture: any) => {
        console.log(picture)
        setSelectedPicture(picture);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedPicture(null);
    };

    return (
        <div className="RealisationsContainer">
            {isModalOpen && <Modal
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width={"95vw"}
            >
                <div>
                    <PhotoGrid photos={selectedPicture.photos}/>
                </div>
                <div className="informationsModal">
                    <div className="titleLocation">
                        <div>
                            <div className="title">{`${selectedPicture.title}`}</div>
                            {selectedPicture.type && <div className="type">{selectedPicture.type}</div>}
                        </div>
                        <div className="location">{`📍 ${selectedPicture.location}`}</div>
                    </div>
                    <div className="description">
                        <ul >{(selectedPicture.description as string).split('--').map((line, index) => (
                            <li key={index} className="paragraph">
                                {line}
                            </li>
                        ))}</ul>
                    </div>
                </div>
            </Modal>}
            <div className="picturesContainer">
                <div className="titleContainer">Nos Réalisations</div>
                <div>
                    <Carousel
                        className="carousel"
                        autoplay={{ dotDuration: true }}
                        autoplaySpeed={4000}
                        arrows
                        infinite
                        draggable
                    >
                        {
                            pictures.map((value, index) => (
                                <div key={index} className="element" onClick={() => showModal(value)}>
                                    <PictureWrapper picture={value} />
                                </div>
                            ))
                        }
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default Realisations;