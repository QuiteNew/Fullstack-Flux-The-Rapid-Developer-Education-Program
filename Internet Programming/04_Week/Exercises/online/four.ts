enum ColorEnum {
    Red = "red",
    Green = "green",
    Blue = "blue",
    Yellow = "yellow",
    Black = "black",
    White = "white"
}

function showColor(color: ColorEnum) {
    console.log(`The selected color is ${color}.`);
}

showColor(ColorEnum.Red);
showColor(ColorEnum.Green);
showColor(ColorEnum.Blue);

type Color = "red" | "green" | "blue" | "yellow" | "black" | "white";

function showColorByString(color: Color) {
    console.log(`The selected color is ${color}.`);
}

showColorByString("red");
showColorByString("green");
showColorByString("blue");