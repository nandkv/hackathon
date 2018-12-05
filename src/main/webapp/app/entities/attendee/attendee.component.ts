import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAttendee } from 'app/shared/model/attendee.model';
import { Principal } from 'app/core';
import { AttendeeService } from './attendee.service';

@Component({
    selector: 'jhi-attendee',
    templateUrl: './attendee.component.html'
})
export class AttendeeComponent implements OnInit, OnDestroy {
    attendees: IAttendee[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private attendeeService: AttendeeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.attendeeService.query().subscribe(
            (res: HttpResponse<IAttendee[]>) => {
                this.attendees = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAttendees();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAttendee) {
        return item.id;
    }

    registerChangeInAttendees() {
        this.eventSubscriber = this.eventManager.subscribe('attendeeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
