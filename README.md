# Ninja-Se

Ninja-Se is a puzzle game built using JavaScript and React, using a Model-Boundary-Controller architecture. It features a Canvas object for rendering and JSON-based board configurations for flexible gameplay setup.

The player is represented as a purple square and can move across the grid, except for black cells, which represent walls and block movement. Some cells contain keys, displayed as small colored squares. Each key corresponds to a locked door of the same color, identifiable by its matching color and a missing center in the cell design. Players can pick up a key when moving into a cell containing one. Only one key can be carried at a time; attempting to pick up a new key while already holding one results in the previously held key being dropped. The goal is to collect keys, unlock all corresponding doors, and navigate through the board to escape the room.

Visit https://jennatripoli.github.io/ninja-se to play.

Fall 2022 - CS 3733 (Software Engineering) at Worcester Polytechnic Institute
