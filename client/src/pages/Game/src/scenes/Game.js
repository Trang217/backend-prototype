import Phaser from 'phaser';
import Hero from '../entities/Hero';

//Images
import tileMapLevel1 from '../../assets/tilemaps/level-1.json';
import worldSheet1 from '../../assets/tilesets/world-1-sheet.png';
import klexStand from '../../assets/hero/Klex-Stand.png';
import klexRun from '../../assets/hero/Klex-Run.png';

class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.tilemapTiledJSON('level-1', tileMapLevel1);
    this.load.image('world-1-sheet', worldSheet1);

    this.load.spritesheet('hero-idle-sheet', klexStand, {
      frameWidth: 127,
      frameHeight: 160,
    });

    this.load.spritesheet('hero-run-sheet', klexRun, {
      frameWidth: 127,
      frameHeight: 160,
    });
  }

  create(data) {
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: 'hero-idle',
      frames: this.anims.generateFrameNumbers('hero-idle-sheet'),
      frameRate: 7,
      repeat: -1,
    });

    this.anims.create({
      key: 'hero-run',
      frames: this.anims.generateFrameNumbers('hero-run-sheet'),
      frameRate: 9,
      repeat: -1,
    });

    this.addMap();

    this.addHero();

    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
    this.cameras.main.startFollow(this.hero);
  }

  addHero() {
    this.hero = new Hero(this, 400, 300);

    this.physics.add.collider(
      this.hero,
      this.map.getLayer('Ground').tilemapLayer
    );
  }

  addMap() {
    this.map = this.make.tilemap({ key: 'level-1' });
    const groundTiles = this.map.addTilesetImage('world-1', 'world-1-sheet');
    console.table('groundTiles: ' + groundTiles);
    const groundLayer = this.map.createStaticLayer('Ground', groundTiles);
    console.log('groundLayer: ' + groundLayer);
    groundLayer.setCollision([8], true);

    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
    this.physics.world.setBoundsCollision(true, true, false, true);
  }

  update(time, delta) {
    if (this.cursorKeys.space.isDown) {
      console.log('Space Hold down');
    }
  }
}

export default Game;
