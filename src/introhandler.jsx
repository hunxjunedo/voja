import { Button, Image } from "antd"
import { ParkingMeterIcon } from "lucide-react"

export default function IntroHandler({ ismobile }) {
    const Heading = ({ text, size, Icon }) => {
        let fontSize = 0
        if(size === 'large'){
            fontSize = 45
        }else if(size === 'medium'){
            fontSize = 25
        }else{
            fontSize = 20
        }
        return (
            <div className="filler" style={{ display: 'grid', gridAutoFlow: 'column',  alignItems:'center', backgroundImage: 'linear-gradient(to right, #feac5e, #c779d0, #4bc0c8)' }}>
              <>
              {Icon ?  <Icon color='#c779d0' /> : ''} <h1  style={{ fontSize, textAlign: 'center', padding: '0 10px' }}>{text}</h1>
              </>
            </div>
        )
    }
    const frames = [
        { title: 'Effeciancy', src: './progress.png', text: 'lorem ipsum ' },
        { title: 'Effeciancy', src: './progress.png', text: 'lorem ipsum ' },
        { title: 'Effeciancy', src: './progress.png', text: 'lorem ipsum ' },
      
    ]
    const buttonstyles = {
        width: '10vw',
        fontWeight: '900',
        borderRadius: 20,
        border: 'none',
        outline: 'none',
        padding: 20,
        cursor: 'pointer',
        
    }
    return (
        <div style={{ zIndex: 10, width: '100vw', height: '100vh', position: 'absolute', background: 'rgb(10, 10, 10, 0.8' }}>
            <div style={{ position: 'absolute', transition: '1s', top : 'calc(50% - 40vh)', opacity: 1, display: 'flex', flexFlow: 'column', justifyItems: 'center', width: '50vw', left: 'calc(50% - 25vw)', background: 'radial-gradient(156.99% 150.54% at 50% 50%, rgba(27, 115, 237, 0.3) 0%, rgba(194, 46, 255, 0.06) 25.67%)', backdropFilter: 'blur(15px)', border: '1px solid rgb(255, 255, 255, 0.5)', borderRadius: 70, height: '80vh', zIndex: 1, }}>
                <Heading size='large' text="Hey there!" />
                <div style={{display: 'grid', justifyItems: 'center',  alignItems: 'center', height: '40vh', gridAutoFlow: 'column', gridTemplateColumns: '33% 33% 33%', gridTemplateRows: '100%'}}>
                    {
                        frames.map(oneframe => (
                            <div style={{width: '90%', padding: '10px 0', background: 'rgb(30, 30, 30, 0.7)', borderRadius: 25, backdropFilter: ' saturate(300%) blur(14px)', alignItems:'center', gridTemplateRows: '20% 60% 20%', height: '90%', display: 'grid', justifyItems: 'center'}}>
                                <Heading Icon={ParkingMeterIcon} size='medium' text={oneframe.title} />
                                <img style={{maxHeight: '100%', borderRadius: 20, border: '1px solid rgb(255, 255, 255, 0.5)'}} src={oneframe.src} />
                                <p>{oneframe.text}</p>
                            </div>
                        ))
                    }
                </div>
                <button style={buttonstyles}>Get Started</button>
            </div>
        </div>
    )
}