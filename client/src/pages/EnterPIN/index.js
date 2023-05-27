import React from 'react';
import './index.css';
import {
    Image,
    Input,
    Button
} from 'antd';

import EnterBackground from '../../assets/imgs/Enter.jpg';
import logo from '../../assets/imgs/logo.png';

const EnterPIN = () => {
    console.log(EnterBackground);
    return (
        <React.Fragment>
            <div
                className='play-container'
                style={{
                    backgroundImage: `url(${EnterBackground})`
                }}
            >
                <Image
                    style={{
                        borderRadius: 10,
                        marginBottom: "20px",
                    }}
                    width={100}
                    src={logo}
                    preview={false}
                />
                <div className='pin-input-container'>
                    <Input
                        placeholder={"Game PIN"}
                        style={{
                            marginBottom: "10px",
                            height: "50px",
                            fontWeight: "700",
                            fontSize: "18px",
                        }}
                    />
                    <Button
                        style={{
                            width: '100%',
                            backgroundColor: "rgb(51, 51, 51)",
                            color: "white",
                            height: "50px",
                            fontSize: "20px"
                        }}
                    >
                        Enter
                    </Button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default EnterPIN;