# Studia - projekt na narzędzia programistyczne

## Wymagane oprogramowanie

- node.js wersja 14.3.0 albo nowsza,
- npm albo yarn (menadżer pakietów node),
- testowane na Google Chrome

### Proces instalacji

```sh
$ git clone https://github.com/Grzanka99/matrix-inverter.git
$ cd matrix-inverter
$ yarn install (lub npm install);
```

### Uruchomienie aplikacji w trybie deweloperskim

```
yarn serve
```

### Kompilacja aplikacji do wersji produkcyjnej

```
yarn build
```

Skompilowany program pojawi się w katalogu ./dist, należy pliki znajdujące się w tym katalogu umieścić w głównym katalogu serwera

### Wyszukanie oraz naprawienie błędów składni

```
yarn lint
```
