import{ useState, ChangeEvent, FormEvent } from 'react';

interface EmailData {
  to: string;
  subject: string;
  text: string;
}
const EmailForm = () => {
  const [emailData, setEmailData] = useState<EmailData>({
    to: '',
    subject: '',
    text: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    const formData = new FormData();
    formData.append('to', emailData.to);
    formData.append('subject', emailData.subject);
    formData.append('text', emailData.text);
    if (image) formData.append('image', image);

    try {
      const response = await fetch('http://192.168.1.54:3434/send-email', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Email sent successfully!');
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('There was an error sending the email!', error);
      alert('Error sending email!');
    }
  };

  return (
    <div>
      <h2>Send Email with Attachment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipient:</label>
          <input
            type="email"
            name="to"
            value={emailData.to}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={emailData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            name="text"
            value={emailData.text}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Attach Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
};

export default EmailForm;
