import { useEffect, useState } from "react";
import consts from "../constants";
const {mobileBreakpoint} = consts
export default function useMobile(){
    const [isMobile, setIsMobile] = useState(false)
    const handleResize = () => {
        setIsMobile(window.innerWidth <= mobileBreakpoint)
    }
    useEffect(()=> {
        if(!window){
            return;
        }
        window.addEventListener('resize', handleResize);
        handleResize()
    }, [window])

    return {
        isMobile
    }
}