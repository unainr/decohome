"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface AdminNavbarProps {
	email: string | null;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ email }) => {
	const router = useRouter();
	const [menuOpen, setMenuOpen] = useState(false); // State for mobile responsiveness

	const handleLogout = async () => {
		// Clear the admin session cookie on logout
		await fetch("/api/admin/logout", { method: "POST" });
		router.push("/admin/login"); // Redirect to login page after logout
	};

	return (
		<div className="flex h-screen">
			{/* Sidebar */}
			<nav className="bg-gray-800 text-white w-64 p-6 flex flex-col justify-between">
				<div>
					<h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

					<div>
					<span className="block mb-4">{email}</span>
					<button
						onClick={handleLogout}
						className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md"
					>
						Logout
					</button>
				</div>
					
				</div>

				{/* Admin Info and Logout */}
				
			</nav>

			
		</div>
	);
};

export default AdminNavbar;
