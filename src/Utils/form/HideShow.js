import React from 'react'

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
        <div className='relative' style={{position:"relative"}}>
            {children}
            <button type='button' className="absolute bottom-1 top-1 right-1" style={{    position: "absolute",
    top: "13%",
    right: "3%",}} onClick={handleClick}>
                {passwordShown ? <span>Hide</span> : <span>Show</span>}
            </button >
        </div>
    )
}

export default HideShow