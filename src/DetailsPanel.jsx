import { Collapse, Progress, Input, Popover, AutoComplete, Modal } from "antd";
import { ChevronDown, DeleteIcon, Edit, MinusCircle, Plus, PlusCircle, Trash } from "lucide-react";
import Marquee from "react-fast-marquee";
import FactorActions from "./factoractions";
import NewFactorHandler from "./newfactorhandler";
import { useState } from "react";

export default function DetailsPanel(props) {
    const [renameropen, setRenamerOpen] = useState(false)
    const [renamevalue, setRenameValue] = useState('')
    const [currentsubindex ,setCurrentSubIndex] = useState(0)
    let { allboards, setboards, refresh, setrefresh, currentboard, progressFactors, rounder, boilerplate, setcurrentboard, currentsubject, setcurrentsubject, boards, lightclr, secondryDARK, darkclr, importantCOLOR, mainsize, boardindex } = props

    let inpstyles = {
        border: `3px solid ${secondryDARK}`,
        background: 'transparent',
        height: 'fit-content',
        padding: '10px 4px',

        fontSize: 'big',
        color: lightclr,
        borderRadius: 15
    }

    let SubjectActions = (index) => (
        <div style={{ padding: 10, borderRadius: 20, background: darkclr }}>
            <Plus size={16} style={{ margin: '0 5px' }} onClick={(e) => (newTopic(index, e))} />
            <Trash size={16} style={{ margin: '0 5px' }} onClick={(e) => (subjectDeleter(index, e))} />
            <Edit size={16} style={{ margin: '0 5px' }} onClick={(e) => (renamer(index, e))} />
        </div>
    )

    let allsubjects = []
    boards.forEach((oneboard, index) => {
        allsubjects = oneboard.name === currentboard ? oneboard.subjects : allsubjects
    });

    let subjectDeleter = (index, event) => {
        event.stopPropagation();
        let tempboarddata = localStorage.getItem('boards') !== null ? JSON.parse(localStorage.getItem('boards')) : boilerplate
        let allsubs = tempboarddata[boardindex].subjects
        if (allsubjects.length <= 1) {
            return;
        }
        allsubs.splice(index, 1)
        // setcurrentsubject('null')
        // alert(allsubjects)
        setcurrentsubject(allsubs[0].name)
        setrefresh(!refresh)
        setboards(tempboarddata)
        localStorage.setItem("boards", JSON.stringify(tempboarddata))

        //     console.log(allsubjects)

    }

    let newTopic = (index, e) => {
        e.stopPropagation()
        let tempboarddata = localStorage.getItem('boards') !== null ? JSON.parse(localStorage.getItem('boards')) : boilerplate
        let alltopics = tempboarddata[boardindex].subjects[index].topics
        console.log(alltopics)

        let incrementer = 1
        let subname = (incrementer) =>  ('New Topic ' + incrementer)

        while (alltopics.map(sub => sub.name).includes(subname(incrementer))) {
            incrementer++
        }

        alltopics.push({name: subname(incrementer), progress: {sample: 0}})
        setboards(tempboarddata)
        localStorage.setItem('boards', JSON.stringify(tempboarddata))
        setrefresh(!refresh)
        console.log(tempboarddata)
    }

    let renamer = (index, e) => {
        e.stopPropagation()
        setRenamerOpen(true);
        setRenameValue(boards[boardindex].subjects[index].name)
        setCurrentSubIndex(index)
    }

    let newsubcreater = () => {
        let tempboarddata = localStorage.getItem('boards') !== null ? JSON.parse(localStorage.getItem('boards')) : boilerplate
        let allsubs = tempboarddata[boardindex].subjects
        let incrementer = 1
        let subname = (incrementer) =>  ('New Subject ' + incrementer)

        while (allsubs.map(sub => sub.name).includes(subname(incrementer))) {
            incrementer++
        }

        allsubs.push({name: subname(incrementer), topics: [{name: 'sample topics', progress: {sample: 0}}]})
        setboards(tempboarddata)
        localStorage.setItem('boards', JSON.stringify(tempboarddata))
        setrefresh(!refresh)
        console.log(tempboarddata)
    }

    const renameRequest = () => {
        //now traverse thru all subs and see if not match
        let tempboard = boards
        let tempdata = boards[boardindex].subjects
        if(!tempdata.map(sub => sub.name).includes(renamevalue)){
            //proceed!
            tempdata[currentsubindex].name = renamevalue
            setboards(boards)
            localStorage.setItem('boards', JSON.stringify(boards))
            setcurrentsubject(allsubjects[0].name)
            setrefresh(!refresh)
        }
        setCurrentSubIndex(0)
        setRenameValue(false)
        setRenamerOpen(false)
    }
    let subjectChanger = (index, topicINDEX, newValue) => {
        let notDuplicate = true
        let tempboarddata = JSON.parse(localStorage.getItem('boards')) || boilerplate
        //first check if name already doesnt exist  
        tempboarddata[boardindex]['subjects'][index]['topics'].forEach(topic => {
            topic.name === newValue ? notDuplicate = true : console.log('')
        });

        notDuplicate ? tempboarddata[boardindex]['subjects'][index]['topics'][topicINDEX]['name'] = newValue : console.log('')
        setboards(tempboarddata)
        localStorage.setItem("boards", JSON.stringify(tempboarddata))
    }
    console.log(allsubjects)

    //styling
    const maindivstyles = { width: '90%', overflowY: "scroll", height: '97%', background: darkclr, borderRadius: 40, gridColumn: "-2/-1", gridRow: "1/-1", color: lightclr, fontSize: mainsize, display: 'flex', flexDirection: 'column', placeItems: 'center' }


    //to plus or minus the progress
    let progressarthmetic = (subject, topic, factor, operation) => {
        //    setboards('hello')

        //      setboards('fuck')
        //         console.log(subject, topic, factor)
        console.log(boards, boardindex)
        let inivalue = boards[boardindex].subjects[subject].topics[topic].progress[factor] - 0
        if (operation === 'plus') {
            inivalue < 1 ? inivalue += 0.1 : console.log('-->')
        } else {
            inivalue > 0 ? inivalue -= 0.1 : console.log('<--')
        }
        console.group(inivalue)
        let tempboard = JSON.parse(localStorage.getItem('boards')) || boilerplate
        tempboard[boardindex].subjects[subject].topics[topic].progress[factor] = inivalue
        console.log(tempboard)
        setboards(tempboard)
        localStorage.setItem('boards', JSON.stringify(tempboard))
    }

    //prepare items for the collapse
    let items = allsubjects.map((singlesubject, index) => {
        return {
            key: index, label: singlesubject.name,
            children: singlesubject.topics.map((onetopic, topicindex) =>
            (
                <div style={{ width: '90%', background: darkclr, borderRadius: 20, minHeight: '10vh', alignItems: 'center', margin: 10, gap: 5, padding: '1vw', display: 'grid', flexWrap: 'wrap', gridAutoFlow: 'column', overflowX: 'scroll', boxShadow: 'rgba(255, 255, 255, 0.05) 2px 1px 60px 10px' }} >
                    <div style={{ display: 'grid', gridAutoFlow: 'row', gap: 10 }}>
                        <Input onPressEnter={(e) => { subjectChanger(index, topicindex, e.target.value,) }} style={{ maxWidth: '10vw', ...inpstyles }} defaultValue={onetopic.name} />
                        <NewFactorHandler progressFactors={progressFactors} subject={singlesubject} board={currentboard} index={index} topicindex={topicindex} setboards={setboards} boardindex={boardindex} boilerplate={boilerplate} />
                    </div>

                    <div style={{ minWidth: '200px', width: '90%', maxHeight: '20vh', overflowY: 'scroll', background: secondryDARK, padding: 5, borderRadius: 20, }}>
                        {Object.entries(onetopic.progress).map((progressobj, progressindex) => (
                            <div style={{ display: 'flex', gap: 5, gridAutoFlow: 'column', alignItems: 'center' }}>
                                <p style={{ width: 'fit-content' }}>{progressobj[0]}</p>
                                <Progress percent={rounder(progressobj[1] * 100)} />
                                <PlusCircle onClick={() => (progressarthmetic(index, topicindex, progressobj[0], "plus"))} className='clickable' size={18} />
                                <MinusCircle onClick={() => (progressarthmetic(index, topicindex, progressobj[0], "minus"))} className='clickable' size={18} />
                                <Popover trigger='click' boards={boards} content={<FactorActions board={currentboard} subject={singlesubject} boardindex={boardindex} index={index} setboards={setboards} topicindex={topicindex} boilerplate={boilerplate} factor={progressobj[0]} />}>
                                    <ChevronDown className="clickable" size={18} />
                                </Popover>
                            </div>))}
                    </div>
                </div>)),
            extra: SubjectActions(index)
        }
    })

    //now return 
    return (
        <>
            <Modal title='Rename Subject' onCancel={()=>{setRenamerOpen(false)}} open={renameropen} onOk={renameRequest} >
            <Input onPressEnter={renameRequest} value={renamevalue} onChange={(e)=>(setRenameValue(e.target.value))} />
            </Modal>
            <div style={maindivstyles}>
             <div style={{display: 'grid', gridAutoFlow: 'column', alignItems: 'center', gap: 10}}>
             <h1>Subjects</h1>
                <Plus onClick={newsubcreater} style={{cursor: 'pointer'}} />
             </div>
                <Collapse bordered={false} items={items} />
            </div>
        </>
    )
}