let homeScene = new Phaser.Scene('homeScene');

let centerX;
let centerY;
let gameRect;
let titleRect;
let fhcLogo;
let eventLogo;
let gameplayImg;
let instruction;
let start;
let table;
let dropArea;
let homeItemGroup;
let tutorialItem1, tutorialItem2, tutorialItem3, tutorialItem4;

homeScene.init = function () {
    centerX = this.cameras.main.centerX;
    centerY = this.cameras.main.centerY;
}

homeScene.preload = function () {
    console.log('homeScene preload');
}

homeScene.initSettings = function () {
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


homeScene.createInstruction = function () {
    instruction = this.add.text(
        centerX - 435,
        centerY - 430,
        `           Please help us to send the gifts! Swipe your fingers to 
        correctly assign gift boxes and turkeys on the table to the FHC 
        character. Be careful to avoid the old socks! FHC characters may 
        stop accepting gifts at any time, and the tablecloths will move 
        faster and faster. Get 200,000 chips when you reached 
        400 points. Let's test your reaction!`,
        { fontFamily: 'Arial', fontSize: 26, color: 'white', align: 'center' }
    )

    instruction.setDepth(2);

    let rectangle = this.add.rectangle(400, centerY - 340, 900, 198, 0xa518a7);
    rectangle.alpha = 0.4
    rectangle.setDepth(1)
}

homeScene.createTable = function () {
    table = this.add.image(
        titleRect.x + titleRect.w * 0.5,
        titleRect.y + titleRect.h * 4.3,
        "table_home"
    )
    table.setScale(0.75)
    table.setDepth(1);
}

homeScene.createDropArea = function () {
    dropArea = this.add.image(
        titleRect.x + titleRect.w * 0.5,
        titleRect.y + titleRect.h * 6.35,
        "drop_area"
    )
    dropArea.setScale(0.95)
    dropArea.setDepth(1);
}

homeScene.createStartButton = function () {
    start = this.add.sprite(
        titleRect.x + titleRect.w * 0.5,
        titleRect.y + titleRect.h * 7.55,
        "start_btn"
    )

    start.setScale(0.9);

    start.setInteractive();

    start.on('pointerdown', () => {
        this.scene.stop();
        this.scene.start('gameScene');
    })

    start.setDepth(1);
}

homeScene.item1 = function () {
    this.tweens.add({
        targets: tutorialItem1,
        y: centerY + 150,
        duration: 2000,
        ease: 'Linear',
        onStart: function () {
            tutorialItem1.setVisible(true)
        },
        onStartScope: this,
        onComplete: function () {
            this.tweens.add({
                targets: tutorialItem1,
                y: centerY + 300,
                x: centerX - 200,
                onComplete: function () {
                    tutorialItem1.setVisible(false)
                    tutorialItem1.x = centerX + 200
                    tutorialItem1.y = centerY - 150
                    this.item1()
                },
                onCompleteScope: this,
            })
        },
        onCompleteScope: this,
    })
}

homeScene.item2 = function () {
    this.tweens.add({
        delay: 1000,
        targets: tutorialItem2,
        y: centerY + 150,
        duration: 2000,
        ease: 'Linear',
        onStart: function () {
            tutorialItem2.setVisible(true)
        },
        onStartScope: this,
        onComplete: function () {
            this.tweens.add({
                targets: tutorialItem2,
                y: centerY + 300,
                x: centerX + 200,
                onComplete: function () {
                    tutorialItem2.setVisible(false)
                    tutorialItem2.x = centerX
                    tutorialItem2.y = centerY - 150
                    this.item2()
                },
                onCompleteScope: this,
            })
        },
        onCompleteScope: this,
    })
}

homeScene.item3 = function () {
    this.tweens.add({
        delay: 2000,
        targets: tutorialItem3,
        y: centerY + 150,
        duration: 2000,
        ease: 'Linear',
        onStart: function () {
            tutorialItem3.setVisible(true)
        },
        onStartScope: this,
        onComplete: function () {
            this.tweens.add({
                targets: tutorialItem3,
                y: centerY + 300,
                x: centerX - 200,
                onComplete: function () {
                    tutorialItem3.setVisible(false)
                    tutorialItem3.x = centerX - 100
                    tutorialItem3.y = centerY - 150
                    this.item3()
                },
                onCompleteScope: this,
            })
        },
        onCompleteScope: this,
    })
}

homeScene.item4 = function () {
    this.tweens.add({
        delay: 3000,
        targets: tutorialItem4,
        y: centerY + 300,
        duration: 2000,
        ease: 'Linear',
        onStart: function () {
            tutorialItem4.setVisible(true)
        },
        onStartScope: this,
        onComplete: function () {
            tutorialItem4.setVisible(false)
            tutorialItem4.x = centerX + 100
            tutorialItem4.y = centerY - 150
            this.item4()
        },
        onCompleteScope: this,
    })
}

homeScene.itemSpawn = function () {
    tutorialItem1 = this.add.sprite(
        centerX + 200,
        centerY - 150,
        'turkey'
    ).setScale(0.7).setDepth(1)

    tutorialItem2 = this.add.sprite(
        centerX,
        centerY - 150,
        'gift_box'
    ).setScale(0.7).setDepth(1).setVisible(false)

    tutorialItem3 = this.add.sprite(
        centerX - 100,
        centerY - 150,
        'turkey'
    ).setScale(0.7).setDepth(1).setVisible(false)

    tutorialItem4 = this.add.sprite(
        centerX + 100,
        centerY - 150,
        'sock'
    ).setScale(0.7).setDepth(1).setVisible(false)
}

homeScene.create = function () {
    this.initSettings();
    this.createInstruction();
    this.createTable();
    this.createDropArea();
    this.createStartButton();

    this.itemSpawn();
    this.item1();
    this.item2();
    this.item3();
    this.item4();
}

homeScene.update = function () {

}