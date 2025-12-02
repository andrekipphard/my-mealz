# MyMealz

MyMealz ist eine hybride App (Vue 3 + Vite + Capacitor), die dir hilft, deine Rezepte, deinen virtuellen Kühlschrank und deine Essensplanung zu organisieren.

## Features (MVP)

- Rezepte anlegen, bearbeiten, löschen
- Kategorien, Tags, Favoriten
- Random-Rezept-Vorschlag
- "Lange nicht gekocht"-Logik
- Lokale Speicherung (SQLite, offlinefähig)
- Virtueller Kühlschrank: Zutaten, Mengen, Haltbarkeit
- Vorschläge basierend auf vorhandenen Zutaten

## Geplante Erweiterungen

- Barcode-Scanner (Kamera)
- Push-Notifications (z.B. Haltbarkeit läuft ab)
- Einkaufsliste
- Cloud-Sync & Benutzerkonten

## Tech-Stack

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- [Capacitor](https://capacitorjs.com/) (iOS/Android)
- [@capacitor-community/sqlite](https://github.com/capacitor-community/sqlite)
- TypeScript

## Entwicklung

1. Projekt initialisieren:
   ```sh
   npm install
   ```
2. Entwicklung im Browser:
   ```sh
   npm run dev
   ```
3. Capacitor Plattformen synchronisieren:
   ```sh
   npm run build
   npx cap sync
   ```
4. App auf Gerät starten (z.B. Android):
   ```sh
   npx cap run android -l --external
   ```

## Datenmodell

Siehe `src/types/index.ts` für alle Interfaces.

## Datenbank

Initialisierung und Beispiel-Daten siehe `src/services/database.ts`.

## Roadmap

Siehe TODO.md für geplante Features und Phasen.

---

**Lizenz:** MIT
