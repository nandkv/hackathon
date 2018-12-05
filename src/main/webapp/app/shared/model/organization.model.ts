import { IAttendee } from 'app/shared/model//attendee.model';

export interface IOrganization {
    id?: number;
    name?: string;
    city?: string;
    attendees?: IAttendee[];
}

export class Organization implements IOrganization {
    constructor(public id?: number, public name?: string, public city?: string, public attendees?: IAttendee[]) {}
}
