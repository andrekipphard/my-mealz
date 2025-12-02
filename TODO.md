
# MyMealz – TODO & Roadmap


## Phase 1 – MVP

- [x] Projektstruktur & Basis einrichten
	- Projektstruktur, Linting, Prettier, SCSS, SQLite-Integration, Home Screen, Basis-Komponenten.
- [ ] Rezepte CRUD aufteilen
	- Rezepte-Feature in kleine, saubere Teilaufgaben zerlegen und strukturieren.
- [ ] Recipe Type anlegen
	- TypeScript-Typen für Rezepte in src/types/recipe.ts definieren.
- [ ] Recipe Component erstellen
	- Vue-Komponente Recipe.vue für die Anzeige/Bearbeitung eines Rezepts anlegen.
- [ ] Recipe Styles anlegen
	- SCSS-Datei recipe.scss für die Rezept-Komponente erstellen und einbinden.
- [ ] Composables für Rezepte
	- Composables wie useRecipe.ts für Logik (z.B. Laden, Speichern, Löschen) anlegen.
- [ ] Rezepte-Übersicht (Liste)
	- Komponente für die Anzeige aller Rezepte (RecipeList.vue) erstellen.
- [ ] Rezepte-Formular
	- Komponente für das Erstellen/Bearbeiten eines Rezepts (RecipeForm.vue) erstellen.
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
