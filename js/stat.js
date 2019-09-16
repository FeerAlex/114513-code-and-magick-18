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

var renderCloudTitle = function (ctx, x, y) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', x, y);
  ctx.fillText('Список результатов:', x, y + GAP * 2);
};

var getRandomColor = function () {
  var saturation = Math.floor(Math.random() * 101);

  return 'hsl(240, ' + saturation + '%, 50%)';
};

var renderBar = function (ctx, name, time, height, x, y) {
  ctx.fillStyle = '#000';
  ctx.fillText(name, x, CLOUD_HEIGHT - GAP * 2);
  ctx.fillStyle = '#000';
  ctx.fillText(time, x, y - GAP * 2);
  ctx.fillStyle = name.toUpperCase() === 'ВЫ' ? 'rgba(255, 0, 0, 1)' : getRandomColor();
  ctx.fillRect(x, y, BAR_WIDTH, height);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderCloudTitle(ctx, CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2);

  maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var barHeight = (STATISTIC_HEIGHT * times[i]) / maxTime - GAP;
    var barCoordX = CLOUD_X + BAR_WIDTH + BAR_GAP * 2 * i;
    var barCoordY = CLOUD_Y + GAP * 8 + (STATISTIC_HEIGHT - barHeight);

    renderBar(ctx, names[i], Math.ceil(times[i]), barHeight, barCoordX, barCoordY);
  }
};
