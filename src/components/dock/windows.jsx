import { Home, HomeIcon, LayoutGrid, ListTodo, StickyNoteIcon } from "lucide-react"
import useMobile from "../../hooks/useMobile"
import { useState } from "react"

export default function Windows() {
    const { isMobile } = useMobile()
    const windows = [
        { Icon: ListTodo, active: true },
        { Icon: StickyNoteIcon }
    ]
    const homeWindow = {
        Icon: Home,
        main: true
    }

    const Parent = isMobile ? GridForWindows : DirectWindows

    return (
        <Parent>
            <WindowIcon {...homeWindow} />
            {
                windows.map(window => (
                    <WindowIcon {...window} />
                ))
            }
        </Parent>
    )
}

const DirectWindows = ({ children }) => {
    return (
        <div className="grid grid-flow-col gap-3 ">
            {children}
        </div>
    )
}

const GridForWindows = ({ children }) => {
    const [isDrawerOpen, setDrawerOpen] = useState(false)
    return (
        <IconHolder>

        <LayoutGrid onClick={() => ((setDrawerOpen(true)))} />
        </IconHolder>
    )
}

const WindowIcon = ({ Icon, main, active }) => {
    const { isMobile } = useMobile()
    return (
        <IconHolder main={main}>
            <Icon />
            {
                active && <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% w-4 h-1 rounded-2xl absolute bottom-1 left-1/2 -translate-x-1/2"></div>
            }
        </IconHolder>
    )
}

const IconHolder = ({ children, main }) => {
    return (
        <div className={`rounded-2xl relative duration-700 transition-all p-3 aspect-square hover:text-gray-800 hover:bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% cursor-pointer ${main ? ' text-gray-800 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ' : 'text-yellow-400 '}`}>
            {
                children
            }
        </div>
    )
}