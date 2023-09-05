import React from "react";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { appFirebase } from "../../config/firebase";


export const auth = getAuth(appFirebase);

interface SignInProps {
    email: string;
    password: string;
}

export const SignIn = async (props: SignInProps) => {

    // const signIn = await createUserWithEmailAndPassword(auth, props.email, props.password);
    // console.log(signIn);
    return  
};