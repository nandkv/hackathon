import { Component, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { Router } from '@angular/router';

import { LoginModalService, UserService, Principal, Account, User, IUser } from 'app/core';
import { EventService } from 'app/entities/event';
import { IEvent } from 'app/shared/model/event.model';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    user: User;
    lastname: string;
    events: IEvent[] = [];
    epass: string;
    event: IEvent;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private userServce: UserService,
        private eventService: EventService,
        private routerService: Router
    ) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    findMe() {
        this.userServce.find(this.lastname).subscribe(response => {
            this.user = response.body;
        });
    }

    findEvents() {
        this.epass = null;
        this.eventService.query().subscribe(response => {
            this.events = response.body;
        });
    }

    checkMeIn(eventId) {
        this.eventService.find(eventId).subscribe(response => {
            this.event = response.body;
        });
        this.epass = 'true';
    }
}
