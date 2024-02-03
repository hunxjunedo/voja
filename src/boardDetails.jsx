import { Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Modal from 'antd/es/modal/Modal'
import $ from 'jquery'
import { ChevronDown, LucidePlus } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function BoardDetails(props) {
    const { allboards, setcurrentsubject, currentboard, setcurrentboard, setboards, lightclr, darkclr, boards, mainsize, secondryDARK, importantCOLOR, boilerplate, boardindex, progressFactors } = props
    const [boardOpen, setBoardOpen] = useState(false)
    const [brdimage, setbrdimage] = useState(boards[boardindex].image)
    const [nameChange, setnameChange] = useState(false)
    const [boardToEdit, setBoardToEdit] = useState(0)
    const [boardname, setboardname] = useState('')
    const [boarddescription, setboarddescription] = useState('')
    ///SCROLL OBSERVER

    ////
    const boardinfostyles = {
        background: secondryDARK,
        width: '90%',
        height: '10vw',
        borderRadius: 20,
        color: lightclr,
        fontSize: mainsize,
        margin: '1vw',
        scrollSnapAlign: 'center',
        cursor: 'pointer',
        overflow: 'clip'
    }
    const genericBoardInfo = {
        background: darkclr,
        borderRadius: 20,
        padding: 20,
        width: '10vw',
        height: '90%'
    }
    const factorsBar = {
        borderRadius: 10,
        background: secondryDARK,
        padding: 5,
        margin: 2,
        alignItems: 'center',
        display: 'grid',
        Height: '5vh'
    }

    function handleOK() {
        //get name, description, and image
        let name = boardname
        let description = boarddescription
        let imgCHANGE = brdimage
        //updating
        let tempDATA = JSON.parse(localStorage.getItem('boards')) || boilerplate
        let allNAMES = tempDATA.map(boardINFO => (
            boardINFO.name
        ))
        console.log(allNAMES, name)
        if (allNAMES.includes(name) && nameChange) {
            return;
        }
        //proceed, all good
        tempDATA[boardToEdit].name = name
        tempDATA[boardToEdit].description = description
        tempDATA[boardToEdit].image = imgCHANGE
        setBoardOpen(false)
        setnameChange(false)
        localStorage.setItem('boards', JSON.stringify(tempDATA));
        setcurrentboard(name)
        setboards(tempDATA)


    }

    useEffect(() => {
        let tempboarddata = JSON.parse(localStorage.getItem('boards')) || boilerplate;
        let { name, description, image } = tempboarddata[boardToEdit];
        setboardname(name); setboarddescription(description)

    }, [boardToEdit])

    return (
        <div style={{ height: '90%', justifySelf: 'start', padding: 5, color: lightclr, maxHeight: '48vh', display: 'grid' }}>
            <Modal okText='save' onOk={handleOK} onCancel={() => (setBoardOpen(false))} open={boardOpen} >
                <div style={genericBoardInfo}>
                    <Input onChange={(e) => { setboardname(e.target.value); setnameChange(true) }} className='brdNAME' value={boardname} style={{ fontWeight: 'bolder' }} size='large' />
                    <TextArea className='brdDESC' onChange={(e)=>{setboarddescription(e.target.value)}} value={boarddescription} />
                </div>
                <div style={{ ...genericBoardInfo, display: 'flex', flexDirection: 'column', padding: 5, overflowY: 'scroll', overflowX: 'hidden' }}>
                    {/* <Input style={factorsBar} placeholder='new factor' /> */}
                    {
                        Object.keys(progressFactors[allboards[boardToEdit]]).map(board => (
                            <div style={factorsBar}>{board}</div>
                        ))
                    }
                </div>
            </Modal>
            <h1>Boards</h1>
            <div style={{ display: 'grid', scrollSnapType: 'y mandatory', gridAutoFlow: 'row', overflowY: 'scroll', background: darkclr, width: 'fit-content', height: '100%', borderRadius: 40, justifySelf: 'start', width: '100%', justifyItems: 'center' }}>
                {
                    boards.map((oneboard, index) => (
                        <div onClick={() => { setcurrentboard(oneboard.name); setcurrentsubject(boards[index].subjects[0].name) }} className=".board-card" style={oneboard.name === currentboard ? { ...boardinfostyles, boxShadow: importantCOLOR + " 2px 1px 20px 1px", color: 'white' } : { ...boardinfostyles }}>
                            <div style={{ height: '50%', padding: 5, background: `url(${oneboard.image})`, backgroundSize: 'cover', display: 'grid', alignItems: 'center', justifyItems: 'center' }}>
                                <h1 style={{ textShadow: "1px 1px 10px black" }}>{boards[index].name}</h1>
                            </div>
                            <div style={{ opacity: '0.5', justifyItems: 'center', padding: 3, display: 'grid', gridTemplateColumns: '80% 20%', overflow: 'auto', fontSize: 'smaller' }}>
                                <p>{boards[index].description}</p>
                                <ChevronDown onClick={(e) => { e.stopPropagation(); setBoardToEdit(index); setBoardOpen(true) }} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}