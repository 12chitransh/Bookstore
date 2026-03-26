import React from 'react'
import list from "../list.json"
import Card from './card'

export default function AllBooks() {
    return (
        <div className="bg-slate-50 py-16">
            <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                        📖 Complete Book Collection
                    </h1>
                    <p className="text-lg text-slate-600">
                        Explore our entire collection of {list.length} amazing books. From classics to modern masterpieces.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {list.map((item) => (
                        <div key={item.id}>
                            <Card item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}