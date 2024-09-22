import { Schema, Document, model, models } from 'mongoose';

interface IBooking extends Document {
  userEmail: string;
  designerId: string;
  appointmentDate: Date;
  message: string;
}

const bookingSchema: Schema = new Schema({
  userEmail: { type: String, required: true },
  designerId: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  message: { type: String }
}, {
  timestamps: true
});

export const Booking = models.Booking || model<IBooking>('Booking', bookingSchema);
