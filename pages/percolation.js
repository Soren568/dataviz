import { useState } from "react"
import PercolationVisualizer from '../components/visualizers/PercolationVisualizer'

const Percolation = () => {
    return (
        <div className="w-full h-full">
            <div className="flex flex-col justify-between w-fit mx-auto mt-5 mb-1 items-center">

                <PercolationVisualizer />

            </div>
        </div>
    )
}

export default Percolation