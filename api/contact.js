const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { conName, conLName, conEmail, conPhone, conService, conMessage } = req.body;

        let transporter = nodemailer.createTransport({
            service: 'gmail',  // Use Gmail or your preferred email provider
            auth: {
                user: process.env.EMAIL_USER,  // Use environment variable for email
                pass: process.env.EMAIL_PASS,  // Use environment variable for password
            },
        });

        const mailOptions = {
            from: conEmail,
            to: 'amahmad6468@gmail.com',  // Replace with your recipient email
            subject: `Contact Form Submission from ${conName}`,
            text: `
                Name: ${conName} ${conLName}
                Email: ${conEmail}
                Phone: ${conPhone}
                Service: ${conService}
                Message: ${conMessage}
            `,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Message sent successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to send message.', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
