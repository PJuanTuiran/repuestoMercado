import React, { useState, useEffect } from "react";

function index(props) {
    const [device, setDevice] = useState("");
    const [deviceLink, setDeviceLink] = useState("");

    useEffect(() => {
        const handleDeviceDetection = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            let array = userAgent.split(" ");
            console.log("XXXXXXX : ", array);
            setDevice(userAgent);
            const isMobile =
                /iphone|ipad|ipod|android|blackberry|windows phone/g.test(
                    userAgent
                );
            const isTablet =
                /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(
                    userAgent
                );

            if (isMobile) {
                setDevice(
                    "Mobile" +
                        " " +
                        array[1] +
                        " " +
                        array[2] +
                        array[3] +
                        array[4] +
                        array[5]
                );
            } else if (isTablet) {
                setDevice(
                    "Tablet" +
                        " " +
                        array[1] +
                        " " +
                        array[2] +
                        array[3] +
                        array[4] +
                        array[5]
                );
            } else {
                setDevice(
                    "Desktop" +
                        " " +
                        array[1] +
                        " " +
                        array[2] +
                        array[3] +
                        array[4] +
                        array[5]
                );
            }
        };

        handleDeviceDetection();
        window.addEventListener("resize", handleDeviceDetection);

        return () => {
            window.removeEventListener("resize", handleDeviceDetection);
        };
    }, []);

    console.log("DISPOSITIVOS : ", deviceLink);

    return (
        <div>
            <h4> Dispositivos Vinculados : </h4>
            {device}
        </div>
    );
}

export default index;
