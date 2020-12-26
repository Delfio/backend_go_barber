import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import INotificationSchema from '@modules/notifications/entities/INotificationSchema';
import NotificationSchema from '@modules/notifications/infra/typeorm/schemas/Notification';
import INotificationsRepositories from '@modules/notifications/repositories/INotificationsRepositorie';
import { ObjectID } from 'mongodb';

class FakeNotificationsRepository implements INotificationsRepositories {
    private notifications: INotificationSchema[] = []

    public async create(
      {
        content,
        recipient_id,
      }: ICreateNotificationDTO,
    ): Promise<INotificationSchema> {
      const notification = new NotificationSchema();

      Object.assign(notification, {
        id: new ObjectID(),
        content,
        recipient_id,
      })

      this.notifications.push(notification);

      return notification;
    }
}

export default FakeNotificationsRepository;
