import { useState } from 'react';
interface Email {
    subject: string;
    from: string;
    date: string;
    message: string;
}
export default function EmailFetcher() {
    const [formData, setFormData] = useState({
        user: '',
        password: '',
        host: '',
        port: ''
    });

    const [emails, setEmails] = useState<Email[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setEmails([]);

        try {
            const response = await fetch('http://localhost:3000/fetch-emails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.success) {
                setEmails(data.emails);
            } else {
                setError(data.message || 'Error fetching emails');
            }
        } catch (err) {
            setError('Network error or server issue');
        }

        setLoading(false);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', textAlign: 'center' }}>
            <h1>Email Fetcher</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" name="user" placeholder="Email User" value={formData.user} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <input type="text" name="host" placeholder="IMAP Host" value={formData.host} onChange={handleChange} required />
                <input type="number" name="port" placeholder="IMAP Port" value={formData.port} onChange={handleChange} required />
                <button type="submit" disabled={loading}>{loading ? 'Fetching...' : 'Fetch Emails'}</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h2>Emails:</h2>
            <ul>
                {emails.map((email, index) => (
                    <li key={index}>
                        <strong>{email.subject}</strong> - {email.from} <br />
                        <small>{email.date}</small> <br />
                        <p>{email.message}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
