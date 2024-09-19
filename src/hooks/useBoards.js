import { actions } from "../store/boardsSlice";

export default function useBoards(selector) {
    const { boards, currentBoard, loading } = selector(state => state.boards)

    return {
        ...actions,
        boards,
        currentBoard: boards[currentBoard],
        loading
    }
}