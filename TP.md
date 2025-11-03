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

### [OK] Tache 2.2 - Namespace et ressources de base (2 points)

**Objectif**: Creer un namespace dedie et deployer l'application avec 3 replicas, resources limits et probes de sante.

#### Etapes realisees:

1. **Creation du dossier k8s/**
   - Dossier pour organiser les manifests Kubernetes

2. **Creation du namespace**
   - Nom: esme-tp-julesmlrd
   - Labels: app, environment, student
   - Fichier: k8s/namespace.yaml

3. **Creation du deploiement**
   - Image: julesmlrd/esme-app:v1.0
   - Replicas: 3
   - Resources: CPU 100m, Memory 128Mi (requests et limits)
   - Liveness probe: /health (delay 10s, period 10s)
   - Readiness probe: /health (delay 5s, period 5s)
   - Variables d'environnement configurees
   - Fichier: k8s/deployment.yaml

#### Fichiers crees:

**k8s/namespace.yaml:**
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: esme-tp-julesmlrd
  labels:
    app: esme-devops-app
    environment: production
    student: julesmlrd
```

**k8s/deployment.yaml:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: esme-app
  namespace: esme-tp-julesmlrd
spec:
  replicas: 3
  selector:
    matchLabels:
      app: esme-devops-app
  template:
    spec:
      containers:
      - name: esme-app
        image: julesmlrd/esme-app:v1.0
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 100m
            memory: 128Mi
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
```

#### Commandes executees:

```powershell
# Creer le dossier k8s
mkdir k8s

# Appliquer le namespace
kubectl apply -f k8s/namespace.yaml

# Appliquer le deploiement
kubectl apply -f k8s/deployment.yaml

# Verifier le namespace
kubectl get namespace esme-tp-julesmlrd

# Verifier le deploiement
kubectl get deployments -n esme-tp-julesmlrd

# Verifier les pods
kubectl get pods -n esme-tp-julesmlrd

# Details du deploiement
kubectl describe deployment esme-app -n esme-tp-julesmlrd
```

#### Resultats:

- **Namespace**: esme-tp-julesmlrd - Active
- **Deployment**: esme-app - 3/3 replicas Ready
- **Pods**: 3 pods Running avec health checks reussis
- **Resources**: CPU 100m et Memory 128Mi configures
- **Probes**: Liveness et Readiness fonctionnelles

#### Screenshots:
- [ ] Screenshot 1: kubectl apply namespace et deployment
- [ ] Screenshot 2: kubectl get pods (3 pods Running)
- [ ] Screenshot 3: kubectl describe deployment
- [ ] Screenshot 4: Contenu des fichiers YAML

---

### [OK] Tache 2.3 - Services et exposition (2 points)

**Objectif**: Creer deux services (ClusterIP et LoadBalancer) pour exposer l'application en interne et en externe.

#### Etapes realisees:

1. **Service ClusterIP (acces interne)**
   - Nom: esme-app-clusterip
   - Type: ClusterIP
   - Port: 80 -> TargetPort: 3000
   - IP interne: 10.0.213.126
   - Endpoints: 3 pods connectes
   - Fichier: k8s/service-clusterip.yaml

2. **Service LoadBalancer (acces externe)**
   - Nom: esme-app-loadbalancer
   - Type: LoadBalancer
   - Port: 80 -> TargetPort: 3000
   - IP externe: 20.56.194.76
   - NodePort: 31906
   - Endpoints: 3 pods connectes
   - Fichier: k8s/service-loadbalancer.yaml

3. **Tests d'acces**
   - Acces via LoadBalancer: http://20.56.194.76
   - Endpoint / : Status 200 - Page HTML OK
   - Endpoint /health : Status 200 - JSON healthy

#### Fichiers crees:

**k8s/service-clusterip.yaml:**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: esme-app-clusterip
  namespace: esme-tp-julesmlrd
spec:
  type: ClusterIP
  selector:
    app: esme-devops-app
  ports:
  - name: http
    protocol: TCP
    port: 80
    targetPort: 3000
```

**k8s/service-loadbalancer.yaml:**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: esme-app-loadbalancer
  namespace: esme-tp-julesmlrd
spec:
  type: LoadBalancer
  selector:
    app: esme-devops-app
  ports:
  - name: http
    protocol: TCP
    port: 80
    targetPort: 3000
```

#### Commandes executees:

```powershell
# Appliquer le service ClusterIP
kubectl apply -f k8s/service-clusterip.yaml

# Appliquer le service LoadBalancer
kubectl apply -f k8s/service-loadbalancer.yaml

# Lister les services
kubectl get services -n esme-tp-julesmlrd

# Details service ClusterIP
kubectl describe service esme-app-clusterip -n esme-tp-julesmlrd

# Details service LoadBalancer
kubectl describe service esme-app-loadbalancer -n esme-tp-julesmlrd

# Tester l'acces externe
curl http://20.56.194.76
curl http://20.56.194.76/health
curl http://20.56.194.76/info
```

#### Resultats:

- **ClusterIP**: 10.0.213.126 - Acces interne fonctionnel
- **LoadBalancer**: 20.56.194.76 - Acces externe fonctionnel
- **Endpoints**: 3 pods connectes aux 2 services
- **Tests reussis**:
  - GET / : 200 OK - Page HTML
  - GET /health : 200 OK - {"status":"healthy"}
  - GET /info : 200 OK - Informations systeme

#### URL publique de l'application:

**http://20.56.194.76**

#### Screenshots:
- [ ] Screenshot 1: kubectl apply services
- [ ] Screenshot 2: kubectl get services (IP externe visible)
- [ ] Screenshot 3: curl http://20.56.194.76 (acces OK)
- [ ] Screenshot 4: Test dans navigateur
- [ ] Screenshot 5: kubectl describe loadbalancer

---

### [OK] Tache 2.4 - ConfigMap et variables d'environnement (3 points)

**Objectif**: Creer un ConfigMap pour gerer les variables d'environnement et mettre a jour le deploiement pour les utiliser.

#### Etapes realisees:

1. **Creation du ConfigMap**
   - Nom: esme-app-config
   - Variables configurees:
     - APP_ENV=production
     - LOG_LEVEL=info
     - MESSAGE=Deploye par Jules Milard - ESME 2025
   - Fichier: k8s/configmap.yaml

2. **Mise a jour du deploiement**
   - Variables env en dur remplacees par references au ConfigMap
   - Utilisation de valueFrom.configMapKeyRef
   - Fichier: k8s/deployment.yaml (mis a jour)

3. **Redeploiement**
   - Rolling update effectue automatiquement
   - 3 nouveaux pods crees avec les variables du ConfigMap
   - Anciens pods termines proprement

4. **Verification**
   - ConfigMap cree et fonctionnel
   - Variables prises en compte dans l'application
   - Test via /info : variables correctement affichees

#### Fichiers crees/modifies:

**k8s/configmap.yaml:**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: esme-app-config
  namespace: esme-tp-julesmlrd
data:
  APP_ENV: "production"
  LOG_LEVEL: "info"
  MESSAGE: "Deploye par Jules Milard - ESME 2025"
```

**k8s/deployment.yaml (extrait modifie):**
```yaml
env:
- name: APP_ENV
  valueFrom:
    configMapKeyRef:
      name: esme-app-config
      key: APP_ENV
- name: LOG_LEVEL
  valueFrom:
    configMapKeyRef:
      name: esme-app-config
      key: LOG_LEVEL
- name: MESSAGE
  valueFrom:
    configMapKeyRef:
      name: esme-app-config
      key: MESSAGE
```

#### Commandes executees:

```powershell
# Appliquer le ConfigMap
kubectl apply -f k8s/configmap.yaml

# Mettre a jour le deploiement
kubectl apply -f k8s/deployment.yaml

# Verifier les pods (rolling update)
kubectl get pods -n esme-tp-julesmlrd

# Verifier le ConfigMap
kubectl describe configmap esme-app-config -n esme-tp-julesmlrd

# Tester les variables
curl http://20.56.194.76/info
```

#### Resultats:

- **ConfigMap cree**: esme-app-config avec 3 variables
- **Deploiement mis a jour**: Rolling update reussi (3/3 pods)
- **Variables fonctionnelles**:
  - environment: "production"
  - logLevel: "info"
  - message: "Deploye par Jules Milard - ESME 2025"
- **Nouveau ReplicaSet**: esme-app-6f5c66f9d4

#### Tag Git v1.1.0:

Version incluant la gestion des variables d'environnement via ConfigMap.

#### Screenshots:
- [ ] Screenshot 1: kubectl apply configmap
- [ ] Screenshot 2: kubectl get pods (rolling update)
- [ ] Screenshot 3: kubectl describe configmap
- [ ] Screenshot 4: curl /info avec nouvelles variables
- [ ] Screenshot 5: Contenu des fichiers YAML

---

## Partie 3 - Architecture avancee et troubleshooting (6 points)

### [OK] Tache 3.1 - Ingress et domaines (2 points)

**Objectif**: Installer un Ingress Controller et configurer un Ingress pour exposer l'application sur un domaine personnalise.

#### Etapes realisees:

1. **Installation du NGINX Ingress Controller**
   - Version: controller-v1.8.1
   - Namespace: ingress-nginx
   - Service LoadBalancer cree avec IP externe: 108.141.193.99
   - Pod controller: Running

2. **Creation de l'Ingress**
   - Nom: esme-app-ingress
   - Domaine: esme-tp-julesmlrd.local
   - IngressClass: nginx
   - Backend: esme-app-clusterip:80
   - Path: / (Prefix)
   - Fichier: k8s/ingress.yaml

3. **Configuration des routes**
   - Host: esme-tp-julesmlrd.local
   - Backends connectes: 3 pods (10.224.0.16, 10.224.0.48, 10.224.0.13)
   - Rewrite target: /

4. **Tests d'acces**
   - Acces via domaine: OK (Status 200)
   - Endpoint /: Page HTML OK
   - Endpoint /health: JSON healthy OK
   - Load balancing entre les 3 pods fonctionnel

#### Fichiers crees:

**k8s/ingress.yaml:**
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: esme-app-ingress
  namespace: esme-tp-julesmlrd
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
  - host: esme-tp-julesmlrd.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: esme-app-clusterip
            port:
              number: 80
```

#### Commandes executees:

```powershell
# Installer NGINX Ingress Controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml

# Verifier l'installation
kubectl get pods -n ingress-nginx
kubectl get service ingress-nginx-controller -n ingress-nginx

# Creer l'Ingress
kubectl apply -f k8s/ingress.yaml

# Verifier l'Ingress
kubectl get ingress -n esme-tp-julesmlrd
kubectl describe ingress esme-app-ingress -n esme-tp-julesmlrd

# Tester l'acces via le domaine
Invoke-WebRequest -Uri http://108.141.193.99 -Headers @{Host="esme-tp-julesmlrd.local"}
Invoke-WebRequest -Uri http://108.141.193.99/health -Headers @{Host="esme-tp-julesmlrd.local"}
```

#### Resultats:

- **Ingress Controller**: NGINX installe et fonctionnel
- **IP Ingress**: 108.141.193.99
- **Ingress**: esme-app-ingress cree et actif
- **Domaine**: esme-tp-julesmlrd.local configure
- **Backends**: 3 pods connectes
- **Tests reussis**:
  - GET via domaine: 200 OK
  - GET /health: 200 OK - {"status":"healthy"}
  - Load balancing fonctionnel

#### Configuration locale (optionnel):

Pour tester avec un vrai domaine local, ajouter dans C:\Windows\System32\drivers\etc\hosts:
```
108.141.193.99 esme-tp-julesmlrd.local
```

#### Screenshots:
- [ ] Screenshot 1: kubectl get pods ingress-nginx
- [ ] Screenshot 2: kubectl get ingress
- [ ] Screenshot 3: kubectl describe ingress
- [ ] Screenshot 4: Test curl via domaine (200 OK)
- [ ] Screenshot 5: Contenu du fichier ingress.yaml

---

## Progression globale

- **Partie 1**: 6/6 points (COMPLETEE!)
- **Partie 2**: 8/8 points (COMPLETEE!)
- **Partie 3**: 2/6 points (en cours)
- **Total technique**: 16/20 points

---

## Notes et observations

Espace pour vos notes personnelles durant le TP...
