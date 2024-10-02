import Dock from "./components/dock/dock";
import useSync from "./hooks/useSync";
import { useSelector } from "react-redux";

export default function App () {
    useSync(useSelector);
    return (
        <div className="w-screen h-screen m-0 bg-gray-950">
            <Dock />
        </div>
    )
}