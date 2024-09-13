# Gitflow

## 1. Ouvrir votre dépôt

- Ouvrir votre dépôt dans VSCode (pas celui du prof) avec un terminal à disposition.
- Fermer éventuellement les onglets ouverts.

## 2. Ajouter le remote du prof

A faire **une seul fois pour la saison**, ajouter le remote `prof` :

- `git remote add prof git@github.com:O-clock-Quindim/s12-okanban-api-Kenshirosan.git`

## 3. Retourner sur `master` et s'assurer que le `git status` est propre

On s'assure d'avoir bien sauvegardé le code de la veille :

- Si vous êtes déjà sur une branche `jour1` :
  - le `git status` doit être "clean", sinon `commit` & `push` comme d'habitude ;
  - puis retourner sur `master` : `git checkout master`.

- Si vous aviez codé directement sur `master` (par inadvertance, bien sûr 😉) :
  - le `git status` doit être "clean", sinon `commit` & `push` comme d'habitude ;
  - sauvegarder votre travail sur une branche à part : `git checkout -b jour1` puis `git push --set-upstream origin jour1` ;
  - puis retourner ensuite sur `master` : `git checkout master`.

## 4. Récupérer les modifications du prof sur `master`

- S'assurer d'être bien sur la branche `master` :
  - `git branch --show-current`
- Récupèrer le code du prof en local, sans l'intégrer à la branche courante :
  - `git fetch prof`
- Enfin, on écrase la branche courante (`master`) par la branche `master` du dépôt `prof` :
  - `git reset --hard prof/master`

## 4. Créer une nouvelle branche pour la journée 2

Normalement, vous devriez maintenant avoir le code du prof sur votre branche `master` en local !

Il ne reste plus qu'à créer une nouvelle branche pour l'atelier de la journée :

- `git checkout -b jour2`

## 5. Visuellement

![gitflow](../screenshots/gitflow.png)
