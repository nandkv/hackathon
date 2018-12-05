import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAttendee } from 'app/shared/model/attendee.model';
import { AttendeeService } from './attendee.service';
import { IOrganization } from 'app/shared/model/organization.model';
import { OrganizationService } from 'app/entities/organization';
import { IEvent } from 'app/shared/model/event.model';
import { EventService } from 'app/entities/event';

@Component({
    selector: 'jhi-attendee-update',
    templateUrl: './attendee-update.component.html'
})
export class AttendeeUpdateComponent implements OnInit {
    attendee: IAttendee;
    isSaving: boolean;

    organizations: IOrganization[];

    events: IEvent[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private attendeeService: AttendeeService,
        private organizationService: OrganizationService,
        private eventService: EventService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ attendee }) => {
            this.attendee = attendee;
        });
        this.organizationService.query().subscribe(
            (res: HttpResponse<IOrganization[]>) => {
                this.organizations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.eventService.query().subscribe(
            (res: HttpResponse<IEvent[]>) => {
                this.events = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.attendee.id !== undefined) {
            this.subscribeToSaveResponse(this.attendeeService.update(this.attendee));
        } else {
            this.subscribeToSaveResponse(this.attendeeService.create(this.attendee));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAttendee>>) {
        result.subscribe((res: HttpResponse<IAttendee>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackOrganizationById(index: number, item: IOrganization) {
        return item.id;
    }

    trackEventById(index: number, item: IEvent) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
