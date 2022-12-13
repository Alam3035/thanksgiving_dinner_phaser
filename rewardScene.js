let rewardScene = new Phaser.Scene('rewardScene');

let rewardEventLogo;
let rewardFhcLogo;
let congratulation;
let rewardText;
let reward;
let retry;
let rewardScoreBg;
let rewardScoreFirst;
let rewardScoreSecond;
let rewardScoreThird;

rewardScene.init = function () {
    centerX = this.cameras.main.centerX;
    centerY = this.cameras.main.centerY;
}

rewardScene.preload = function () {

}

rewardScene.initSettings = function () {
    gameRect = {
        x: 0,
        y: screen_height - game_height,
        w: game_width,
        h: game_height,
    };
    titleRect = {
        x: 0,
        y: 0,
        w: screen_width,
        h: (screen_height - game_height) / 2,
    };
}

rewardScene.createTopRow = function () {
    rewardEventLogo = this.add.image(
        titleRect.x + titleRect.w * 0.5,
        titleRect.y + titleRect.h * 1.1,
        "event_logo"
    )
    rewardEventLogo.setScale(0.7)
    rewardEventLogo.setDepth(1);

    rewardFhcLogo = this.add.image(
        titleRect.x + titleRect.w * 0.5,
        titleRect.y + titleRect.h * 0.3,
        "fhc_logo"
    )
    rewardFhcLogo.setScale(0.9)
    rewardFhcLogo.setDepth(1);
}

rewardScene.createRewardText = function () {
    let type = "";
    if (score >= 400) {
        type = 'reward_20'
    } else {
        type = 'reward_10'
    }

    rewardText = this.add.sprite(
        titleRect.x + titleRect.w * 0.5,
        titleRect.y + titleRect.h * 3.8,
        type
    )

    rewardText.setScale(0.8);
    rewardText.setDepth(1);
}

rewardScene.createUserScoreBoard = function () {
    rewardScoreBg = this.add.image(
        titleRect.x + titleRect.w * 0.5,
        titleRect.y + titleRect.h * 6,
        'score_bg'
    ).setScale(0.8).setDepth(1)

    let intScore = score.toString();
    switch (intScore.length) {
        case 1:
            rewardScoreFirst = this.add.image(
                titleRect.x + titleRect.w * 0.5,
                titleRect.y + titleRect.h * 6,
                `number_0`
            ).setScale(0.8).setDepth(1)

            rewardScoreSecond = this.add.image(
                titleRect.x + titleRect.w * 0.55,
                titleRect.y + titleRect.h * 6,
                `number_0`
            ).setScale(0.8).setDepth(1)

            rewardScoreThird = this.add.image(
                titleRect.x + titleRect.w * 0.6,
                titleRect.y + titleRect.h * 6,
                `number_${intScore[0]}`
            ).setScale(0.8).setDepth(1)
            break;
        case 2:
            rewardScoreFirst = this.add.image(
                titleRect.x + titleRect.w * 0.5,
                titleRect.y + titleRect.h * 6,
                `number_0`
            ).setScale(0.8).setDepth(1)

            rewardScoreSecond = this.add.image(
                titleRect.x + titleRect.w * 0.55,
                titleRect.y + titleRect.h * 6,
                `number_${intScore[0]}`
            ).setScale(0.8).setDepth(1)

            rewardScoreThird = this.add.image(
                titleRect.x + titleRect.w * 0.6,
                titleRect.y + titleRect.h * 6,
                `number_${intScore[1]}`
            ).setScale(0.8).setDepth(1)
            break;
        case 3:
            rewardScoreFirst = this.add.image(
                titleRect.x + titleRect.w * 0.5,
                titleRect.y + titleRect.h * 6,
                `number_${intScore[0]}`
            ).setScale(0.8).setDepth(1)

            rewardScoreSecond = this.add.image(
                titleRect.x + titleRect.w * 0.55,
                titleRect.y + titleRect.h * 6,
                `number_${intScore[1]}`
            ).setScale(0.8).setDepth(1)

            rewardScoreThird = this.add.image(
                titleRect.x + titleRect.w * 0.6,
                titleRect.y + titleRect.h * 6,
                `number_${intScore[2]}`
            ).setScale(0.8).setDepth(1)
            break;
    }
}

rewardScene.createRewardButton = function () {
    reward = this.add.sprite(
        titleRect.x + titleRect.w * 0.7,
        titleRect.y + titleRect.h * 7,
        "reward_btn"
    )

    reward.setScale(0.8);

    reward.setInteractive();

    reward.on('pointerdown', () => {
        getReward(score)
        reward.x = 99999
    })

    reward.setDepth(1);

    retry = this.add.sprite(
        titleRect.x + titleRect.w * 0.25,
        titleRect.y + titleRect.h * 7,
        "retry_btn"
    )

    retry.setScale(0.8);

    retry.setInteractive();

    retry.on('pointerdown', () => {
        location.reload();
    })

    retry.setDepth(1);
}

rewardScene.create = function () {
    this.initSettings();
    this.createTopRow();
    this.createRewardText();
    this.createUserScoreBoard();
    // this.createRewardButton();
}

rewardScene.update = function () {

}