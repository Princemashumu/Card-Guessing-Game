# Card Guessing Game 🎴🃏

[card-guessing-game-chi.vercel.app](https://card-guessing-game-chi.vercel.app/)

## 📌 Overview
The **Card Guessing Game** is a fun memory-matching game where players flip cards to find matching pairs. The game keeps track of the player's score and time, rewarding correct matches and deducting points for incorrect ones.

## 🛠️ Installation
### Prerequisites
Make sure you have Node.js and npm (Node Package Manager) installed. If you haven't installed them yet, you can download and install them from the official Node.js website.

Steps to Install
Clone the repository: Clone the project to your local machine using the following command:

```
git clone https://github.com/princemashumu/Card-guessing-Game.git
```
Navigate to the project directory: Change into the project directory:

```
cd Card-guessing-Game
```
Install dependencies: Install the required dependencies listed in package.json:

```
npm install
```
Start the game: You can start the game by simply opening the index.html file in your browser:

```
open index.html
```
Alternatively, if you want to run the Node.js server (for any potential backend or API purposes in future updates), use the following command:

```
npm start
```
## 🎮 How to Play
1. Click on a card to flip it.
2. Click on another card to find its matching pair.
3. If the cards match, they stay flipped.
4. If they don't match, they flip back after a short delay.
5. Continue matching pairs until all cards are revealed.
6. Try to complete the game as fast as possible with the highest score!

## 🏆 Scoring System
- ✅ Correct match: **+10 points**
- ❌ Incorrect match: **-5 points** (score never goes below 0)

## ⏳ Timer
The game starts with a timer that records the time taken to complete the game. Try to match all pairs in the shortest time possible!

## 🚀 Features
- 🃏 36 cards (18 unique pairs)
- 🔄 Shuffle functionality for a fresh game every time
- 🎯 Score tracking system
- ⏱️ Timer to track completion time
- 🏅 Win message with final score
- 🔄 Reset & Play Again options

## 🛠️ Technologies Used
- HTML
- CSS
- JavaScript
- Node.js
- Express.js

## 📦 Dependencies
```json
{
  "name": "card-game",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "express": "^4.21.0"
  }
}
```

## 📷 Screenshots

![Image](https://github.com/user-attachments/assets/6f82824a-ea5a-4a1f-8bce-89f42a1248c6)

![Image](https://github.com/user-attachments/assets/f3ce006a-120a-4f4b-b8da-be70855331d0)

## 📂 File Structure
```
Card-Guessing-Game/
│-- index.html
│-- styles.css
│-- script.js
│-- images/
│   │-- img1.jpg
│   │-- img2.jpg
│   │-- ...
│-- screenshots/
│   │-- game_board.png
│   │-- winning_screen.png
```

## 🎯 Future Improvements
- 🔊 Add sound effects for flips and matches
- 🌟 Different themes for card backs
- 🎭 Multiplayer mode
- 📱 Responsive design improvements

## 👨‍💻 Author
**[Your Name]** - Developer of the Card Guessing Game. 🚀

## 🏁 Start Playing
Simply open `index.html` in your browser and start matching cards!

Enjoy the game and test your memory! 🎴🔥

