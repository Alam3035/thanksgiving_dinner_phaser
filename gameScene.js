let gameScene = new Phaser.Scene('gameScene');

let gameEventLogo;
let gameFhcLogo;
let timeBoard;
let timeBg;
let scoreBg;
let comboBg;
let minuteText;
let secondsFirstText;
let secondsSecondText;
let timeComma;
let scoreFirst;
let scoreSecond;
let scoreThird;
let playerTimer;
let playTimer;
let turkeyTimeout;
let giftTimeout;

let tempX;
let tempY;
let turkeyBox;
let giftBox;
let itemGroup;
let sockOnlyGroup;
let itemCount = 0;
let speed = 1;
let giftBoxSpeed = 1.5;
let oneTimeCount = 20;

let score = 0;
let playTime = 0;
let gameOver = false;
let countDown = 60;

const gameOverTime = 60;

gameScene.init = function () {
    centerX = this.cameras.main.centerX;
    centerY = this.cameras.main.centerY;
}

gameScene.preload = function () {
    console.log('gameScene preload');
}

gameScene.initSettings = function () {
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

gameScene.createTopRow = function () {
    gameEventLogo = this.add.image(
        titleRect.x + titleRect.w * 0.5,
        titleRect.y + titleRect.h * 0.7,
        "event_logo"
    )
    gameEventLogo.setScale(0.5)
    gameEventLogo.setDepth(1);

    gameFhcLogo = this.add.image(
        titleRect.x + titleRect.w * 0.5,
        titleRect.y + titleRect.h * 0.2,
        "fhc_logo"
    )
    gameFhcLogo.setScale(0.6)
    gameFhcLogo.setDepth(1);
}

gameScene.setTimeBoard = function () {
    timeBg = this.add.image(
        titleRect.x + titleRect.w * 0.75,
        titleRect.y + titleRect.h * 1.45,
        'time_bg'
    ).setScale(0.8).setDepth(1)


    minuteText = this.add.image(
        titleRect.x + titleRect.w * 0.65,
        titleRect.y + titleRect.h * 1.5,
        'number_1'
    ).setScale(0.8).setDepth(2)

    timeComma = this.add.image(
        titleRect.x + titleRect.w * 0.7,
        titleRect.y + titleRect.h * 1.5,
        "comma"
    ).setScale(1).setDepth(2)

    secondsFirstText = this.add.image(
        titleRect.x + titleRect.w * 0.75,
        titleRect.y + titleRect.h * 1.5,
        "number_0"
    ).setScale(0.8).setDepth(2)

    secondsSecondText = this.add.image(
        titleRect.x + titleRect.w * 0.8,
        titleRect.y + titleRect.h * 1.5,
        "number_0"
    ).setScale(0.8).setDepth(2);
}

gameScene.setGameTimer = function () {
    playerTimer = this.time.addEvent({
        delay: 1000,
        callback: function () {
            if (playTime >= gameOverTime) {
                this.endGame();
                return
            }

            playTime = playTime + 1;
            if (playTime == 30) {
                speed = speed * 1.5
                giftBoxSpeed = giftBoxSpeed * 1.5
            }
            if (playTime % 5 === 0 && playTime >= 30) {
                this.spawnSockOnly();
            }
            let date = new Date(0);
            date.setSeconds(playTime);
            this.updateTime(date)
        },
        args: [],
        callbackScope: this,
        loop: true,
    })
}

gameScene.updateTime = function (date) {
    let deadline = new Date(0)
    deadline.setSeconds(countDown)
    let t = deadline - date
    let time = new Date(t).toISOString().substr(14, 5);
    time = time.substring(1)
    minuteText.setTexture(`number_${time[0]}`)
    secondsFirstText.setTexture(`number_${time[2]}`)
    secondsSecondText.setTexture(`number_${time[3]}`)
}

gameScene.setScoreBoard = function () {
    scoreBg = this.add.image(
        titleRect.x + titleRect.w * 0.25,
        titleRect.y + titleRect.h * 1.5,
        'score_bg'
    ).setScale(0.8).setDepth(1)

    scoreFirst = this.add.image(
        titleRect.x + titleRect.w * 0.25,
        titleRect.y + titleRect.h * 1.5,
        'number_0'
    ).setScale(0.8).setDepth(1)

    scoreSecond = this.add.image(
        titleRect.x + titleRect.w * 0.30,
        titleRect.y + titleRect.h * 1.5,
        'number_0'
    ).setScale(0.8).setDepth(1)

    scoreThird = this.add.image(
        titleRect.x + titleRect.w * 0.35,
        titleRect.y + titleRect.h * 1.5,
        'number_0'
    ).setScale(0.8).setDepth(1)
}

gameScene.updateScore = function (score, state, item) {
    let sprite = this.add.sprite(item.x, item.y, state)
    this.tweens.add({
        targets: sprite,
        x: item.x,
        y: item.y - 100,
        alpha: 0,
        ease: 'Sine.easeInOut',
        yoyo: false,
        loop: 0
    })

    if (score < 0) {
        score = 0
    }
    let intScore = score.toString();
    switch (intScore.length) {
        case 1:
            scoreThird.setTexture(`number_${intScore[0]}`)
            break;
        case 2:
            scoreThird.setTexture(`number_${intScore[1]}`)
            scoreSecond.setTexture(`number_${intScore[0]}`)
            break;
        case 3:
            scoreThird.setTexture(`number_${intScore[2]}`)
            scoreSecond.setTexture(`number_${intScore[1]}`)
            scoreFirst.setTexture(`number_${intScore[0]}`)
            break;
    }
}

gameScene.setComboBoard = function () {
    comboBg = this.add.image(
        titleRect.x + titleRect.w * 0.5,
        titleRect.y + titleRect.h * 2,
        'combo'
    ).setScale(0.7).setDepth(1)
}

gameScene.endGame = function () {
    gameOver = true;
    playerTimer.destroy();
    this.time.addEvent({
        delay: 1000,
        callback: function () {
            clearTimeout(turkeyTimeout)
            clearTimeout(giftTimeout)
            this.scene.stop();
            this.scene.start('rewardScene');
        },
        args: [],
        callbackScope: this,
    })
}

gameScene.setDropBG = function () {
    this.dropBG = this.add.sprite(
        centerX,
        centerY + 630,
        "drop_bg"
    ).setScale(0.9)
}

gameScene.setTurkeyBox = function () {
    turkeyBox = this.add.sprite(
        centerX - 250,
        centerY + 580,
        "drop_turkey"
    ).setScale(0.8)

    turkeyBox.status = true;
}

gameScene.setGiftBox = function () {
    giftBox = this.add.sprite(
        centerX + 250,
        centerY + 580,
        "drop_gift"
    ).setScale(0.8)

    giftBox.status = true;
}

gameScene.setTable = function () {
    this.table = this.add.sprite(
        centerX,
        centerY + 50,
        "table"
    ).setScale(0.75).setDepth(1)
}

gameScene.spawnSockOnly = function () {
    for (let i = 1; i < 6; i++) {
        let value;
        let wrongValue;
        let wrongValue2;
        let itemType = "sock";
        let itemX = Math.floor(Math.random() * (625 - 200 + 1) + 200);

        sockOnlyGroup.getChildren().forEach(function (item) {
            if (item.x == itemX || item.x == itemX + 30 || item.x == itemX - 30) {
                itemX = Math.floor(Math.random() * (625 - 200 + 1) + 200);
            }
        })

        let item = this.add.sprite(
            itemX,
            centerY - (i * 250),
            itemType
        ).setScale(0.7).setDepth(3).setVisible(false);

        item.name = `special_${itemType}_${i}`;

        value = new Phaser.Math.Vector2(centerX, centerY + 600)
        wrongValue = new Phaser.Math.Vector2(turkeyBox.x, turkeyBox.y)
        wrongValue2 = new Phaser.Math.Vector2(giftBox.x, giftBox.y)

        Object.defineProperty(item, 'rightPosition', {
            value: value,
            writable: false
        })

        Object.defineProperty(item, 'wrongPosition', {
            value: wrongValue,
            writable: false
        })

        Object.defineProperty(item, 'wrongPosition2', {
            value: wrongValue2,
            writable: false
        })

        Object.defineProperty(item, 'inRightPosition', {
            value: false,
            writable: true
        });

        Object.defineProperty(item, 'inWrongPosition', {
            value: false,
            writable: true
        });

        sockOnlyGroup.add(item);
    }
    spawningSock = false;
}

gameScene.spawnRandomItem = function () {
    let value;
    let wrongValue;
    let itemType = "";
    let itemX = Math.floor(Math.random() * (625 - 200 + 1) + 200);
    let random = Math.random();

    if (random < 0.5) {
        itemType = "turkey"
        itemCount = itemCount + 1
    } else {
        itemType = "gift_box"
        itemCount = itemCount + 1
    }

    itemGroup.getChildren().forEach(function (item) {
        if (item.x == itemX || item.x == itemX + 30 || item.x == itemX - 30) {
            itemX = Math.floor(Math.random() * (625 - 200 + 1) + 200);
        }
    })

    let item = this.add.sprite(
        itemX,
        centerY - (itemCount * 250),
        itemType
    ).setScale(0.7).setDepth(3).setVisible(false)

    item.name = `${itemType}_${itemCount}`

    if (itemType === "turkey") {
        value = new Phaser.Math.Vector2(turkeyBox.x, turkeyBox.y)
        wrongValue = new Phaser.Math.Vector2(giftBox.x, giftBox.y)
    } else {
        value = new Phaser.Math.Vector2(giftBox.x, giftBox.y)
        wrongValue = new Phaser.Math.Vector2(turkeyBox.x, turkeyBox.y)
    }

    Object.defineProperty(item, 'rightPosition', {
        value: value,
        writable: false
    })

    Object.defineProperty(item, 'wrongPosition', {
        value: wrongValue,
        writable: false
    })

    Object.defineProperty(item, 'inRightPosition', {
        value: false,
        writable: true
    });

    Object.defineProperty(item, 'inWrongPosition', {
        value: false,
        writable: true
    });

    itemGroup.add(item);
}

gameScene.spawnRandomItemWithSock = function () {
    let value;
    let wrongValue;
    let wrongValue2;
    let itemType = "";
    let itemX = Math.floor(Math.random() * (625 - 200 + 1) + 200);
    let weightedRandom = this.weightedRandom([0, 1, 2], [0.4, 0.4, 0.2]);
    let random = weightedRandom.index

    itemGroup.getChildren().forEach(function (item) {
        if (item.x == itemX || item.x == itemX + 30 || item.x == itemX - 30) {
            itemX = Math.floor(Math.random() * (625 - 200 + 1) + 200);
        }
    })

    switch (random) {
        case 0:
            itemType = "turkey"
            itemCount = itemCount + 1
            break;
        case 1:
            itemType = "gift_box"
            itemCount = itemCount + 1
            break;
        case 2:
            itemType = "sock"
            itemCount = itemCount + 1
            break;
    }

    let item = this.add.sprite(
        itemX,
        centerY - (itemCount * 250),
        itemType
    ).setScale(0.7).setDepth(3).setVisible(false);

    item.name = `${itemType}_${itemCount}`

    if (itemType === "turkey") {
        value = new Phaser.Math.Vector2(turkeyBox.x, turkeyBox.y)
        wrongValue = new Phaser.Math.Vector2(giftBox.x, giftBox.y)
    } else if (itemType === "gift_box") {
        value = new Phaser.Math.Vector2(giftBox.x, giftBox.y)
        wrongValue = new Phaser.Math.Vector2(turkeyBox.x, turkeyBox.y)
    } else {
        value = new Phaser.Math.Vector2(centerX, centerY + 600)
        wrongValue = new Phaser.Math.Vector2(turkeyBox.x, turkeyBox.y)
        wrongValue2 = new Phaser.Math.Vector2(giftBox.x, giftBox.y)
    }

    Object.defineProperty(item, 'rightPosition', {
        value: value,
        writable: false
    })

    if (itemType === "sock") {
        Object.defineProperty(item, 'wrongPosition', {
            value: wrongValue,
            writable: false
        })

        Object.defineProperty(item, 'wrongPosition2', {
            value: wrongValue2,
            writable: false
        })
    } else {
        Object.defineProperty(item, 'wrongPosition', {
            value: wrongValue,
            writable: false
        })
    }

    Object.defineProperty(item, 'inRightPosition', {
        value: false,
        writable: true
    });

    Object.defineProperty(item, 'inWrongPosition', {
        value: false,
        writable: true
    });

    itemGroup.add(item);
}

gameScene.weightedRandom = function (items, weights) {
    if (items.length !== weights.length) {
        throw new Error('Items and weights must be of the same size');
    }

    if (!items.length) {
        throw new Error('Items must not be empty');
    }

    // Preparing the cumulative weights array.
    // For example:
    // - weights = [1, 4, 3]
    // - cumulativeWeights = [1, 5, 8]
    const cumulativeWeights = [];
    for (let i = 0; i < weights.length; i += 1) {
        cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
    }

    // Getting the random number in a range of [0...sum(weights)]
    // For example:
    // - weights = [1, 4, 3]
    // - maxCumulativeWeight = 8
    // - range for the random number is [0...8]
    const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
    const randomNumber = maxCumulativeWeight * Math.random();

    // Picking the random item based on its weight.
    // The items with higher weight will be picked more often.
    for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
        if (cumulativeWeights[itemIndex] >= randomNumber) {
            return {
                item: items[itemIndex],
                index: itemIndex,
            };
        }
    }
}

gameScene.setDragEvents = function () {
    this.input.on('dragstart', function (pointer, gameObject) {
        tempX = gameObject.x;
        tempY = gameObject.y;
    });

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        if (gameObject.inRightPosition || gameObject.inWrongPosition) {
            return
        }
        gameObject.x = dragX;
        gameObject.y = dragY;

        if (gameObject.name.includes("sock")) {
            if (gameObject.wrongPosition.distance(new Phaser.Math.Vector2(dragX, dragY)) < 150 || gameObject.wrongPosition2.distance(new Phaser.Math.Vector2(dragX, dragY)) < 150) {
                this.cameras.main.shake(200);
                gameObject.inWrongPosition = true;

                score = score - 10;
                if (score < 0) {
                    score = 0
                }
                this.updateScore(score, "cross", gameObject);

                gameObject.disableInteractive();
                gameObject.setVisible(false);
                itemGroup.remove(gameObject);
                itemCount = itemCount - 1
            }
        } else {
            if (gameObject.rightPosition.distance(new Phaser.Math.Vector2(dragX, dragY)) < 150) {
                if (gameObject.name.includes("gift")) {
                    if (giftBox.status === false) {
                        return
                    }

                    gameObject.inRightPosition = true;
                    score = score + 20
                    this.updateScore(score, "plus_20", gameObject)
                } else if (gameObject.name.includes("turkey")) {
                    if (turkeyBox.status === false) {
                        return
                    }

                    gameObject.inRightPosition = true;
                    score = score + 10
                    this.updateScore(score, "plus_10", gameObject)
                }

                gameObject.disableInteractive();
                gameObject.setVisible(false);
                itemGroup.remove(gameObject);
                itemCount = itemCount - 1
            } else if (gameObject.wrongPosition.distance(new Phaser.Math.Vector2(dragX, dragY)) < 150) {
                gameObject.inWrongPosition = true;
                gameObject.setVisible(false);
                this.updateScore(score, "cross", gameObject);
                itemGroup.remove(gameObject);
                itemCount = itemCount - 1
            }
        }
    }.bind(this));

    this.input.on('dragend', function (pointer, gameObject) {
        gameObject.clearTint();
        if (!gameObject.inRightPosition) {
            gameObject.x = tempX;
            gameObject.y = tempY;
        }
    });
}

gameScene.moveItems = function () {
    let tempSpeed;

    itemGroup.getChildren().forEach(function (item) {
        if (item.name.includes("gift")) {
            tempSpeed = giftBoxSpeed * 2
        } else {
            tempSpeed = speed * 2
        }

        item.y += tempSpeed

        if (item.y > centerY + 520) {
            this.input.setDraggable(item, false)
            itemGroup.remove(item);
            item.destroy()
            itemCount = itemCount - 1
        } else if (item.y > centerY - 250) {
            item.setVisible(true)
            item.setInteractive()
            this.input.setDraggable(item)
        }
    }.bind(this))

    if (sockOnlyGroup.getLength() > 0) {
        sockOnlyGroup.getChildren().forEach(function (item) {
            item.y += speed * 2

            if (item.y > centerY + 520) {
                this.input.setDraggable(item, false)
                sockOnlyGroup.remove(item);
                item.destroy()
            } else if (item.y > centerY - 250) {
                item.setVisible(true)
                item.setInteractive()
                this.input.setDraggable(item)
            }
        }.bind(this))
    }
}

gameScene.changeTurkeyBoxStatus = function () {
    let randomTime = Math.floor(Math.random() * (9000 - 6000 + 1) + 6000)
    if (turkeyBox.status == false) {
        randomTime = Math.floor(Math.random() * (3000 - 1000 + 1) + 1000)
    }
    turkeyTimeout = setTimeout(function () {
        if (turkeyBox.status) {
            turkeyBox.status = false
            turkeyBox.setTexture("cross")
        } else {
            turkeyBox.status = true
            turkeyBox.setTexture("drop_turkey")
        }
        this.changeTurkeyBoxStatus();
    }.bind(this), randomTime);
}

gameScene.changeGiftBoxStatus = function () {
    let randomTime = Math.floor(Math.random() * (9000 - 6000 + 1) + 6000)
    if (giftBox.status == false) {
        randomTime = Math.floor(Math.random() * (3000 - 1000 + 1) + 1000)
    }
    giftTimeout = setTimeout(function () {
        if (giftBox.status) {
            giftBox.status = false
            giftBox.setTexture("cross")
        } else {
            giftBox.status = true
            giftBox.setTexture("drop_gift")
        }
        this.changeGiftBoxStatus();
    }.bind(this), randomTime);
}

gameScene.create = function () {
    this.initSettings();
    this.createTopRow();
    this.setTimeBoard();
    this.setScoreBoard();
    this.setComboBoard();

    itemGroup = this.add.group();
    sockOnlyGroup = this.add.group();

    this.setTable();
    this.setDropBG();
    this.setTurkeyBox();
    this.setGiftBox();

    this.setDragEvents();

    this.setGameTimer();
    this.changeGiftBoxStatus();
    this.changeTurkeyBoxStatus();
}

gameScene.update = function () {
    if (!gameOver) {
        if (itemCount <= oneTimeCount) {
            this.spawnRandomItemWithSock();
        }
        this.moveItems()
    }
}
