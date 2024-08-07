import { ReactFlowProvider } from "@xyflow/react";
import { GameLoopCanvas } from "./GameLoopCanvas";




export default function GameLoopPage() {
return (
  <ReactFlowProvider>
    <GameLoopCanvas />
        </ReactFlowProvider>
)
}