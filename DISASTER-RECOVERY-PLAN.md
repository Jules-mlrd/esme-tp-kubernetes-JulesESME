# Plan de Disaster Recovery - Application ESME DevOps
# Defi Expert 5: Plan de disaster recovery

**Version**: 1.0  
**Date**: 3 novembre 2025  
**Responsable**: Jules ESME  
**Cluster**: aks-JulesESME

---

## 1. Vue d'ensemble

### 1.1 Objectifs
- **RTO (Recovery Time Objective)**: 15 minutes maximum
- **RPO (Recovery Point Objective)**: 5 minutes maximum
- **Disponibilite cible**: 99.9% (8.76 heures downtime/an)

### 1.2 Perimetre
- Application principale: esme-devops-app
- Stack de monitoring: Prometheus, Grafana, AlertManager
- Stack de logging: Elasticsearch, Fluentd, Kibana
- Infrastructure: AKS cluster, networking, storage

---

## 2. Scenarios de desastre identifies

### 2.1 Perte d'un Pod
**Probabilite**: Elevee | **Impact**: Faible

**Cause**: Bug application, OOM, crash, liveness probe failure

**Detection**:
- Kubernetes redemarre automatiquement
- Alert: PodRestartingFrequently
- Logs dans Kibana

**Recovery automatique**:
- Kubernetes auto-healing (liveness/readiness probes)
- Nouveau pod demarre automatiquement
- Service reroute trafic vers pods sains
- **RTO**: 30 secondes

### 2.2 Perte d'un Node
**Probabilite**: Moyenne | **Impact**: Moyen

**Cause**: Panne materielle, maintenance Azure, probleme reseau

**Detection**:
- Node en NotReady
- Pods en Pending ou Terminating
- Alert: NodeNotReady

**Recovery automatique**:
- Pods reschedules sur autres nodes (5 min)
- HPA maintient replicas necessaires
- **RTO**: 5-10 minutes

**Actions manuelles**:
```bash
kubectl get nodes
kubectl drain <node-name> --ignore-daemonsets --delete-emptydir-data
```

### 2.3 Perte de Namespace
**Probabilite**: Faible | **Impact**: Critique

**Cause**: Suppression accidentelle, erreur humaine

**Recovery manuelle**:
```bash
cd C:\Users\milar\Desktop\ING3\CLOUD\TP
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/
```
**RTO**: 15 minutes

### 2.4 Echec de Rolling Update
**Probabilite**: Moyenne | **Impact**: Moyen

**Cause**: Image Docker cassee, mauvaise configuration

**Recovery - Rollback**:
```bash
kubectl rollout undo deployment esme-app -n esme-tp-julesmlrd
kubectl rollout status deployment esme-app -n esme-tp-julesmlrd
```
**RTO**: 2 minutes

### 2.5 Perte complete du Cluster
**Probabilite**: Tres faible | **Impact**: Catastrophique

**Cause**: Catastrophe datacenter Azure, cyberattaque

**Recovery**:
```bash
# Creer nouveau cluster AKS
az aks create --resource-group rg-aks-JulesESME-DR --name aks-JulesESME-DR

# Re-deployer depuis Git
git clone https://github.com/Jules-mlrd/esme-tp-kubernetes-JulesESME.git
kubectl apply -f k8s/
```
**RTO**: 30-60 minutes

---

## 3. Backups et restoration

### 3.1 Strategie de backup

**Infrastructure as Code (Git)**:
- Frequence: Continue (chaque commit)
- Localisation: GitHub
- Retention: Indefini

**Images Docker**:
- Frequence: A chaque build
- Localisation: Docker Hub (julesmlrd/esme-app)
- Retention: Toutes versions tagguees

**Logs**:
- Frequence: Continue (streaming)
- Localisation: Elasticsearch (retention: 7 jours)

**Metriques**:
- Frequence: Continue (15s intervals)
- Localisation: Prometheus (retention: 15 jours)

### 3.2 Procedures de restoration

**Restoration complete**:
```bash
git clone https://github.com/Jules-mlrd/esme-tp-kubernetes-JulesESME.git
cd esme-tp-kubernetes-JulesESME
kubectl apply -f k8s/
```

**Restoration version specifique**:
```bash
kubectl set image deployment/esme-app esme-app=julesmlrd/esme-app:v1.0 -n esme-tp-julesmlrd
```

---

## 4. Contacts et escalation

**Responsable**: Jules ESME  
**Email**: jules.esme@esme.fr  
**On-call**: 24/7

**Escalation**:
1. Niveau 1 (0-15 min): Equipe DevOps
2. Niveau 2 (15-60 min): Lead technique
3. Niveau 3 (>60 min): Azure Support

---

## 5. Checklist de validation post-recovery

- [ ] Pods en Running (3/3 replicas minimum)
- [ ] Services ont endpoints actifs
- [ ] LoadBalancer a IP externe
- [ ] Application accessible via HTTP
- [ ] Endpoints /health et /info repondent 200
- [ ] ConfigMap correctement monte
- [ ] HPA actif et fonctionnel
- [ ] Prometheus collecte metriques
- [ ] Grafana dashboards accessibles
- [ ] Logs visibles dans Kibana
- [ ] Network Policies actives

**Tests fonctionnels**:
```bash
curl http://<EXTERNAL-IP>/
curl http://<EXTERNAL-IP>/health
kubectl get pods -n esme-tp-julesmlrd
kubectl get hpa -n esme-tp-julesmlrd
```

---

## 6. Ameliorations continues

**Court terme (1 mois)**:
- Automatiser backups vers Azure Blob Storage
- Implementer chaos engineering
- Creer runbooks detailles

**Moyen terme (3 mois)**:
- Multi-region deployment
- Backup etcd externe
- Tests DR reguliers

**Long terme (6 mois)**:
- Active-Active multi-cluster
- GitOps avec ArgoCD
- DR totalement automatise

---

**Derniere mise a jour**: 3 novembre 2025  
**Prochain test DR**: 3 fevrier 2026
