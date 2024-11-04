const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    console.log("Serverless function triggered");  // Debugging line

    if (req.method === 'POST') {
        console.log("Received POST request");  // To confirm it's a POST request
        const { conName, conLName, conEmail, conPhone, conService, conMessage } = req.body;

        console.log("Request body:", req.body);  // Log the request body to see if data is received

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: conEmail,
            to: 'amahmad6468@gmail.com',
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
            console.log("Attempting to send email");  // Log before sending email
            await transporter.sendMail(mailOptions);
            console.log("Email sent successfully");  // Log if email sent successfully
            res.status(200).json({ message: 'Message sent successfully.' });
        } catch (error) {
            console.error("Error sending email:", error);  // Log the error if email fails
            res.status(500).json({ message: 'Failed to send message.', error: error.message });
        }
    } else {
        console.log("Request method not allowed:", req.method);  // Log if method isn't POST
        res.status(405).json({ message: 'Method not allowed' });
    }
}
