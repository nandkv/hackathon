import { NgModule } from '@angular/core';

import { HackathonSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [HackathonSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [HackathonSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class HackathonSharedCommonModule {}
