import { Button, Space, notification,Input,Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import NotificationService from '../services/NotificationService';
import { useState, useEffect } from "react";

const CreateNotifications = ({socket,
                             notifications,setNotifications,
                            inputValue,itsOk,messageNotification,
                            setMessageNotification}) => {
    

    const [isLoadingDelivery, setIsLoadingDelivery] = useState(false);
    const [isLoadingBonus, setIsLoadingBonus] = useState(false);
    const [isLoadingP, setIsLoadingP] = useState(false);

    useEffect(()=>{},[socket.current]);

    const sendNotificationDelivery = async () => {
        setIsLoadingDelivery(true);
        NotificationService.create({
            "message": messageNotification,
            "user_id": 1,
            "object_id": 1,
            "service_id": 1
        }).then(notification=>{
    
            socket.current.emit("notification", {
                data: notification.data,
                room_name: inputValue
            });
            setNotifications([notification.data,...notifications])
        }).finally(()=>{
            setIsLoadingDelivery(false);
        });
    
    }

    const sendNotificationP = async () => {
        setIsLoadingP(true);
        const notification = await NotificationService.create({
            "message": "Уведмеление о перевозки",
            "user_id": 20,
            "object_id": 100,
            "service_id": 2
        });
        setIsLoadingP(false);
        socket.current.emit("notification", {
            data: notification.data,
            room_name: inputValue
        });
        setNotifications([notification.data,...notifications]);
        setMessageNotification('')
    }

    const sendNotificationBonus = async () => {
        setIsLoadingBonus(true);
        console.log('start');
        const notification = await NotificationService.create({
            "message": "Уведмеление о Бонусов",
            "user_id": 10,
            "object_id": 4,
            "service_id": 3
        });
        console.log(notification);
        setIsLoadingBonus(false);
        socket.current.emit("notification", {
            data: notification.data,
            room_name: inputValue
        });
        setNotifications([notification.data,...notifications])
    }
    return <Col>
        <Col>
        <Input value={messageNotification} onChange={(e)=>{
            setMessageNotification(e.target.value)
        }}>
        </Input>
        </Col>
        <Space>
        <Button disabled={(inputValue != 'delivery' || !itsOk)} loading={isLoadingDelivery} type="primary" onClick={sendNotificationDelivery}>Уведемление доставки</Button>
        <Button disabled={(inputValue != 'perevozka' || !itsOk)} loading={isLoadingP} type="primary" onClick={sendNotificationP}>
            <UploadOutlined /> Уведемление перевозки
        </Button>
        <Button disabled={(inputValue != 'bonus' || !itsOk)} loading={isLoadingBonus} type="primary" onClick={sendNotificationBonus}>Уведемление Бонусов</Button>
        </Space>
        
    </Col>
}


export default CreateNotifications;