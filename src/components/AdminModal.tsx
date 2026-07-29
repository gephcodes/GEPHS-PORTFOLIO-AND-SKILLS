import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, ShieldAlert, Check, Eye, Trash2, Calendar, RefreshCw, Zap } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminModal({ isOpen, onClose }: AdminModalProps) {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [applications, setApplications] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Load lockout state on mount
  useEffect(() => {
    const savedLockout = localStorage.getItem('geph_admin_lockout');
    const savedAttempts = localStorage.getItem('geph_admin_attempts');
    
    if (savedAttempts) {
      setAttempts(parseInt(savedAttempts, 10));
    }

    if (savedLockout) {
      const lockTime = parseInt(savedLockout, 10);
      const now = Date.now();
      const thirtyMins = 30 * 60 * 1000;
      
      if (now - lockTime < thirtyMins) {
        setLockoutTime(lockTime);
        setTimeRemaining(Math.ceil((thirtyMins - (now - lockTime)) / 1000));
      } else {
        // Lockout expired
        localStorage.removeItem('geph_admin_lockout');
        localStorage.setItem('geph_admin_attempts', '0');
        setAttempts(0);
      }
    }
  }, [isOpen]);

  // Handle countdown timer for lockout
  useEffect(() => {
    if (!lockoutTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const thirtyMins = 30 * 60 * 1000;
      const diff = thirtyMins - (now - lockoutTime);

      if (diff <= 0) {
        setLockoutTime(null);
        localStorage.removeItem('geph_admin_lockout');
        localStorage.setItem('geph_admin_attempts', '0');
        setAttempts(0);
        setError('');
        clearInterval(interval);
      } else {
        setTimeRemaining(Math.ceil(diff / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lockoutTime]);

  const loadApplications = async () => {
    setIsSyncing(true);
    let localSaved: any[] = [];
    try {
      const saved = localStorage.getItem('geph_work_applications');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          localSaved = parsed.filter((a: any) => {
            if (!a || typeof a !== 'object') return false;
            if (a.id && typeof a.id === 'string' && a.id.startsWith('intel_')) return false;
            const mockNames = ['Alex Rivera', 'Maya Lin', 'Marcus Vance'];
            if (mockNames.includes(a.name)) return false;
            return true;
          });
        }
      }
    } catch (e) {
      console.error('Error parsing local storage applications:', e);
    }

    try {
      // First, if local applications exist, attempt batch sync with backend
      if (localSaved.length > 0) {
        const syncRes = await fetch('/api/applications/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(localSaved)
        });
        if (syncRes.ok) {
          const syncedData = await syncRes.json();
          setApplications(syncedData);
          localStorage.setItem('geph_work_applications', JSON.stringify(syncedData));
          setIsSyncing(false);
          return;
        }
      }

      // Standard API fetch
      const response = await fetch('/api/applications');
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
        localStorage.setItem('geph_work_applications', JSON.stringify(data));
      } else if (localSaved.length > 0) {
        setApplications(localSaved);
      }
    } catch (err) {
      console.error('Failed to load applications from API, falling back to local storage:', err);
      if (localSaved.length > 0) {
        setApplications(localSaved);
      }
    } finally {
      setIsSyncing(false);
    }
  };

  // Live Sync Effect: Poll every 4 seconds & listen for submit events when authenticated & open
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadApplications();

      const interval = setInterval(() => {
        loadApplications();
      }, 4000);

      const handleSubmitted = () => {
        loadApplications();
      };
      window.addEventListener('geph_application_submitted', handleSubmitted);

      return () => {
        clearInterval(interval);
        window.removeEventListener('geph_application_submitted', handleSubmitted);
      };
    }
  }, [isOpen, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (lockoutTime) {
      setError(`Locked out. Try again in ${Math.ceil(timeRemaining / 60)} minutes.`);
      return;
    }

    if (passcode === 'Zayden@08') {
      setIsAuthenticated(true);
      setError('');
      setAttempts(0);
      localStorage.setItem('geph_admin_attempts', '0');
      loadApplications();
    } else {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      localStorage.setItem('geph_admin_attempts', nextAttempts.toString());

      if (nextAttempts >= 3) {
        const now = Date.now();
        setLockoutTime(now);
        localStorage.setItem('geph_admin_lockout', now.toString());
        setError('Maximum attempts reached. Locked out for 30 minutes.');
      } else {
        setError(`Incorrect passcode. ${3 - nextAttempts} attempts remaining.`);
      }
    }
  };

  const handleDeleteApplication = async (indexToDelete: number) => {
    const appToDelete = applications[indexToDelete];
    if (!appToDelete) return;

    if (appToDelete.id) {
      try {
        const response = await fetch(`/api/applications/${appToDelete.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          loadApplications();
          return;
        }
      } catch (err) {
        console.error('Failed to delete application from API:', err);
      }
    }

    try {
      const updated = applications.filter((_, idx) => idx !== indexToDelete);
      localStorage.setItem('geph_work_applications', JSON.stringify(updated));
      setApplications(updated);
    } catch (err) {
      console.error('Failed to delete application record', err);
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to purge all application records from the server database?')) {
      try {
        const response = await fetch('/api/applications/clear', {
          method: 'POST',
        });
        if (response.ok) {
          setApplications([]);
          localStorage.removeItem('geph_work_applications');
          return;
        }
      } catch (err) {
        console.error('Failed to clear applications on server:', err);
      }

      try {
        localStorage.removeItem('geph_work_applications');
        setApplications([]);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const filteredApplications = applications.filter((app) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (app.name && app.name.toLowerCase().includes(q)) ||
      (app.instagram && app.instagram.toLowerCase().includes(q)) ||
      (app.selectedSkills && app.selectedSkills.some((s: string) => s.toLowerCase().includes(q))) ||
      (app.proofOfWork && app.proofOfWork.toLowerCase().includes(q))
    );
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
          {/* Backdrop closer */}
          <div className="absolute inset-0 cursor-crosshair" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 500, damping: 32 }}
            className="relative z-10 w-full max-w-4xl border border-zinc-800 bg-black shadow-2xl rounded-none flex flex-col max-h-[95vh] sm:max-h-[90vh]"
            id="admin-matrix-portal"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4 bg-zinc-950 shrink-0">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-emerald-400" />
                <span className="font-mono text-xs text-white uppercase tracking-wider">
                  Intel Core Access Panel / Secure Admin Interface
                </span>
                {isAuthenticated && (
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-950/60 border border-emerald-800 text-[10px] font-mono text-emerald-400 uppercase ml-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Sync Active
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="font-mono text-xs uppercase text-zinc-500 hover:text-white transition-colors flex items-center gap-1"
              >
                [ Close ] <X className="h-4 w-4 inline" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {!isAuthenticated ? (
                /* LOGIN SCREEN */
                <div className="max-w-md mx-auto py-12 space-y-6">
                  <div className="text-center space-y-2">
                    <ShieldAlert className="h-10 w-10 text-zinc-400 mx-auto" />
                    <h3 className="font-sans text-xl font-light text-white">Security Verification Required</h3>
                    <p className="font-sans text-xs text-zinc-500">Provide root passphrase token to decode the partner applications database.</p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] text-zinc-400 uppercase block">Passcode Phrase</label>
                      <input
                        type="password"
                        required
                        disabled={!!lockoutTime}
                        value={passcode}
                        placeholder={lockoutTime ? 'MATRIX LOCKOUT ACTIVE' : 'Enter admin passcode...'}
                        onChange={(e) => setPasscode(e.target.value)}
                        className="w-full rounded-none border border-zinc-800 bg-black p-3 font-mono text-xs text-white focus:border-zinc-500 focus:outline-none transition-colors text-center uppercase tracking-widest disabled:opacity-40"
                      />
                    </div>

                    {error && (
                      <div className="p-3 border border-red-950 bg-red-950/20 text-red-400 text-xs font-mono text-center">
                        {error}
                      </div>
                    )}

                    {lockoutTime && (
                      <div className="p-4 border border-zinc-800 bg-zinc-950/40 text-center space-y-1.5">
                        <span className="font-mono text-[10px] text-red-500 uppercase tracking-widest block font-bold">
                          ★★★ COOLDOWN ACTIVE ★★★
                        </span>
                        <p className="font-sans text-xs text-zinc-400">
                          Secure mainframe locked due to multiple wrong inputs. Remaining lockout duration:
                        </p>
                        <span className="font-mono text-lg text-white font-bold block">
                          {formatTime(timeRemaining)}
                        </span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={!!lockoutTime}
                      className="w-full flex items-center justify-center bg-white py-3 font-mono text-xs font-bold uppercase tracking-wider text-black hover:bg-zinc-200 transition-colors disabled:opacity-30"
                    >
                      Verify Master Credentials
                    </button>
                  </form>
                </div>
              ) : (
                /* AUTHENTICATED PANEL */
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-sans text-xl font-light text-white">Registered Candidate Applicants</h3>
                        <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-emerald-400 font-mono text-xs">
                          {applications.length} Total
                        </span>
                      </div>
                      <p className="font-sans text-xs text-zinc-500 mt-0.5">
                        Real-time intake proposals loaded from backend memory bank & sync database.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={loadApplications}
                        disabled={isSyncing}
                        className="px-3 py-1.5 font-mono text-[10px] text-zinc-300 border border-zinc-800 hover:bg-zinc-900 transition-all uppercase flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <RefreshCw className={`h-3 w-3 ${isSyncing ? 'animate-spin text-emerald-400' : ''}`} />
                        [ Sync Database ]
                      </button>
                      {applications.length > 0 && (
                        <button
                          onClick={handleClearAll}
                          className="px-3 py-1.5 font-mono text-[10px] text-rose-400 border border-rose-950 hover:bg-rose-950/20 transition-all uppercase"
                        >
                          [ Clear All ]
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Filter / Search Bar */}
                  {applications.length > 0 && (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Filter candidates by name, handle, skills, or proof of work..."
                        className="w-full bg-zinc-950 border border-zinc-800 p-2 font-mono text-xs text-zinc-200 focus:outline-none focus:border-zinc-600"
                      />
                    </div>
                  )}

                  {filteredApplications.length === 0 ? (
                    <div className="text-center py-16 border border-dashed border-zinc-900 bg-zinc-950/10">
                      <span className="font-mono text-xs text-zinc-600 uppercase block">Zero Transmission Packets Logged</span>
                      <p className="font-sans text-xs text-zinc-500 mt-1">
                        {searchQuery ? 'No candidates matched your search query.' : 'No applications have been sent or saved yet.'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {filteredApplications.map((app, idx) => (
                        <div key={app.id || idx} className="border border-zinc-850 bg-zinc-950/20 p-5 space-y-4 rounded-none">
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-2 border-b border-zinc-900 pb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-sans text-base font-semibold text-white">{app.name}</h4>
                                <span className="font-mono text-[9px] text-emerald-400 bg-emerald-950/60 border border-emerald-900 px-1.5 py-0.2 uppercase">
                                  Synced
                                </span>
                              </div>
                              <p className="font-mono text-[10px] text-zinc-500 uppercase mt-0.5">
                                Age: {app.age} | Grade: {app.schoolGrade} | Instagram: <span className="text-emerald-400">{app.instagram}</span>
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-[10px] text-zinc-500 flex items-center gap-1">
                                <Calendar className="h-3 w-3" /> {app.date}
                              </span>
                              <button
                                onClick={() => handleDeleteApplication(idx)}
                                className="text-zinc-600 hover:text-rose-400 transition-colors p-1"
                                title="Delete application record"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                            {/* Left Side */}
                            <div className="space-y-3">
                              <div>
                                <span className="font-mono text-[9px] text-zinc-500 uppercase block">Source channel</span>
                                <p className="text-zinc-300 font-medium">{app.heardFrom}</p>
                              </div>
                              <div>
                                <span className="font-mono text-[9px] text-zinc-500 uppercase block">Availability / Hours commitment</span>
                                <p className="text-zinc-300 font-medium">{app.hoursPerWeek} hours/week</p>
                                <p className="text-zinc-400 text-[11px] mt-0.5">{app.freeTimes}</p>
                                {app.conflicts && <p className="text-rose-400/80 text-[11px] italic mt-0.5">Conflicts: {app.conflicts}</p>}
                              </div>
                              <div>
                                <span className="font-mono text-[9px] text-zinc-500 uppercase block">Selected Skills Matrix</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {app.selectedSkills?.map((s: string, sIdx: number) => (
                                    <span key={sIdx} className="bg-zinc-900 border border-zinc-800 text-white font-mono text-[9px] px-2 py-0.5 uppercase">
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <span className="font-mono text-[9px] text-zinc-500 uppercase block">Description of Past Work</span>
                                <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">{app.proofOfWork}</p>
                              </div>
                            </div>

                            {/* Right Side */}
                            <div className="space-y-3 border-t md:border-t-0 md:border-l border-zinc-900 pt-3 md:pt-0 md:pl-4">
                              <div>
                                <span className="font-mono text-[9px] text-zinc-500 uppercase block">Why work with Geph?</span>
                                <p className="text-zinc-300 leading-relaxed">{app.whyWork}</p>
                              </div>
                              <div>
                                <span className="font-mono text-[9px] text-zinc-500 uppercase block">Self-starter scenario</span>
                                <p className="text-zinc-300 leading-relaxed">{app.finishHardThing}</p>
                              </div>
                              <div>
                                <span className="font-mono text-[9px] text-zinc-500 uppercase block">Zero instructions triage strategy</span>
                                <p className="text-zinc-300 leading-relaxed">{app.zeroInstructions}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-2 pt-1">
                                <div className="bg-zinc-950 p-2 border border-zinc-900 text-center">
                                  <span className="font-mono text-[8px] text-zinc-500 uppercase block">Fixed Pay split ok?</span>
                                  <span className={`font-mono text-xs uppercase font-bold ${app.okayWithFixedPay === 'yes' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {app.okayWithFixedPay}
                                  </span>
                                </div>
                                <div className="bg-zinc-950 p-2 border border-zinc-900 text-center">
                                  <span className="font-mono text-[8px] text-zinc-500 uppercase block">Confidentiality ok?</span>
                                  <span className={`font-mono text-xs uppercase font-bold ${app.keepConfidential === 'yes' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {app.keepConfidential}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-zinc-900 pt-3 space-y-1.5">
                            <span className="font-mono text-[9px] text-rose-400 uppercase tracking-wider block font-bold">★ Executed Trial Task Submission</span>
                            <div className="bg-black border border-zinc-900 p-3 font-mono text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                              {app.trialSubmission}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
