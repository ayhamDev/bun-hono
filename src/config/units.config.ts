// src/config/units.config.ts

/**
 * The unit of the product in English.
 * Includes weight, volume, count, and packaging units.
 */
export enum Unit {
  // Weight
  MILLIGRAM = "mg",
  GRAM_ALT = "gm",
  KILOGRAM = "kg",
  TON = "ton",

  // Volume
  MILLILITER = "ml",
  LITER = "l",
  FLUID_OUNCE = "fl oz",
  OUNCE = "oz",
  GALLON = "gal",

  // Count
  PIECE = "pcs",
  PAIR = "pair",
  DOZEN = "dozen",

  // Packaging
  PACK = "pack",
  BOX = "box",
  SET = "set",
  None = "None",
}

/**
 * Array of all valid product units (for validation, dropdowns, etc.)
 */
export const Units: Unit[] = [
  // Weight
  Unit.MILLIGRAM,
  Unit.GRAM_ALT,
  Unit.KILOGRAM,
  Unit.TON,
  // Volume
  Unit.MILLILITER,
  Unit.LITER,
  Unit.FLUID_OUNCE,
  Unit.OUNCE,
  Unit.GALLON,

  // Count
  Unit.PIECE,
  Unit.PAIR,
  Unit.DOZEN,

  // Packaging
  Unit.PACK,
  Unit.BOX,
  Unit.SET,
  Unit.None,
];

export const unitTranslations: { [key in Unit]: string } = {
  // Weight
  [Unit.MILLIGRAM]: "ملغ",
  [Unit.GRAM_ALT]: "جم",
  [Unit.KILOGRAM]: "كجم",
  [Unit.TON]: "طن",

  // Volume
  [Unit.MILLILITER]: "مل",
  [Unit.LITER]: "لتر",
  [Unit.FLUID_OUNCE]: "أونصة سائلة",
  [Unit.OUNCE]: "أونصة",
  [Unit.GALLON]: "غالون",

  // Count
  [Unit.PIECE]: "قطعة",
  [Unit.PAIR]: "زوج",
  [Unit.DOZEN]: "دزينة",

  // Packaging
  [Unit.PACK]: "عبوة",
  [Unit.BOX]: "علبة",
  [Unit.SET]: "مجموعة",
  [Unit.None]: "لا يوجد",
};
