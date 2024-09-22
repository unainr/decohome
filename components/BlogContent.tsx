import React from "react";

const BlogContent = () => {
	const blogPosts = [
		{
			id: 1,
			title: "10 Tips for a Cozy Living Room",
			description:
				"Transform your living room into a cozy retreat with these simple tips. From lighting to furniture arrangement, discover how to create a warm atmosphere.",
			date: "2024-09-15",
			image: "/images/b1.jpg",
		},
		{
			id: 2,
			title: "Maximizing Small Spaces: Smart Decor Ideas",
			description:
				"Discover innovative ways to make the most of small spaces with smart decor solutions that combine style and functionality.",
			date: "2024-09-10",
			image: "/images/b2.jpg",
		},
		{
			id: 3,
			title: "The Art of Minimalist Decor",
			description:
				"Learn the principles of minimalist decor and how to achieve a clean, serene space without sacrificing style.",
			date: "2024-09-05",
			image: "/images/b3.jpg",
		},
		{
			id: 4,
			title: "DIY Home Decor Projects for Beginners",
			description:
				"Get creative with these easy DIY home decor projects that will add a personal touch to your space without breaking the bank.",
			date: "2024-08-30",
			image: "/images/b4.jpg",
		},
		{
			id: 5,
			title: "Seasonal Decor: Refreshing Your Home",
			description:
				"Explore seasonal decor ideas to refresh your home for every season. From spring blooms to winter coziness, find inspiration for year-round charm.",
			date: "2024-08-25",
			image: "/images/b5.jpg",
		},
		{
			id: 6,
			title: "Seasonal Decor: Refreshing Your Home",
			description:
				"Explore seasonal decor ideas to refresh your home for every season. From spring blooms to winter coziness, find inspiration for year-round charm.",
			date: "2024-08-25",
			image: "/images/b3.jpg",
		},
	];

	return (
		<>
			{blogPosts.map((post) => (
				<li
					key={post.id}
					className="relative  flex flex-col justify-between border rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl overflow-hidden">
					<a className="relative" href="/tool/writey-ai">
                    <div className="relative w-full aspect-video overflow-hidden  shadow-lg transition-shadow duration-300 hover:shadow-2xl">
  <img
    className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
    src={post.image}
    alt={post.title}
    loading="lazy"
  />
  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-b from-transparent to-gray-800">
    <h2 className="text-xl font-bold text-slate-200">{post.title}</h2>
    <p className="font-medium text-sm text-slate-200">{post.date}</p>
  </div>
</div>

					</a>
					<div className="flex flex-col justify-between gap-3 p-5">
						<p className=" text-sm line-clamp-2">
							{post.description}
						</p>
						
					</div>
				</li>
			))}
		</>
	);
};

export default BlogContent;
