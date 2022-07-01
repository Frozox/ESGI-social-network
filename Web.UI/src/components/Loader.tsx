import React from "react"
import { useStoreContext } from "../utils/context/StoreContext"

const Loader = ({ children }: { children: any }) => {

    const { state: {
        loader: {
            isLoading
        }
    } } = useStoreContext()

    // make loader visible only when loading with background transparent using tailwindcss
    if (isLoading) {
        return (
            <div className="w-full h-screen flex justify-center items-center bg-gray-50">
                <h1 className="text-4xl font-bold">Loading...</h1>
            </div>
        )
    }
    return children
}

export default Loader