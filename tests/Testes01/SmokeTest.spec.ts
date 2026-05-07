import { test, expect } from '@playwright/test';

test.describe('Smoke Testing', () => {

const expectedTodo={

    id: 1,
    description: 'teste 001',
    createdAt: '2026-05-05'

}


});

test.describe('Sanity Testing', () => {

const newTodo= test('meu teste novo');{

    expect(newTodo.description).toBe('meu teste novo');
    expect(newTodo.id).toBeDefined();
    expect(newTodo.createdAt).toBeDefined();
    


});