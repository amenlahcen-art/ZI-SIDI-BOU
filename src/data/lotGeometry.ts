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
  15: { x: 32.70, y: 59.30, width: 7.00, height: 7.80 },
  16: { x: 40.20, y: 59.30, width: 7.00, height: 7.80 },
  17: { x: 50.50, y: 59.30, width: 7.00, height: 7.80 },
  18: { x: 58.00, y: 59.30, width: 7.00, height: 7.80 },
  // --- BLOC : lots 24,25,26,27 ---
  27: { x: 32.67, y: 48.70, width: 5.83, height: 9.30 },
  26: { x: 38.50, y: 48.70, width: 5.83, height: 9.30 },
  25: { x: 51.42, y: 48.70, width: 6.75, height: 9.30 },
  24: { x: 58.17, y: 48.70, width: 6.83, height: 9.30 },

  // --- Prochains blocs à tracer (dans l'ordre) ---
  // TODO: 15,16,17,18
  // TODO: 27,26 / 25,24 (avec la mosquée)
  // TODO: 19,20 / 23bis,23,22,21
  // TODO: 1,2 (usine fabrication poteaux électriques)
  // TODO: rangée 41-46, 47-58, 59-65, 66-70...
  // TODO: TR I (droite), TR III (gauche)
};
