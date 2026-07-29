import express from 'express';
import path from 'path';
import fs from 'fs';

const APPLICATIONS_FILE = path.join(process.cwd(), 'data', 'applications.json');

// Helper to filter out legacy mock/trial items
function isRealRegistration(app: any) {
  if (!app || typeof app !== 'object') return false;
  if (app.id && typeof app.id === 'string' && app.id.startsWith('intel_')) return false;
  const mockNames = ['Alex Rivera', 'Maya Lin', 'Marcus Vance'];
  if (mockNames.includes(app.name)) return false;
  return true;
}

// Helper to ensure data directory and file exist
function ensureDataFile() {
  const dir = path.dirname(APPLICATIONS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(APPLICATIONS_FILE)) {
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify([], null, 2));
  } else {
    try {
      const content = fs.readFileSync(APPLICATIONS_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        const cleaned = parsed.filter(isRealRegistration);
        if (cleaned.length !== parsed.length) {
          fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(cleaned, null, 2));
        }
      } else {
        fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify([], null, 2));
      }
    } catch {
      fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify([], null, 2));
    }
  }
}

function getApplications() {
  try {
    ensureDataFile();
    const data = fs.readFileSync(APPLICATIONS_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      return parsed.filter(isRealRegistration);
    }
    return [];
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
    // Add unique ID to each application if not provided
    const appWithId = {
      id: newApp.id || (Date.now().toString() + Math.random().toString(36).substr(2, 9)),
      ...newApp,
      date: newApp.date || new Date().toLocaleString(),
    };

    // Prevent exact duplicate ID insertions
    const existingIndex = apps.findIndex((a: any) => a.id === appWithId.id);
    if (existingIndex >= 0) {
      apps[existingIndex] = appWithId;
    } else {
      apps.unshift(appWithId); // Put newest at the top
    }

    const success = saveApplications(apps);

    if (success) {
      res.status(201).json(appWithId);
    } else {
      res.status(500).json({ error: 'Failed to save application' });
    }
  });

  // Sync client applications batch with server
  app.post('/api/applications/sync', (req, res) => {
    const clientApps = req.body;
    if (!Array.isArray(clientApps)) {
      res.status(400).json({ error: 'Expected array of applications' });
      return;
    }

    const serverApps = getApplications();
    let updated = [...serverApps];
    let changesMade = false;

    clientApps.forEach((cApp: any) => {
      if (!cApp || !cApp.name) return;
      // Check if client app exists on server by ID or by matching name + date
      const exists = updated.some(
        (sApp: any) =>
          (cApp.id && sApp.id === cApp.id) ||
          (sApp.name === cApp.name && sApp.date === cApp.date)
      );

      if (!exists) {
        const prepared = {
          id: cApp.id || (Date.now().toString() + Math.random().toString(36).substr(2, 9)),
          ...cApp,
          date: cApp.date || new Date().toLocaleString(),
        };
        updated.unshift(prepared);
        changesMade = true;
      }
    });

    if (changesMade) {
      saveApplications(updated);
    }

    res.json(updated);
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

