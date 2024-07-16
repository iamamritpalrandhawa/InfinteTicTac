import { useDispatch, useSelector } from "react-redux";
import { clickSquare, twist } from "../Store/GameSlice";
import { useState } from "react";
import ScorePannel from "./ScorePannel";
import { useEffect, useRef } from "react";
import { RootState } from "../Store/store";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";


export default function GamePannel() {
    const dispatch = useDispatch();
    const game = useSelector((state: RootState) => state.game);
    const lineref = useRef<HTMLDivElement>(null);
    const [fireworksInstance, setFireworksInstance] = useState<any | null>(null);
    const handleLine = () => {
        if (game.winner) {
            const line = lineref.current!;
            line.classList.remove("hidden");
            const winningCombination = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];

            winningCombination.forEach((combination) => {
                const [a, b, c] = combination;
                if (game.squares[a] && game.squares[a] === game.squares[b] && game.squares[a] === game.squares[c]) {
                    line.style.top = "";
                    line.style.left = "";
                    line.style.right = "";
                    line.style.transform = "";

                    if (a === 0 && b === 1 && c === 2) {
                        line.style.top = "18%";
                        line.style.transform = "translateY(-50%)";
                    } else if (a === 3 && b === 4 && c === 5) {
                        line.style.top = "50%";
                        line.style.transform = "translateY(-50%)";
                    } else if (a === 6 && b === 7 && c === 8) {
                        line.style.top = "83.33%";
                        line.style.transform = "translateY(-50%)";
                    } else if (a === 0 && b === 3 && c === 6) {
                        line.style.left = "19%";
                        line.style.top = "50%";
                        line.style.transform = "translateX(-50%) rotate(90deg)";
                    } else if (a === 1 && b === 4 && c === 7) {
                        line.style.left = "50%";
                        line.style.top = "50%";
                        line.style.transform = "translateX(-50%) rotate(90deg)";
                    } else if (a === 2 && b === 5 && c === 8) {
                        line.style.left = "82%";
                        line.style.top = "50%";
                        line.style.transform = "translateX(-50%) rotate(90deg)";
                    } else if (a === 0 && b === 4 && c === 8) {
                        line.style.top = "50%";
                        line.style.transform = "rotate(45deg)";
                    } else if (a === 2 && b === 4 && c === 6) {
                        line.style.top = "50%";
                        line.style.transform = " rotate(-45deg)";
                    }
                }
            });
        }
    };

    useEffect(() => {
        handleLine();
    }, [game.winner]);
    useEffect(() => {
        handleLine();
        if (game.winner && fireworksInstance) {
            fireworksInstance.run({ speed: 1, duration: 3000 });
            setTimeout(() => fireworksInstance.stop(), 5000);

        }
    }, [game.winner, fireworksInstance]);
    useEffect(() => {
        if (!game.winner)
            lineref.current!.classList.add("hidden");
    }, [game.winner]);
    useEffect(() => {
        if (game.winner === null)
            dispatch(twist());
        console.log(game.squares);
    }, [game.squares]);

    return (
        <div className="bg-emerald-50 h-[92vh] w-full flex justify-center items-center  flex-col">
            <Fireworks
                onInit={(instance: any) => {
                    setFireworksInstance(instance.conductor);
                }}
            />
            <div className="bg-emerald-100 h-96 w-96 grid grid-cols-3 grid-rows-3 gap-3 rounded-2xl border-l-emerald-300 p-4 relative">
                <div
                    className="border-b-4 bg-orange-950 absolute w-full h-[4px] transition-transform duration-300 z-10 hidden"
                    ref={lineref}
                ></div>
                {game.squares.map((square: string | null, index: number) => {
                    return (
                        <div
                            key={index}
                            className="bg-emerald-200 flex justify-center items-center text-3xl font-semibold cursor-pointer hover:scale-105 rounded-2xl"
                            onClick={() => {
                                if (game.startGame)
                                    dispatch(clickSquare(index));
                            }}
                        >
                            {square}
                        </div>
                    );
                })}
            </div>
            <ScorePannel />
        </div>
    );
}
