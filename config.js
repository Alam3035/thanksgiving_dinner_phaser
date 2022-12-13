const screen_width = 1520; //16:9 - 1920
const screen_height = 1080;
const game_width = 810; //16:9 - 607.5
const game_height = 1080;

let game;
let config;
let windowRatio;
let screenOrientation;

startGame();

function createGameConfig() {
  screen_width = 810;
  screen_height = 1440;
  game_width = 810;
  game_height = 1080;
  
  config = {
    type: Phaser.AUTO,
    parent: "main",
    transparent: true,
    audio: { noAudio: true },
    scale: {
      width: screen_width,
      height: screen_height,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false,
      }
    },
    scene: [loadingScene, homeScene, gameScene, rewardScene],
  };
}

function startGame() {
  windowRatio = window.innerWidth / window.innerHeight;
  let newOrientation = windowRatio > 1 ? "landscape" : "portrait";
  if (screenOrientation !== newOrientation) {
    screenOrientation = newOrientation;
    if (game !== undefined) game.destroy(true);
    createGameConfig();
    game = new Phaser.Game(config);
  }
}
