const arrowsX = document.querySelectorAll('.arrow-left, .arrow-right');
const arrowsY = document.querySelectorAll('.arrow-top, .arrow-bottom');
const images = document.querySelectorAll('img');
const input = document.querySelector('#image');
const button = document.querySelector('body > div button');
const errorSpan = document.querySelector('body > div span');

arrowsX.forEach(arrowX => arrowX.addEventListener('click', handleClickX));
arrowsY.forEach(arrowY => arrowY.addEventListener('click', handleClickY));

button.addEventListener('click', handleButtonCliclk);

function handleClickX() {
  const arrowContainer = this.parentElement;
  const flipContainer = arrowContainer.parentElement;
  const flipper = flipContainer.firstElementChild;
  const image = flipper.firstElementChild;

  const classList = image.classList.value.split(" ");

  if (!classList[0]) {
    image.classList.add('rotate-y');
    
    return;
  }

  if (classList[0] === 'rotate-y') {
    image.classList.toggle('rotate-y')

    return;
  }

  if (classList[0] === 'rotate-z') {
    image.classList.replace(classList[0], 'rotate-x')

    return;
  }

  image.classList.replace(classList[0], 'rotate-z');
}

function handleClickY() {
  const arrowContainer = this.parentElement;
  const flipContainer = arrowContainer.parentElement;
  const flipper = flipContainer.firstElementChild;
  const image = flipper.firstElementChild;

  const classList = image.classList.value.split(" ");

  if (!classList[0]) {
    image.classList.add('rotate-x');
    
    return;
  }

  if (classList[0] === 'rotate-x') {
    image.classList.toggle('rotate-x')

    return;
  }

  if (classList[0] === 'rotate-z') {
    image.classList.replace(classList[0], 'rotate-y')

    return;
  }

  image.classList.replace(classList[0], 'rotate-z');
}

async function handleButtonCliclk() {
  try{
    if (!input.value) {
      throw new Error('Você precisa fornecer um link de uma imagem');
    }

    const testRegex = /^https?:\/\//g.test(input.value);

    if (!testRegex) {
      throw new Error("Forneça uma URL válida. Ex.:'http://minha.image.escolhida'");
    }

    fetch(input.value, {
      method: 'GET',
      headers: {
        'access-control-allow-origin': 'http:127.0.0.1:5500',
        'content-type': 'image/*'
      },
      mode: 'no-cors',
    })
    .then(response => {
      images.forEach(image => {image.src = input.value})

      input.value = ''
      errorSpan.classList.remove('error');
      errorSpan.innerHTML = '';
    })
    .catch(function(err) {
      errorSpan.classList.add('error');
      errorSpan.innerHTML = 'Imagem não encontrada';
    })
  } catch(err) {
    errorSpan.classList.add('error');
    errorSpan.innerHTML = err.message;
  }
}