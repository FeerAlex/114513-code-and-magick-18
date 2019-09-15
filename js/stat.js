'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var STATISTIC_HEIGHT = 150;
var GAP = 10;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var maxTime = 0;

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderCloudTitle = function (ctx) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 4);
};

var getColor = function () {
  var saturation = Math.floor(Math.random() * 101);

  return 'hsl(240, ' + saturation + '%, 50%)';
};

var renderBar = function (ctx, name, time, index) {
  var barHeight = (STATISTIC_HEIGHT * time) / maxTime - GAP;
  var barCoordX = CLOUD_X + BAR_WIDTH + BAR_GAP * 2 * index;
  var barCoordY = CLOUD_Y + GAP * 8 + (STATISTIC_HEIGHT - barHeight);

  ctx.fillStyle = '#000';
  ctx.fillText(name, barCoordX, CLOUD_HEIGHT - GAP * 2);
  ctx.fillStyle = '#000';
  ctx.fillText(time, barCoordX, barCoordY - GAP * 2);
  ctx.fillStyle = name.toUpperCase() === 'ВЫ' ? 'rgba(255, 0, 0, 1)' : getColor();
  ctx.fillRect(barCoordX, barCoordY, BAR_WIDTH, barHeight);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderCloudTitle(ctx);

  maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    renderBar(ctx, names[i], Math.ceil(times[i]), i);
  }
};
