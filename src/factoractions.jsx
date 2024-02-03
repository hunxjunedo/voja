import { Avatar, Input, List, Modal } from "antd";
import { useEffect, useState } from "react";

export default function FactorActions({ board, boardindex, subject, index, setboards, topicindex, factor, boilerplate }) {
    console.log(board, subject, index, topicindex, factor)
    const [allfactors, setallfactros] = useState({})
    useEffect(()=>{

        let allfactors = subject.topics[topicindex].progress
        setallfactros(allfactors)
        setnewval(factor)

    }, [factor])
    const [modalOPEN, setMODALOPEN] = useState(false)
    const [newval, setnewval] = useState('')
    //go to subjectobj
    let implementChanges = () => {
        let tempdata = localStorage.getItem('boards') !== null ? JSON.parse(localStorage.getItem('boards')) : boilerplate
        tempdata[boardindex].subjects[index] = subject
        localStorage.setItem('boards', JSON.stringify(tempdata))
        setboards(tempdata)
    }
    let handleRENAME = () => {
        setMODALOPEN(false)
        let alreadyhaveit = false
        Object.keys(allfactors).forEach(singlefactor => {
             singlefactor === newval ? alreadyhaveit = true : console.log('')
        });
        if(alreadyhaveit){
            return
        }else{
            let tempholder = allfactors[factor]
            delete allfactors[factor]
            allfactors[newval] = tempholder
            implementChanges()
            setnewval(factor)
        }
    }
    console.log(allfactors)
    //send the actions: delete, rename
    const data = [
        {
            description: 'delete factor',
            reciever: () => {
                //tarversal and removal
                if(Object.keys(allfactors).length > 1){
                    delete allfactors[factor]
                }  else{
                    return
                }
                //now implement
                implementChanges()
               
            }

        },
        {
            description: 'rename factor',
            reciever: () => {
                //first check if same topic doesnt have it
                setMODALOPEN(true)
         
            }
        }
    ];
    return (
        <>
            <Modal open={modalOPEN} title={`rename factor ${newval}`} onOk={handleRENAME} onCancel={()=>(setMODALOPEN(false))}>
        <Input onChange={(e)=>(setnewval(e.target.value))} onPressEnter={handleRENAME} value={newval} />
            </Modal>
            <List
                style={{ minWidth: '10vw' }}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item onClick={item.reciever} style={{ cursor: 'pointer' }}>
                        <List.Item.Meta

                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </>
    )
}