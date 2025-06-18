import type { GameObject } from "../GameObject";
import type { Vector2 } from "../Vector2";

export const moveTowards = (
  person: GameObject,
  destinationPostion: Vector2,
  speed: number
) => {
  let distanceToTravelX = destinationPostion.x - person.position.x;
  let distanceToTravelY = destinationPostion.y - person.position.y;

  let distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);
  if (distance <= speed) {
    // If close enough just snap to destination
    person.position.x = destinationPostion.x;
    person.position.y = destinationPostion.y;
  } else {
    // move by speed towards destination
    const normalizedX = distanceToTravelX / distance;
    const normalizedY = distanceToTravelY / distance;
    person.position.x += normalizedX * speed;
    person.position.y += normalizedY * speed;

    // Recalcuate remaining distane
    distanceToTravelX = destinationPostion.x - person.position.x;
    distanceToTravelY = destinationPostion.y - person.position.y;
    distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);
  }
  return distance;
};
