import React from 'react'
import image from '../../assets/newimage-removebg-preview.png'

function NewArrivals() {
    return (
        <div className="flex flex-col-reverse lg:flex-row justify-between items-center p-6 m-9 bg-emerald-900 text-white">
            {/* Image block */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <img
                    src={image}
                    alt="New Arrivals Hero"
                    className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
                />
            </div>

            {/* Text block */}
            <div className="w-full lg:w-1/2 text-center lg:text-left mt-4 lg:mt-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                    New Arrivals for Jewellery
                </h1>
                <p className="text-sm sm:text-base md:text-lg mb-4 px-4 lg:px-0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, labore.
                </p>
                <button className="bg-white text-emerald-900 font-semibold px-6 py-2 rounded hover:bg-gray-100 transition"
                onClick={() => window.location.href = `/products/new`}>
                    Visit Collection
                </button>
            </div>


        </div>
    )
}

export default NewArrivals
