import Phaser from 'phaser';
import { generateGameTextures } from '../utils/textureGenerator';

export default class ProfileScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ProfileScene' });
  }

  preload() {
    generateGameTextures(this);
  }

  create() {
    // Walk Animations (used for idle)
    if (!this.anims.exists('walk_down')) {
      this.anims.create({ key: 'walk_down', frames: this.anims.generateFrameNumbers('character_spritesheet', { start: 0, end: 2 }), frameRate: 6, repeat: -1 });
    }

    // Get customizations from registry
    const color = this.registry.get('skinColor') || 0xffffff;
    
    // Add character sprite
    const cx = this.cameras.main.width / 2;
    const cy = this.cameras.main.height / 2;
    
    this.sprite = this.add.sprite(cx, cy, 'character_spritesheet');
    this.sprite.setScale(8); // Huge scale for preview
    this.sprite.setTint(color);
    this.sprite.play('walk_down'); // Front facing idle

    // Listen for registry changes to update live
    this.registry.events.on('changedata', (parent, key, data) => {
      if (key === 'skinColor') {
        this.sprite.setTint(data);
      }
    });
  }
}
