import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HackathonSharedModule } from 'app/shared';
import {
    AttendeeComponent,
    AttendeeDetailComponent,
    AttendeeUpdateComponent,
    AttendeeDeletePopupComponent,
    AttendeeDeleteDialogComponent,
    attendeeRoute,
    attendeePopupRoute
} from './';

const ENTITY_STATES = [...attendeeRoute, ...attendeePopupRoute];

@NgModule({
    imports: [HackathonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AttendeeComponent,
        AttendeeDetailComponent,
        AttendeeUpdateComponent,
        AttendeeDeleteDialogComponent,
        AttendeeDeletePopupComponent
    ],
    entryComponents: [AttendeeComponent, AttendeeUpdateComponent, AttendeeDeleteDialogComponent, AttendeeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HackathonAttendeeModule {}
