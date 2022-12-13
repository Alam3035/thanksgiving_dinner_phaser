let loadingScene = new Phaser.Scene('loadingScene');

loadingScene.preload = function () {
  this.load.image('event_logo', 'assets/event_title_EN.png');
  this.load.image('fhc_logo', 'assets/fhc_logo.png');
  this.load.image('start_btn', 'assets/btn_start_EN.png');
  this.load.image('retry_btn', 'assets/btn_retry_EN.png');
  this.load.image('reward_btn', 'assets/btn_get_reward_EN.png');
  this.load.image('time_bg', 'assets/time.png');
  this.load.image('score_bg', 'assets/score.png');
  this.load.image('reward_10', 'assets/reward_10_EN.png');
  this.load.image('reward_20', 'assets/reward_20_EN.png');
  this.load.image('combo', 'assets/combination_score.png');
  this.load.image('comma', 'assets/dot.png');
  this.load.image('turkey', 'assets/item_turkey.png');
  this.load.image('gift_box', 'assets/item_gift_box.png');
  this.load.image('sock', 'assets/item_socks.png');
  this.load.image('table_home', 'assets/table.jpg');
  this.load.image('table', 'assets/table.png');
  this.load.image('drop_area', 'assets/hints.png');
  this.load.image('drop_bg', 'assets/hints_bg.png')
  this.load.image('drop_turkey', 'assets/hints_chipman.png')
  this.load.image('drop_gift', 'assets/hints_panda.png')
  this.load.image('plus_10', 'assets/plus_10.png')
  this.load.image('plus_20', 'assets/plus_20.png')
  this.load.image('minus_10', 'assets/minus_10.png')
  this.load.image('cross', 'assets/cross.png')

  for (let i = 0; i < 10; i++) {
    this.load.image(`number_${i}`, `assets/number/number_${i}.png`);
  }

  var loadingText = this.make.text({
    x: screen_width / 2,
    y: screen_height / 2,
    text: "Loading...",
    style: {
      font: "20px monospace",
      fill: "#ffffff",
    },
  });
  loadingText.setOrigin(0.5, 0.5);

  this.load.on("progress", function (value) { });

  this.load.on("fileprogress", function (file) { });

  this.load.on("complete", function () {
    loadingText.destroy();
  });
}

loadingScene.create = function () {
  this.scene.stop();
  this.scene.start('homeScene')
}