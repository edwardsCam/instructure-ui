import React from 'react'
import FormFieldGroup from '../index'
import TextInput from '../../TextInput'

describe('<FormFieldGroup />', () => {
  const testbed = new Testbed(
    <FormFieldGroup description="Please enter your full name">
      <TextInput label="First" />
      <TextInput label="Middle" />
      <TextInput label="Last" />
    </FormFieldGroup>
  )

  it('should render', () => {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('links the messages to the fieldset via aria-describedby', () => {
    const subject = testbed.render({
      messages: [
        { text: 'Invalid name', type: 'error' }
      ]
    })

    const messagesId = subject.find('fieldset').getAttribute('aria-describedby')

    expect(subject.find(`#${messagesId}`).text())
      .to.equal('Invalid name')
  })

  it('displays description message inside the legend', () => {
    const description = 'Please enter your full name'
    const subject = testbed.render({
      description: description
    })

    expect(subject.find('legend').text())
      .to.contain(description)
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })
})
