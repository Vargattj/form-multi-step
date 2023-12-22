import SubmitButton from '../components/SubmitButton.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
    title: 'Submit Button',
    component: SubmitButton,
};

const Template = (args) => ({
    components: { SubmitButton },
    setup() {
        return { args }
    },
    template: '<SubmitButton v-bind="args"  />'
})

export const ButtonProps = Template.bind({})

ButtonProps.args = {
    btnText: "Textoo",
    formStyle: { "bgColor": "#263238", "buttonColor": "#C0CA33", "textColor": "#ffffff" },
    index: 5,
}