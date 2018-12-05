import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HackathonOrganizationModule } from './organization/organization.module';
import { HackathonAttendeeModule } from './attendee/attendee.module';
import { HackathonEventModule } from './event/event.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        HackathonOrganizationModule,
        HackathonAttendeeModule,
        HackathonEventModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HackathonEntityModule {}
