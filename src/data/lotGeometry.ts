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
  26: { x: 43.30, y: 51.30, width: 5.60, height: 8.30 },
  25: { x: 51.70, y: 51.30, width: 5.75, height: 8.30 },
  24: { x: 58.17, y: 51.30, width: 5.25, height: 8.30 },

  // --- Prochains blocs à tracer (dans l'ordre) ---
  // TODO: 15,16,17,18
  // TODO: 27,26 / 25,24 (avec la mosquée)
  // TODO: 19,20 / 23bis,23,22,21
  // TODO: 1,2 (usine fabrication poteaux électriques)
  // TODO: rangée 41-46, 47-58, 59-65, 66-70...
  // TODO: TR I (droite), TR III (gauche)
};
