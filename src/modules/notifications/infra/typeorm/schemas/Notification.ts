import INotificationSchema from '@modules/notifications/entities/INotificationSchema';
import {
  ObjectID, Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn,
} from 'typeorm';

@Entity('notifications')
class NotificationSchema implements INotificationSchema {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    content: string;

    @Column('uuid')
    recipient_id: string;

    @Column({ default: false })
    read: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export default NotificationSchema;
