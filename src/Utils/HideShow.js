import React from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const HideShow = ({ passwordShown, setPasswordShown, children }) => {

    const handleClick = () => {
        if (passwordShown) {
            setPasswordShown(false)
        }
        else {
            setPasswordShown(true)
        }
    }

    return (
        <div className='relative' style={{ position: "relative" }}>
            {children}
            <button type='button' className="absolute bottom-1 top-1 right-1" style={{
                position: "absolute",
                top: "13%",
                right: "3%",
                background:"none",
                border:"0"
            }} onClick={handleClick}>
                {passwordShown ?<AiFillEye style={{fontSize:"24px"}}/>  : <AiFillEyeInvisible style={{fontSize:"24px"}}/>}
            </button >
        </div>
    )
}

export default HideShow