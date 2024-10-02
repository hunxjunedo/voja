import { actions } from "../store/boardsSlice"
const {changeCurrentBoard} = actions
export default  {
    parseOptions: (boards) => {
        return boards.map((board, index)=>(
            {
                key: index,
                value: board.name
            }
        ))
    },

    handleBoardChange: (value, dispatch) =>{
        dispatch(changeCurrentBoard(value[1].key))
    }


}