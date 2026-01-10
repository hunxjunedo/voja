import { ChevronLeft, ChevronRight, GithubIcon } from "lucide-react"
import { useState } from "react"

export default function Credit(){
    const [open, SetOpen] = useState(true)
    const toggleState = ()=>(SetOpen(v=>!v))
    return <div style={{
            position: 'absolute',
            right: 20,
            bottom:20,
            justifyItems: 'center',
            alignItems: 'center',
            padding: 15,
            color: 'white',
            gap: 14,
            display: 'flex',
            borderRadius: 20,
            background: 'rgb(20, 20, 20, 0.7)',
            backdropFilter: 'blur(10px)'
        }}>
            {
                open ? ( <><ChevronRight style={{cursor: 'pointer'}} onClick={toggleState} /> <p style={{fontWeight: 'bolder', margin: 0}}>Hunain Ahmed</p></>) : (<ChevronLeft style={{cursor: 'pointer'}} onClick={toggleState} />)
            }
         <a href="https://www.github.com/hunxjunedo">
               <div style={{
                display:'grid',
                borderRadius:'50%',
                alignItems: 'center',
                justifyItems: 'center',
                padding: 2,
                width: 20,
                height: 20,
                aspectRatio: '1/1',
                background: 'white'
            }}>
                <GithubIcon color="black" size={15} />
            </div>
         </a>
        </div>
    
}