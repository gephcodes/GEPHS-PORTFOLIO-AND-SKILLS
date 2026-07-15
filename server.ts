import express from 'express';
import path from 'path';
import fs from 'fs';

const APPLICATIONS_FILE = path.join(process.cwd(), 'data', 'applications.json');

// Helper to ensure data directory and file exist
function ensureDataFile() {
  const dir = path.dirname(APPLICATIONS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(APPLICATIONS_FILE)) {
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify([]));
  }
}

function getApplications() {
  try {
    ensureDataFile();
    const data = fs.readFileSync(APPLICATIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading applications file:', err);
    return [];
  }
}

function saveApplications(apps: any[]) {
  try {
    ensureDataFile();
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(apps, null, 2));
    return true;
  } catch (err) {
    console.error('Error writing applications file:', err);
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Body parser middleware
  app.use(express.json());

  // Serve API or health routes first
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Fetch all applications
  app.get('/api/applications', (req, res) => {
    const apps = getApplications();
    res.json(apps);
  });

  // Submit a new application
  app.post('/api/applications', (req, res) => {
    const newApp = req.body;
    if (!newApp || !newApp.name) {
      res.status(400).json({ error: 'Invalid application data' });
      return;
    }

    const apps = getApplications();
    // Add unique ID to each application for reliable operations
    const appWithId = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ...newApp,
      date: newApp.date || new Date().toLocaleString(),
    };

    apps.unshift(appWithId); // Put newest at the top
    const success = saveApplications(apps);

    if (success) {
      res.status(201).json(appWithId);
    } else {
      res.status(500).json({ error: 'Failed to save application' });
    }
  });

  // Delete a specific application by ID
  app.delete('/api/applications/:id', (req, res) => {
    const { id } = req.params;
    const apps = getApplications();
    const filteredApps = apps.filter((app: any) => app.id !== id);

    if (apps.length === filteredApps.length) {
      res.status(404).json({ error: 'Application not found' });
      return;
    }

    const success = saveApplications(filteredApps);
    if (success) {
      res.json({ success: true, message: 'Application deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete application' });
    }
  });

  // Clear all applications
  app.post('/api/applications/clear', (req, res) => {
    const success = saveApplications([]);
    if (success) {
      res.json({ success: true, message: 'All records cleared successfully' });
    } else {
      res.status(500).json({ error: 'Failed to clear applications' });
    }
  });

  // Serve static files in production or development fallback
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
