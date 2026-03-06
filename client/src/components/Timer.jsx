import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function Timer ({ timeLeft, totalTime }){
    const percentage = Math.round((timeLeft / totalTime) * 100)

    return (
        <div className='w-32 h-32 mx-auto'>
            <CircularProgressbar
                value={percentage}
                text={`${timeLeft}s`}
                styles={buildStyles({
                    textSize: '28px',
                    pathColor: '#0d9488',
                    textColor: '#0d9488',
                    trailColor: '#e5e7eb',
                })}
            />
        </div>
    )
}

export default Timer