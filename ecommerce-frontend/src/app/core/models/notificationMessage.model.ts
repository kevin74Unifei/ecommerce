export class NotificationMessage{
    constructor(
        public message: string,
        public type: NotificationType
    ){}
}

export enum NotificationType{
    success = 0, 
    warning = 1,
    error = 2,
    info = 3 
}