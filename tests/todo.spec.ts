import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todo-page';

const todos = ['Buy milk', 'Write tests', 'Walk the dog'];

test.describe('TodoMVC demo app', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('adds 3 todos', async () => {
    await todoPage.addTodos(todos);
    await expect(todoPage.items).toHaveCount(3);
    await expect(todoPage.items).toHaveText(todos);
  });

  test('completing one todo updates the counter', async () => {
    await todoPage.addTodos(todos);
    await todoPage.complete('Write tests');
    await expect(todoPage.counter).toHaveText('2 items left');
  });

  test('Active and Completed filters show the right items', async () => {
    await todoPage.addTodos(todos);
    await todoPage.complete('Write tests');

    await todoPage.filterBy('Active');
    await expect(todoPage.items).toHaveText(['Buy milk', 'Walk the dog']);

    await todoPage.filterBy('Completed');
    await expect(todoPage.items).toHaveText(['Write tests']);
  });

  test('edits a todo', async () => {
    await todoPage.addTodos(todos);
    await todoPage.edit('Write tests', 'Write better tests');
    await expect(todoPage.items.nth(1)).toHaveText('Write better tests');
  });

  test('deletes a todo', async () => {
    await todoPage.addTodos(todos);
    await todoPage.delete('Buy milk');
    await expect(todoPage.items).toHaveCount(2);
    await expect(todoPage.itemByText('Buy milk')).toHaveCount(0);
  });

  test('Clear completed removes only completed items', async () => {
    await todoPage.addTodos(todos);
    await todoPage.complete('Buy milk');
    await todoPage.clearCompleted();
    await expect(todoPage.items).toHaveText(['Write tests', 'Walk the dog']);
  });

  const todoSets = [
    { name: 'one todo', items: ['Buy milk'] },
    { name: 'three todos', items: ['Buy milk', 'Write tests', 'Walk the dog'] },
    { name: 'five todos', items: ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'] },
  ];

  for (const { name, items } of todoSets) {
    test(`adds ${name}`, async () => {
      await todoPage.addTodos(items);
      await expect(todoPage.items).toHaveCount(items.length);
      await expect(todoPage.items).toHaveText(items);
    });
  }
});

  