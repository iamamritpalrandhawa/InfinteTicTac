import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../Store/store"
import { restart, reset, newGame } from "../Store/GameSlice"

function Header() {
    const dispatch = useDispatch()
    const game = useSelector((state: RootState) => state.game)
    return (
        <div className="bg-emerald-100 h-16 flex justify-between items-center px-6">
            <h1 className="text-xl font-mono text-teal-900">
                Tic Tac Twist
            </h1>
            <div className="w-[48vw] flex justify-center items-start md:w-[30vw] ">
                {
                    !game.startGame ?
                        <button className="text-lg font-mono text-teal-900 border-2 border-teal-900 px-4 py-1 rounded-lg"
                            onClick={() => {
                                dispatch(newGame());
                            }}>
                            New Game
                        </button> :
                        <div >
                            <button className="text-lg font-mono text-teal-900 border-2 border-teal-900 px-4 py-1 rounded-lg"
                                onClick={() => {
                                    dispatch(restart());
                                }}>
                                Restart
                            </button>
                            <button className="text-lg font-mono text-teal-900 border-2 border-teal-900 px-4 py-1 rounded-lg mx-4"
                                onClick={() => {
                                    dispatch(reset());
                                }}>
                                Reset
                            </button>
                        </div>
                }
            </div>


        </div>
    )
}

export default Header