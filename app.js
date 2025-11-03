const express = require('express');
const app = express();
const port = 3000;

// Variables d'environnement avec valeurs par défaut
const appEnv = process.env.APP_ENV || 'development';
const logLevel = process.env.LOG_LEVEL || 'debug';
const message = process.env.MESSAGE || 'Déployé par un étudiant ESME';

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ESME DevOps App v2.0</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        .container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          max-width: 800px;
          width: 100%;
          padding: 40px;
        }
        h1 {
          color: #667eea;
          font-size: 2.5em;
          margin-bottom: 10px;
          text-align: center;
        }
        .version-badge {
          display: inline-block;
          background: #667eea;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9em;
          font-weight: bold;
          margin: 10px 0 20px 0;
        }
        .info-card {
          background: #f8f9fa;
          border-left: 4px solid #667eea;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
        }
        .info-card h3 {
          color: #333;
          margin-bottom: 15px;
          font-size: 1.2em;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }
        .info-item {
          background: white;
          padding: 12px;
          border-radius: 6px;
          border: 1px solid #e0e0e0;
        }
        .info-item strong {
          color: #667eea;
          display: block;
          margin-bottom: 5px;
          font-size: 0.85em;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        ul li {
          padding: 8px 0;
          border-bottom: 1px solid #e0e0e0;
        }
        ul li:last-child {
          border-bottom: none;
        }
        .timestamp {
          text-align: center;
          color: #666;
          font-size: 0.9em;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>ESME DevOps 2025</h1>
        <div style="text-align: center;">
          <span class="version-badge">Version 2.0.0</span>
        </div>
        
        <div class="info-card">
          <h3>Application</h3>
          <div class="info-grid">
            <div class="info-item">
              <strong>Environnement</strong>
              ${appEnv}
            </div>
            <div class="info-item">
              <strong>Message</strong>
              ${message}
            </div>
            <div class="info-item">
              <strong>Niveau de log</strong>
              ${logLevel}
            </div>
            <div class="info-item">
              <strong>Hostname</strong>
              ${process.env.HOSTNAME || 'localhost'}
            </div>
          </div>
        </div>

        <div class="info-card">
          <h3>Nouvelles fonctionnalites v2.0</h3>
          <ul>
            <li>Interface utilisateur amelioree et responsive</li>
            <li>Autoscaling HPA configure (2-10 replicas)</li>
            <li>Rolling update sans interruption de service</li>
            <li>ConfigMap pour la gestion de configuration</li>
          </ul>
        </div>

        <div class="timestamp">
          Deploye le ${new Date().toLocaleString('fr-FR')}
        </div>
      </div>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    environment: appEnv,
    version: '2.0.0'
  });
});

app.get('/info', (req, res) => {
  res.json({
    app: 'esme-devops-app',
    version: '2.0.0',
    environment: appEnv,
    logLevel: logLevel,
    message: message,
    uptime: process.uptime(),
    hostname: process.env.HOSTNAME || 'localhost',
    features: ['HPA Autoscaling', 'Rolling Update', 'Improved UI']
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`App running on port ${port}`);
  console.log(`Environment: ${appEnv}`);
  console.log(`Log level: ${logLevel}`);
});
