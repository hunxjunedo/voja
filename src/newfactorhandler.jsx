import { AutoComplete } from "antd";
import { useState } from "react";
export default function NewFactorHandler({ board, progressFactors, boardindex, subject, index, setboards, topicindex, factor, boilerplate }){
    const [newval, setnewval] = useState('')
    let allfactors = subject.topics[topicindex].progress
    let createnew = (val) => {
        //first check if not exist in current subject
        let found = Object.keys(allfactors).includes(val)
        if(found){
            return;
        }else {
            allfactors[val] = 0
            console.log(subject)
            let tempdata = localStorage.getItem('boards') !== null ? JSON.parse(localStorage.getItem('boards')) : boilerplate
            console.log(tempdata[boardindex])
            tempdata[boardindex].subjects[index] = subject
            localStorage.setItem('boards', JSON.stringify(tempdata))
            setboards(tempdata)
            setnewval('')
        }

    }
    //filter out and dont show the factors already in the subject
    let factorsToShow = [];
     Object.keys(progressFactors[board]).forEach(factor => { !Object.keys(allfactors).includes(factor) ? factorsToShow.push(factor) : console.log('') } )
    console.log(factorsToShow)
    return <AutoComplete value={newval} onChange={(value) => {setnewval(value)}}  onKeyDown={(e)=>(e.key === 'Enter' ? createnew(newval) : console.log())} onSelect={(value)=>(createnew(value))} placeholder='create new factor' options={factorsToShow.map(factor=>( {value: factor, label: factor}))} filterOption={true} />
}