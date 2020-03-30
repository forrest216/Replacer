import React, { useState, useEffect } from 'react';
import './Log.css';

const { ipcRenderer } = window.require('electron');

const Log = () => {
    const [log, setLog] = useState([]);

    useEffect(() => {
        ipcRenderer.on('log-data', (e, arg) => {
            setLog(arg);
        })
    })

        return (
            <div className="Log">
                <div className="button-container">
                    <button 
                        type="button" 
                        className="btn btn-light" 
                        onClick={() => ipcRenderer.send('hide-log')}
                        >Close Log
                    </button>
                </div>
                <div className="output-container">
                    {log.map(((line, idx) =>
                        <p
                            key={idx}
                            style={{
                                color: (line.color === 'black' ? 'white' : line.color)
                            }}>
                            {line.text}
                        </p>
                    ))}
                </div>
            </div>
        );
}

export default Log;