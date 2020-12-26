import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import INotificationSchema from '@modules/notifications/entities/INotificationSchema';
import INotificationsRepositories from '@modules/notifications/repositories/INotificationsRepositorie';
import { getMongoRepository, MongoRepository } from 'typeorm';
import NotificationSchema from '../schemas/Notification';

class NotificationsRepository implements INotificationsRepositories {
    private ormRepository: MongoRepository<NotificationSchema>

    constructor() {
      this.ormRepository = getMongoRepository(
        NotificationSchema, 'mongo',
      );
    }

    public async create(
      {
        content,
        recipient_id,
      }: ICreateNotificationDTO,
    ): Promise<INotificationSchema> {
      const notification = this.ormRepository.create({
        content,
        recipient_id,
      });

      await this.ormRepository.save(notification);

      return notification;
    }
}

export default NotificationsRepository;
