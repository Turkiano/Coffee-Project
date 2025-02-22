import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge" 



//this is for the tailwind class
export function cn(...inputs: ClassValue[]){
    return twMerge(clsx(inputs))
}


//to capture the token
export function getTokenFromStorage(){
    const token = localStorage.getItem("token")
    if(!token) return null

    return token
}
