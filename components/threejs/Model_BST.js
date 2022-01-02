import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from 'react';
import Model from "./Bst";

const Model_BST = () => {
    return (
        <>
            <Suspense fallback={null}>
                <Model />
            </Suspense>
        </>
    )
}

export default Model_BST
