import axios from "axios";

// interface Notification {
//     _id: number;
//     message: string;
//     service_id: number;
// }


class NotificationService {

    url = 'http://192.168.18.14:8000/notification/';

    async findAll() {
        return (await axios.get(this.url)).data;
    }

    async create(data) {
        return await axios.post(this.url,data=data,{
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXV0aF9zZXJ2aWNlL2FwaS9sb2dpbiIsImlhdCI6MTY1MzQ3Nzc0NSwiZXhwIjoxNjU0MzQxNzQ1LCJuYmYiOjE2NTM0Nzc3NDUsImp0aSI6IjZMakl6VWZYNDJ0eXlDZFciLCJzdWIiOiIxIiwicHJ2IjoiYzhlYjdmOGVhNDU4MzZhZGRlNGRiMjM4NzgxOTFlYjliZWU0MTMxNyIsImlkIjoxLCJmaXJzdF9uYW1lIjoiRXJ6aCIsInJvbGUiOjF9.XSXprKIJfpP1M_wEGw6csof9JI7jLaEefysScz63vy8'
            }
        });
    }

}

export default new NotificationService();