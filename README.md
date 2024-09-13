# O'kanban - API E04 - Atelier API (suite)

Terminer les routes non réalisées en suivant les bonnes pratiques et recommandations faites en cours ! (cards et tags)

## O'kanban - API E03 - Atelier API (suite)

---

commiter et pusher jour3 si c'est pas fait

- git checkout master
- git fetch prof
- git reset --hard prof/master
- git checkout -b jour4

---

PLAN :

Fonctionnalité : On doit réaliser un CRUD avec les listes

CRUD : Create, Read, Update, Delete

1. [x] Vérifier git `git status`
2. [x] `npm install` si nécessaire
3. [x] Les variables d'env
4. [x] La BDD est elle OK ?
5. [x] Lance le serveur et vérifie que tout va bien

- Pour chaque actions du CRUD
  - [x] Faire une route
  - [x] Faire une méthode de controller
  - [x] Tester avec insomnia
  - [x] Gérer les erreurs
  - [x] On pense au code http que l'on doit envoyer

[Rappel : lien pour créer des issues](https://github.com/O-clock-Quindim/Soutien-ateliers/issues)

En respectant au maximum les principes d'architecture `REST`, et à l'aide du [tableau des endpoints](./docs/specs/api-base-endpoints.md), on implémente les différentes routes de notre API !

## Étape 1 - Routes API des listes

On commence par les routes des listes, car elles sont toutes spécifiées : [spécifications des listes](./docs/specs/api-lists-specifications.md). Voici également quelques informations complémentaires sur les status code HTTP.

| VERB     | PATH         | DESCRIPTION                                               |
| -------- | ------------ | ----------------------------------------------------------|
| `GET`    | `/lists`     | renvoie toutes les listes existantes                      |
| `GET`    | `/lists/:id` | renvoie les détails de la liste demandée                  |
| `POST`   | `/lists`     | crée une nouvelle liste et la retourne                    |
| `PATCH`  | `/lists/:id` | modifie une liste et la retourne                          |
| `DELETE` | `lists/:id`  | supprime une liste demandée et ne retourne pas de contenu |

On pense à les tester à l'aide d'un client HTTP :

- `Insomnia`
- `Postman`
- `Rest client`
- `Thunder Client` (Extension VSCode)
- `Chrome` (pour les GET uniquement)
- ...

## (BONUS) Étape 2 - Et les autres routes ?

Elles seront à implémenter les jours suivants, avec les **bonnes pratiques** fournies lors de la correction des routes des listes.

Mais si vous souhaitez prendre de l'avance, les voici :

| VERB     | PATH               | DESCRIPTION                                                                   |
|----------|--------------------|-------------------------------------------------------------------------------|
| `GET`    | `/cards`           | renvoie toutes les cartes existantes                                          |
| `GET`    | `/cards/:id`       | renvoie les détails de la carte demandée, avec les tags qui lui sont associés |
| `POST`   | `/cards`           | crée une nouvelle carte (sans tag) et la retourne                             |
| `PATCH`  | `/cards/:id`       | modifie une carte (ne modifie pas les tags)                                   |
| `DELETE` | `/cards/:id`       | supprime une carte                                                            |
|          |                    |                                                                               |
| `GET`    | `/lists/:id/cards` | renvoie toutes les cartes d'une liste ; chaque carte porte ses tags associés  |

| VERB     | PATH                           | DESCRIPTION                                     |
| -------- | ------------------------------ | ----------------------------------------------- |
| `GET`    | `/tags`                        | renvoie tous les tags                         |
| `POST`   | `/tags`                        | crée un nouveau tag                           |
| `PATCH`  | `/tags/:id`                    | modifie un tag                                |
| `DELETE` | `/tags/:id`                    | supprime un tag                               |
|          |                                |                                                 |
| `PUT`    | `/cards/:card_id/tags/:tag_id` | associe un tag à la carte ciblée                |
| `DELETE` | `/cards/:card_id/tags/:tag_id` | supprime l'association entre le tag et la carte |

## O'kanban - API E02 - Atelier Sequelize

[Rappel : lien pour créer des issues](https://github.com/O-clock-Quindim/Soutien-ateliers/issues)

- [ ] exécuter une méthode avec un script npm

- [ ] sequelize.drop / sequelize.sync

## Étape 1 - Mise en place `Git`

Si cela n'a pas été fait en cours, suivre le [Git Flow](../resources/fiches/gitflow.md) pour récupérer la correction "prof" et créer une branche `jour2` pour la seconde journée.

## Étape 2 - Modèles `Sequelize`

Dans le dossier `src/models/`, ajouter les modèles `Sequelize` non réalisés en cours. Rappels :

- nos modèles sont `List`, `Tag`, `Card` ;
- on ne précise pas les clés étrangères à cette étape ;
- et penser à tester vos modèles !

Rappels : n'oubliez pas que vous pouvez relancer vos scripts SQL pour re-créer/re-échantillonner votre BDD au besoin.

## Étape 3 - Associations

Dans un fichier `src/associations.js`, définir les associations entre nos modèles :

- s'inspirer du code des saisons précédentes et de la documentation de `Sequelize` ;
- ne pas oublier de ré-exporter vos modèles depuis ce fichier : désormais, on importera les modèles depuis le fichier d'association afin de profiter des jointures (`include`) entre les tables.
- et penser à tester les associations !

Rappels : n'oubliez pas que vous pouvez relancer vos scripts SQL pour re-créer/re-échantillonner votre BDD au besoin.

## Étape 4 - BONUS - Synchroniser les modèles avec la base de données

Les scripts SQL, c'est bien. Mais, ça ne serait pas un peu redondant avec nos modèles ? S'il faut préciser les contraintes et les associations à la fois dans nos scripts et dans nos modèles, on fait finalement le travail deux fois !

**L'idée du bonus : générer et échantillonner nos tables à partir de nos modèles.**

### 4.1. Créer les tables

Créer/compléter le fichier `src/migrations/01.createTables.js` pour synchroniser toutes nos tables avec la base de données :

- penser à les supprimer (`.drop()` dans le bon ordre !) avant de les re-synchroniser (`.sync()` dans le bon ordre !) ;
- penser à exécuter le script pour tester son bon fonctionnement et confirmer via `psql` que les tables ont bien créées en BDD (les commandes `\dt` et `\d nom_de_table` sont bien pratiques pour cela).

À noter :

- selon son choix d'implémentation, il est possible d'avoir à créer **un modèle dédié pour la table de liaison** (`CardHasTag`) ;
- on peut également utiliser `sequelize.sync()` pour ne pas avoir à créer chaque table une par une, à vous de voir.

### 4.2. Échantillonnage

Créer/modifier le fichier `src/migrations/02.seedTables.js` afin de compléter la génération de l'échantillon de test, en ajoutant quelques exemples de listes, cartes et de tags, à relier les unes aux autres.

### 4.3. Scripts NPM

Ajouter/modifier les trois scripts au `package.json` pour faciliter la ré-initialisation de la base de données pour les jours suivants :

- `npm run db:create` : qui lance le script de création de tables ;
- `npm run db:seed` : qui lance le script d’échantillonnage :
- `npm run db:reset` : qui lance les deux scripts précédents.

### 4.4. Fin

**Bravo :** nous avons implémenté notre Modèle Physique de Données (MPD) via nos modèles `Sequelize`. Nous n'avons donc plus vraiment besoin des scripts `data/create_tables.sql` ni `data/seed_tables.sql`, qui nous ont principalement permis de réviser le SQL.

---

## Étape 1 - Mise en place `Git`

Si cela n'a pas été fait en cours, suivre le [Git Flow](../resources/fiches/gitflow.md) pour récupérer la correction "prof" et créer une branche `jour2` pour la seconde journée.

## Étape 2 - Modèles `Sequelize`

Dans le dossier `src/models/`, ajouter les modèles `Sequelize` non réalisés en cours. Rappels :

- nos modèles sont `List`, `Tag`, `Card` ;
- on ne précise pas les clés étrangères à cette étape ;
- et penser à tester vos modèles !

Rappels : n'oubliez pas que vous pouvez relancer vos scripts SQL pour re-créer/re-échantillonner votre BDD au besoin.

## Étape 3 - Associations

Dans un fichier `src/associations.js`, définir les associations entre nos modèles :

- s'inspirer du code des saisons précédentes et de la documentation de `Sequelize` ;
- ne pas oublier de ré-exporter vos modèles depuis ce fichier : désormais, on importera les modèles depuis le fichier d'association afin de profiter des jointures (`include`) entre les tables.
- et penser à tester les associations !

Rappels : n'oubliez pas que vous pouvez relancer vos scripts SQL pour re-créer/re-échantillonner votre BDD au besoin.

## Étape 4 - BONUS - Synchroniser les modèles avec la base de données

Les scripts SQL, c'est bien. Mais, ça ne serait pas un peu redondant avec nos modèles ? S'il faut préciser les contraintes et les associations à la fois dans nos scripts et dans nos modèles, on fait finalement le travail deux fois !

**L'idée du bonus : générer et échantillonner nos tables à partir de nos modèles.**

### 4.1. Créer les tables

Créer/compléter le fichier `src/migrations/01.createTables.js` pour synchroniser toutes nos tables avec la base de données :

- penser à les supprimer (`.drop()` dans le bon ordre !) avant de les re-synchroniser (`.sync()` dans le bon ordre !) ;
- penser à exécuter le script pour tester son bon fonctionnement et confirmer via `psql` que les tables ont bien créées en BDD (les commandes `\dt` et `\d nom_de_table` sont bien pratiques pour cela).

À noter :

- selon son choix d'implémentation, il est possible d'avoir à créer **un modèle dédié pour la table de liaison** (`CardHasTag`) ;
- on peut également utiliser `sequelize.sync()` pour ne pas avoir à créer chaque table une par une, à vous de voir.

### 4.2. Échantillonnage

Créer/modifier le fichier `src/migrations/02.seedTables.js` afin de compléter la génération de l'échantillon de test, en ajoutant quelques exemples de listes, cartes et de tags, à relier les unes aux autres.

### 4.3. Scripts NPM

Ajouter/modifier les trois scripts au `package.json` pour faciliter la ré-initialisation de la base de données pour les jours suivants :

- `npm run db:create` : qui lance le script de création de tables ;
- `npm run db:seed` : qui lance le script d’échantillonnage :
- `npm run db:reset` : qui lance les deux scripts précédents.

### 4.4. Fin

**Bravo :** nous avons implémenté notre Modèle Physique de Données (MPD) via nos modèles `Sequelize`. Nous n'avons donc plus vraiment besoin des scripts `data/create_tables.sql` ni `data/seed_tables.sql`, qui nous ont principalement permis de réviser le SQL.

---

## Étape 1 - Mise en place `Git`

Une fois le `ochallenge` accepté et cloné, pensez à créer une branche `jour1` :

- [x] `git checkout -b jour1`

Et n'hésitez pas à `push` cette branche sur `Github` :

- [x] `git push --set-upstream origin jour1` la première fois
- [x] `git push` les fois suivantes

## Étape 2 - Analyse du besoin client

**Objectif : créer un Kanban de gestion de projet**  (type `Trello`, `Github Projet`…)

- on souhaite créer une application présentant un « board de gestion de projet », où il est possible de créer des **cartes** à l'intérieur de **listes** ;
- l'utilisateur (unique, pas besoin de le stocker en BDD) peut créer autant de listes qu'il/elle désire et ajouter autant de cartes à l'intérieur de ces listes ;
- chaque liste dispose d'un `titre` et d'une `position` au sein du board ;
- chaque carte dispose d'un `contenu`, d'une `position` au sein de la liste, d'une `couleur` (optionnelle) et d'un ou plusieurs **label(s)** (optionnel(s)) ;
- un label a un `nom` (ex : Urgent) et peut avoir une `couleur` (optionnelle).

On se base sur ce besoin client, et on souhaite faire l'analyse de ce besoin en vue de produire le `MCD` de l'application. **N'hésitez pas à créer une issue si vous souhaitez clarifier un point auprès du client**

## Étape 3 - User Stories

Écrire quelques « récits utilisateur » (`user stories`) à consigner dans un tableau `Markdown` dans un fichier `docs/resources/user-stories.md`.

Rappels :

- une `user story` est un **scenario de test** qui nous aide à clarifier notre besoin, comprendre les fonctionnalités attendues dans notre application, et nous permet de vérifier si l'implémentation correspond bien aux récits fixés préalablement ;
- le formalisme habituel : `En tant que [ROLE], je souhaite [ACTION] (( afin de [OBJECTIF] ))`.

## Étape 4 - Wireframes

Faire un bref `wireframe` pour notre application à l'aide de votre outil préféré :

- `TLDraw`
- `Draw.io`
- `Excalidraw`
- `Microsoft Paint` pour les plus aventureux
- …

Rappels :

- un `wireframe` est un **croquis fonctionnel** qui nous aide à comprendre les fonctionnalités de notre application et les interactions possibles avec l'utilisateur ;
- il est possible d'avoir plusieurs wireframes d'une même page, par exemple selon les différents états de l'utilisateur (mobile, connecté/déconnecté…).

- <https://blog-ux.com/quelle-est-la-difference-entre-le-zoning-wireframe-mockup-et-prototype/>

- <https://wireframe.cc/9VsyyO>
- <https://wireframe.cc/KHBzlf>
- <https://wireframe.cc/2fhxLo>
- <https://www.tldraw.com/r/NmZn5pdZKLugZ7HRpHwGT?v=-167,-914,5242,2571&p=page>
- <https://excalidraw.com/#json=FPDaUr5rzVSLJMoN0_rx7,Q7INgO3Yc38bJoGupkbKlQ>
- <https://excalidraw.com/#json=ccrqdZNUqJ49AviKnHVmL,y2kUHYPAxMXOJQrU3nk1mQ>
- <https://excalidraw.com/#json=Th2WId4kAhhMxWqOwzmfI,ubUXLlaoah6huhS4_OXcXg>

## Étape 5 - Modèle Conceptuel de Données (MCD)

**Modélisation (MERISE): comment stocker ?**

Dessinez le MCD en utilisant l'outil de votre choix :

- un papier et un crayon
- [draw.io](https://draw.io)
- [MoCoDo](http://mocodo.wingi.net/) (cf. [fiche recap](https://kourou.oclock.io/ressources/fiche-recap/mocodo/))
- [Whimsical](https://whimsical.com/)
- …

Rappels :

- le MCD découle du besoin : il arrive souvent d'avoir plusieurs modélisations possibles pour un même problème !
- n'hésitez pas à refaire un tour sur la [fiche recap' du MCD](https://kourou.oclock.io/ressources/fiche-recap/mcd-modele-conceptuel-de-donnees/) ;
- [autre article complet](https://gist.github.com/enzoclock/3b16a04277a9ef620ed046aaf4149c4b).

## Étape 6 - Modèle Logique de Données (MLD)

Traduire le MCD de l'application sous forme de MLD en utilisant les [règles de transformation](https://kourou.oclock.io/ressources/fiche-recap/mld/).

Le formalisme attendu est, au choix :

- sous forme de texte
- sous forme d'un schéma
- ou les deux !

Rappels :

- l'étape du MLD est une étape de traduction :
  - traduire les noms des entités en nom de tables ;
  - traduire les noms des attributs en nom de colonnes ;
  - traduire les associations et leurs cardinalités en clés étrangères et/ou tables de liaison.

## Étape 7 - Créer la base de données et l'utilisateur

À l'aide du client `psql` :

- créer un utilisateur Postgres : `okanban` (avec un mot de passe `okanban`)
- créer une BDD pour notre application : `okanban`

Vérifier la bonne création de la BDD (`\l`) et de l'utilisateur (`\du`).

``bash
sudo -i -u postgres psql

```

```sql
CREATE USER okanban WITH PASSWORD 'okanban';
CREATE DATABASE okanban OWNER okanban;
```

## (BONUS) Étape 8 - Modèle Physique de Données (MPD)

Il est temps de créer les tables dans la base de données, et d'y ajouter quelques données d'échantillonnage afin d'améliorer notre expérience de développement.

- Créer des scripts `SQL` et les exécuter directement sur la base.

Libre à toi également de demander une `review` de ton `MLD` aux helpers présents avant d'attaquer cette partie. Par exemple, en créant une PR de ta branche `jour1` vers `master`, et notifier les concernés !

### 8.1. Création des tables

Commençons par **réviser la création d'une table en SQL**. Garder la [fiche recapitulative SQL](https://kourou.oclock.io/ressources/fiche-recap/le-langage-sql/) sous le coude n'est pas une mauvaise idée 😉.

Créer un fichier `data/create_tables.sql` dans lequel on créé les tables telles que définies dans notre MLD. Quelques bonnes pratiques :

- ne pas hésiter à s'inspirer des scripts SQL des saisons précédentes ;
- on pense à détruire les tables "si elles existent" avant de les re-créer ;
- on pense à englober nos instructions dans une [transaction](https://docs.postgresql.fr/14/tutorial-transactions.html) ;
- on pense à tester régulièrement en exécutant le fichier sur la BDD, puis constater que les tables existes (`\dt`) ;
- et pourquoi pas insérer quelques éléments dans la table manuellement (via `PSQL`) pour tester également.

### 8.2. Echantillonage

Créer un fichier `data/seed_database.sql`, écrire les instructions SQL pour insérer des données d'exemple pour tester le bon fonctionnement de nos tables.

Pense-bête :

- n'oublie pas de remplir également la table de liaison !

### Fin

**Bravo** : vous avez réalisé la conception et modélisation MERISE d'une application de bout en bout !
