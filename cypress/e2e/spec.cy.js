/// <reference types="cypress" />

describe('Testing form', () => {
  const inputText = "Digitando..."
  const currentField = ".field-container.active";
  beforeEach(() => {
    cy.visit('http://localhost:5173/form/1')
  })

  it('Testing Navigation', () => {
    let prevInputVal;

    cy.get(currentField).find('[data-cy="text-input"]').type("Digitando...")
    
    cy.get('[data-cy="next"]').click()
    cy.wait(200)

    cy.get(currentField).find('[data-cy="text-input"]').invoke('val').then((value) => {
      prevInputVal = value
      expect(prevInputVal).to.be.empty
      cy.log('prevInputVal:', prevInputVal);
    });

    cy.get('.field-container').eq(0).should("not.have.class", "active")
  })

  it.skip('Update Response', () => {
    cy.intercept('PUT', 'https://65665153eb8bb4b70ef3297d.mockapi.io/api/respondents/1').as('putReq')
    cy.get(inputEl).type(`Novo valor...{enter}`)
    cy.get('.field-container.active > .submit-button').click()
  })

  it.skip("Submiting Form", () => {
    cy.get('[data-cy="field"]').each((element, index) => {
      cy.get(element).find('input').then(($input) => {
        if ($input.attr('type') === 'email') {
          // Digita um endereço de e-mail para inputs do tipo 'email'
          cy.wrap($input).type('test@gmail.com{enter}');
          cy.get(element).find('input').should(($input) => {
            const validateEmail = (email) => {
              var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
              return re.test(email);
            }
            expect(validateEmail($input.val())).to.be.true;
            expect('to.have.value', 'test@gmail.com')
          });
        } else if ($input.attr('type') === 'checkbox') {
          cy.get('.checkbox-options li').eq(0).click()
        } else {
          // Digita o texto desejado para outros tipos de inputs
          cy.wrap($input).type(`${inputText}{enter}`);
          cy.get(element).find('input').should('have.value', inputText)
        }
      });

      const expectedResponse = {
        formId: "1",
        fieldId: "4c0aaa104dbeeb4d331a6344",
        value: "Digitando..."
      }

      // (Usando PUT pq a API não está mais aceitando requisições POST)
      cy.intercept('PUT', 'https://65665153eb8bb4b70ef3297d.mockapi.io/api/respondents/1', { body: expectedResponse }).as('putReq')

      cy.get(element).find('[data-cy="submit"]').click()

      // Verifica o body da requisição e se ela foi enviada com sucesso
      cy.wait('@putReq').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        expect(interception.response.body).to.deep.equal(expectedResponse)
      })
    });
  })
})