
import { Progress, Select } from "antd"
import { MinusCircle, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react"
import Marquee from "react-fast-marquee";


export default function Stats(props) {

    //THEME

    //PROPS
    const { data, rounder, overall, ismobile, currentboard, darkclr, lightclr, mainsize, progressSubject, secondryDARK, allsubects, currentsubject, setcurrentsubject } = props
    //STATES


    //INITIALS
    let overallcompleted = 0
    let max = 0
    console.log(overall[currentboard])
    let alltopics = overall[currentboard] && overall[currentboard][currentsubject] ? overall[currentboard][currentsubject].topics : []


    
    Object.values(data[currentboard]).forEach(onetitle => {
        overallcompleted += onetitle.uptillnow
        max += onetitle.max
    })

    console.log(overallcompleted, max)
    overallcompleted = (overallcompleted / max) * 100;
    let overallleft = 100 - overallcompleted

 





    const genericstatsholder = { width: '90%', height: '90%', padding: 5, background: secondryDARK, borderRadius: 40, display: 'grid', alignItems: 'center', justifyItems: 'center', color: lightclr, gridAutoFlow: 'column', alignItems: 'center', justifyItems: 'center',   padding: '1vw', gap: 10, overflow: ismobile ? 'clip scroll' : 'scroll clip' }
  
    let progressSIZE = ismobile ? 70 : 120
    const lengthCONSTANT = ismobile ? 30 : 13
    const divstyles = {
        background: darkclr,
        gridColumn: ismobile ? '1/2' : '1/4',
        justifySelf: ismobile ? 'center' : 'start',
        borderRadius: 40,
        scrollSnapAlign: 'start',
        maxHeight: ismobile ? 'auto' : '48vh',
        width: `${ismobile ? 90 : 98}%`,
        height: '90%',
        display: 'grid',
        gridAutoFlow: ismobile ? 'row' : 'column',
        justifyItems: 'center',
        alignItems: 'center',
        position: "relative",
        fontSize: mainsize,
        padding: '1vw'
    }

    const genericinnerdiv = { width: ismobile ? '70%' : 100, height: ismobile ? 200 : '90%', overflowY: "auto", overflowX: 'hidden', paddingRight: '5px', boxShadow: "rgb(255 255 255 / 5%) 2px 1px 20px 10px", padding: '0 15px', borderRadius: 20, color: lightclr, }
    return (
        <div style={divstyles}>

            <div style={{ ...genericstatsholder }} >
                <div style={{ maxWidth: '90%', height: '90%', display: 'grid' }}>
                    {window.innerWidth <= 900 ? <h3>Overall</h3> : <h2>Overall</h2>}
                    <Progress percent={rounder(overallcompleted)} size={progressSIZE} type="dashboard" />
                </div>
                <div style={{...genericinnerdiv}}>
                    {
                        Object.keys(data[currentboard]).map(oneprogressfactor => (
                            <>
                                <h5>{oneprogressfactor}</h5>
                                <Progress percent={rounder(data[currentboard][oneprogressfactor].uptillnow * 100 / data[currentboard][oneprogressfactor].max)} />

                            </>
                        ))
                    }
                </div>
            </div>
            <div className="clickable" onClick={(e) => { console.log(e); e.target.classList[0] !== 'lucide' ? allsubects.indexOf(currentsubject) >= allsubects.length - 1 || allsubects.indexOf(currentsubject) < 0 ? setcurrentsubject(allsubects[0]) : setcurrentsubject(allsubects[allsubects.indexOf(currentsubject) + 1]) : console.log('hell') }} style={{ ...genericstatsholder, gridAutoFlow: ismobile ? 'row' : 'column', cursor: 'pointer', overflowX: 'scroll', gap: 10, display: 'grid', gridTemplateRows: ismobile  ? 'auto' : '100%', gridTemplateColumns: 'repeat(2, 1fr)', color: lightclr }} >
                <div style={{ height: '90%', width: 'fit-content', display: 'grid', gridColumn:  ismobile ? '1/-1' : '1/2', justifyItems: 'center', alignItems: 'center' }}>
                    {
                        currentsubject.length > lengthCONSTANT ?
                            <Marquee pauseOnHover={true} style={{ width: `${ismobile ? 70 : 10}vw`, padding: '15px 0px' }}>
                                <strong>  <h3 className="italic">{currentsubject + "  "}</h3> </strong>
                            </Marquee> :
                            <strong>  <h3 className="italic">{currentsubject}</h3> </strong>
                    }
                    <Progress style={{padding: '10px 0'}} size={ismobile ? 120 : progressSIZE} percent={rounder(overall[currentboard][currentsubject].overall * 100)} type="dashboard" />

                </div>
                <div style={{...genericinnerdiv, }}>
                    <h3>Topics</h3>
                    {
                        Object.keys(alltopics).map(singletopic => (
                            <>
                                <h5>{singletopic}</h5>
                                <Progress size={"small"} percent={rounder(alltopics[singletopic] * 100)} />

                            </>
                        ))
                    }
                </div>

                <div style={{...genericinnerdiv, }}>
                    <h3>Factors</h3>
                    {
                        Object.keys(progressSubject[currentboard][currentsubject]).map(singleprogress => (
                            <>
                                <h5>{singleprogress}</h5>
                                <Progress size={"small"} percent={Math.round(progressSubject[currentboard][currentsubject][singleprogress] * 1000) / 10} />

                            </>
                        ))
                    }
                </div>
            </div>
            {/* <div className="main" style={{ width: '90%', height: '90%', padding: 5, background: 'rgb(20, 20, 20)', borderRadius: 40, display: 'grid', gridColumn: '4/6', gridTemplateRows: '20% 80%', gridAutoFlow: 'column'}} >
<h1>hello</h1>
<div style={{width: '100%', display: 'grid', gridTemplateRows: 'repeat(2, 1fr)',gridAutoFlow: 'column'}}>
{
    Object.keys(data[currentboard]).map((factor, index) => {
        let compositionarray = []
        Object.keys(data[currentboard][factor].composition).forEach((subject, index)=>{
             compositionarray.push({type: subject, value: (data[currentboard][factor].composition[subject].overall / data[currentboard][factor].uptillnow)*100})
        })
        return (

              <Pie style={{width: '90%', height: '90%'}} {...configprovider(compositionarray)}></Pie>
      
        )
    })
}
</div>
</div> */}
        </div>
    )
}