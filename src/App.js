import { useEffect, useState } from 'react';
import Stats from './stats';
import { ConfigProvider } from 'antd';
import BoardDetails from './boardDetails';
import Notes from './notes';
import DetailsPanel from './DetailsPanel';
import IntroHandler from './introhandler';

function App() {
  //STATE INITIALIAZATIN

  const darkclr = 'rgb(40, 40, 40)'
  const lightclr = 'yellow'
  const secondryDARK = 'rgb(20, 20, 20)'
  const mainsize = 14
  const importantCOLOR = '#1677ff'
  const ismobile = window.innerWidth <= 600

  let boilerplate = [
    {
      name: 'CAIE 2023',
      description: `Acing The CAIEs 2023 in 3 months, Inshallah we'll do it.`,
      image: "https://images.pexels.com/photos/2911521/pexels-photo-2911521.jpeg?cs=srgb&dl=pexels-dids-2911521.jpg&fm=jpg&_gl=1*cumo4y*_ga*MTY4ODkyODE0MS4xNzAyMDM2Mzk4*_ga_8JE65Q40S6*MTcwMzA0MjE2OC43LjEuMTcwMzA0Mjk5My4wLjAuMA..",
      subjects: [
        {
          name: 'Additional Mathematics',
          topics: [
            { name: 'Quadratics', progress: { 'study': 0, 'practice': 0.5, 'calculate': 0, mock: 1 } },
            { name: 'Vectors', progress: { 'study': 0 } },

          ]
        },
        {
          name: 'Chemistry',
          topics: [
            { name: 'Energy Changes', progress: { 'practical': 0.5 } },
            { name: 'The Mole Concept', progress: { 'practice': 1, mock: 1 } }
          ]
        }
      ]
    },
    {
      name: 'CAIE 2024',
      description: `Acing The CAIEs 2023 in 3 months, Inshallah we'll do it.`,
      image: "https://images.pexels.com/photos/2911521/pexels-photo-2911521.jpeg?cs=srgb&dl=pexels-dids-2911521.jpg&fm=jpg&_gl=1*cumo4y*_ga*MTY4ODkyODE0MS4xNzAyMDM2Mzk4*_ga_8JE65Q40S6*MTcwMzA0MjE2OC43LjEuMTcwMzA0Mjk5My4wLjAuMA..",

      subjects: [
        {
          name: 'Add Maths',
          topics: [
            { name: 'Quadratics', progress: { 'study': 1, 'practice': 0.1, factor1: 0.9, factor2: 1 } },
            { name: 'Vectors', progress: { 'study': 1 } }

          ]
        },
        {
          name: 'Chemistry',
          topics: [
            { name: 'Energy Changes', progress: { 'practical': 1 } },
            { name: 'The Mole Concept', progress: { 'practice': 0.5 } }
          ]
        }
      ]
    },
    {
      name: 'CAIE 2025',
      description: `Acing The CAIEs 2023 in 3 months, Inshallah we'll do it.`,
      image: "https://images.pexels.com/photos/2911521/pexels-photo-2911521.jpeg?cs=srgb&dl=pexels-dids-2911521.jpg&fm=jpg&_gl=1*cumo4y*_ga*MTY4ODkyODE0MS4xNzAyMDM2Mzk4*_ga_8JE65Q40S6*MTcwMzA0MjE2OC43LjEuMTcwMzA0Mjk5My4wLjAuMA..",
      subjects: [
        {
          name: 'Add Maths',
          topics: [
            { name: 'Quadratics', progress: { 'study': 1, 'practice': 0.1, factor1: '0.9', factor2: '1' } },
            { name: 'Vectors', progress: { 'study': 1 } }

          ]
        },
        {
          name: 'Chemistry',
          topics: [
            { name: 'Energy Changes', progress: { 'practical': 1 } },
            { name: 'The Mole Concept', progress: { 'practice': 0.5 } }
          ]
        }
      ]
    }
  ]
  //so the first ever thing, get the boards data
  let boardsstatic = localStorage.getItem('boards') !== null ? JSON.parse(localStorage.getItem('boards')) : boilerplate
  console.log(boardsstatic)
  const [boards, setboards] = useState(boardsstatic);
  let allboards = boards.map(singleboard => {
    return singleboard.name
  })
  const [currentboard, setcurrentboard] = useState(allboards[0])

  let progressFactors = {}
  let overallProgress = {}
  let progressobject = {}
  let progressPercentage = {}

  //---------------CALCULATION, DONOT OPEN EVEN BY MISTAKE------------------

  boards.forEach(board => {
    //for each board
    console.log('CALCULATION')
    overallProgress[board.name] = {}
    progressobject[board.name] = {}
    progressPercentage[board.name] = {}
    board.subjects.forEach(subject => {
      console.log('SUBJECT TRAVERSE' + JSON.stringify(overallProgress))
      overallProgress[board.name][subject.name] = { topics: {} }
      //for each subject
      let obtained = {}
      let total = {}
      //topic foreach
      let papersMAX = 0
      let papersDONE = 0

      progressobject[board.name][subject.name] = {}
      subject.topics.forEach((topic, topicindex) => {


        //for each topic
        Object.keys(topic.progress).forEach(progress => {
          //for each progress
          //see if u want to add it to progress factor
          let progressobject = (progressFactors[board.name] && progressFactors[board.name][progress]) || { uptillnow: 0, max: 0, composition: {} }
          let newprogress = topic['progress'][progress]
          let maincomposition = progressobject.composition
          let compositionoftopic = progressobject.composition[subject.name] || { overall: 0, topics: {} }
          let newsubprogress = obtained[progress] - 0 || 0    //progress obtained
          let newsubmax = total[progress] - 0 || 0                       //max progress that can be obtained

          obtained[progress] = newsubprogress + (newprogress - 0)
          total[progress] = newsubmax + 1

          //THE COMPOSITION OF FIELDS
          compositionoftopic.overall += newprogress
          if (compositionoftopic.topics[topic.name]) {
            compositionoftopic.topics[topic.name] += newprogress
          } else {
            compositionoftopic.topics[topic.name] = newprogress
          }

          maincomposition[subject.name] = compositionoftopic

          progressobject = { uptillnow: progressobject.uptillnow + newprogress, max: progressobject.max + 1, composition: maincomposition }


          //CHANGE THE ORIGINAL OBJECT
          if (progressFactors[board.name]) {
            progressFactors[board.name][progress] = progressobject
          } else {
            progressFactors[board.name] = {}
            progressFactors[board.name][progress] = progressobject
          }

          console.log(progress, topic['progress'][progress])
        })



        ////////////////////////////////////////

        //WE ALSO WANT THE OVERALL PROGRESS OF THE SUBJECTS
        let topicsum = Object.values(topic.progress).reduce((acc, newval) => {
          return acc + newval
        })
        let topiccount = Object.values(topic.progress).length

        let topiccompletion = topicsum / topiccount
        papersMAX += topiccount
        papersDONE += topicsum
        overallProgress[board.name][subject.name]['topics'][topic.name] = topiccompletion


      })

      let alltopicsprogress = overallProgress[board.name][subject.name].topics
      console.log(papersMAX, papersDONE)
      let allTopicsSum = papersDONE / papersMAX
      overallProgress[board.name][subject.name]['overall'] = allTopicsSum

      //NOW, FROM OBTAINED AND TOTAL, GET THE PERCENTAGE
      let progresspercentagebysubject = {}
      Object.keys(obtained).forEach(oneprogress => {
        progresspercentagebysubject[oneprogress] = obtained[oneprogress] / total[oneprogress]
      })
      console.log(progresspercentagebysubject)
      progressPercentage[board.name][subject.name] = progresspercentagebysubject

    })
  })

  //------------------------------------------------------------------------  
  console.log(progressFactors)
  console.log(overallProgress)
  console.log(currentboard)
  console.log(progressPercentage)

  const allsubects = Object.keys(overallProgress[currentboard])
  const [currentsubject, setcurrentsubject] = useState(allsubects[0])
  const [refresh, setrefresh] = useState(true)
  const rounder = (index) => {
    return Math.round(index * 10) / 10;
  }
  const newtoapp = () => {
    return localStorage.getItem('boards2') === null
  }

  // useEffect(()=> {
  //   let allsubects = Object.keys(overallProgress[currentboard])
  //   setcurrentsubject(allsubects[0]);
  //   return
  // }, [currentboard])

  let boardindex = 0
  //calulation to simpify representation
  boards.forEach((oneboard, index) => {
    boardindex = oneboard.name === currentboard ? index : boardindex
  });

  return (

    <ConfigProvider theme={{
      components: {
        Progress: {
          colorText: lightclr,
          circleTextFontSize: mainsize,
          remainingColor: 'rgb(150,150, 150, 0.1)'
        },
        Collapse: {
          headerBg: secondryDARK,
          borderRadius: 40,
          colorText: lightclr
        },
        Input: {
          colorBgContainer: darkclr,
          colorBorder: lightclr,
          colorPrimaryBorderHover: lightclr,
          hoverBorderColor: lightclr,
          colorTextPlaceholder: 'rgb(230, 230, 230, 0.5)'
        },
        Modal: {
          contentBg: secondryDARK,
          headerBg: secondryDARK,
          colorIcon: lightclr
        },

        Button: {
          colorPrimaryBg: lightclr,
          colorBgBase: lightclr,
          primaryColor: darkclr,
          defaultBg: darkclr
        },
        Select: {
          selectorBg: darkclr,
          optionActiveBg: darkclr,
          colorTextPlaceholder: lightclr,
          borderRadius: 10,
          colorBorder: secondryDARK
        }


      },
      token: {
        colorText: lightclr,
        colorLink: lightclr,
        colorPrimary: lightclr,
        colorBorder: 'rgb(230, 230, 230, 0.5)',
        colorBgContainer: darkclr,
        colorBgElevated: secondryDARK,
        colorTextDescription: lightclr
      }
    }}>

      {
        ismobile ? (
          <div style={{ display: 'grid', gridAutoFlow: 'column', scrollSnapType: 'x mandatory', alignItems: 'center', width: '100vw', height: '100%', gridColumn: '1/3', gridRow: '1/2', gridTemplateRows: '100%', gridTemplateColumns: '100vw 100vw', overflowX: 'scroll' }}>
            <Stats data={progressFactors} ismobile={ismobile} refresh={refresh} allsubects={allsubects} rounder={rounder} currentsubject={currentsubject} setcurrentsubject={setcurrentsubject} mainsize={mainsize} secondryDARK={secondryDARK} currentboard={currentboard} darkclr={darkclr} lightclr={lightclr} overall={overallProgress} progressSubject={progressPercentage} />
            <DetailsPanel {...{ allboards, ismobile, refresh, setrefresh, setboards, boilerplate, progressFactors, rounder, currentboard, setcurrentboard, currentsubject, setcurrentsubject, boards, lightclr, secondryDARK, darkclr, importantCOLOR, mainsize, boardindex }} />
          </div>) : (
          <>
            <Stats data={progressFactors} ismobile={ismobile} refresh={refresh} allsubects={allsubects} rounder={rounder} currentsubject={currentsubject} setcurrentsubject={setcurrentsubject} mainsize={mainsize} secondryDARK={secondryDARK} currentboard={currentboard} darkclr={darkclr} lightclr={lightclr} overall={overallProgress} progressSubject={progressPercentage} />
            <DetailsPanel {...{ allboards, ismobile, refresh, setrefresh, setboards, boilerplate, progressFactors, rounder, currentboard, setcurrentboard, currentsubject, setcurrentsubject, boards, lightclr, secondryDARK, darkclr, importantCOLOR, mainsize, boardindex }} />
          </>
        )

      }
      {newtoapp() ? 
    //  <IntroHandler {...ismobile } />
    ''
     : ''
}
      <BoardDetails {...{ allboards, ismobile, setboards, progressFactors, boardindex, currentboard, boilerplate, setcurrentboard, currentsubject, setcurrentsubject, boards, lightclr, secondryDARK, darkclr, importantCOLOR, mainsize }} />
      <Notes notestype='notes' accentclr={lightclr} darkclr={darkclr} secondryDARK={secondryDARK} mainsize={mainsize} />
      <Notes notestype='tasks' accentclr={lightclr} darkclr={darkclr} secondryDARK={secondryDARK} mainsize={mainsize} />
    </ConfigProvider>);
}

export default App;
