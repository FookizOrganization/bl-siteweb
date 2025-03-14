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
                                <svg width="14px" height="14px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 21.32L21 3.32001" stroke="#9C0202FF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M3 3.32001L21 21.32" stroke="#9C0202FF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
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
                    onChange={handleFirstLevelChange}
                    options={firstLevelOptions.map((option) => ({ value: option }))}
                />
                <Select
                    placeholder="Sélectionnez"
                    onChange={handleSecondLevelChange}
                    disabled={!secondLevelOptions.length}
                    options={secondLevelOptions.map((option) => ({ value: option }))}
                />
                <Select
                    placeholder="Sélectionnez"
                    onChange={handleThirdLevelChange}
                    disabled={!thirdLevelOptions.length}
                    options={thirdLevelOptions.map((option) => ({ value: option }))}
                />
                <Select
                    placeholder="Sélectionnez"
                    onChange={handleMaterialChange}
                    disabled={!materialOptions.length}
                    options={materialOptions.map((option) => ({ value: option }))}
                />

                <button
                    onClick={handleAdd}
                    className={`${styles.btnForm} ${styles.validBtn}`}
                    disabled={!materialOptions.length || materialLevel === null}
                >
                    Ajouter
                </button>
            </div>
        </div>
    );
};

export default ProvisionDropdown;