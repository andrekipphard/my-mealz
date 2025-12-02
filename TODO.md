# MyMealz – TODO & Roadmap

## Phase 1 – MVP

- [x] Projektstruktur & Basis einrichten
  - Projektstruktur, Linting, Prettier, SCSS, SQLite-Integration, Home Screen, Basis-Komponenten.
- [x] Rezepte CRUD aufteilen
  - Rezepte-Feature in kleine, saubere Teilaufgaben zerlegen und strukturieren.
- [x] Recipe Type anlegen
  - TypeScript-Typen für Rezepte in src/types/recipe.ts definieren.
- [x] Recipe Component erstellen
  - Vue-Komponente Recipe.vue für die Anzeige/Bearbeitung eines Rezepts anlegen.
- [x] Recipe Styles anlegen
  - SCSS-Datei recipe.scss für die Rezept-Komponente erstellen und einbinden.
- [x] Composables für Rezepte
  - Composables wie useRecipe.ts für Logik (z.B. Laden, Speichern, Löschen) anlegen.
- [x] Rezepte-Übersicht (Liste)
  - Komponente für die Anzeige aller Rezepte (RecipeList.vue) erstellen.
- [x] Rezepte-Formular
  - Komponente für das Erstellen/Bearbeiten eines Rezepts (RecipeForm.vue) erstellen.
- [x] Edit Rezept
  - Bei Klick auf Edit Button innerhalb des Rezepts wird RecipeForm.vue geöffnet. Hier können alle Daten des Rezepts geändert und gespeichert werden.
- [x] Add Rezept
  - Bei Klick auf Add Button (wo weiß ich noch nicht) wird RecipeForm.vue geöffnet. Hier können alle Daten für das Rezept eingetragen und gespeichert werden. Anschließend wird es der RecipeList.vue hinzugefügt. (Kann ich hier einfach RecipeForm.vue reusen?)
- [ ] Rezepte-API/Service anbinden
  - Service/Composables mit Datenbank verbinden (CRUD-Methoden nutzen).

- [ ] Kategorien, Tags, Favoriten
- [ ] Random-Button
- [ ] "Lange nicht gekocht"-Logik
- [ ] Virtueller Kühlschrank (Zutaten, Mengen, Haltbarkeit)
- [ ] Vorschläge basierend auf vorhandenen Zutaten

## Phase 2 – Komfort & Features

- [ ] Einkaufsliste
- [ ] Zutaten-Barcode-Scanner (Kamera)
- [ ] Push-Notifications (z.B. Haltbarkeit läuft ab)
- [ ] Nährwertangaben

## Phase 3 – Cloud & Sync

- [ ] Benutzerkonten
- [ ] Cloud-Sync (optional)
- [ ] Rezepte teilen

## Technische Aufgaben

- [x] Projektstruktur & Grundsetup
- [x] Datenmodelle & DB-Service
- [ ] UI-Komponenten: Rezepte, Kühlschrank, Navigation
- [ ] Beispiel-Komponenten für Vorschlagslogik
- [ ] Tests & Linting

---

**Nächste Schritte:**

1. Recipe Type, Komponenten und Composables anlegen
2. Rezepte-Übersicht und Formular bauen
3. Datenbank-Service in die Komponenten einbinden
4. Vorschlagslogik implementieren
5. App auf Gerät testen
