const form = document.getElementById('form')

form.addEventListener('submit', async event => {
  event.preventDefault()
  const error = formValidate(form)
  const formData = new FormData(form)

  const dataJson = Object.fromEntries(formData)

  if (error === 0) {
    const sendButton = document.getElementById('send-button')

    sendButton.disabled = true

    fetch('http://localhost:3000/messages', {
      body: JSON.stringify(dataJson),
      method: 'POST',
    })
      .then(res => {})
      .finally(() => {
        document.getElementById('form').reset()
        sendButton.disabled = false
        alert('Данные отправлены!')
      })
  }
})

// Validation form
function formValidate(form) {
  let error = 0
  const formReq = form.querySelectorAll('input, textarea')

  for (let i = 0; i < formReq.length; i++) {
    const input = formReq[i]

    formRemoveError(input)
    if (input.value === '') {
      formAddError(input, 'Заполните поле!')
      error++
    } else if (input.classList.contains('_email')) {
      if (emailRegex(input)) {
        formAddError(input, 'Не валидный email!')
        error++
      }
    }
  }

  return error
}

function formAddError(input, textError) {
  const parent = input.parentNode
  const errorLabel = document.createElement('label')

  errorLabel.classList.add('_error-label')
  errorLabel.textContent = textError
  input.classList.add('_error')
  parent.append(errorLabel)
}
function formRemoveError(input) {
  if (input.classList.contains('_error')) {
    input.classList.remove('_error')
    input.parentNode.querySelector('._error-label').remove()
  }
}

function emailRegex(input) {
  return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)
}
