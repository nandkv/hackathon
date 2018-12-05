/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HackathonTestModule } from '../../../test.module';
import { AttendeeComponent } from 'app/entities/attendee/attendee.component';
import { AttendeeService } from 'app/entities/attendee/attendee.service';
import { Attendee } from 'app/shared/model/attendee.model';

describe('Component Tests', () => {
    describe('Attendee Management Component', () => {
        let comp: AttendeeComponent;
        let fixture: ComponentFixture<AttendeeComponent>;
        let service: AttendeeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HackathonTestModule],
                declarations: [AttendeeComponent],
                providers: []
            })
                .overrideTemplate(AttendeeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AttendeeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AttendeeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Attendee(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.attendees[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
