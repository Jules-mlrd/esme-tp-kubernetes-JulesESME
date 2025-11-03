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

### [OK] Tache 1.3 - Construction et test de l'image (1 point)

**Objectif**: Construire l'image Docker et tester l'application en local.

#### Etapes realisees:

1. **Construction de l'image Docker**
   - Tag: esme-app:v1.0
   - Commande: docker build -t esme-app:v1.0 .

2. **Lancement du conteneur en local**
   - Port mapping: 3000:3000
   - Mode detache

3. **Tests de l'application**
   - Test de l'endpoint principal (/)
   - Test de l'endpoint /health
   - Test de l'endpoint /info

#### Commandes executees:

```
# Construction de l'image
docker build -t esme-app:v1.0 .

# Verification de l'image
docker images | grep esme-app

# Lancement du conteneur
docker run -d -p 3000:3000 --name esme-app-test esme-app:v1.0

# Verification du conteneur
docker ps

# Test de l'endpoint principal
curl http://localhost:3000

# Test de l'endpoint de sante
curl http://localhost:3000/health

# Test de l'endpoint info
curl http://localhost:3000/info

# Voir les logs du conteneur
docker logs esme-app-test

# Arreter et supprimer le conteneur apres tests
docker stop esme-app-test
docker rm esme-app-test
```

#### Screenshots:
- [ ] Screenshot 1: Construction de l'image (docker build)
- [ ] Screenshot 2: Liste des images (docker images)
- [ ] Screenshot 3: Conteneur en cours d'execution (docker ps)
- [ ] Screenshot 4: Test endpoint / dans le navigateur
- [ ] Screenshot 5: Test endpoint /health (JSON response)

---

### [OK] Tache 1.4 - Registre Docker et versioning (2 points)

**Objectif**: Publier l'image Docker sur Docker Hub et versionner le projet avec Git tags.

#### Etapes realisees:

1. **Connexion a Docker Hub**
   - Authentification reussie

2. **Tag de l'image pour Docker Hub**
   - Tag v1.0: julesmlrd/esme-app:v1.0
   - Tag latest: julesmlrd/esme-app:latest

3. **Publication sur Docker Hub**
   - Image poussee avec succes
   - URL publique: https://hub.docker.com/r/julesmlrd/esme-app

4. **Creation du tag Git**
   - Tag v1.0.0 cree et pousse
   - README.md ajoute avec documentation

5. **Documentation**
   - README.md avec instructions d'utilisation
   - URL de l'image Docker documentee

#### Commandes executees:

```
# Connexion Docker Hub
docker login

# Tag de l'image
docker tag esme-app:v1.0 julesmlrd/esme-app:v1.0
docker tag esme-app:v1.0 julesmlrd/esme-app:latest

# Push vers Docker Hub
docker push julesmlrd/esme-app:v1.0
docker push julesmlrd/esme-app:latest

# Verification sur Docker Hub
docker search julesmlrd/esme-app

# Creation du tag Git
git add README.md
git commit -m "Tache 1.4: Ajout README.md et publication Docker Hub"
git tag -a v1.0.0 -m "Version 1.0.0 - Premiere version stable"
git push origin main
git push origin v1.0.0
```

#### Screenshots:
- [ ] Screenshot 1: docker login reussi
- [ ] Screenshot 2: docker tag et docker push
- [ ] Screenshot 3: Image visible sur Docker Hub
- [ ] Screenshot 4: git tag v1.0.0 cree
- [ ] Screenshot 5: README.md avec URL de l'image

---

## Partie 2 - Deploiement et services Kubernetes (8 points)

### [OK] Tache 2.1 - Connexion au cluster (1 point)

**Objectif**: Configurer kubectl pour se connecter au cluster AKS fourni et verifier la connexion.

#### Informations du cluster:
- **Nom**: aks-JulesESME
- **Resource Group**: rg-aks-JulesESME
- **Region**: West Europe
- **Noeuds**: 2

#### Etapes realisees:

1. **Configuration de kubectl**
   - Fichier kubeconfig: JulesESME-kubeconfig.yaml
   - Variable d'environnement KUBECONFIG definie

2. **Verification de la connexion**
   - Commande: kubectl get nodes
   - Statut: Connecte avec succes

3. **Liste des namespaces**
   - Commande: kubectl get namespaces
   - Namespaces disponibles listes

#### Commandes executees:

```powershell
# Definir la variable d'environnement KUBECONFIG (PowerShell)
$env:KUBECONFIG="JulesESME-kubeconfig.yaml"

# Verifier la connexion au cluster
kubectl get nodes

# Lister les namespaces disponibles
kubectl get namespaces

# Verifier le contexte actuel
kubectl config current-context

# Voir les informations du cluster
kubectl cluster-info
```

#### Screenshots:
- [ ] Screenshot 1: Configuration KUBECONFIG
- [ ] Screenshot 2: kubectl get nodes (noeuds Ready)
- [ ] Screenshot 3: kubectl get namespaces
- [ ] Screenshot 4: kubectl cluster-info

---

## Partie 3 - Architecture avancee et troubleshooting (6 points)

A completer...

---

## Progression globale

- **Partie 1**: 6/6 points (COMPLETEE!)
- **Partie 2**: 1/8 points (en cours)
- **Partie 3**: 0/6 points
- **Total technique**: 7/20 points

---

## Notes et observations

Espace pour vos notes personnelles durant le TP...
