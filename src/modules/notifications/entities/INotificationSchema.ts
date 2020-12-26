export default interface INotificationEntity {
    id: any;

    content: string;

    recipient_id: string;

    read: boolean;

    createdAt: Date;

    updatedAt: Date;
}
