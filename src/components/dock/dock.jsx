import { useSelector } from "react-redux"
import Logo from "./logo"
import BoardSelector from "./boardSelector"
import Windows from "./windows"
import useMobile from "../../hooks/useMobile"


export default function Dock(){
   
    return (
        <div className=" rounded-xl w-fit  fixed absolute top-2 left-1/2 -translate-x-1/2  flex-row border-gray-400 border-opacity-50 border-[1px]  bg-blue-950 bg-opacity-90 backdrop-blur-lg  h-fit p-2 flex gap-10 px-10 items-center justify-items-center ">
            <Logo />
            <BoardSelector />
            <Windows />
        </div>
    )
}