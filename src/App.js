import { io } from "socket.io-client";
import 'antd/dist/antd.min.css';
import { notification,message,Button,Select } from 'antd';
import './style.css';
import NotificationList from "./components/notification-list.js";
import { useState, useEffect,useRef } from "react";

import NotificationService from './services/NotificationService';
import CreateNotifications from './components/CreateNotifications';

const { Option } = Select;


function App() {

  const [notifications, setNotifications] = useState([]);
  const [inputValue,setInputValue] = useState('');
  const [messageNotification,setMessageNotification] = useState('');
  const socketRef = useRef(null);
  const [isOk,setItsOk] = useState(false);



  const initNotifications = async () => {
    const notifications = await NotificationService.findAll();
    setNotifications(notifications);
  }
  useEffect(() => {
    initNotifications();
    socketRef.current = io('http://192.168.18.14:8000/', {
      auth: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hdXRoX3NlcnZpY2VcL2FwaVwvbG9naW4iLCJpYXQiOjE2NDg0NTY1MzMsImV4cCI6MTY0OTMyMDUzMywibmJmIjoxNjQ4NDU2NTMzLCJqdGkiOiJPVnRoZWNCaUNmR21xaUl6Iiwic3ViIjo1MywicHJ2IjoiYzhlYjdmOGVhNDU4MzZhZGRlNGRiMjM4NzgxOTFlYjliZWU0MTMxNyIsImlkIjo1MywiZmlyc3RfbmFtZSI6ImVyYm9sLnQiLCJyb2xlIjoxMH0.8e8FYuW2w_hmblwM-ghgkaSzzfwFKk6L6mGPwPQv1dk'
      }

    })

    socketRef.current.on('notification', (data) => {
     console.log(data);
     openNotification(data);
    });
   
  }, []);


  const openNotification = (data) => {
    notification.open({
      message: data.message,
      description:
        `Сервис ID: ${data.service_id} Object ID: ${data.object_id} User ID: ${data.user_id}`,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  const error = (messageStr) => {
    message.error(messageStr);
  };

  const succuss = (messageStr) => {
    message.success(messageStr);
  }

  console.log('hello')

  return (
    <div className="App">
      <Select defaultValue={'Выберите канал'} style={{ width: 120 }} onChange={(value)=>{
          setInputValue(value);
          setItsOk(false);
      }}>
      <Option value="delivery">Доставка</Option>
      <Option value="bonus">Бонус</Option>
      <Option value="perevozka">Перевозка</Option>
    </Select>
      <Button onClick={()=>{
        socketRef.current?.emit('joinRoom',{
          room_name: inputValue
        },(response)=>{
          if (response.status == 403) {
              error(response.message);
              setItsOk(false);
          } 
          if(response.status == 200) {
              succuss(response.message);
              setItsOk(true);
          }
        });
      }}>Подключиться</Button>
      <NotificationList notifications={notifications}
                         />
      <CreateNotifications itsOk={isOk} 
      setMessageNotification={setMessageNotification} 
      messageNotification={messageNotification}
                           inputValue={inputValue}
                           notifications={notifications} 
                           setNotifications={setNotifications} 
                           socket={socketRef}/>
    </div>
  );
}

export default App;
