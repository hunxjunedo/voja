import utils from '../utils/index';
import { actions } from '../store/factorsSlice';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import useBoards from './useBoards';
const {buildHierarchy} = utils
export default function useFactors(selector, currentBoard) {
    const { factors, topics, subjects } = selector(state => state.factors);
    const {syncBoards} = useBoards(selector)
    const {syncFactors, syncSubjects, syncTopics} = actions;
    const dispatch = useDispatch()

    //we want to sync everything on first render
    useEffect(()=>{
        dispatch(syncBoards());
        dispatch(syncSubjects());
        dispatch(syncTopics());
        dispatch(syncFactors());
    }, []);

    
    const heirarchy = useMemo(() => {
        return buildHierarchy(subjects, topics, factors, currentBoard?.id) 
    }, [subjects, topics, factors, currentBoard]);
    
    return {
        heirarchy,
        ...actions
    }
}