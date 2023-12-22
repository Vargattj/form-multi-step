/// <reference types="cypress" />

import CheckboxField from './CheckboxField'

describe('<CheckboxField />', () => {
  const checkBoxOption = '[data-cy="checkbox-option"]'

  it('Se ao clicar em uma opção, somente ela fica visualmente ativa', () => {
    cy.mount(CheckboxField, {
      propsData: {
        fieldTip: "Testee",
        field: {
          options: [
            {
              "id": "fbe6aa53660cd9ada717bfb8",
              "value": "Maçã 🍎"
            },
            {
              "id": "edcba72a3bde2dcc5d5f9ab9",
              "value": "Laranja 🍊"
            },
            {
              "id": "a37cfbe570a196c6af4c5b08",
              "value": "Melancia 🍉"
            },
            {
              "id": "2ee2ebdc39f7ad8ba9e4f54c",
              "value": "Morango 🍓"
            },
            {
              "id": "c6fcaacbdef28eb5b1364add",
              "value": "Abacaxi 🍍"
            }
          ]
        },
      }
    },)
    // Clique na primeira opção
    cy.get(checkBoxOption).first().click();

    // Verifique se somente a primeira opção está visualmente ativa
    cy.get(checkBoxOption).first().should('have.class', 'selected');
    cy.get('[data-cy="checkbox-option"].selected').should('have.length', 1);
  })
  it('Se ao clicar novamente, essa opção deixa de ficar ativa', () => {
    cy.mount(CheckboxField, {
      propsData: {
        fieldTip: "Testee",
        field: {
          options: [
            {
              "id": "fbe6aa53660cd9ada717bfb8",
              "value": "Maçã 🍎"
            },
            {
              "id": "edcba72a3bde2dcc5d5f9ab9",
              "value": "Laranja 🍊"
            },
            {
              "id": "a37cfbe570a196c6af4c5b08",
              "value": "Melancia 🍉"
            },
            {
              "id": "2ee2ebdc39f7ad8ba9e4f54c",
              "value": "Morango 🍓"
            },
            {
              "id": "c6fcaacbdef28eb5b1364add",
              "value": "Abacaxi 🍍"
            }
          ]
        },
      }
    },)

    // Clique na opção
    cy.get(checkBoxOption).first().click();
    // Verifique se a opção foi ativada
    cy.get(checkBoxOption).first().find('input').should('be.checked');

    cy.wait(400)

    cy.get(checkBoxOption).first().click();
    // Verifique se a opção foi desativada
    cy.get(checkBoxOption).first().find('input').should('not.be.checked');
    cy.get(checkBoxOption).first().should('not.have.class', 'selected');


  })
  it('Se permite múltiplas opções ativas ao mesmo tempo', () => {
    cy.mount(CheckboxField, {
      propsData: {
        fieldTip: "Testee",
        field: {
          options: [
            {
              "id": "fbe6aa53660cd9ada717bfb8",
              "value": "Maçã 🍎"
            },
            {
              "id": "edcba72a3bde2dcc5d5f9ab9",
              "value": "Laranja 🍊"
            },
            {
              "id": "a37cfbe570a196c6af4c5b08",
              "value": "Melancia 🍉"
            },
            {
              "id": "2ee2ebdc39f7ad8ba9e4f54c",
              "value": "Morango 🍓"
            },
            {
              "id": "c6fcaacbdef28eb5b1364add",
              "value": "Abacaxi 🍍"
            }
          ]
        },
      },
    },)
    cy.get(checkBoxOption).each(($checkbox, index) => {
      // Clica na opção de checkbox
      cy.wrap($checkbox).click();
      // Verifica se a opção foi ativada
      cy.wrap($checkbox).find('input').should('be.checked');
    });
  })

  it.skip('Verificar opções enviadas', () => {
    const onChangeSpy = cy.spy()
    cy.mount(CheckboxField, {
      propsData: {
        fieldTip: "Testee",
        listeners: {
          'receivedSelectedOptions': onChangeSpy
        },
        field: {
          options: [
            {
              "id": "fbe6aa53660cd9ada717bfb8",
              "value": "Maçã 🍎"
            },
            {
              "id": "edcba72a3bde2dcc5d5f9ab9",
              "value": "Laranja 🍊"
            },
            {
              "id": "a37cfbe570a196c6af4c5b08",
              "value": "Melancia 🍉"
            },
            {
              "id": "2ee2ebdc39f7ad8ba9e4f54c",
              "value": "Morango 🍓"
            },
            {
              "id": "c6fcaacbdef28eb5b1364add",
              "value": "Abacaxi 🍍"
            }
          ]
        },
      }
    },).then(({ component }) => {
      const selectedOptions2 = []
      cy.get(checkBoxOption).each(($checkbox, index) => {
        if (index % 2 === 0) {
          const checkBoxOptionVal = $checkbox.find('input').val()
          // Seleciona a opção se o índice for par
          cy.wrap($checkbox).click()
          selectedOptions2.push(checkBoxOptionVal);
        }
      });
      cy.wait(500)
      cy.wrap(selectedOptions2).should('deep.equal', component.$data.selectedOptions)
    });

  });
})