import { IOrganization } from 'app/shared/model//organization.model';
import { IEvent } from 'app/shared/model//event.model';

export interface IAttendee {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
    organization?: IOrganization;
    events?: IEvent[];
}

export class Attendee implements IAttendee {
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public phone?: string,
        public organization?: IOrganization,
        public events?: IEvent[]
    ) {}
}
