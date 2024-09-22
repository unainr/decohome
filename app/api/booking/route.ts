import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo';
import { Booking } from '@/lib/bookingModel';

export async function POST(req: NextRequest) {
  const { userEmail, designerId, appointmentDate, message } = await req.json();

  await dbConnect();

  try {
    const newBooking = new Booking({
      userEmail,
      designerId,
      appointmentDate: new Date(appointmentDate),
      message
    });

    await newBooking.save();

    return NextResponse.json({ success: true, message: 'Booking successful' }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      // Now TypeScript knows error has a message property
      return NextResponse.json({ error: 'Booking failed', details: error.message }, { status: 500 });
    } else {
      // Handle case where error is not an instance of Error
      return NextResponse.json({ error: 'Booking failed', details: 'Unknown error' }, { status: 500 });
    }
  }
}
