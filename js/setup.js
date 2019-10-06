'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupSimilar = document.querySelector('.setup-similar');
var setupUserName = document.querySelector('.setup-user-name');

var wizardCoatColor = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyesColor = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireballsColor = document.querySelector('.setup-fireball-wrap');
var wizardCoatColorInput = document.querySelector('input[name="coat-color"]');
var wizardEyesColorInput = document.querySelector('input[name="eyes-color"]');
var wizardFireballsColorInput = document.querySelector('input[name="fireball-color"]');
var template = document.querySelector('#similar-wizard-template').content.querySelector('div');
var wizards = [];

wizardCoatColor.addEventListener('click', function (evt) {
  var color = COAT_COLORS[getRandomIndex(COAT_COLORS.length)];

  evt.target.style.fill = color;
  wizardCoatColorInput.value = color;
});

wizardEyesColor.addEventListener('click', function (evt) {
  var color = EYES_COLORS[getRandomIndex(EYES_COLORS.length)];

  evt.target.style.fill = color;
  wizardEyesColorInput.value = color;
});

wizardFireballsColor.addEventListener('click', function (evt) {
  var color = FIREBALL_COLORS[getRandomIndex(FIREBALL_COLORS.length)];

  evt.target.style.backgroundColor = color;
  wizardFireballsColorInput.value = color;
});

setupUserName.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var closePopup = function () {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

var openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var getRandomElement = function (array) {
  return array[getRandomIndex(array.length)];
};

var createWizard = function (wizard) {
  var element = template.cloneNode(true);
  var wizardName = element.querySelector('.setup-similar-label');
  var wizardCoat = element.querySelector('.wizard-coat');
  var wizardEyes = element.querySelector('.wizard-eyes');

  wizardName.textContent = wizard.name;
  wizardCoat.style.fill = wizard.coatColor;
  wizardEyes.style.fill = wizard.eyesColor;

  return element;
};

var createWizardsArray = function () {
  for (var i = 0; i < 4; i++) {
    wizards.push({
      name: getRandomElement(NAMES) + ' ' + getRandomElement(SURNAMES),
      coatColor: getRandomElement(COAT_COLORS),
      eyesColor: getRandomElement(EYES_COLORS)
    });
  }
};

var insertWizards = function () {
  var container = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(createWizard(wizards[i]));
  }

  container.appendChild(fragment);
};

createWizardsArray();
insertWizards();

setupSimilar.classList.remove('hidden');
