describe('Testing form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/form/1')
  })

  it('verify text field', () => {
    const inputText = "Digitando..."
    const inputEl = ".field-container.active > input";

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

    // Verifica se o valor foi digiado corretamente
    cy.get(inputEl).should('have.value', inputText)

    // Click no botão
    cy.get('.field-container.active > .submit-button').click()

    // Verifica se a questão foi alterada
    cy.get(".field-container").first().should("not.have.class", "active")
  })

})