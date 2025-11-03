# Application ESME DevOps 2025

Application Node.js conteneurisee pour le TP Kubernetes ESME 2025.

## Description

Application web simple affichant "Hello ESME DevOps 2025!" avec plusieurs endpoints :
- `/` : Page principale avec informations de l'application
- `/health` : Endpoint de sante (healthcheck)
- `/info` : Informations detaillees de l'application

## Image Docker

L'image Docker est disponible publiquement sur Docker Hub :

```bash
docker pull VOTRE_USERNAME/esme-app:v1.0
```

**URL Docker Hub**: https://hub.docker.com/r/VOTRE_USERNAME/esme-app

## Utilisation

### Lancer l'application en local

```bash
docker run -d -p 3000:3000 VOTRE_USERNAME/esme-app:v1.0
```

Puis accedez a http://localhost:3000

## Endpoints disponibles

- `GET /` - Page d'accueil avec informations HTML
- `GET /health` - Health check (JSON)
- `GET /info` - Informations systeme (JSON)

## Variables d'environnement

L'application supporte les variables d'environnement suivantes :

- `APP_ENV` : Environnement (default: development)
- `LOG_LEVEL` : Niveau de log (default: debug)
- `MESSAGE` : Message personnalise (default: "Deploye par un etudiant ESME")

Exemple :
```bash
docker run -d -p 3000:3000 \
  -e APP_ENV=production \
  -e LOG_LEVEL=info \
  -e MESSAGE="Mon message personnalise" \
  VOTRE_USERNAME/esme-app:v1.0
```

## Technologies

- Node.js 18 (Alpine Linux)
- Express.js 4.18.2
- Docker

## Structure du projet

```
.
├── app.js              # Application principale
├── package.json        # Dependances Node.js
├── Dockerfile          # Configuration Docker
├── .dockerignore       # Fichiers exclus du build
└── README.md           # Documentation
```

## Version

**Version actuelle**: v1.0.0

## Tests

Pour tester l'application localement :

```bash
# Build de l'image
docker build -t esme-app:v1.0 .

# Lancement du conteneur
docker run -d -p 3000:3000 --name esme-app-test esme-app:v1.0

# Test des endpoints
curl http://localhost:3000
curl http://localhost:3000/health
curl http://localhost:3000/info

# Nettoyage
docker stop esme-app-test
docker rm esme-app-test
```

## Auteur

Etudiant ESME - TP Kubernetes 2025

## License

MIT

