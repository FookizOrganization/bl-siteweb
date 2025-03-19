import React, { useState } from "react";
import { getProvision } from "@/components/contact/getProvision";
import styles from "./contact.module.css";
import { Select } from "antd";

// Définition des types des props du composant
interface ProvisionDropdownProps {
    onTableChange?: (tableData: TableData[]) => void;
}

export type TableData = {
    id: number;
    firstLevel: string;
    secondLevel: string;
    thirdLevel: string;
    materialLevel: string;
};

const ProvisionDropdown: React.FC<ProvisionDropdownProps> = ({ onTableChange }) => {
    const data = getProvision();

    const [firstLevel, setFirstLevel] = useState<string | null>(null);
    const [secondLevel, setSecondLevel] = useState<string | null>(null);
    const [thirdLevel, setThirdLevel] = useState<string | null>(null);
    const [materialLevel, setMaterialLevel] = useState<string | null>(null);

    const [tableData, setTableData] = useState<TableData[]>([]);

    const handleFirstLevelChange = (value: string) => {
        setFirstLevel(value);
        setSecondLevel(null);
        setThirdLevel(null);
        setMaterialLevel(null);
    };

    const handleSecondLevelChange = (value: string) => {
        setSecondLevel(value);
        setThirdLevel(null);
        setMaterialLevel(null);
    };

    const handleThirdLevelChange = (value: string) => {
        setThirdLevel(value);
        setMaterialLevel(null);
    };

    const handleMaterialChange = (value: string) => {
        setMaterialLevel(value);
    };

    const handleAdd = () => {
        if (firstLevel && secondLevel && thirdLevel && materialLevel) {
            // Ajouter les informations au tableau
            const newData = [
                ...tableData,
                {
                    id: Math.random(), // Identifiant unique pour la suppression
                    firstLevel,
                    secondLevel,
                    thirdLevel,
                    materialLevel,
                },
            ];

            setTableData(newData);

            // Remonter les données mises à jour via la prop onTableChange
            if (onTableChange) {
                onTableChange(newData);
            }

            // Réinitialiser les DDL
            setFirstLevel(null);
            setSecondLevel(null);
            setThirdLevel(null);
            setMaterialLevel(null);
        }
    };

    const handleDelete = (id: number) => {
        // Supprimer une ligne du tableau
        const updatedData = tableData.filter((row) => row.id !== id);
        setTableData(updatedData);

        // Remonter les données mises à jour via la prop onTableChange
        if (onTableChange) {
            onTableChange(updatedData);
        }
    };

    const firstLevelOptions = Object.keys(data);
    const secondLevelOptions =
        firstLevel && data[firstLevel as keyof typeof data]
            ? Object.keys((data[firstLevel as keyof typeof data] as Record<string, unknown>))
            : [];
    const thirdLevelOptions =
        firstLevel && secondLevel &&
        data[firstLevel as keyof typeof data] &&
        (data[firstLevel as keyof typeof data] as Record<string, Record<string, unknown>>)[secondLevel]
            ? Object.keys(
                (data[firstLevel as keyof typeof data] as Record<string, Record<string, unknown>>)[secondLevel]
            )
            : [];
    const materialOptions =
        firstLevel && secondLevel && thirdLevel &&
        data[firstLevel as keyof typeof data] &&
        (data[firstLevel as keyof typeof data] as Record<string, Record<string, unknown>>)[secondLevel] &&
        ((data[firstLevel as keyof typeof data] as Record<string, Record<string, Record<string, unknown>>>)[secondLevel][thirdLevel] as Record<string, string[]>)
            ?.materiaux
            ? ((data[firstLevel as keyof typeof data] as Record<string, Record<string, Record<string, unknown>>>)[secondLevel][thirdLevel] as { materiaux: string[] })
                .materiaux
            : [];

    return (
        <div className={styles.provisionComponent}>
            {/* Tableau des choix ajoutés */}
            {tableData.length > 0 && (
                tableData.map((row) => (
                    <div key={row.id} className={styles.line}>
                        <div>
                            <button
                                className={styles.deleteButton}
                                onClick={() => handleDelete(row.id)}
                            >
                                <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div >{`${row.firstLevel} > ${row.secondLevel} > ${row.thirdLevel} > ${row.materialLevel}`}</div>
                    </div>
                ))
            )}


            <div className={styles.titleDDL}>Vous êtes intéréssé par : </div>
            <div className={styles.provisionDDLs}>
                <Select
                    placeholder="Sélectionnez"
                    value={firstLevel || undefined}
                    onChange={handleFirstLevelChange}
                    options={firstLevelOptions.map((option) => ({ value: option }))}
                />
                <Select
                    placeholder="Sélectionnez"
                    value={secondLevel || undefined}
                    onChange={handleSecondLevelChange}
                    disabled={!secondLevelOptions.length}
                    options={secondLevelOptions.map((option) => ({ value: option }))}
                />
                <Select
                    placeholder="Sélectionnez"
                    value={thirdLevel || undefined}
                    onChange={handleThirdLevelChange}
                    disabled={!thirdLevelOptions.length}
                    options={thirdLevelOptions.map((option) => ({ value: option }))}
                />
                <Select
                    placeholder="Sélectionnez"
                    value={materialLevel || undefined}
                    onChange={handleMaterialChange}
                    disabled={!materialOptions.length}
                    options={materialOptions.map((option) => ({ value: option }))}
                />

                <button
                    onClick={handleAdd}
                    className={`${styles.btnForm} ${styles.validBtn}`}
                    disabled={!materialOptions.length || materialLevel === null}
                    style={{
                        margin: "auto"
                    }}
                >
                    Ajouter
                </button>
            </div>
        </div>
    );
};

export default ProvisionDropdown;