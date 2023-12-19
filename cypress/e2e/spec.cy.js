/// <reference types="cypress" />

describe('Testing form', () => {
  const inputText = "Digitando..."
  const inputEl = ".field-container.active > input";

  beforeEach(() => {
    cy.visit('http://localhost:5173/form/1')
  })

  it('Submiting Field', () => {

    // Verifica se a quantidade minima de caracteres está sendo respeitada
    cy.get(inputEl).should('have.attr', 'minlength').then((minLength) => {
      const minLengthValue = parseInt(minLength);
      expect(inputText.length).to.be.at.least(minLengthValue);
    });

    // Verifica se a quantidade maxima de caracteres está sendo respeitada
    cy.get(inputEl).should('have.attr', 'maxlength').then((maxLength) => {
      const maxLengthValue = parseInt(maxLength);
      expect(inputText.length).to.be.at.most(maxLengthValue);
    })

    // Digita um valor no input
    cy.get(inputEl).type(`${inputText}{enter}`)

    // Verifica se o valor foi digitado corretamente
    cy.get(inputEl).should('have.value', inputText)

    const response = {
      formId: "1",
      fieldId: "4c0aaa104dbeeb4d331a6344",
      value: "Digitando..."
    }

    // (Usando PUT pq a API não está mais aceitando requisições POST)
    cy.intercept('PUT', 'https://65665153eb8bb4b70ef3297d.mockapi.io/api/respondents/1', { body: response }).as('putReq')

    cy.get('.field-container.active > .submit-button').click()

    // Verifica o body da requisição e se ela foi enviada com sucesso
    cy.wait('@putReq').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.body).to.deep.equal(response)
    })

  })

  it('Testing Navigation', () => {
    // Volta para a questão anterior
    cy.get('.btn-navigation').first().click()
    // Verifica se a questão foi alterada
    cy.get(".field-container").eq(1).should("not.have.class", "active")
  })

  it('Update Reponse', () => {
    cy.intercept('PUT', 'https://65665153eb8bb4b70ef3297d.mockapi.io/api/respondents/1').as('putReq')

    cy.get(inputEl).type(`Novo valor...{enter}`)

    cy.get('.field-container.active > .submit-button').click()

    cy.wait('@putReq').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    })
  })

  it('Verify Email', () => {

  })
})