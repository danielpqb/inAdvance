import { StyleSheet } from "react-native";
import colors from "../../gsc.config.json";
import Color from "@/utils/color-converter";

const gColors = colors;
/**
 * @param opacity number from 0 to 1
 */
export function gSC(
  colorKey: keyof typeof gColors,
  opacity?: number,
  normalize?: boolean
) {
  const colorString = colors[colorKey];
  const type = Color.identifyType(colorString);
  let colorObj: {
    r: number;
    g: number;
    b: number;
    a: number;
  };

  opacity = opacity ? Math.min(Math.max(opacity, 0), 1) : 1;

  //Return RGBA String
  if (normalize) {
    //Normalize color before returning RGBA String
    switch (type) {
      case "hex":
        colorObj = Color.fromHex(colorString, true);
        colorObj.a = opacity;
        return Color.toRgba(colorObj);
      case "rgb":
        colorObj = Color.fromRgb(colorString);
        return Color.toRgba(colorObj);
      case "rgba":
        colorObj = Color.fromRgba(colorString, true);
        colorObj.a = opacity;
        return Color.toRgba(colorObj);
      case "hsl":
      case "hsla":
    }
  } else {
    switch (type) {
      case "hex":
        colorObj = Color.fromHex(colorString);
        colorObj.a = opacity;
        return Color.toRgba(colorObj);
      case "rgb":
        colorObj = Color.fromRgb(colorString);
        colorObj.a = opacity;
        return Color.toRgba(colorObj);
      case "rgba":
        colorObj = Color.fromRgba(colorString);
        colorObj.a = opacity;
        return Color.toRgba(colorObj);
      case "hsl":
      case "hsla":
    }
  }
}

export const gStyles = StyleSheet.create({
  growCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
