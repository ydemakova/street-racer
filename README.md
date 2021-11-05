# Street Racer

## Game start

Start the game by calling this [link](https://ydemakova.github.io/street-racer/).

## Concept

-   `obstacleDistanceMin` = 2 x `widthOfCar`

### Functionality

Collision control:

-   The car has an upper left corner `(x1,y1)` and an upper right corner `(x2,y1)`.
-   Each obstacle has an upper left corner `(x1,y1)` and an upper right corner `(x2,y1)`
-   If the obstacle and the car are on the same lane, they could hit. If not, they could not.
-   The car hits an obstacle if they share a lane and the `x1` of the obstacle is less or equal the `x2` of car.
-   Obstacles should be stored in two different arrays, one for the left and one for the right lane, `obstaclesLeftLane` and `obtaclesRightLane`.
-   A new obstacle is created randomly on a random lane within a random y-coord within the lane every time there is a distance to the last created obstacle of `obstacleDistanceMin` or (randomly) _more_.
-   The game runs in the `animation` function, the `Car` has its own class as well as the `Obstacle`.

### Brainstorming

Basics:

-   The car drives on the road either on left or on right lane.
-   The car stays in lefty x-position of the road, while the road is moving itself.
-   The background moves proportionally slower to the road.
-   The car moves up and down to avoid obstacles by switching lane.
-   The car switches lanes in animation, not apparently.
-   Obstacles randomly appear either on left or right lane.
-   One obstacle appears at least `obstacleDistanceMin` pixels distant to the next obstacle.
-   If the car hits an obstancle, the game is over.
-   Each obstacle you pass gives you one point.

Advanced:

-   The game starts in a menu. The menu has the buttons "Start" and "Score".
-   The points are stored in a highscore.
-   The longer you drive, the faster the car becomes.
-   The faster the car drives, the more points you get from passing obstancles.
