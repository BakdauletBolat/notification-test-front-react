import { Divider } from 'antd';

const NotificationItem = ({ item }) => {
    return (
        <div>
            <p>
                Сообщение {item.message} Service Id: {item.service_id}
            </p>
            <Divider dashed />
        </div>
    )
}

export default NotificationItem;