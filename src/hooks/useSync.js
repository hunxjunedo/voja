import { useEffect } from "react";
import useBoards from "./useBoards";
import useFactors from "./useFactors";
import { useDispatch } from "react-redux";

export default function useSync(selector){
const {currentBoard, syncBoards} = useBoards(selector)
const {syncFactors, syncSubjects, syncTopics} = useFactors(selector, currentBoard);
const dispath = useDispatch()

useEffect(()=>{
    dispath(syncBoards);
    dispath(syncSubjects)
    dispath(syncTopics);
    dispath(syncFactors)
}, [])
}