"use client"
import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from './ui/button';

interface BookingFormProps {
  designerId: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ designerId }) => {
  const [formData, setFormData] = useState({
    userEmail: '',
    appointmentDate: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{ success: boolean; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, designerId })
      });
      const result = await res.json();
      setResponse({ success: result.success, message: result.message });
    } catch (error) {
      setResponse({ success: false, message: 'Booking failed. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" rounded-lg border  p-6 shadow-md">
      <label htmlFor="userEmail" className="block text-sm font-semibold mb-1">Email:</label>

    <div className="mb-4">
      <Input type="email"
        id="userEmail"
        name="userEmail"
        value={formData.userEmail}
        onChange={handleChange} />

    </div>
  
    <div className="mb-4">
      <label htmlFor="appointmentDate" className="block text-sm font-semibold mb-1">Appointment Date:</label>
      <Input  type="date"
        id="appointmentDate"
        name="appointmentDate"
        value={formData.appointmentDate}
        onChange={handleChange}
        required />

   
    </div>
  
    <div className="mb-4">
      <label htmlFor="message" className="block text-sm font-semibold mb-1">Image URL (optional):</label>
      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        className="mt-1 block w-full p-3 border  rounded-lg focus:outline-none focus:ring "
       
      />
    </div>
  
    <Button
      type="submit"
      disabled={loading}
     
    >
      {loading ? 'Booking...' : 'Book Appointment'}
    </Button>
  
    {response && (
      <p className="mt-4 text-green-600">{response.message}</p>
    )}
  </form>
  
  );
};

export default BookingForm;
