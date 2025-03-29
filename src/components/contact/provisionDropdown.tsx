import React, { useState } from "react";
import { getProvision } from "@/components/contact/getProvision";
import styles from "./contact.module.css";
import { Select, Input, Button, Table } from "antd";

interface ProvisionDropdownProps {
    onTableChange?: (tableData: TableData[]) => void;
}

export type TableData = {
    id: number;
    prestation: string;
    material: string;
    quantity: number;
};

const ProvisionDropdown: React.FC<ProvisionDropdownProps> = ({ onTableChange }) => {
    const data = getProvision();

    const [prestation, setPrestation] = useState<string | null>(null); // Liste déroulante pour la prestation
    const [material, setMaterial] = useState<string | null>(null); // Liste déroulante pour le matériau
    const [quantity, setQuantity] = useState<number | null>(null); // Quantité saisie par l'utilisateur

    const [tableData, setTableData] = useState<TableData[]>([]);

    const handleAdd = () => {
        if (prestation && material && quantity && quantity > 0) {
            const newData = [
                ...tableData,
                {
                    id: Math.random(), // Identifiant unique
                    prestation,
                    material,
                    quantity,
                },
            ];

            setTableData(newData);

            if (onTableChange) {
                onTableChange(newData);
            }

            // Réinitialiser les champs
            setPrestation(null);
            setMaterial(null);
            setQuantity(null);
        } else {
            alert("Veuillez remplir tous les champs correctement.");
        }
    };

    const handleDelete = (id: number) => {
        const updatedData = tableData.filter((row) => row.id !== id);
        setTableData(updatedData);

        if (onTableChange) {
            onTableChange(updatedData);
        }
    };

    const prestationOptions = Object.keys(data); // Liste des prestations disponibles
    const materialOptions =
        prestation && data[prestation as keyof typeof data]
            ? data[prestation as keyof typeof data].materiaux
            : [];

    return (
        <div className={styles.provisionDropdown}>
            {/* Petite phrase avant les listes déroulantes */}
            <p style={{ fontSize: "16px", fontWeight: "500", marginBottom: "1rem", color: "var(--color-primary)" }}>
                Vous êtes intéressé par (facultatif) :
            </p>

            {/* Sélection de la prestation */}
            <div className={styles.dropdownGroup}>
                <Select
                    placeholder="Choisissez une prestation"
                    value={prestation}
                    onChange={(value) => setPrestation(value)}
                    popupMatchSelectWidth={false}
                    style={{ width: "100%", marginBottom: "1rem" }}
                >
                    {prestationOptions.map((option) => (
                        <Select.Option key={option} value={option}>
                            {option}
                        </Select.Option>
                    ))}
                </Select>

                {/* Sélection du matériau */}
                <Select
                    placeholder="Choisissez un matériau"
                    value={material}
                    onChange={(value) => setMaterial(value)}
                    style={{ width: "100%", marginBottom: "1rem" }}
                    popupMatchSelectWidth={false}
                    disabled={!prestation} // Désactiver si aucune prestation n’a été choisie
                >
                    {materialOptions.map((option:any) => (
                        <Select.Option key={option} value={option}>
                            {option}
                        </Select.Option>
                    ))}
                </Select>

                {/* Saisie de la quantité */}
                <Input
                    type="number"
                    placeholder="Quantité"
                    value={quantity || ""}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    style={{ width: "100%", marginBottom: "1rem" }}
                    min={1}
                    disabled={!material} // Désactiver tant qu'aucun matériau n’a été sélectionné
                />
            </div>

            {/* Bouton pour ajouter une ligne */}
            <Button
                type="primary"
                onClick={handleAdd}
                disabled={!prestation || !material || !quantity || quantity <= 0}
                style={{ marginBottom: "1rem" }}
            >
                Ajouter
            </Button>

            {/* Tableau des données ajoutées */}
            <div className={styles.tableContainer}>
                {
                    tableData.map((item, index) => (
                        <div
                            key={index}
                            className={styles.cardItem}
                        >
                            <div style={{
                                display: "flex",
                                alignItems: "center",

                            }}>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => handleDelete(item.id)}
                                >
                                    <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="darkred" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                <span style={{
                                    paddingLeft: "0.5rem",
                                    lineHeight: "16px"
                                }}>Vous souhaitez des informations pour {item.quantity} {item.prestation} en {item.material}.</span></div>
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default ProvisionDropdown;