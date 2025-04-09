import transporter from "../utils/mailer.js";
import { validateIdToken } from '../utils/jwtValidator.js';

export async function handleAuthCallback(req, res) {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: 'Missing Authorization header' });
        }

        const idToken = authHeader.split(' ')[1];
        const decoded = await validateIdToken(idToken);

        const userEmail = decoded.email;
        if (!userEmail) {
            return res.status(400).json({ message: 'Email not found in token' });
        }

        const mailOptions = {
            from: "lakshaybabbar@legitblogs.me",
            to: userEmail,
            subject: 'Your Auth0 Identity Token',
            text: `Here is your ID Token:\n\n${idToken}`,
            html: `<h3>Your ID Token</h3><br/><p><code>${idToken}</code></p>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Token is valid and email sent', user: decoded });
    } catch (error) {
        console.error(error.message);
        res.status(401).json({ message: 'Invalid token or email error' });
    }
}
