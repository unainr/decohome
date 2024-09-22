"use client"
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
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
    <div className="mb-4">
      <label htmlFor="userEmail" className="block text-sm font-semibold mb-1">Email:</label>
      <input
        type="email"
        id="userEmail"
        name="userEmail"
        value={formData.userEmail}
        onChange={handleChange}
        required
        className="mt-1 block w-full p-3 border  rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
      />
    </div>
  
    <div className="mb-4">
      <label htmlFor="appointmentDate" className="block text-sm font-semibold mb-1">Appointment Date:</label>
      <input
        type="date"
        id="appointmentDate"
        name="appointmentDate"
        value={formData.appointmentDate}
        onChange={handleChange}
        required
        className="mt-1 block w-full p-3 border  rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
      />
    </div>
  
    <div className="mb-4">
      <label htmlFor="message" className="block text-sm font-semibold mb-1">Image URL (optional):</label>
      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        className="mt-1 block w-full p-3 border  rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
       
      />
    </div>
  
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors duration-200"
    >
      {loading ? 'Booking...' : 'Book Appointment'}
    </button>
  
    {response && (
      <p className="mt-4 text-green-600">{response.message}</p>
    )}
  </form>
  
  );
};

export default BookingForm;
