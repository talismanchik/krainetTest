// Burger
document.querySelector('.promo__burger').addEventListener('click', function () {
  document.querySelector('body').classList.toggle('menu-open')
})

// Cross
document.querySelector('.menu__close').addEventListener('click', function () {
  document.querySelector('body').classList.toggle('menu-open')
})

// Form

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form')

  form.addEventListener('submit', formSend)

  async function formSend(e) {
    e.preventDefault()

    const error = formValidate(form)

    const formData = new FormData(form)

    if (error === 0) {
      console.log(formData.values())
    } else {
      console.log(error)
    }
  }
})

// Validation form
function formValidate(form) {
  let error = 0
  const formReq = form.querySelectorAll('input, textarea')

  for (let i = 0; i < formReq.length; i++) {
    const input = form[i]

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
  return !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    input.value
  )
}
