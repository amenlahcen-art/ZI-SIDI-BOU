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

  // --- FORME IRRÉGULIÈRE : "protection civile" ---
  9001: {
    points: [
      { x: 29.50, y: 20.10 },
      { x: 34.00, y: 20.10 },
      { x: 34.00, y: 22.80 },
      { x: 32.50, y: 24.50 },
      { x: 29.50, y: 24.50 },
    ],
  },
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
};
