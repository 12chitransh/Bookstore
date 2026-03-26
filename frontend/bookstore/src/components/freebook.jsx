import React from 'react'
import list from "../list.json"
import Card from './card'

export default function Freebook() {
    const filterdata = list.filter(data => data.category === "free")

    return (
        <div className="bg-white py-16">
            <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                        📚 Free Books Collection
                    </h1>
                    <p className="text-lg text-slate-600">
                        Discover amazing free books from our collection. {filterdata.length} books available to read now!
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filterdata.map((item) => (
                        <div key={item.id}>
                            <Card item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
