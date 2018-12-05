/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AttendeeComponentsPage, AttendeeDeleteDialog, AttendeeUpdatePage } from './attendee.page-object';

const expect = chai.expect;

describe('Attendee e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let attendeeUpdatePage: AttendeeUpdatePage;
    let attendeeComponentsPage: AttendeeComponentsPage;
    let attendeeDeleteDialog: AttendeeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Attendees', async () => {
        await navBarPage.goToEntity('attendee');
        attendeeComponentsPage = new AttendeeComponentsPage();
        expect(await attendeeComponentsPage.getTitle()).to.eq('Attendees');
    });

    it('should load create Attendee page', async () => {
        await attendeeComponentsPage.clickOnCreateButton();
        attendeeUpdatePage = new AttendeeUpdatePage();
        expect(await attendeeUpdatePage.getPageTitle()).to.eq('Create or edit a Attendee');
        await attendeeUpdatePage.cancel();
    });

    it('should create and save Attendees', async () => {
        const nbButtonsBeforeCreate = await attendeeComponentsPage.countDeleteButtons();

        await attendeeComponentsPage.clickOnCreateButton();
        await promise.all([
            attendeeUpdatePage.setNameInput('name'),
            attendeeUpdatePage.setEmailInput('email'),
            attendeeUpdatePage.setPhoneInput('phone'),
            attendeeUpdatePage.organizationSelectLastOption()
        ]);
        expect(await attendeeUpdatePage.getNameInput()).to.eq('name');
        expect(await attendeeUpdatePage.getEmailInput()).to.eq('email');
        expect(await attendeeUpdatePage.getPhoneInput()).to.eq('phone');
        await attendeeUpdatePage.save();
        expect(await attendeeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await attendeeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Attendee', async () => {
        const nbButtonsBeforeDelete = await attendeeComponentsPage.countDeleteButtons();
        await attendeeComponentsPage.clickOnLastDeleteButton();

        attendeeDeleteDialog = new AttendeeDeleteDialog();
        expect(await attendeeDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Attendee?');
        await attendeeDeleteDialog.clickOnConfirmButton();

        expect(await attendeeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
