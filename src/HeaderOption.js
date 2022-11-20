import React from 'react'
import './HeaderOption.css'

function HeaderOption({ Avatar, title, Icon, }) {
    return (
        <div className="HeaderOption">

            {Icon && <Icon className='HeaderOption__icon' />}
            {Avatar && (<avatar className='HeaderOption__icon' src={Avatar} /> //src instead for avatar
            )}
            <h3 className="HeaderOption__title">{title}</h3>
        </div>
    )
}

export default HeaderOption;