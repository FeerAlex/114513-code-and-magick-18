'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var setup = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var template = document.querySelector('#similar-wizard-template').content.querySelector('div');
var wizards = [];

// функция генерации случайных индексов,
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var getRandomElement = function (array) {
  return array[getRandomIndex(array.length)];
};

// функция создания DOM-элемента на основе JS-объекта,
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

// функция генерации случайных данных
var createWizardsArray = function () {
  for (var i = 0; i < 4; i++) {
    wizards.push({
      name: getRandomElement(NAMES) + ' ' + getRandomElement(SURNAMES),
      coatColor: getRandomElement(COAT_COLORS),
      eyesColor: getRandomElement(EYES_COLORS)
    });
  }
};

// функция заполнения блока DOM-элементами на основе массива JS-объектов.
var insertWizards = function () {
  var container = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(createWizard(wizards[i]));
  }

  container.appendChild(fragment);
};

setup.classList.remove('hidden');

createWizardsArray();
insertWizards();

setupSimilar.classList.remove('hidden');
