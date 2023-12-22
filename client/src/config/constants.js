import { swatch, fileIcon, ai, logoShirt, stylishShirt , tshirtFemale,tshirtMale } from "../assets";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  {
    name: "aipicker",
    icon: ai,
    disabled:true
  },
];

export const FilterTabs = [
  {
    name: "logoShirt",
    icon: logoShirt,
  },
  {
    name: "stylishShirt",
    icon: stylishShirt,
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};

export const TshirtTabs = [
  {
    name: "femaleShirt",
    icon: tshirtFemale,
  },
  {
    name: "maleShirt",
    icon: tshirtMale,
  }

]

export const FilterTabStates = {
  stylishShirt : "isFullTexture",
  logoShirt: "isLogoTexture"
}
