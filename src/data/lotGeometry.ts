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
  x: number;      // % depuis la gauche du plan
  y: number;      // % depuis le haut du plan
  width: number;  // % de largeur
  height: number; // % de hauteur
}

export const lotGeometry: Record<number, LotGeometry> = {
  // --- BLOC : rangée des lots 3 à 8 (bas du plan, au-dessus de l'espace vert) ---
  // Tracé depuis le crop (370,680)-(800,800) du JPG original (1200x896 px)
  8: { x: 32.67, y: 74.4, width: 4.6, height: 12.5 },
  7: { x: 37.90, y: 74.4, width: 4.4, height: 12.5 },
  6: { x: 42.80, y: 74.4, width: 4.3, height: 12.5 },
  5: { x: 50.40, y: 74.4, width: 4.6, height: 12.5 },
  4: { x: 55.30, y: 74.4, width: 4.6, height: 12.5 },
  3: { x: 60.30, y: 74.4, width: 4.6, height: 12.5 },
    // --- BLOC : lots 15,16,17,18 ---
  15: { x: 32.70, y: 64.90, width: 7.00, height: 8.80 },
  16: { x: 40.20, y: 64.90, width: 7.00, height: 8.80 },
  17: { x: 50.50, y: 64.90, width: 7.00, height: 8.80 },
  18: { x: 58.00, y: 64.90, width: 7.00, height: 8.80 },
  // --- BLOC : lots 24,25,26,27 ---
  27: { x: 32.70, y: 54.40, width: 6.50, height: 9.90 },
  26: { x: 40.00, y: 54.40, width: 6.80, height: 9.90 },
  25: { x: 50.49, y: 54.40, width: 7.20, height: 9.90 },
  24: { x: 58.50, y: 54.40, width: 6.50, height: 9.90 },
    // --- BLOC : lots 41,42,43,44,45,46 ---
  41: { x: 37.10, y: 42.50, width: 3.80, height: 7.90 },
  42: { x: 41.50, y: 42.50, width: 3.80, height: 7.90 },
  43: { x: 45.90, y: 42.50, width: 5.80, height: 4.80 },
  44: { x: 52.30, y: 42.50, width: 3.80, height: 7.90 },
  45: { x: 56.70, y: 42.50, width: 3.80, height: 7.90 },
  46: { x: 61.40, y: 42.50, width: 3.80, height: 7.90 },
  // --- BLOC : lots 59,60,61,62,63,64,65 ---
  65: { x: 32.30, y: 33.80, width: 4.10, height: 7.70 },
  64: { x: 37.25, y: 33.80, width: 4.10, height: 7.70 },
  63: { x: 41.90, y: 33.80, width: 4.10, height: 7.70 },
  62: { x: 46.80, y: 33.80, width: 4.10, height: 7.70 },
  61: { x: 51.60, y: 33.80, width: 4.10, height: 7.70 },
  60: { x: 56.35, y: 33.80, width: 4.10, height: 7.70 },
  59: { x: 61.20, y: 33.80, width: 4.10, height: 7.70 },
  // --- Prochains blocs à tracer (dans l'ordre) ---
  // TODO: 15,16,17,18
  // TODO: 27,26 / 25,24 (avec la mosquée)
  // TODO: 19,20 / 23bis,23,22,21
  // TODO: 1,2 (usine fabrication poteaux électriques)
  // TODO: rangée 41-46, 47-58, 59-65, 66-70...
  // TODO: TR I (droite), TR III (gauche)
};
