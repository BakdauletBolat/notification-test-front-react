
import { useEffect, useState } from 'react';

import NotificationItem from './notification-item.js';

const NotificationList = ({notifications}) => {

    
    return (
        <>
            <div className='max-width-30'>
            {notifications?.map(notification=><NotificationItem key={notification._id} item={notification}></NotificationItem>)}
            </div>
            <div style={{
                height:100
            }}></div>
        </>     
    )
}

export default NotificationList;