import { element, by, ElementFinder } from 'protractor';

export class AttendeeComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-attendee div table .btn-danger'));
    title = element.all(by.css('jhi-attendee div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class AttendeeUpdatePage {
    pageTitle = element(by.id('jhi-attendee-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    emailInput = element(by.id('field_email'));
    phoneInput = element(by.id('field_phone'));
    organizationSelect = element(by.id('field_organization'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async setPhoneInput(phone) {
        await this.phoneInput.sendKeys(phone);
    }

    async getPhoneInput() {
        return this.phoneInput.getAttribute('value');
    }

    async organizationSelectLastOption() {
        await this.organizationSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async organizationSelectOption(option) {
        await this.organizationSelect.sendKeys(option);
    }

    getOrganizationSelect(): ElementFinder {
        return this.organizationSelect;
    }

    async getOrganizationSelectedOption() {
        return this.organizationSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class AttendeeDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-attendee-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-attendee'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
