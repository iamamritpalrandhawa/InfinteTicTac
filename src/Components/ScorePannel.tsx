import { useSelector } from "react-redux";
import { RootState } from "../Store/store";

export default function ScorePannel() {
    const { xIsNext } = useSelector((state: RootState) => state.game);
    const { score } = useSelector((state: RootState) => state.game);
    return (
        <div className="bg-emerald-100 h-16 flex justify-between items-center px-6 relative top-24 w-[350px] rounded-2xl">
            <div className="text-lg font-mono text-teal-900">
                <div className={`text-lg font-mono text-teal-900 ${xIsNext ? "opacity-100" : "opacity-50"}`}>
                    PLAYER (X)
                </div>
                <div className={`text-lg font-mono text-teal-900 ${xIsNext ? "opacity-100" : "opacity-50"}`}>
                    {score.X}
                </div>
            </div>
            <div className="text-lg font-mono text-teal-900">
                <div className="text-lg font-mono text-teal-900 opacity-100">
                    TIE
                </div>
                <div className="text-lg font-mono text-teal-900 opacity-100">
                    {score.TIE}
                </div>
            </div>
            <div className="text-lg font-mono text-teal-900">
                <div className={`text-lg font-mono text-teal-900 ${!xIsNext ? "opacity-100" : "opacity-50"}`}>
                    PLAYER (O)
                </div>
                <div className={`text-lg font-mono text-teal-900 ${!xIsNext ? "opacity-100" : "opacity-50"}`}>
                    {score.O}
                </div>
            </div>
        </div>
    );
}
