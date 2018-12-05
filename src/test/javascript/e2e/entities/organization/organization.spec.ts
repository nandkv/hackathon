/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OrganizationComponentsPage, OrganizationDeleteDialog, OrganizationUpdatePage } from './organization.page-object';

const expect = chai.expect;

describe('Organization e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let organizationUpdatePage: OrganizationUpdatePage;
    let organizationComponentsPage: OrganizationComponentsPage;
    let organizationDeleteDialog: OrganizationDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Organizations', async () => {
        await navBarPage.goToEntity('organization');
        organizationComponentsPage = new OrganizationComponentsPage();
        expect(await organizationComponentsPage.getTitle()).to.eq('Organizations');
    });

    it('should load create Organization page', async () => {
        await organizationComponentsPage.clickOnCreateButton();
        organizationUpdatePage = new OrganizationUpdatePage();
        expect(await organizationUpdatePage.getPageTitle()).to.eq('Create or edit a Organization');
        await organizationUpdatePage.cancel();
    });

    it('should create and save Organizations', async () => {
        const nbButtonsBeforeCreate = await organizationComponentsPage.countDeleteButtons();

        await organizationComponentsPage.clickOnCreateButton();
        await promise.all([organizationUpdatePage.setNameInput('name'), organizationUpdatePage.setCityInput('city')]);
        expect(await organizationUpdatePage.getNameInput()).to.eq('name');
        expect(await organizationUpdatePage.getCityInput()).to.eq('city');
        await organizationUpdatePage.save();
        expect(await organizationUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await organizationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Organization', async () => {
        const nbButtonsBeforeDelete = await organizationComponentsPage.countDeleteButtons();
        await organizationComponentsPage.clickOnLastDeleteButton();

        organizationDeleteDialog = new OrganizationDeleteDialog();
        expect(await organizationDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Organization?');
        await organizationDeleteDialog.clickOnConfirmButton();

        expect(await organizationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
