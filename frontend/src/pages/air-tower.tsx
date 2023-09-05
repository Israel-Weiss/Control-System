import { ReactElement, useState } from "react"
import { AirList } from "../cmps/air/air-list"
import { FloorMenu } from "../cmps/air/floor-menu"

interface Props {tower: string}

export function AirTower({ tower }: Props): ReactElement {

    const [floor, setFloor] = useState<string>('')
    
    const enterFloor = (fl: string): void => {
        const flNum: number = +fl
        if (flNum < 0 || flNum > 39) return
        setFloor('fl' + fl)
    }

    const exitFloor = (): void => setFloor('')

    return <div className="air-tower">

        {!floor && <FloorMenu tower={tower} exitFloor={exitFloor} enterFloor={enterFloor} />}

        {floor && <AirList tower={tower} floor={floor} exitFloor={exitFloor} enterFloor={enterFloor} />}
    </div>
}