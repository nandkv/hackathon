/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EventComponentsPage, EventDeleteDialog, EventUpdatePage } from './event.page-object';

const expect = chai.expect;

describe('Event e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let eventUpdatePage: EventUpdatePage;
    let eventComponentsPage: EventComponentsPage;
    let eventDeleteDialog: EventDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Events', async () => {
        await navBarPage.goToEntity('event');
        eventComponentsPage = new EventComponentsPage();
        expect(await eventComponentsPage.getTitle()).to.eq('Events');
    });

    it('should load create Event page', async () => {
        await eventComponentsPage.clickOnCreateButton();
        eventUpdatePage = new EventUpdatePage();
        expect(await eventUpdatePage.getPageTitle()).to.eq('Create or edit a Event');
        await eventUpdatePage.cancel();
    });

    it('should create and save Events', async () => {
        const nbButtonsBeforeCreate = await eventComponentsPage.countDeleteButtons();

        await eventComponentsPage.clickOnCreateButton();
        await promise.all([
            eventUpdatePage.setNameInput('name'),
            eventUpdatePage.setEventDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
            // eventUpdatePage.attendeeSelectLastOption(),
        ]);
        expect(await eventUpdatePage.getNameInput()).to.eq('name');
        expect(await eventUpdatePage.getEventDateInput()).to.contain('2001-01-01T02:30');
        await eventUpdatePage.save();
        expect(await eventUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await eventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Event', async () => {
        const nbButtonsBeforeDelete = await eventComponentsPage.countDeleteButtons();
        await eventComponentsPage.clickOnLastDeleteButton();

        eventDeleteDialog = new EventDeleteDialog();
        expect(await eventDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Event?');
        await eventDeleteDialog.clickOnConfirmButton();

        expect(await eventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
