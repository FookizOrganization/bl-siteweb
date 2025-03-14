import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Chemin vers le dossier des images
    const picturesDir = path.join(process.cwd(), 'public', 'photos', 'pictures');

    try {
        // Lire les fichiers du dossier
        const files = fs.readdirSync(picturesDir);

        // Retourner les chemins des fichiers publics
        const pictures = files.map((file) => `/photos/pictures/${file}`);
        res.status(200).json({ pictures });
    } catch (error) {
        console.error('Erreur lors de la lecture du dossier:', error);
        res.status(500).json({ error: 'Impossible de lire les fichiers.' });
    }
}