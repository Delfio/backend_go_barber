import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import INotificationSchema from '../entities/INotificationSchema';

interface INotificationsRepositories {
    create(data: ICreateNotificationDTO): Promise<INotificationSchema>;
}

export default INotificationsRepositories;
