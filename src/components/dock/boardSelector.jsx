import { useDispatch, useSelector } from 'react-redux'
import useBoards from '../../hooks/useBoards'
import { Select } from 'antd'
import utils from '../../utils/dock'
const {parseOptions, handleBoardChange} = utils
export default function BoardSelector(){
    const dispatch = useDispatch()
   const {boards, currentBoard, loading} = useBoards(useSelector)
   console.log(boards)
    return (
        <div>
            <Select onChange={(...args) => handleBoardChange(args, dispatch)} loading={loading} defaultValue={ 'Boards'} options={parseOptions(boards)} />
        </div>
    )
}
