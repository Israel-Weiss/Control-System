import { ReactElement } from "react"

interface props { floor: string, enterFloor: (fl: string) => void }

export function FloorButton({ floor, enterFloor }: props): ReactElement {

    return <button className="floor-button" onClick={() => enterFloor('' + floor)}>
        FLOOR {+floor}
    </button>
}
