import LinkedListRender from "../../components/threejs/linkedList/LinkedListRender"

const DSMain = () => {
    return (
        <div className="w-full h-fit pb-28">
            <div className="w-2/3 mx-auto mt-5 flex flex-col space-y-8 mb-28">
                <h1 className="text-5xl text-center font-semibold">Data Structures</h1>

                <div className="flex flex-col">
                    <h2 className="text-xl font-bold">Linked Lists</h2>
                    <p>Linked lists are a collection of nodes with a <span className="italic"> next </span> attribute (and previous if using a Doubly Linked List) that can only be traversed in order of the next attributes. The node.next attribute will commonly be referred to as a pointer because under the hood, the next attribute is storing the memory location of the following node. See below for a common representation</p>
                    <div className="h-full w-full mb-20">
                        <LinkedListRender />
                    </div>
                </div>

                <div className="flex flex-col">
                    <h2 className="text-xl font-bold">Binary Search Trees</h2>
                    <p>Binary Trees are a collection of nodes with attributes left, right, and value. When inserting a new node into a binary tree, if the value is less than the root node you compare the value to the left node, if it's greater than you check against the right. You repeat this process down the tree until you reach a node without a connection in the left/right attribute and place it there.</p>
                    <div className="h-full w-2/3">
                        {/* <LinkedListRender /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DSMain