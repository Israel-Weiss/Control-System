import { ReactElement, useState } from "react"
import { AboutEn } from "../cmps/about-en"
import { AboutHe } from "../cmps/about-he"

export const About = (): ReactElement => {
    const [trans, setTrans] = useState<boolean>(false)

    const language = (val: boolean): void => setTrans(val)

    return <div className="about">
        {!trans && < AboutEn language={language} />}
        {trans && < AboutHe language={language} />}
    </div>
}