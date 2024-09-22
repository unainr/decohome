// app/admin/dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminNavbar from "@/components/AdminNavbar";
import { Booking } from "@/lib/bookingModel";
import { User } from "@/lib/userModel";
import dbConnect from "@/lib/mongo";
import mongoose from "mongoose";

interface BookingType {
  _id: string;
  userEmail: string;
  designerId: string;
  appointmentDate: string;
  message: string;
}

interface UserType {
  _id: string;
  email: string;
}

export default async function AdminDashboard() {
  const adminEmail = cookies().get("adminEmail")?.value;

  if (!adminEmail) {
    redirect("/admin/login");
    return;
  }

  await dbConnect();

  const bookings = await Booking.find().lean();
  const users = await User.find().lean();

  const bookingData: BookingType[] = bookings.map((booking) => ({
    _id: (booking._id as mongoose.Types.ObjectId).toString(),
    userEmail: booking.userEmail,
    designerId: booking.designerId,
    appointmentDate: booking.appointmentDate.toISOString(),
    message: booking.message || "",
  }));

  const userData: UserType[] = users.map((user) => ({
    _id: (user._id as mongoose.Types.ObjectId).toString(),
    email: user.email,
  }));

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminNavbar email={adminEmail} />
      <div className="flex-grow p-4">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Admin Dashboard
        </h1>

        {/* Bookings Table */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Bookings</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="bg-gray-300">
                  <th className="py-3 px-5 text-left text-sm font-semibold text-gray-700">ID</th>
                  <th className="py-3 px-5 text-left text-sm font-semibold text-gray-700">User Email</th>
                  <th className="py-3 px-5 text-left text-sm font-semibold text-gray-700">Designer ID</th>
                  <th className="py-3 px-5 text-left text-sm font-semibold text-gray-700">Appointment Date</th>
                  <th className="py-3 px-5 text-left text-sm font-semibold text-gray-700">Message</th>
                </tr>
              </thead>
              <tbody>
                {bookingData.map((booking) => (
                  <tr key={booking._id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-5 text-sm text-gray-600">{booking._id}</td>
                    <td className="py-3 px-5 text-sm text-gray-600">{booking.userEmail}</td>
                    <td className="py-3 px-5 text-sm text-gray-600">{booking.designerId}</td>
                    <td className="py-3 px-5 text-sm text-gray-600">
                      {new Date(booking.appointmentDate).toLocaleString()}
                    </td>
                    <td className="py-3 px-5 text-sm text-gray-600">{booking.message || "No message"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Users Table */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="bg-gray-300">
                  <th className="py-3 px-5 text-left text-sm font-semibold text-gray-700">ID</th>
                  <th className="py-3 px-5 text-left text-sm font-semibold text-gray-700">Email</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-5 text-sm text-gray-600">{user._id}</td>
                    <td className="py-3 px-5 text-sm text-gray-600">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
    </div>
  );
}
