// Géométrie réelle des lots, tracée depuis le plan maître officiel (JPG).
// Contrairement à generateLots() qui calculait x/y/width/height avec une formule,
// ici chaque lot a ses coordonnées RÉELLES lues sur le plan (en % de la largeur/hauteur totale du plan).
//
// Méthode : on trace bloc par bloc (îlot par îlot), dans l'ordre où les numéros
// apparaissent réellement sur le plan, puis on colle ces coordonnées dans ce fichier.
//
// Une fois tous les blocs tracés, ce fichier remplace complètement le calcul
// procédural de position dans lots.ts.

export interface LotGeometry {
  // Cas normal : rectangle simple
  x?: number;      // % depuis la gauche du plan
  y?: number;      // % depuis le haut du plan
  width?: number;  // % de largeur
  height?: number; // % de hauteur
  // Cas forme irrégulière (mosquée, protection civile, STEG...) :
  // liste de points qui dessinent le contour exact, dans l'ordre (ex: sens horaire)
  points?: { x: number; y: number }[];
}

export const lotGeometry: Record<number, LotGeometry> = {
  // --- BLOC : rangée des lots 3 à 8 (bas du plan, au-dessus de l'espace vert) ---
  // Tracé depuis le crop (370,680)-(800,800) du JPG original (1200x896 px)
  8: { x: 37.50, y: 68.4, width: 3.5, height: 10.8 },
  7: { x: 41.80, y: 68.4, width: 3.3, height: 10.8 },
  6: { x: 45.60, y: 68.4, width: 3.3, height: 10.8 },
  5: { x: 51.70, y: 68.4, width: 3.5, height: 10.8 },
  4: { x: 55.75, y: 68.4, width: 3.3, height: 10.8 },
  3: { x: 59.70, y: 68.4, width: 3.7, height: 10.8 },
    // --- BLOC : lots 15,16,17,18 ---
  15: { x: 37.40, y: 60.50, width: 5.50, height: 7.10 },
  16: { x: 43.50, y: 60.50, width: 5.50, height: 7.10 },
  17: { x: 51.70, y: 60.50, width: 5.50, height: 7.10 },
  18: { x: 57.90, y: 60.50, width: 5.50, height: 7.10 },
  19: { x: 63.50, y: 60.50, width: 5.50, height: 7.10 },
  // --- BLOC : lots 24,25,26,27 ---
  27: { x: 37.40, y: 51.30, width: 5.30, height: 8.30 },
  26: {
  points: [
    { x: 43.30, y: 51.30 },  // haut-gauche
    { x: 46.50, y: 51.30 },  // haut, juste avant l'encoche
    { x: 46.50, y: 55.00 },  // coin en diagonale (comme sur le plan)
    { x: 48.90, y: 55.00 },  // rejoint le bord droit
    { x: 48.90, y: 59.60 },  // bas-droit
    { x: 43.30, y: 59.60 },  // bas-gauche
  ],
},
25: {
  points: [
    { x: 54.27, y: 51.30 },
    { x: 57.45, y: 51.30 },
    { x: 57.45, y: 59.60 },
    { x: 51.70, y: 59.60 },
    { x: 51.70, y: 55.00 },
    { x: 53.00, y: 55.00 },  // resserré vers la droite (était 53.30)
    { x: 54.30, y: 53.00 },  // resserré vers le haut/droite (était 54.00)
  ],
},
  24: { x: 58.17, y: 51.30, width: 5.25, height: 8.30 },
      // --- BLOC : lots 41,42,43,44,45,46 ---
  41: { x: 41.00, y: 41.30, width: 3.00, height: 6.50 },
  42: { x: 44.50, y: 41.30, width: 3.00, height: 6.50 },
  43: { x: 48.05, y: 41.30, width: 4.50, height: 4.10 },
  44: { x: 53.15, y: 41.30, width: 3.00, height: 6.50 },
  45: { x: 56.70, y: 41.30, width: 3.00, height: 6.50 },
  46: { x: 60.35, y: 41.30, width: 3.20, height: 6.50 },
  // --- BLOC : lots 59,60,61,62,63,64,65 ---
  65: { x: 37.15, y: 34.00, width: 3.20, height: 6.50 },
  64: { x: 41.05, y: 34.00, width: 3.20, height: 6.50 },
  63: { x: 44.90, y: 34.00, width: 3.20, height: 6.50 },
  62: { x: 48.70, y: 34.00, width: 3.20, height: 6.50 },
  61: { x: 52.60, y: 34.00, width: 3.20, height: 6.50 },
  60: { x: 56.50, y: 34.00, width: 3.20, height: 6.50 },
  59: { x: 60.32, y: 34.00, width: 3.20, height: 6.50 },
// --- BLOC : lots 90 à 99 (interpolé entre les 2 ancres 90 et 99) ---
  90: { x: 37.10, y: 26.70, width: 2.00, height: 4.80 },
  91: { x: 39.70, y: 26.70, width: 2.00, height: 4.80 },
  92: { x: 42.20, y: 26.70, width: 2.00, height: 4.80 },
  93: { x: 44.70, y: 26.70, width: 2.00, height: 4.80 },
  94: { x: 47.30, y: 26.70, width: 2.00, height: 4.80 },
  95: { x: 51.40, y: 26.70, width: 2.00, height: 4.80 },
  96: { x: 53.90, y: 26.70, width: 2.00, height: 4.80 },
  97: { x: 56.50, y: 26.70, width: 2.00, height: 4.80 },
  98: { x: 59.00, y: 26.70, width: 2.00, height: 4.80 },
  99: { x: 61.55, y: 26.70, width: 2.00, height: 4.80 },

  // --- FORME IRRÉGULIÈRE : "protection civile" ---
9006: {
  points: [
    { x: 37.10, y: 41.30 },
    { x: 40.30, y: 41.30 },
    { x: 40.30, y: 47.80 },
    { x: 38.00, y: 47.80 },
    { x: 38.00, y: 47.30 },
    { x: 37.10, y: 47.30 },
  ],
},

  // --- Prochains blocs à tracer (dans l'ordre) ---
  // TODO: 15,16,17,18
  // TODO: 27,26 / 25,24 (avec la mosquée)
  // TODO: 19,20 / 23bis,23,22,21
  // TODO: 1,2 (usine fabrication poteaux électriques)
  // TODO: rangée 41-46, 47-58, 59-65, 66-70...
  // TODO: TR I (droite), TR III (gauche)

  // --- AUTO-GENERATED ADDITIONS (from lots.full.json) ---
  1: { x: 67.5, y: 14, width: 2.8, height: 4.8 },

  2: { x: 70.55, y: 14, width: 2.8, height: 4.8 },

  9: { x: 91.9, y: 14, width: 2.8, height: 4.8 },

  10: { x: 94.95, y: 14, width: 2.8, height: 4.8 },

  11: { x: 67.5, y: 19.2, width: 2.8, height: 4.8 },

  12: { x: 70.55, y: 19.2, width: 2.8, height: 4.8 },

  13: { x: 73.6, y: 19.2, width: 2.8, height: 4.8 },

  14: { x: 76.65, y: 19.2, width: 2.8, height: 4.8 },

  20: { x: 94.95, y: 19.2, width: 2.8, height: 4.8 },

  21: { x: 67.5, y: 24.4, width: 2.8, height: 4.8 },

  22: { x: 70.55, y: 24.4, width: 2.8, height: 4.8 },

  23: { x: 73.6, y: 24.4, width: 2.8, height: 4.8 },

  28: { x: 88.85, y: 24.4, width: 2.8, height: 4.8 },

  29: { x: 91.9, y: 24.4, width: 2.8, height: 4.8 },

  30: { x: 94.95, y: 24.4, width: 2.8, height: 4.8 },

  31: { x: 67.5, y: 33.6, width: 2.8, height: 4.8 },

  32: { x: 70.55, y: 33.6, width: 2.8, height: 4.8 },

  33: { x: 73.6, y: 33.6, width: 2.8, height: 4.8 },

  34: { x: 76.65, y: 33.6, width: 2.8, height: 4.8 },

  35: { x: 79.7, y: 33.6, width: 2.8, height: 4.8 },

  36: { x: 82.75, y: 33.6, width: 2.8, height: 4.8 },

  37: { x: 85.8, y: 33.6, width: 2.8, height: 4.8 },

  38: { x: 88.85, y: 33.6, width: 2.8, height: 4.8 },

  39: { x: 91.9, y: 33.6, width: 2.8, height: 4.8 },

  40: { x: 94.95, y: 33.6, width: 2.8, height: 4.8 },

  47: { x: 85.8, y: 38.8, width: 2.8, height: 4.8 },

  48: { x: 88.85, y: 38.8, width: 2.8, height: 4.8 },

  49: { x: 91.9, y: 38.8, width: 2.8, height: 4.8 },

  50: { x: 94.95, y: 38.8, width: 2.8, height: 4.8 },

  51: { x: 67.5, y: 44, width: 2.8, height: 4.8 },

  52: { x: 70.55, y: 44, width: 2.8, height: 4.8 },

  53: { x: 73.6, y: 44, width: 2.8, height: 4.8 },

  54: { x: 76.65, y: 44, width: 2.8, height: 4.8 },

  55: { x: 79.7, y: 44, width: 2.8, height: 4.8 },

  56: { x: 82.75, y: 44, width: 2.8, height: 4.8 },

  57: { x: 85.8, y: 44, width: 2.8, height: 4.8 },

  58: { x: 88.85, y: 44, width: 2.8, height: 4.8 },

  66: { x: 82.75, y: 53.2, width: 2.8, height: 4.8 },

  67: { x: 85.8, y: 53.2, width: 2.8, height: 4.8 },

  68: { x: 88.85, y: 53.2, width: 2.8, height: 4.8 },

  69: { x: 91.9, y: 53.2, width: 2.8, height: 4.8 },

  70: { x: 94.95, y: 53.2, width: 2.8, height: 4.8 },

  71: { x: 67.5, y: 58.4, width: 2.8, height: 4.8 },

  72: { x: 70.55, y: 58.4, width: 2.8, height: 4.8 },

  73: { x: 73.6, y: 58.4, width: 2.8, height: 4.8 },

  74: { x: 76.65, y: 58.4, width: 2.8, height: 4.8 },

  75: { x: 79.7, y: 58.4, width: 2.8, height: 4.8 },

  76: { x: 82.75, y: 58.4, width: 2.8, height: 4.8 },

  77: { x: 85.8, y: 58.4, width: 2.8, height: 4.8 },

  78: { x: 88.85, y: 58.4, width: 2.8, height: 4.8 },

  79: { x: 91.9, y: 58.4, width: 2.8, height: 4.8 },

  80: { x: 94.95, y: 58.4, width: 2.8, height: 4.8 },

  81: { x: 67.5, y: 63.6, width: 2.8, height: 4.8 },

  82: { x: 70.55, y: 63.6, width: 2.8, height: 4.8 },

  83: { x: 73.6, y: 63.6, width: 2.8, height: 4.8 },

  84: { x: 76.65, y: 63.6, width: 2.8, height: 4.8 },

  85: { x: 79.7, y: 63.6, width: 2.8, height: 4.8 },

  86: { x: 82.75, y: 63.6, width: 2.8, height: 4.8 },

  87: { x: 85.8, y: 63.6, width: 2.8, height: 4.8 },

  88: { x: 88.85, y: 63.6, width: 2.8, height: 4.8 },

  89: { x: 91.9, y: 63.6, width: 2.8, height: 4.8 },

  100: { x: 94.95, y: 68.80000000000001, width: 2.8, height: 4.8 },

  101: { x: 35.5, y: 14, width: 2.8, height: 4.8 },

  102: { x: 38.55, y: 14, width: 2.8, height: 4.8 },

  103: { x: 41.6, y: 14, width: 2.8, height: 4.8 },

  104: { x: 44.65, y: 14, width: 2.8, height: 4.8 },

  105: { x: 47.7, y: 14, width: 2.8, height: 4.8 },

  106: { x: 50.75, y: 14, width: 2.8, height: 4.8 },

  107: { x: 53.8, y: 14, width: 2.8, height: 4.8 },

  108: { x: 56.849999999999994, y: 14, width: 2.8, height: 4.8 },

  109: { x: 59.9, y: 14, width: 2.8, height: 4.8 },

  110: { x: 62.95, y: 14, width: 2.8, height: 4.8 },

  111: { x: 35.5, y: 19.2, width: 2.8, height: 4.8 },

  112: { x: 38.55, y: 19.2, width: 2.8, height: 4.8 },

  113: { x: 41.6, y: 19.2, width: 2.8, height: 4.8 },

  114: { x: 44.65, y: 19.2, width: 2.8, height: 4.8 },

  115: { x: 47.7, y: 19.2, width: 2.8, height: 4.8 },

  116: { x: 50.75, y: 19.2, width: 2.8, height: 4.8 },

  117: { x: 53.8, y: 19.2, width: 2.8, height: 4.8 },

  118: { x: 56.849999999999994, y: 19.2, width: 2.8, height: 4.8 },

  119: { x: 59.9, y: 19.2, width: 2.8, height: 4.8 },

  120: { x: 62.95, y: 19.2, width: 2.8, height: 4.8 },

  121: { x: 35.5, y: 24.4, width: 2.8, height: 4.8 },

  122: { x: 38.55, y: 24.4, width: 2.8, height: 4.8 },

  123: { x: 41.6, y: 24.4, width: 2.8, height: 4.8 },

  124: { x: 44.65, y: 24.4, width: 2.8, height: 4.8 },

  125: { x: 47.7, y: 24.4, width: 2.8, height: 4.8 },

  126: { x: 50.75, y: 24.4, width: 2.8, height: 4.8 },

  127: { x: 53.8, y: 24.4, width: 2.8, height: 4.8 },

  128: { x: 56.849999999999994, y: 24.4, width: 2.8, height: 4.8 },

  129: { x: 59.9, y: 24.4, width: 2.8, height: 4.8 },

  130: { x: 62.95, y: 24.4, width: 2.8, height: 4.8 },

  131: { x: 35.5, y: 33.6, width: 2.8, height: 4.8 },

  132: { x: 38.55, y: 33.6, width: 2.8, height: 4.8 },

  133: { x: 41.6, y: 33.6, width: 2.8, height: 4.8 },

  134: { x: 44.65, y: 33.6, width: 2.8, height: 4.8 },

  135: { x: 47.7, y: 33.6, width: 2.8, height: 4.8 },

  136: { x: 50.75, y: 33.6, width: 2.8, height: 4.8 },

  137: { x: 53.8, y: 33.6, width: 2.8, height: 4.8 },

  138: { x: 56.849999999999994, y: 33.6, width: 2.8, height: 4.8 },

  139: { x: 59.9, y: 33.6, width: 2.8, height: 4.8 },

  140: { x: 62.95, y: 33.6, width: 2.8, height: 4.8 },

  141: { x: 35.5, y: 38.8, width: 2.8, height: 4.8 },

  142: { x: 38.55, y: 38.8, width: 2.8, height: 4.8 },

  143: { x: 41.6, y: 38.8, width: 2.8, height: 4.8 },

  144: { x: 44.65, y: 38.8, width: 2.8, height: 4.8 },

  145: { x: 47.7, y: 38.8, width: 2.8, height: 4.8 },

  146: { x: 50.75, y: 38.8, width: 2.8, height: 4.8 },

  147: { x: 53.8, y: 38.8, width: 2.8, height: 4.8 },

  148: { x: 56.849999999999994, y: 38.8, width: 2.8, height: 4.8 },

  149: { x: 59.9, y: 38.8, width: 2.8, height: 4.8 },

  150: { x: 62.95, y: 38.8, width: 2.8, height: 4.8 },

  151: { x: 35.5, y: 44, width: 2.8, height: 4.8 },

  152: { x: 38.55, y: 44, width: 2.8, height: 4.8 },

  153: { x: 41.6, y: 44, width: 2.8, height: 4.8 },

  154: { x: 44.65, y: 44, width: 2.8, height: 4.8 },

  155: { x: 47.7, y: 44, width: 2.8, height: 4.8 },

  156: { x: 50.75, y: 44, width: 2.8, height: 4.8 },

  157: { x: 53.8, y: 44, width: 2.8, height: 4.8 },

  158: { x: 56.849999999999994, y: 44, width: 2.8, height: 4.8 },

  159: { x: 59.9, y: 44, width: 2.8, height: 4.8 },

  160: { x: 62.95, y: 44, width: 2.8, height: 4.8 },

  161: { x: 35.5, y: 53.2, width: 2.8, height: 4.8 },

  162: { x: 38.55, y: 53.2, width: 2.8, height: 4.8 },

  163: { x: 41.6, y: 53.2, width: 2.8, height: 4.8 },

  164: { x: 44.65, y: 53.2, width: 2.8, height: 4.8 },

  165: { x: 47.7, y: 53.2, width: 2.8, height: 4.8 },

  166: { x: 50.75, y: 53.2, width: 2.8, height: 4.8 },

  167: { x: 53.8, y: 53.2, width: 2.8, height: 4.8 },

  168: { x: 56.849999999999994, y: 53.2, width: 2.8, height: 4.8 },

  169: { x: 59.9, y: 53.2, width: 2.8, height: 4.8 },

  170: { x: 62.95, y: 53.2, width: 2.8, height: 4.8 },

  171: { x: 35.5, y: 58.4, width: 2.8, height: 4.8 },

  172: { x: 38.55, y: 58.4, width: 2.8, height: 4.8 },

  173: { x: 41.6, y: 58.4, width: 2.8, height: 4.8 },

  174: { x: 44.65, y: 58.4, width: 2.8, height: 4.8 },

  175: { x: 47.7, y: 58.4, width: 2.8, height: 4.8 },

  176: { x: 50.75, y: 58.4, width: 2.8, height: 4.8 },

  177: { x: 53.8, y: 58.4, width: 2.8, height: 4.8 },

  178: { x: 56.849999999999994, y: 58.4, width: 2.8, height: 4.8 },

  179: { x: 59.9, y: 58.4, width: 2.8, height: 4.8 },

  180: { x: 62.95, y: 58.4, width: 2.8, height: 4.8 },

  181: { x: 35.5, y: 63.6, width: 2.8, height: 4.8 },

  182: { x: 38.55, y: 63.6, width: 2.8, height: 4.8 },

  183: { x: 41.6, y: 63.6, width: 2.8, height: 4.8 },

  184: { x: 44.65, y: 63.6, width: 2.8, height: 4.8 },

  185: { x: 47.7, y: 63.6, width: 2.8, height: 4.8 },

  186: { x: 50.75, y: 63.6, width: 2.8, height: 4.8 },

  187: { x: 53.8, y: 63.6, width: 2.8, height: 4.8 },

  188: { x: 56.849999999999994, y: 63.6, width: 2.8, height: 4.8 },

  189: { x: 59.9, y: 63.6, width: 2.8, height: 4.8 },

  190: { x: 62.95, y: 63.6, width: 2.8, height: 4.8 },

  191: { x: 35.5, y: 68.80000000000001, width: 2.8, height: 4.8 },

  192: { x: 38.55, y: 68.80000000000001, width: 2.8, height: 4.8 },

  193: { x: 41.6, y: 68.80000000000001, width: 2.8, height: 4.8 },

  194: { x: 44.65, y: 68.80000000000001, width: 2.8, height: 4.8 },

  195: { x: 47.7, y: 68.80000000000001, width: 2.8, height: 4.8 },

  196: { x: 50.75, y: 68.80000000000001, width: 2.8, height: 4.8 },

  197: { x: 53.8, y: 68.80000000000001, width: 2.8, height: 4.8 },

  198: { x: 56.849999999999994, y: 68.80000000000001, width: 2.8, height: 4.8 },

  199: { x: 59.9, y: 68.80000000000001, width: 2.8, height: 4.8 },

  200: { x: 62.95, y: 68.80000000000001, width: 2.8, height: 4.8 },

  201: { x: 35.5, y: 78, width: 2.8, height: 4.8 },

  202: { x: 38.55, y: 78, width: 2.8, height: 4.8 },

  203: { x: 41.6, y: 78, width: 2.8, height: 4.8 },

  204: { x: 44.65, y: 78, width: 2.8, height: 4.8 },

  205: { x: 47.7, y: 78, width: 2.8, height: 4.8 },

  206: { x: 50.75, y: 78, width: 2.8, height: 4.8 },

  207: { x: 53.8, y: 78, width: 2.8, height: 4.8 },

  208: { x: 56.849999999999994, y: 78, width: 2.8, height: 4.8 },

  209: { x: 59.9, y: 78, width: 2.8, height: 4.8 },

  210: { x: 62.95, y: 78, width: 2.8, height: 4.8 },

  211: { x: 35.5, y: 83.2, width: 2.8, height: 4.8 },

  212: { x: 38.55, y: 83.2, width: 2.8, height: 4.8 },

  213: { x: 41.6, y: 83.2, width: 2.8, height: 4.8 },

  214: { x: 44.65, y: 83.2, width: 2.8, height: 4.8 },

  215: { x: 47.7, y: 83.2, width: 2.8, height: 4.8 },

  216: { x: 50.75, y: 83.2, width: 2.8, height: 4.8 },

  217: { x: 53.8, y: 83.2, width: 2.8, height: 4.8 },

  218: { x: 56.849999999999994, y: 83.2, width: 2.8, height: 4.8 },

  219: { x: 59.9, y: 83.2, width: 2.8, height: 4.8 },

  220: { x: 62.95, y: 83.2, width: 2.8, height: 4.8 },

  221: { x: 35.5, y: 88.4, width: 2.8, height: 4.8 },

  222: { x: 38.55, y: 88.4, width: 2.8, height: 4.8 },

  223: { x: 41.6, y: 88.4, width: 2.8, height: 4.8 },

  224: { x: 44.65, y: 88.4, width: 2.8, height: 4.8 },

  225: { x: 47.7, y: 88.4, width: 2.8, height: 4.8 },

  226: { x: 50.75, y: 88.4, width: 2.8, height: 4.8 },

  227: { x: 53.8, y: 88.4, width: 2.8, height: 4.8 },

  228: { x: 56.849999999999994, y: 88.4, width: 2.8, height: 4.8 },

  229: { x: 59.9, y: 88.4, width: 2.8, height: 4.8 },

  230: { x: 62.95, y: 88.4, width: 2.8, height: 4.8 },

  231: { x: 3.5, y: 14, width: 2.8, height: 4.8 },

  232: { x: 6.55, y: 14, width: 2.8, height: 4.8 },

  233: { x: 9.6, y: 14, width: 2.8, height: 4.8 },

  234: { x: 12.649999999999999, y: 14, width: 2.8, height: 4.8 },

  235: { x: 15.7, y: 14, width: 2.8, height: 4.8 },

  236: { x: 18.75, y: 14, width: 2.8, height: 4.8 },

  237: { x: 21.799999999999997, y: 14, width: 2.8, height: 4.8 },

  238: { x: 24.849999999999998, y: 14, width: 2.8, height: 4.8 },

  239: { x: 27.9, y: 14, width: 2.8, height: 4.8 },

  240: { x: 30.95, y: 14, width: 2.8, height: 4.8 },

  241: { x: 3.5, y: 19.2, width: 2.8, height: 4.8 },

  242: { x: 6.55, y: 19.2, width: 2.8, height: 4.8 },

  243: { x: 9.6, y: 19.2, width: 2.8, height: 4.8 },

  244: { x: 12.649999999999999, y: 19.2, width: 2.8, height: 4.8 },

  245: { x: 15.7, y: 19.2, width: 2.8, height: 4.8 },

  246: { x: 18.75, y: 19.2, width: 2.8, height: 4.8 },

  247: { x: 21.799999999999997, y: 19.2, width: 2.8, height: 4.8 },

  248: { x: 24.849999999999998, y: 19.2, width: 2.8, height: 4.8 },

  249: { x: 27.9, y: 19.2, width: 2.8, height: 4.8 },

  250: { x: 30.95, y: 19.2, width: 2.8, height: 4.8 },

  251: { x: 3.5, y: 24.4, width: 2.8, height: 4.8 },

  252: { x: 6.55, y: 24.4, width: 2.8, height: 4.8 },

  253: { x: 9.6, y: 24.4, width: 2.8, height: 4.8 },

  254: { x: 12.649999999999999, y: 24.4, width: 2.8, height: 4.8 },

  255: { x: 15.7, y: 24.4, width: 2.8, height: 4.8 },

  256: { x: 18.75, y: 24.4, width: 2.8, height: 4.8 },

  257: { x: 21.799999999999997, y: 24.4, width: 2.8, height: 4.8 },

  258: { x: 24.849999999999998, y: 24.4, width: 2.8, height: 4.8 },

  259: { x: 27.9, y: 24.4, width: 2.8, height: 4.8 },

  260: { x: 30.95, y: 24.4, width: 2.8, height: 4.8 },

  261: { x: 3.5, y: 33.6, width: 2.8, height: 4.8 },

  262: { x: 6.55, y: 33.6, width: 2.8, height: 4.8 },

  263: { x: 9.6, y: 33.6, width: 2.8, height: 4.8 },

  264: { x: 12.649999999999999, y: 33.6, width: 2.8, height: 4.8 },

  265: { x: 15.7, y: 33.6, width: 2.8, height: 4.8 },

  266: { x: 18.75, y: 33.6, width: 2.8, height: 4.8 },

  267: { x: 21.799999999999997, y: 33.6, width: 2.8, height: 4.8 },

  268: { x: 24.849999999999998, y: 33.6, width: 2.8, height: 4.8 },

  269: { x: 27.9, y: 33.6, width: 2.8, height: 4.8 },

  270: { x: 30.95, y: 33.6, width: 2.8, height: 4.8 },

  271: { x: 3.5, y: 38.8, width: 2.8, height: 4.8 },

  272: { x: 6.55, y: 38.8, width: 2.8, height: 4.8 },

  273: { x: 9.6, y: 38.8, width: 2.8, height: 4.8 },

  274: { x: 12.649999999999999, y: 38.8, width: 2.8, height: 4.8 },

  275: { x: 15.7, y: 38.8, width: 2.8, height: 4.8 },

  276: { x: 18.75, y: 38.8, width: 2.8, height: 4.8 },

  277: { x: 21.799999999999997, y: 38.8, width: 2.8, height: 4.8 },

  278: { x: 24.849999999999998, y: 38.8, width: 2.8, height: 4.8 },

  279: { x: 27.9, y: 38.8, width: 2.8, height: 4.8 },

  280: { x: 30.95, y: 38.8, width: 2.8, height: 4.8 },

  281: { x: 3.5, y: 44, width: 2.8, height: 4.8 },

  282: { x: 6.55, y: 44, width: 2.8, height: 4.8 },

  283: { x: 9.6, y: 44, width: 2.8, height: 4.8 },

  284: { x: 12.649999999999999, y: 44, width: 2.8, height: 4.8 },

  285: { x: 15.7, y: 44, width: 2.8, height: 4.8 },

  286: { x: 18.75, y: 44, width: 2.8, height: 4.8 },

  287: { x: 21.799999999999997, y: 44, width: 2.8, height: 4.8 },

  288: { x: 24.849999999999998, y: 44, width: 2.8, height: 4.8 },

  289: { x: 27.9, y: 44, width: 2.8, height: 4.8 },

  290: { x: 30.95, y: 44, width: 2.8, height: 4.8 },

  291: { x: 3.5, y: 53.2, width: 2.8, height: 4.8 },

  292: { x: 6.55, y: 53.2, width: 2.8, height: 4.8 },

  293: { x: 9.6, y: 53.2, width: 2.8, height: 4.8 },

  294: { x: 12.649999999999999, y: 53.2, width: 2.8, height: 4.8 },

  295: { x: 15.7, y: 53.2, width: 2.8, height: 4.8 },

  296: { x: 18.75, y: 53.2, width: 2.8, height: 4.8 },

  297: { x: 21.799999999999997, y: 53.2, width: 2.8, height: 4.8 },

  298: { x: 24.849999999999998, y: 53.2, width: 2.8, height: 4.8 },

  299: { x: 27.9, y: 53.2, width: 2.8, height: 4.8 },

  300: { x: 30.95, y: 53.2, width: 2.8, height: 4.8 },

  301: { x: 3.5, y: 58.4, width: 2.8, height: 4.8 },

  302: { x: 6.55, y: 58.4, width: 2.8, height: 4.8 },

  303: { x: 9.6, y: 58.4, width: 2.8, height: 4.8 },

  304: { x: 12.649999999999999, y: 58.4, width: 2.8, height: 4.8 },

  305: { x: 15.7, y: 58.4, width: 2.8, height: 4.8 },

  306: { x: 18.75, y: 58.4, width: 2.8, height: 4.8 },

  307: { x: 21.799999999999997, y: 58.4, width: 2.8, height: 4.8 },

  308: { x: 24.849999999999998, y: 58.4, width: 2.8, height: 4.8 },

  309: { x: 27.9, y: 58.4, width: 2.8, height: 4.8 },

  310: { x: 30.95, y: 58.4, width: 2.8, height: 4.8 },

  311: { x: 3.5, y: 63.6, width: 2.8, height: 4.8 },

  312: { x: 6.55, y: 63.6, width: 2.8, height: 4.8 },

  313: { x: 9.6, y: 63.6, width: 2.8, height: 4.8 },

  314: { x: 12.649999999999999, y: 63.6, width: 2.8, height: 4.8 },

  315: { x: 15.7, y: 63.6, width: 2.8, height: 4.8 },

  316: { x: 18.75, y: 63.6, width: 2.8, height: 4.8 },

  317: { x: 21.799999999999997, y: 63.6, width: 2.8, height: 4.8 },

  318: { x: 24.849999999999998, y: 63.6, width: 2.8, height: 4.8 },

  319: { x: 27.9, y: 63.6, width: 2.8, height: 4.8 },

  320: { x: 30.95, y: 63.6, width: 2.8, height: 4.8 },

  321: { x: 3.5, y: 68.80000000000001, width: 2.8, height: 4.8 },

  322: { x: 6.55, y: 68.80000000000001, width: 2.8, height: 4.8 },

  323: { x: 9.6, y: 68.80000000000001, width: 2.8, height: 4.8 },

  324: { x: 12.649999999999999, y: 68.80000000000001, width: 2.8, height: 4.8 },

  325: { x: 15.7, y: 68.80000000000001, width: 2.8, height: 4.8 },

  326: { x: 18.75, y: 68.80000000000001, width: 2.8, height: 4.8 },

  327: { x: 21.799999999999997, y: 68.80000000000001, width: 2.8, height: 4.8 },

  328: { x: 24.849999999999998, y: 68.80000000000001, width: 2.8, height: 4.8 },

  329: { x: 27.9, y: 68.80000000000001, width: 2.8, height: 4.8 },

  330: { x: 30.95, y: 68.80000000000001, width: 2.8, height: 4.8 },

  331: { x: 3.5, y: 78, width: 2.8, height: 4.8 },

  332: { x: 6.55, y: 78, width: 2.8, height: 4.8 },

  333: { x: 9.6, y: 78, width: 2.8, height: 4.8 },

  334: { x: 12.649999999999999, y: 78, width: 2.8, height: 4.8 },

  335: { x: 15.7, y: 78, width: 2.8, height: 4.8 },

  336: { x: 18.75, y: 78, width: 2.8, height: 4.8 },

  337: { x: 21.799999999999997, y: 78, width: 2.8, height: 4.8 },

  338: { x: 24.849999999999998, y: 78, width: 2.8, height: 4.8 },

  339: { x: 27.9, y: 78, width: 2.8, height: 4.8 },

  340: { x: 30.95, y: 78, width: 2.8, height: 4.8 },

  341: { x: 3.5, y: 83.2, width: 2.8, height: 4.8 },

  342: { x: 6.55, y: 83.2, width: 2.8, height: 4.8 },

  343: { x: 9.6, y: 83.2, width: 2.8, height: 4.8 },

  344: { x: 12.649999999999999, y: 83.2, width: 2.8, height: 4.8 },

  345: { x: 15.7, y: 83.2, width: 2.8, height: 4.8 },

  346: { x: 18.75, y: 83.2, width: 2.8, height: 4.8 },

  347: { x: 21.799999999999997, y: 83.2, width: 2.8, height: 4.8 },

  348: { x: 24.849999999999998, y: 83.2, width: 2.8, height: 4.8 },

  349: { x: 27.9, y: 83.2, width: 2.8, height: 4.8 },

  350: { x: 30.95, y: 83.2, width: 2.8, height: 4.8 },

  351: { x: 3.5, y: 88.4, width: 2.8, height: 4.8 },

  352: { x: 6.55, y: 88.4, width: 2.8, height: 4.8 },

  353: { x: 9.6, y: 88.4, width: 2.8, height: 4.8 },

  354: { x: 12.649999999999999, y: 88.4, width: 2.8, height: 4.8 },

  355: { x: 15.7, y: 88.4, width: 2.8, height: 4.8 },

  356: { x: 18.75, y: 88.4, width: 2.8, height: 4.8 },

  357: { x: 21.799999999999997, y: 88.4, width: 2.8, height: 4.8 },

  358: { x: 24.849999999999998, y: 88.4, width: 2.8, height: 4.8 },

  359: { x: 27.9, y: 88.4, width: 2.8, height: 4.8 },

  360: { x: 30.95, y: 88.4, width: 2.8, height: 4.8 },

  361: { x: 3.5, y: 93.60000000000001, width: 2.8, height: 4.8 },
};
