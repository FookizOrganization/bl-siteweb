import type { NextApiRequest, NextApiResponse } from 'next';
import Mailjet from 'node-mailjet';
import { TableData } from "@/components/contact/provisionDropdown";

const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API_KEY as string,
    process.env.MAILJET_API_SECRET as string
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email, phone, message, tableData } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Formater les données du tableau
    const formattedTableData = tableData
        ?.map(
            (row: TableData) =>
                `<tr>
                    <td>${row.prestation}</td>
                    <td>${row.material}</td>
                    <td>${row.quantity}</td>
                </tr>`
        )
        .join('') || '';

    try {
        const mailjetResponse = await mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: 'blportesfenetres@gmail.com',
                        Name: 'Prise de contact',
                    },
                    To: [
                        {
                            Email: 'blportesfenetres@gmail.com',
                            Name: 'Prise de contact',
                        },
                    ],
                    Subject: 'Nouveau message via le formulaire de contact',
                    HTMLPart: `
                        <h3>Nouveau message de contact</h3>
                        <p><strong>Nom :</strong> ${name}</p>
                        <p><strong>Email :</strong> ${email}</p>
                        <p><strong>Téléphone :</strong> ${phone || "non spécifié"}</p>
                        <p><strong>Message :</strong></p>
                        <p>${message}</p>
                        ${
                        tableData?.length
                            ? `<h4>Informations additionnelles :</h4>
                                   <table border="1" style="width: 100%; border-collapse: collapse;">
                                        <thead>
                                            <tr>
                                                <th>Prestation</th>
                                                <th>Matériau</th>
                                                <th>Quantité</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${formattedTableData}
                                        </tbody>
                                    </table>`
                            : "<p>Aucune information additionnelle fournie.</p>"
                    }
                    `,
                },
            ],
        });

        return res.status(200).json({ message: 'Email sent successfully!', data: mailjetResponse.body });
    } catch (error) {
        console.error('Mailjet Error:', error);
        return res.status(500).json({ message: 'Failed to send email', error });
    }
}