// import loading from "./../assets/Loading.gif"
import React, { FC } from "react"
import loading from "./../assets/Loading.gif"

const Preloader = ({ isFetching }) => {
    return (
        <>
            {isFetching ? <img src={loading} role={'main'} alt="preloader" /> : null}
        </>
    )
}
export default Preloader