import { Page, Locator } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly items: Locator;
  readonly counter: Locator;
  readonly clearCompletedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    // Todo rows are list items that contain a checkbox; the filter links are list items without one
    this.items = page.getByRole('listitem').filter({ has: page.getByRole('checkbox') });
    this.counter = page.getByText(/items? left/);
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
  }

  async goto() {
    // Full URL because baseURL in the config points to playwright.dev
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }

  async addTodo(text: string) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  async addTodos(texts: string[]) {
    for (const text of texts) {
      await this.addTodo(text);
    }
  }

  itemByText(text: string) {
    return this.items.filter({ hasText: text });
  }

  async complete(text: string) {
    await this.itemByText(text).getByRole('checkbox').check();
  }

  async edit(oldText: string, newText: string) {
    await this.itemByText(oldText).getByText(oldText).dblclick();
    const editBox = this.page.getByRole('textbox', { name: 'Edit' });
    await editBox.fill(newText);
    await editBox.press('Enter');
  }

  async delete(text: string) {
    const item = this.itemByText(text);
    // The delete button only appears while hovering over the row
    await item.hover();
    await item.getByRole('button', { name: 'Delete' }).click();
  }

  async filterBy(name: 'All' | 'Active' | 'Completed') {
    await this.page.getByRole('link', { name }).click();
  }

  async clearCompleted() {
    await this.clearCompletedButton.click();
  }
}