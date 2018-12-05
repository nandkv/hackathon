import { Moment } from 'moment';
import { IAttendee } from 'app/shared/model//attendee.model';

export interface IEvent {
    id?: number;
    name?: string;
    eventDate?: Moment;
    attendees?: IAttendee[];
}

export class Event implements IEvent {
    constructor(public id?: number, public name?: string, public eventDate?: Moment, public attendees?: IAttendee[]) {}
}
