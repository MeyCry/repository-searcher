import guid from './guid';

export default class NotificationModel {
    message: string;
    id: string;

    constructor(textMessage: string) {
        this.id = guid();
        this.message = textMessage;
    }
}
