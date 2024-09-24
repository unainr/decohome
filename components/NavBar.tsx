"use client";
import { useState, useEffect } from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { useCart } from "./CartContext";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation"; // useRouter added
import { loadStripe } from "@stripe/stripe-js";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

// Load Stripe promise
const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const Navbar = () => {
	const pathname = usePathname();
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const router = useRouter(); // useRouter hook added
	const [isSheetVisible, setIsSheetVisible] = useState(true);
	const [isMounted, setIsMounted] = useState(false);
	const { cartItems, removeItem, updateQuantity, clearCart } = useCart();

	useEffect(() => {
		const handleResize = () => {
			setIsSheetVisible(window.innerWidth < 1024);
		};
		if (typeof window !== "undefined") {
			window.addEventListener("resize", handleResize);
			handleResize();
			return () => window.removeEventListener("resize", handleResize);
		}
	}, []);

	useEffect(() => {
		setIsMounted(true);

		const storedEmail = localStorage.getItem("userEmail");
		if (storedEmail) {
			setUserEmail(storedEmail);
		}

		// Check for checkout success in URL
		if (typeof window !== "undefined") {
			const urlParams = new URLSearchParams(window.location.search);
			if (urlParams.get("checkout") === "success") {
				clearCart();
				router.replace(pathname);
			}
		}
	}, [pathname, clearCart, router]);

	useEffect(() => {
		const email = localStorage.getItem("userEmail");
		if (email) {
			setUserEmail(email);
		}
		setIsMounted(true);
	}, []);

	const handleCheckout = async () => {
		if (!userEmail) {
			alert("Please log in to proceed to checkout.");
			return;
		}
		try {
			const stripe = await stripePromise;
			if (!stripe) {
				throw new Error("Stripe.js has not loaded");
			}

			const response = await fetch("/api/create-checkout-session", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ cartItems }),
			});

			if (!response.ok) {
				console.error(`Network response was not ok: ${response.statusText}`);
				throw new Error(`Network response was not ok: ${response.statusText}`);
			}

			const data = await response.json();
			const { url } = data;
			window.location.href = url; // Redirect to Stripe checkout
		} catch (error) {
			console.error("Error during checkout:", error);
			alert("An error occurred during checkout. Please try again.");
		}
	};

	const removeFromCart = (id: number) => {
		removeItem(id);
	};

	const increaseQuantity = (id: number) => {
		const item = cartItems.find((item) => item.id === id);
		if (item) updateQuantity(id, item.quantity + 1);
	};

	const decreaseQuantity = (id: number) => {
		const item = cartItems.find((item) => item.id === id);
		if (item && item.quantity > 1) updateQuantity(id, item.quantity - 1);
	};

	const handleLogout = () => {
		localStorage.removeItem("userEmail");
		setUserEmail(null);
	};
	if (!isMounted) return null;

	if (pathname.startsWith("/admin")) {
		return null;
	}
	return (
		<header className="bg-background/50  border-b  sticky top-0 backdrop-blur  z-30 scroll-p-16 scroll-smooth">
			<div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex-1 md:flex md:items-center md:gap-12">
						<a className="block text-teal-600" href="#">
							<span className="sr-only">Home</span>
							<img className="h-10 " src="/images/logo.png" alt="semo home" />
						</a>
					</div>
					<div className="md:flex md:items-center md:gap-12">
						<nav aria-label="Global" className="hidden md:block">
							<ul className="flex items-center gap-6 text-sm font-medium">
								<li>
									<Link
										href="/"
										className={
											pathname === "/"
												? "transition duration-300 ease-in-out text-red-600 underline underline-offset-4 hover:scale-105"
												: "transition duration-300 ease-in-out hover:text-red-600 hover:underline hover:underline-offset-4 hover:scale-105"
										}>
										Home
									</Link>
								</li>
								<li>
									<Link
										className={
											pathname === "/about"
												? "transition duration-300 ease-in-out text-red-600 underline underline-offset-4 hover:scale-105"
												: "transition duration-300 ease-in-out hover:text-red-600 hover:underline hover:underline-offset-4 hover:scale-105"
										}
										href="/about">
										About
									</Link>
								</li>
								<li>
									<Link
										className={
											pathname === "/shop"
												? "transition duration-300 ease-in-out text-red-600 underline underline-offset-4 hover:scale-105"
												: "transition duration-300 ease-in-out hover:text-red-600 hover:underline hover:underline-offset-4 hover:scale-105"
										}
										href="/shop">
										Shop
									</Link>
								</li>
								<li>
									<Link
										className={
											pathname === "/designers"
												? "transition duration-300 ease-in-out text-red-600 underline underline-offset-4 hover:scale-105"
												: "transition duration-300 ease-in-out hover:text-red-600 hover:underline hover:underline-offset-4 hover:scale-105"
										}
										href="/designers">
										Designer
									</Link>
								</li>

								{userEmail ? (
									<>
										<li className="text-gray-700">{userEmail}</li>
										<li>
											<button onClick={handleLogout} className="text-red-500">
												Logout
											</button>
										</li>
									</>
								) : (
									<>
										<li>
											<Link
												href="/login"
												className={
													pathname === "/login"
														? "text-red-600"
														: "hover:text-red-600"
												}>
												Login
											</Link>
										</li>
										<li>
											<Link
												href="/register"
												className={
													pathname === "/register"
														? "text-red-600"
														: "hover:text-red-600"
												}>
												Register
											</Link>
										</li>
									</>
								)}
								<li>
									<ModeToggle />
								</li>
								<Sheet>
									<SheetTrigger asChild>
										<div className="relative cursor-pointer">
											<ShoppingBag className="h-6 w-6" />
											{isMounted && cartItems.length > 0 && (
												<span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-500 rounded-full">
													{cartItems.length}
												</span>
											)}
										</div>
									</SheetTrigger>
									<SheetContent className="p-6 rounded-lg shadow-lg max-w-md">
										<SheetHeader>
											<SheetTitle className="text-lg font-bold text-gray-800 mb-4">
												Shopping Cart
											</SheetTitle>
										</SheetHeader>
										<div>
											{cartItems.length > 0 ? (
												<>
													<ul className="space-y-6 divide-y divide-gray-200">
														{cartItems.map((item) => (
															<li
																key={item.id}
																className="flex justify-between items-center py-4">
																<div className="flex items-center space-x-4">
																	<img
																		src={item.productimg}
																		alt={item.productname}
																		className="w-16 h-16 rounded-md object-cover border border-gray-300"
																	/>
																	<div>
																		<h3 className="text-sm font-medium text-gray-700">
																			{item.productname}
																		</h3>
																		<p className="text-xs text-gray-500">
																			Rs {item.price} x {item.quantity}
																		</p>
																	</div>
																</div>
																<div className="flex items-center gap-3">
																	<div className="flex items-center border border-gray-300 rounded-md">
																		<button
																			onClick={() => decreaseQuantity(item.id)}
																			className="px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-l-md">
																			-
																		</button>
																		<span className="px-3 text-sm font-medium">
																			{item.quantity}
																		</span>
																		<button
																			onClick={() => increaseQuantity(item.id)}
																			className="px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-r-md">
																			+
																		</button>
																	</div>
																	<button
																		onClick={() => removeFromCart(item.id)}
																		className="text-red-500 hover:text-red-600">
																		Remove
																	</button>
																</div>
															</li>
														))}
													</ul>

													{/* Subtotal */}
													<div className="mt-6 pt-4 border-t border-gray-200">
														<p className="text-lg font-medium text-gray-700">
															Subtotal: Rs{" "}
															{cartItems.reduce(
																(total, item) =>
																	total + item.price * item.quantity,
																0
															)}
														</p>
														<Button
															onClick={handleCheckout}
															className="w-full mt-4 bg-teal-600 hover:bg-teal-500 text-white rounded-md py-2">
															Proceed to Checkout
														</Button>
													</div>
												</>
											) : (
												<div className="text-center text-gray-500">
													<p className="text-lg font-medium">
														Your cart is empty.
													</p>
													<p className="text-sm">
														Add items to your cart to get started.
													</p>
												</div>
											)}
										</div>
									</SheetContent>
								</Sheet>
							</ul>
						</nav>
						<div className="flex items-center gap-4">
							<div className="block md:hidden">
								{isSheetVisible && (
									<Sheet>
										<SheetTrigger>
											<span className="rounded p-2 transition hover:bg-gray-200">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													strokeWidth={2}>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M4 6h16M4 12h16M4 18h16"
													/>
												</svg>
											</span>
										</SheetTrigger>
										<SheetContent className="overflow-auto max-h-screen p-4">
											<SheetHeader>
												<SheetTitle>
													{" "}
												</SheetTitle>
												<SheetDescription className="flex flex-col items-center gap-6 text-sm">
													<Link
														className="text-gray-500 transition hover:text-gray-700"
														href="/">
														Home
													</Link>

													<Link
														className="text-gray-500 transition hover:text-gray-700"
														href="/about">
														About
													</Link>

													<Link
														className="text-gray-500 transition hover:text-gray-700"
														href="/shop">
														Shop
													</Link>
													<Link
														className="text-gray-500 transition hover:text-gray-700"
														href="/designers">
														Designer
													</Link>
													<Sheet>
														<SheetTrigger asChild>
															<div className="relative cursor-pointer">
																<ShoppingBag className="h-6 w-6" />
																{isMounted && cartItems.length > 0 && (
																	<span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-500 rounded-full">
																		{cartItems.length}
																	</span>
																)}
															</div>
														</SheetTrigger>
														<SheetContent className="p-6 rounded-lg shadow-lg max-w-md w-full">
															<SheetHeader>
																<SheetTitle className="text-lg font-bold text-gray-800 mb-4">
																	Shopping Cart
																</SheetTitle>
															</SheetHeader>
															<div>
																{cartItems.length > 0 ? (
																	<>
																		<ul className="space-y-6 divide-y divide-gray-200">
																			{cartItems.map((item) => (
																				<li
																					key={item.id}
																					className="flex flex-col sm:flex-row justify-between items-center py-4">
																					<div className="flex items-center space-x-4 w-full">
																						<img
																							src={item.productimg}
																							alt={item.productname}
																							className="w-16 h-16 rounded-md object-cover border border-gray-300"
																						/>
																						<div className="flex-1">
																							<h3 className="text-sm font-medium text-gray-700 truncate">
																								{item.productname}
																							</h3>
																							<p className="text-xs text-gray-500">
																								Rs {item.price} x{" "}
																								{item.quantity}
																							</p>
																						</div>
																					</div>
																					<div className="flex items-center gap-3 mt-4 sm:mt-0">
																						<div className="flex items-center border border-gray-300 rounded-md">
																							<button
																								onClick={() =>
																									decreaseQuantity(item.id)
																								}
																								className="px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-l-md">
																								-
																							</button>
																							<span className="px-3 text-sm font-medium">
																								{item.quantity}
																							</span>
																							<button
																								onClick={() =>
																									increaseQuantity(item.id)
																								}
																								className="px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-r-md">
																								+
																							</button>
																						</div>
																						<button
																							onClick={() =>
																								removeFromCart(item.id)
																							}
																							className="text-red-500 hover:text-red-600">
																							Remove
																						</button>
																					</div>
																				</li>
																			))}
																		</ul>

																		{/* Subtotal */}
																		<div className="mt-6 pt-4 border-t border-gray-200">
																			<p className="text-lg font-medium text-gray-700">
																				Subtotal: Rs{" "}
																				{cartItems.reduce(
																					(total, item) =>
																						total + item.price * item.quantity,
																					0
																				)}
																			</p>
																			<Button
																				onClick={handleCheckout}
																				className="w-full mt-4 bg-teal-600 hover:bg-teal-500 text-white rounded-md py-2">
																				Proceed to Checkout
																			</Button>
																		</div>
																	</>
																) : (
																	<div className="text-center text-gray-500">
																		<p className="text-lg font-medium">
																			Your cart is empty.
																		</p>
																		<p className="text-sm">
																			Add items to your cart to get started.
																		</p>
																	</div>
																)}
															</div>
														</SheetContent>
													</Sheet>

													{userEmail ? (
														<>
															<span className="text-gray-700">{userEmail}</span>

															<button
																onClick={handleLogout}
																className="text-red-500">
																Logout
															</button>
														</>
													) : (
														<>
															<Link
																href="/login"
																className={
																	pathname === "/login"
																		? "text-red-600"
																		: "hover:text-red-600"
																}>
																Login
															</Link>

															<Link
																href="/register"
																className={
																	pathname === "/register"
																		? "text-red-600"
																		: "hover:text-red-600"
																}>
																Register
															</Link>
														</>
													)}

													<ModeToggle />
												</SheetDescription>
											</SheetHeader>
										</SheetContent>
									</Sheet>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
