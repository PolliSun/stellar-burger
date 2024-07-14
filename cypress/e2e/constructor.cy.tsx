const baseUrl = 'http://localhost:4000';
const modal = '[data-cy="modal"]';
const ingredientBun = '[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]';
const ingredientsTopping = '[data-cy="constructor-ingredients"]';
const modalCloseButton = '[data-cy="modal-close-button"]';

describe('Тестирование конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.viewport(1300, 800);
    cy.visit(baseUrl);
    cy.wait('@getIngredients');
  });

  it('Тест добавление булки, начинки и соусов', () => {
    cy.get(ingredientBun + ' button').click();
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"] button').click();
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0942"] button').click();

    cy.get('[data-cy="constructor-bun-1"]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get(ingredientsTopping)
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
    cy.get(ingredientsTopping).contains('Соус Spicy-X').should('exist');
    cy.get('[data-cy="constructor-bun-2"]')
      .contains('Краторная булка N-200i')
      .should('exist');
  });
});

describe('Тестирование работы модального окна', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.viewport(1300, 800);
    cy.visit(baseUrl);
    cy.wait('@getIngredients');

    cy.get(ingredientBun).click();
  });

  it('Тест открытие модального окна', () => {
    cy.get(modal).should('be.visible');
    cy.get(modal).contains('Краторная булка N-200i').should('exist');
    cy.get(modalCloseButton).should('exist');
  });

  it('Тест закрытия модального окан', () => {
    cy.get(modalCloseButton).click();
    cy.get(modal).should('not.exist');
  });

  it('Тест закрытия модального окан по клику на оверлей', () => {
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get(modal).should('not.exist');
  });
});

describe('Тестирование оформление заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');
    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json'
    }).as('createOrder');
    cy.viewport(1300, 800);
    cy.visit(baseUrl);
    cy.wait('@getIngredients');

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Тест создание заказа', () => {
    cy.get(ingredientBun + ' button').click();
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"] button').click();
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0942"] button').click();

    cy.get('[data-cy="order-button"] button').click();

    cy.get(modal).should('be.visible');
    cy.get(modal).contains('45713').should('exist');

    cy.get(modalCloseButton).click();
    cy.get(modal).should('not.exist');

    cy.get('[data-cy="constructor-bun-1"]').should('not.exist');
    cy.get(ingredientsTopping)
      .contains('Биокотлета из марсианской Магнолии')
      .should('not.exist');
    cy.get(ingredientsTopping).contains('Соус Spicy-X').should('not.exist');
    cy.get('[data-cy="constructor-bun-2"]').should('not.exist');
  });
});
