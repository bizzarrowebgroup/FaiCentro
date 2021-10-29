import React, { createContext, useRef, useState } from "react";

const AppContext = createContext({});

const AppProvider = (props) => {
    const [shops, setShops] = useState(undefined);

    return (
        <AppContext.Provider
            value={{
                shops,
                setShops
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };