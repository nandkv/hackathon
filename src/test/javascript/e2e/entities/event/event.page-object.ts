import { element, by, ElementFinder } from 'protractor';

export class EventComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-event div table .btn-danger'));
    title = element.all(by.css('jhi-event div h2#page-heading span')).first();

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

export class EventUpdatePage {
    pageTitle = element(by.id('jhi-event-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    eventDateInput = element(by.id('field_eventDate'));
    attendeeSelect = element(by.id('field_attendee'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setEventDateInput(eventDate) {
        await this.eventDateInput.sendKeys(eventDate);
    }

    async getEventDateInput() {
        return this.eventDateInput.getAttribute('value');
    }

    async attendeeSelectLastOption() {
        await this.attendeeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async attendeeSelectOption(option) {
        await this.attendeeSelect.sendKeys(option);
    }

    getAttendeeSelect(): ElementFinder {
        return this.attendeeSelect;
    }

    async getAttendeeSelectedOption() {
        return this.attendeeSelect.element(by.css('option:checked')).getText();
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

export class EventDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-event-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-event'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
