const BigO = () => {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="bg-blue-300 h-1/3 px-20 py-10">
                <h1 className="text-4xl font-bold tracking">What is Big O notation?</h1>
                <p className="font-light pl-10 mt-3 text-lg">In its typical usage, Big O notation is the complexity of an algorithm represented as O(n) where <span className="italic">n</span> is the dominant term, or the general trend, that the function follows with increasing size of data sets <span className="text-base">(You can think of 'n' as the slope on an axis where the y is space/time complexity and x is the size of the data set).</span> </p>
            </div>
            <div id="examples">

            </div>
        </div>
    )
}

export default BigO