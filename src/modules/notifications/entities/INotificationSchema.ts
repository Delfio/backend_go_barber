import { ObjectID } from 'mongodb';

export default interface INotificationEntity {
    id: ObjectID;

    content: string;

    recipient_id: string;

    read: boolean;

    createdAt: Date;

    updatedAt: Date;
}
