import { VideoJsPlayer } from "video.js";

interface KeyboardEvent extends Event {
  readonly which: number;
}

export const configUserActions = (e: KeyboardEvent, player: VideoJsPlayer) => {
  switch (e.which) {
    case 39:
      player.currentTime(player.currentTime() + 2);
      break;
    case 37:
      player.currentTime(player.currentTime() - 2);
      break;
    case 38:
      if (player.volume() <= 1) {
        const plus = player.volume() + 0.2;
        player.volume(plus);
      }
      break;
    case 40:
      if (player.volume() >= 0) {
        const reduce = player.volume() - 0.2;
        player.volume(reduce);
      }
      break;
    case 32:
      if (player.paused()) player.play();
      else player.pause();
      break;
    default:
      break;
  }
};
