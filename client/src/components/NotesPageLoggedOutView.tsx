import React from 'react'
import styleUtils from "../styles/utils.module.css";


function NotesPageLoggedOutView() {
  return (
    <h3 className={`${styleUtils.blockCenter} ${styleUtils.flexCenter} ${styleUtils.whiteText}`}>Please log in to see your notes!</h3>
  )
}

export default NotesPageLoggedOutView