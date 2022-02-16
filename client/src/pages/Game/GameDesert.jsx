
import React, { useRef, useState, Component, useEffect } from 'react';
import Phaser from 'phaser';
import Game from './src/scenes/Game';

const GameDesert = () => {
  useEffect(() => {
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: 'game',
      backgroundColor: '#33A5E7',
      scale: {
        width: 800,
        height: 600,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      render: {
        pixelArt: false,
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 750 },
          debug: true,
          debugShowVelocity: true,
          debugShowBody: true,
          debugShowStatic: true,
        },
      },
      parent: 'game-content',
      scene: [Game],
    });
  });

  return <div id="game-content" />;

};
export default GameDesert;
