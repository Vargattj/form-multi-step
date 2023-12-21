import CheckboxField from './CheckboxField.vue'

describe('<CheckboxField />', () => {
  it('renders', () => {
    cy.mount(CheckboxField, {
      props: {
        fieldTip: "Testee",
      }
    },)
  })
})