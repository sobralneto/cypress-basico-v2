// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').should('be.visible').type('Luiz Carlos', { delay: 0 }).should('have.value', 'Luiz Carlos');
    cy.get('#lastName').should('be.visible').type('Sobral Neto', { delay: 0 }).should('have.value', 'Sobral Neto');
    cy.get('#email').should('be.visible').type('sobral.22@gmail.com', { delay: 0 }).should('have.value', 'sobral.22@gmail.com');
    cy.get('#open-text-area').should('be.visible').type('Obrigado pela ajuda', { delay: 0 }).should('have.value', 'Obrigado pela ajuda');
    cy.contains('button', 'Enviar').click();
})