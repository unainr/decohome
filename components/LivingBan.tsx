import React from "react";

const LivingBan = () => {
	return (
		<section className="text-gray-600 body-font">
			<div className="container px-5 py-10 mx-auto flex flex-wrap">
				<div className="flex flex-wrap -m-4">
					<div className="p-4 lg:w-1/2 md:w-full">
                    <div className="relative overflow-hidden group">
							<img
								src="/images/bed.jpg"
								alt="best bed and furniture to find the best "
								className="  transition-transform duration-300 group-hover:scale-110"
							/>
							<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							</div>
						</div>
					</div>
					<div className="p-4 lg:w-1/2 md:w-full">
						<div className="relative overflow-hidden group">
							<img
								src="/images/living.jpg"
								alt="best living bed"
								className="transition-transform duration-300 group-hover:scale-110"
							/>
							<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LivingBan;
