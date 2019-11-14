/* Make a new variable that stores the current walls, loaded from Q1 and Q2 and such.

At the start, let Walls = [0], but then when Q1 is loaded, Walls = Q1Walls, loading the array into RAM.
When Q2 is entered, Walls = Q2Walls
This means that you dont need to call the function for every Q1, Q2, Q3, Q4 walls, but just one function that
renders the *current* walls

Let WallX = [0]
Let WallY = [0]
When A is pressed to start the game, load Q1Walls
WallX = WallQ1X
WallY = WallQ2X
*/







let bossBeaten = false
let battlePoints = 0
let songProgress = 0

let dotsA = [0] //These arrays are used for storing the note values, but they get set to 0 and repopulated each time you fight the boss.
let dotsB = [0]

let battlebuttonAhasbeenpressed = false
let battlebuttonBhasbeenpressed = false

// Modes //

let mode = 'overworld'

// Player //

let currentQuadrant = 1
let myPoints = 0
let meXDot = 2
let meYDot = 2
led.plot(meXDot, meYDot)

// Borders and Walls //

let loadingScreenX = [37, 64]
let loadingScreenY = [24, 34]

let borderX = [100, 100]
let borderY = [100, 100]

function makeBorders() {
    borderX = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
    borderY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}

let wallQ1X = [100, 100]
let wallQ1Y = [100, 100]

function makeQ1Walls() {
    wallQ1X = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 26, 27, 27, 28, 28, 28, 27, 27, 26, 26, 25, 24, 23, 22, 21, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 9, 9, 9, 9, 9, 5, 5, 5, 5, 5, 5, 5, 1, 2, 3, 4, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 0, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 30, 31, 32, 33, 34, 35, 36, 37, 38, 36, 37, 38, 30, 31, 32, 33, 34, 35]
    wallQ1Y = [5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 17, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 10, 11, 12, 13, 14, 12, 13, 14, 15, 16, 17, 18, 23, 23, 23, 23, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 28, 28, 28, 28, 33, 33, 33, 33, 38, 38, 38, 38, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 2, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 20, 20, 21, 21, 22, 22, 23, 23, 23, 25, 25, 25, 28, 28, 27, 27, 26, 26]

}

function removeQ1Walls() {
    wallQ1X = [100, 100]
    wallQ1Y = [100, 100]
}

let wallQ2X = [-2]
let wallQ2Y = [-2]

function makeQ2Walls() {
    wallQ2X = [0]
    wallQ2Y = [0]
    wallQ2X = [19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 62, 63, 64, 65, 66, 67, 68, 62, 63, 64, 65, 66, 67, 68, 30, 31, 32, 33, 34, 35, 36, 37, 38, 30, 31, 32, 33, 34, 35, 36, 37, 38]
    wallQ2Y = [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 33, 32, 32, 31, 31, 30, 30, 35, 36, 36, 37, 37, 38, 38, 20, 20, 21, 21, 22, 22, 23, 23, 23, 28, 28, 27, 27, 26, 26, 25, 25, 25]

    for (let i = 0; i < wallQ2X.length; i++) {
        wallQ2X[i] = wallQ2X[i] - 35
        wallQ2Y[i] = wallQ2Y[i] - 22
        currentQuadrant++
    }

}

function removeQ2Walls() {
    wallQ2X = [100, 100]
    wallQ2Y = [100, 100]
}

let wallQ3X = [100, 100]
let wallQ3Y = [100, 100]

function makeQ3Walls() {
    wallQ3X = [59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58]
    wallQ3Y = [19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59]
    for (let i = 0; i < wallQ3X.length; i++) {
        wallQ3X[i] = wallQ3X[i] - 62
        wallQ3Y[i] = wallQ3Y[i] - 32
    }
}

function removeQ3Walls() {
    wallQ3X = [100, 100]
    wallQ3Y = [100, 100]
}

let wallQ4X = [100, 100]
let wallQ4Y = [100, 100]

function makeQ4Walls() {
    wallQ4X = [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29,]
    wallQ4Y = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88,]
    for (let i = 0; i < wallQ4X.length; i++) {

    }
}

function removeQ4Walls() {
    wallQ4X = [100, 100]
    wallQ4Y = [100, 100]
}

let wallQ5X = [100, 100]
let wallQ5Y = [100, 100]

function makeQ5Walls() {
    wallQ5X = [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58]
    wallQ5Y = [79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59]
}

function removeQ5Walls() {
    wallQ5X = [100, 100]
    wallQ5Y = [100, 100]
}

let wallQ6X = [100, 100]
let wallQ6Y = [100, 100]

function makeQ6Walls() {
    wallQ6X = [59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 79, 79, 79, 79, 79, 79, 79, 79, 79, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 79, 79, 79, 79, 79, 79, 79, 79, 79]
    wallQ6Y = [70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 70, 71, 72, 73, 74, 75, 76, 77, 78, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 90, 91, 92, 93, 94, 95, 96, 97, 98]
}

function removeQ6Walls() {
    wallQ6X = [100, 100]
    wallQ6Y = [100, 100]
}
// Border and Wall Rendering //

function renderQ1Walls() {
    for (let i = 0; i < wallQ1X.length; i++) {

        led.plotBrightness(wallQ1X[i], wallQ1Y[i], 10)

    }
}

function renderQ2Walls() {
    for (let i = 0; i < wallQ2X.length; i++) {

        led.plotBrightness(wallQ2X[i], wallQ2Y[i], 10)

    }
}

function renderQ3Walls() {
    for (let i = 0; i < wallQ3X.length; i++) {

        led.plotBrightness(wallQ3X[i], wallQ3Y[i], 10)

    }
}

function renderQ4Walls() {
    for (let i = 0; i < wallQ4X.length; i++) {

        led.plotBrightness(wallQ4X[i], wallQ4Y[i], 10)

    }
}

function renderQ5Walls() {
    for (let i = 0; i < wallQ5X.length; i++) {

        led.plotBrightness(wallQ5X[i], wallQ5Y[i], 10)

    }
}

function renderQ6Walls() {
    for (let i = 0; i < wallQ6X.length; i++) {

        led.plotBrightness(wallQ6X[i], wallQ6Y[i], 10)

    }
}

function renderBorders() {
    for (let i = 0; i < borderX.length; i++) {

        led.plotBrightness(borderX[i], borderY[i], 10)

    }
}

function renderLoadingDot() {
    for (let i = 0; i < loadingScreenX.length; i++) {
        led.plotBrightness(loadingScreenX[i], loadingScreenY[i], 255)
    }
}

// Enemies and Their Plots //

let enemyX = [0, 0]
let enemyY = [0, 0]

function makeEnemies() {
    enemyX = [4, 3, 7, 9, 13, 17, 21, 22, 25, 22, 11, 8, 7, 5, 2, 3, 5, 4, 5, 6, 12, 16, 20, 24, 22, 17, 12, 15, 19, 24]
    enemyY = [5, 1, 3, 6, 4, 6, 4, 7, 10, 13, 16, 17, 13, 10, 14, 18, 26, 31, 36, 42, 43, 45, 43, 41, 38, 36, 34, 31, 27, 25]
}

function renderEnemies() {
    for (let i = 0; i < enemyX.length; i++) {
        led.plot(enemyX[i], enemyY[i])
    }
}

// Collision //
function collision() {
    for (let i = 0; i < enemyX.length; i++) {
        if (enemyX[i] === 2 && enemyY[i] === 2) {
            enemyX.splice(i, 1)
            enemyY.splice(i, 1)
            myPoints++
            Kitronik_Game_Controller.runMotor(100)
        }

    }
}

// Movement //

function playerUp() {
    for (let i = 0; i < enemyY.length; i++) {
        enemyY[i] = enemyY[i] + 1
    }
    for (let i = 0; i < borderY.length; i++) {
        borderY[i] = borderY[i] + 1
    }
    for (let i = 0; i < bossY.length; i++) {
        bossY[i] = bossY[i] + 1
    }
    for (let i = 0; i < wallQ1Y.length; i++) {
        wallQ1Y[i] = wallQ1Y[i] + 1
    }
    for (let i = 0; i < wallQ2Y.length; i++) {
        wallQ2Y[i] = wallQ2Y[i] + 1
    }
    for (let i = 0; i < wallQ3Y.length; i++) {
        wallQ3Y[i] = wallQ3Y[i] + 1
    }
    for (let i = 0; i < loadingScreenY.length; i++) {
        loadingScreenY[i] = loadingScreenY[i] + 1
    }
}
function playerDown() {
    for (let i = 0; i < enemyY.length; i++) {
        enemyY[i] = enemyY[i] - 1
    }
    for (let i = 0; i < borderY.length; i++) {
        borderY[i] = borderY[i] - 1
    }
    for (let i = 0; i < bossY.length; i++) {
        bossY[i] = bossY[i] - 1
    }
    for (let i = 0; i < wallQ1Y.length; i++) {
        wallQ1Y[i] = wallQ1Y[i] - 1
    }
    for (let i = 0; i < wallQ2Y.length; i++) {
        wallQ2Y[i] = wallQ2Y[i] - 1
    }
    for (let i = 0; i < wallQ3Y.length; i++) {
        wallQ3Y[i] = wallQ3Y[i] - 1
    }
    for (let i = 0; i < loadingScreenY.length; i++) {
        loadingScreenY[i] = loadingScreenY[i] - 1
    }
}
function playerLeft() {
    for (let i = 0; i < enemyX.length; i++) {
        enemyX[i] = enemyX[i] + 1
    }
    for (let i = 0; i < borderX.length; i++) {
        borderX[i] = borderX[i] + 1
    }
    for (let i = 0; i < bossX.length; i++) {
        bossX[i] = bossX[i] + 1
    }
    for (let i = 0; i < wallQ1X.length; i++) {
        wallQ1X[i] = wallQ1X[i] + 1
    }
    for (let i = 0; i < wallQ2X.length; i++) {
        wallQ2X[i] = wallQ2X[i] + 1
    }
    for (let i = 0; i < wallQ3X.length; i++) {
        wallQ3X[i] = wallQ3X[i] + 1
    }
    for (let i = 0; i < loadingScreenY.length; i++) {
        loadingScreenX[i] = loadingScreenX[i] + 1
    }
}
function playerRight() {
    for (let i = 0; i < enemyX.length; i++) {
        enemyX[i] = enemyX[i] - 1
    }
    for (let i = 0; i < borderX.length; i++) {
        borderX[i] = borderX[i] - 1
    }
    for (let i = 0; i < bossX.length; i++) {
        bossX[i] = bossX[i] - 1
    }
    for (let i = 0; i < wallQ1X.length; i++) {
        wallQ1X[i] = wallQ1X[i] - 1
    }
    for (let i = 0; i < wallQ2X.length; i++) {
        wallQ2X[i] = wallQ2X[i] - 1
    }
    for (let i = 0; i < wallQ3X.length; i++) {
        wallQ3X[i] = wallQ3X[i] - 1
    }
    for (let i = 0; i < loadingScreenY.length; i++) {
        loadingScreenX[i] = loadingScreenX[i] - 1
    }
}

// Border Collision //

function borderCollisionTop() {
    for (let i = 0; i < borderX.length; i++) {
        if (borderX[i] === 2 && borderY[i] === 2 && myPoints < 100) {
            playerDown()

        }

    }
}

function borderCollisionBottom() {
    for (let i = 0; i < borderX.length; i++) {
        if (borderX[i] === 2 && borderY[i] === 2 && myPoints < 100) {

            playerUp()
        }
    }
}

function borderCollisionLeft() {
    for (let i = 0; i < borderX.length; i++) {
        if (borderX[i] === 2 && borderY[i] === 2 && myPoints < 100) {
            playerRight()

        }

    }
}

function borderCollisionRight() {
    for (let i = 0; i < borderX.length; i++) {
        if (borderX[i] === 2 && borderY[i] === 2 && myPoints < 100) {
            playerLeft()

        }

    }
}

function wallQ1CollisionUp() {
    for (let i = 0; i < wallQ1X.length; i++) {
        if (wallQ1X[i] === 2 && wallQ1Y[i] === 2 && myPoints < 100) {
            playerDown()
        }
    }
}

function wallQ1CollisionDown() {
    for (let i = 0; i < wallQ1X.length; i++) {
        if (wallQ1X[i] === 2 && wallQ1Y[i] === 2 && myPoints < 100) {
            playerUp()
        }
    }
}

function wallQ1CollisionLeft() {
    for (let i = 0; i < wallQ1X.length; i++) {
        if (wallQ1X[i] === 2 && wallQ1Y[i] === 2 && myPoints < 100) {
            playerRight()
        }
    }
}

function wallQ1CollisionRight() {
    for (let i = 0; i < wallQ1X.length; i++) {
        if (wallQ1X[i] === 2 && wallQ1Y[i] === 2 && myPoints < 100) {
            playerLeft()
        }
    }
}

// Extra Quadrant Stuff //


// Loading Screen Collision //

function LoadingScreenCollisionApproachLeft() {
    for (let i = 0; i < loadingScreenX.length; i++) {
        if (loadingScreenX[i] === 2 && loadingScreenY[i] === 2) {
            basic.clearScreen()
            basic.showString("Loading...", 75)
            removeQ1Walls()
            makeQ2Walls()
            renderQ2Walls()

        }
    }
}

// Boss Borders //

let bossX = [18, 18, 18, 18, 18, 18, 18, 18, 18, 9, 9, 9, 9, 9, 9, 9, 9, 9, 29, 29, 29, 29, 29, 29, 29, 29, 29]
let bossY = [10, 11, 12, 13, 14, 15, 16, 17, 18, 40, 41, 42, 43, 44, 45, 46, 47, 48, 20, 21, 22, 23, 24, 25, 26, 27, 28]
let bossPointsNeeded = 10

//The boss game fight is called at lines 278, and 293, in the fight approach code.
// B O S S G A M E //

/* --------------!!! FOR JOSH !!!----------------
The function below is the code for the guitar hero-esque fight.
Parameters: J: This is the number that determines the score you must pass OR EQUAL to beat the boss, and is set in boss approach wall collision code.
The bosses are deleted by removing the first 9 elements from the bossX and bossY arrays, first checking if the score you got is higher than j (the required score)
SO >>>>>>>>>>>> remember, the bosses MUST be 9 dots high, and MUST be listed in the array by order of when they should be beaten (or some other boss gets deleted)
*/

function initialiseEpicBossFight(j: number) {
    bossBeaten = null
    mode = 'battle'

    battlePoints = 0
    songProgress = 0

    dotsA = [0] //These arrays are used for storing the note values, but they get set to 0 and repopulated each time you fight the boss.
    dotsB = [0]

    battlebuttonAhasbeenpressed = false
    battlebuttonBhasbeenpressed = false
    basic.showString("Boss Battle", 66)
    basic.showNumber(3, 130)
    basic.showNumber(2, 130)
    basic.showNumber(1, 130)
    epicBossFight(j) //goes to main boss fight, once its done to back to overworld and return bossBeaten
    mode = 'overworld'
    return bossBeaten;

}
function epicBossFight(j: number) {
    populateNoteArray() //This populates the note arrays with values around line 241.
    for (let angriscounter = 0; angriscounter < 100; angriscounter++) {
        basic.clearScreen();
        placeNoteHitters();
        advanceNotes();
        plotNotes();
        songProgress++
        basic.pause(100);
        epicNoteDetection()
        checkIfSongComplete(j);
        if (bossBeaten === true) {
            break;
        } else if (bossBeaten === false) {
            break;
        } else;
    }
}
function epicNoteDetection() {
    if (battlebuttonAhasbeenpressed === true) {
        if (dotsA[songProgress] === 0) {
            battlePoints = battlePoints + 50
            battlebuttonAhasbeenpressed = false
        }

    } else battlebuttonAhasbeenpressed = false
    if (battlebuttonBhasbeenpressed === true) {
        if (dotsB[songProgress] === 0) {
            battlePoints = battlePoints + 50
            battlebuttonBhasbeenpressed = false
        }

    } else battlebuttonBhasbeenpressed = false
}

function checkIfSongComplete(j: number) {
    if (songProgress === 50) {
        basic.showString("Score:", 70)
        basic.showNumber(battlePoints)
        deleteBossIfRequiredScoreIsMet(j)
    }
}

function placeNoteHitters() {
    led.plot(1, 0)
    led.plot(3, 0)
}

function populateNoteArray() {
    dotsA = [0] // clearing the array so that it can be reused next fight
    dotsB = [0]
    dotsA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 24, 0, 0, 0, 28, 0, 0, 0, 32, 0, 0, 0, 36, 0, 0, 0, 40,]
    dotsB = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 14, 0, 0, 0, 18, 0, 0, 0, 22, 0, 0, 0, 26, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 38, 0,]

}

function advanceNotes() {
    if (mode === 'battle') {
        for (let i = 0; i < dotsA.length; i++) {
            dotsA[i] = dotsA[i] - 1
            dotsB[i] = dotsB[i] - 1
        }
    }
}

function plotNotes() {
    if (mode === 'battle') {
        for (let i = 0; i < dotsA.length; i++) {
            led.plotBrightness(1, dotsA[i], 50)
            led.plotBrightness(3, dotsB[i], 50)
        }
    }
}

function deleteBossIfRequiredScoreIsMet(j: number) {
    if (battlePoints >= j) { //This is the final piece of the code for determining if the bossBeaten value is true or false.
        Kitronik_Game_Controller.runMotor(1000)
        basic.showString("Victory Royale!", 66)
        /* music.setTempo(199)
        music.playTone(165, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.playTone(165, music.beat(BeatFraction.Half))
        music.playTone(330, music.beat(BeatFraction.Half))
        music.playTone(392, music.beat(BeatFraction.Half))
        music.playTone(392, music.beat(BeatFraction.Half))
        music.playTone(440, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.playTone(392, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.playTone(330, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.playTone(294, music.beat(BeatFraction.Half))
        music.playTone(330, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Double))
        music.playTone(440, music.beat(BeatFraction.Half))
        music.playTone(392, music.beat(BeatFraction.Half))
        music.playTone(330, music.beat(BeatFraction.Half))
        music.playTone(294, music.beat(BeatFraction.Half))
        music.playTone(330, music.beat(BeatFraction.Half)) */
        bossX.splice(0, 9)
        bossY.splice(0, 9)
        bossBeaten = true;
        bossPointsNeeded = bossPointsNeeded + 10
    } else {
        basic.showString("Insufficient score.", 55);
        bossBeaten = false;
    }
}


//ok this is the end of that absolute chungus

function renderBossWalls() {
    for (let i = 0; i < bossX.length; i++) {
        led.plot(bossX[i], bossY[i])
    }
}

function bossWallFightApproachRight() {
    for (let i = 0; i < bossX.length; i++) {
        if (bossX[i] === 2 && bossY[i] === 2 && myPoints === bossPointsNeeded) {
            mode = 'battle'
            if (initialiseEpicBossFight(450) === false) {
                playerRight()
            }
        }
        else if (bossX[i] === 2 && bossY[i] === 2 && myPoints != bossPointsNeeded) {
            playerRight()
        }
    }
}

function bossWallFightApproachLeft() {
    for (let i = 0; i < bossX.length; i++) {
        if (bossX[i] === 2 && bossY[i] === 2 && myPoints === bossPointsNeeded) {
            mode = 'battle'
            if (initialiseEpicBossFight(500) === false) {
                playerLeft()
            }
        }
        else if (bossX[i] === 2 && bossY[i] === 2 && myPoints != bossPointsNeeded) {
            playerLeft()
        }

    }
}


// Gestures (CALL THE FUNCTIONS) //

Kitronik_Game_Controller.onButtonPress(Kitronik_Game_Controller.ControllerButtonPins.Up, Kitronik_Game_Controller.ControllerButtonEvents.Down, function () {

    if (mode === 'overworld') {
        basic.clearScreen()
        playerUp()
        collision()
        borderCollisionTop()
        wallQ1CollisionUp()
        renderBorders()
        renderQ1Walls()
        renderQ2Walls()
        renderQ3Walls()
        renderQ4Walls()
        renderQ5Walls()
        renderQ6Walls()
        renderEnemies()
        renderBossWalls()
        renderLoadingDot()
        led.plot(meXDot, meYDot)
    }
})

Kitronik_Game_Controller.onButtonPress(Kitronik_Game_Controller.ControllerButtonPins.Down, Kitronik_Game_Controller.ControllerButtonEvents.Down, function () {

    if (mode === 'overworld') {
        basic.clearScreen()
        playerDown()
        collision()
        borderCollisionBottom()
        wallQ1CollisionDown()
        renderBorders()
        renderQ1Walls()
        renderQ2Walls()
        renderQ3Walls()
        renderQ4Walls()
        renderQ5Walls()
        renderQ6Walls()
        renderEnemies()
        renderBossWalls()
        renderLoadingDot()
        led.plot(meXDot, meYDot)
    }
})

Kitronik_Game_Controller.onButtonPress(Kitronik_Game_Controller.ControllerButtonPins.Left, Kitronik_Game_Controller.ControllerButtonEvents.Down, function () {

    if (mode === 'overworld') {
        basic.clearScreen()
        playerLeft()
        collision()
        borderCollisionLeft()
        bossWallFightApproachRight()
        wallQ1CollisionLeft()
        renderBorders()
        renderQ1Walls()
        renderQ2Walls()
        renderQ3Walls()
        renderQ4Walls()
        renderQ5Walls()
        renderQ6Walls()
        renderEnemies()
        renderBossWalls()
        renderLoadingDot()
        led.plot(meXDot, meYDot)
    }
})

Kitronik_Game_Controller.onButtonPress(Kitronik_Game_Controller.ControllerButtonPins.Right, Kitronik_Game_Controller.ControllerButtonEvents.Down, function () {

    if (mode === 'overworld') {
        basic.clearScreen()
        playerRight()
        collision()
        borderCollisionRight()
        bossWallFightApproachLeft()
        LoadingScreenCollisionApproachLeft()
        wallQ1CollisionRight()
        renderBorders()
        renderQ1Walls()
        renderQ2Walls()
        renderQ3Walls()
        renderQ4Walls()
        renderQ5Walls()
        renderQ6Walls()
        renderEnemies()
        renderLoadingDot()
        renderBossWalls()
        led.plot(meXDot, meYDot)
    }
})

input.onButtonPressed(Button.A, function () {
    if (mode === 'battle') {
        battlebuttonAhasbeenpressed = true
    } else if (mode === 'overworld') {

    }
})
input.onButtonPressed(Button.B, function () {
    if (mode === 'battle') {
        battlebuttonBhasbeenpressed = true
    } else {
        basic.clearScreen()
        basic.showNumber(myPoints)
    }
})

makeBorders()
makeEnemies()
makeQ1Walls()
renderBorders()
renderEnemies()
renderQ1Walls()
renderLoadingDot()
