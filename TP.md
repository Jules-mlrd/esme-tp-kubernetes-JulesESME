# TP Evaluation - Conteneurisation et Kubernetes

**Etudiant**: Jules ESME
**Date**: 3 novembre 2025
**Cluster**: aks-JulesESME

---

## Partie 1 - Bases de la conteneurisation (6 points)

### [OK] Tache 1.1 - Initialisation du projet Git (1 point)

**Objectif**: Creer un repository GitLab et initialiser le projet avec une application Node.js simple.

#### Etapes realisees:

1. **Creation du repository GitHub**

   - Nom: esme-tp-kubernetes-JulesESME
   - Visibilite: Public
   - Repository cree sur: https://github.com/Jules-mlrd/esme-tp-kubernetes-JulesESME
2. **Clone du repository en local**

```
git clone [URL_DU_REPO]
cd esme-tp-kubernetes-JulesESME
```

3. **Creation des fichiers de l'application**

   - Fichier app.js cree
   - Fichier package.json cree
4. **Premier commit**

```
git add app.js package.json
git commit -m "Initial commit: Application Node.js Hello ESME DevOps 2025"
git push origin main
```

#### Screenshots:

- [X] Screenshot 1: Repository GitHub cree
- [ ] Screenshot 2: Resultat du git init
- [ ] Screenshot 3: Contenu des fichiers crees
- [ ] Screenshot 4: Resultat du git add et git commit
- [ ] Screenshot 5: Resultat du git push

---

### [OK] Tache 1.2 - Creation du Dockerfile (2 points)

**Objectif**: Creer un Dockerfile pour containeriser l'application Node.js.

#### Etapes realisees:

1. **Creation du Dockerfile**
   - Image de base: node:18-alpine
   - Workdir: /app
   - Installation des dependances npm
   - Exposition du port 3000
   - Commande de demarrage: npm start

2. **Creation du fichier .dockerignore**
   - Exclusion de node_modules
   - Exclusion des fichiers Git
   - Optimisation du build

#### Contenu du Dockerfile:

```
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

#### Screenshots:
- [ ] Screenshot 1: Contenu du Dockerfile
- [ ] Screenshot 2: Contenu du .dockerignore
- [ ] Screenshot 3: Commit Git avec les fichiers

---

### [EN ATTENTE] Tache 1.3 - Build et test local (a venir)

---

## Partie 2 - Deploiement et services Kubernetes (8 points)

A completer...

---

## Partie 3 - Architecture avancee et troubleshooting (6 points)

A completer...

---

## Progression globale

- **Partie 1**: 3/6 points (taches completees)
- **Partie 2**: 0/8 points
- **Partie 3**: 0/6 points
- **Total technique**: 3/20 points

---

## Notes et observations

Espace pour vos notes personnelles durant le TP...
