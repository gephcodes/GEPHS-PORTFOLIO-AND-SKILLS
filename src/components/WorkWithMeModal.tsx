import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowRight, Sparkles, UploadCloud, AlertCircle, FileText, Compass } from 'lucide-react';

interface WorkWithMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SkillType = 'design' | 'dev' | 'content' | 'sales/outreach' | 'ops/numbers';

export default function WorkWithMeModal({ isOpen, onClose }: WorkWithMeModalProps) {
  // Form step tracking
  const [activeTab, setActiveTab] = useState<'info' | 'availability' | 'skills' | 'screening' | 'trial'>('info');
  
  // Basic Info State
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [schoolGrade, setSchoolGrade] = useState('');
  const [instagram, setInstagram] = useState('');
  const [heardFrom, setHeardFrom] = useState('');

  // Availability State
  const [hoursPerWeek, setHoursPerWeek] = useState('');
  const [freeTimes, setFreeTimes] = useState('');
  const [conflicts, setConflicts] = useState('');

  // Skills State
  const [selectedSkills, setSelectedSkills] = useState<SkillType[]>([]);
  const [proofOfWork, setProofOfWork] = useState('');

  // Screening Questions State
  const [whyWork, setWhyWork] = useState('');
  const [finishHardThing, setFinishHardThing] = useState('');
  const [zeroInstructions, setZeroInstructions] = useState('');
  const [okayWithFixedPay, setOkayWithFixedPay] = useState<'yes' | 'no' | ''>('');
  const [keepConfidential, setKeepConfidential] = useState<'yes' | 'no' | ''>('');

  // Trial Task State
  const [trialSubmission, setTrialSubmission] = useState('');
  
  // Submission Status
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [localApplications, setLocalApplications] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('geph_work_applications');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleSkill = (skill: SkillType) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleNextTab = (current: 'info' | 'availability' | 'skills' | 'screening' | 'trial') => {
    if (current === 'info') setActiveTab('availability');
    else if (current === 'availability') setActiveTab('skills');
    else if (current === 'skills') setActiveTab('screening');
    else if (current === 'screening') setActiveTab('trial');
  };

  const handlePrevTab = (current: 'info' | 'availability' | 'skills' | 'screening' | 'trial') => {
    if (current === 'availability') setActiveTab('info');
    else if (current === 'skills') setActiveTab('availability');
    else if (current === 'screening') setActiveTab('skills');
    else if (current === 'trial') setActiveTab('screening');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!name || !age || !schoolGrade || !instagram || !heardFrom || !hoursPerWeek || !freeTimes || selectedSkills.length === 0 || !whyWork || !finishHardThing || !zeroInstructions || !okayWithFixedPay || !keepConfidential || !trialSubmission) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    
    setTimeout(() => {
      const newApp = {
        name,
        age,
        schoolGrade,
        instagram,
        heardFrom,
        hoursPerWeek,
        freeTimes,
        conflicts,
        selectedSkills,
        proofOfWork,
        whyWork,
        finishHardThing,
        zeroInstructions,
        okayWithFixedPay,
        keepConfidential,
        trialSubmission,
        date: new Date().toLocaleString()
      };

      try {
        const updated = [newApp, ...localApplications];
        localStorage.setItem('geph_work_applications', JSON.stringify(updated));
        setLocalApplications(updated);
        setStatus('success');
      } catch (err) {
        setStatus('error');
      }
    }, 1200);
  };

  const resetForm = () => {
    setName('');
    setAge('');
    setSchoolGrade('');
    setInstagram('');
    setHeardFrom('');
    setHoursPerWeek('');
    setFreeTimes('');
    setConflicts('');
    setSelectedSkills([]);
    setProofOfWork('');
    setWhyWork('');
    setFinishHardThing('');
    setZeroInstructions('');
    setOkayWithFixedPay('');
    setKeepConfidential('');
    setTrialSubmission('');
    setStatus('idle');
    setActiveTab('info');
  };

  // Get current trial task instructions based on first selected skill or general fallback
  const getTrialInstructions = () => {
    const primarySkill = selectedSkills[0] || 'design';
    switch (primarySkill) {
      case 'design':
        return {
          title: 'Trial Task: Card Redesign',
          instructions: 'Choose any existing UI card on this portfolio (e.g. the active product card, trading setups card, or contact module). Redesign it to look even cleaner, more futuristic, or brutalist. Provide a link to your Figma draft or write your custom CSS/Tailwind specs below.',
          placeholder: 'Figma link or custom design specs here...'
        };
      case 'dev':
        return {
          title: 'Trial Task: IST Timestamp Utility',
          instructions: 'Write a self-contained TypeScript function called `formatISTTimestamp` that accepts an ISO date string and returns a cleanly formatted Indian Standard Time string (e.g., "[14:18:39 IST]"). Paste your code or a link to a private Gist below.',
          placeholder: 'Paste your TypeScript code or Gist link here...'
        };
      case 'content':
        return {
          title: 'Trial Task: Twitter Copywriting',
          instructions: 'Write 3 high-impact promotional tweets targeting indie hackers or asset managers, promoting either StupidSimple.AI or GoalHub. Avoid generic marketing hype. Keep them punchy, clear, and focused on functional utility.',
          placeholder: 'Tweet 1:\n\nTweet 2:\n\nTweet 3:'
        };
      case 'sales/outreach':
        return {
          title: 'Trial Task: Cold Outreach Draft',
          instructions: 'Draft a short, non-spammy cold email or DM reaching out to a founder suggesting they integrate the "Iterative Engineering workflow". Keep it under 100 words, highly personalized, and direct.',
          placeholder: 'Subject line:\n\nBody message...'
        };
      case 'ops/numbers':
        return {
          title: 'Trial Task: Revenue Split Analysis',
          instructions: 'Calculate the cumulative net revenue for a proprietary trading bot over 12 months assuming $12,500 MRR, a monthly VPS maintenance overhead of $120, a payment transaction fee of 3.5%, and a fixed 40% payout pool split. Show your final calculated number.',
          placeholder: 'Describe your breakdown and show the calculations here...'
        };
      default:
        return {
          title: 'Trial Task: Self-directed Contribution',
          instructions: 'Explain in concrete detail one functional feature or visual optimization you would add to Gephel\'s portfolio code to instantly increase engagement or structure performance tracking.',
          placeholder: 'Your response here...'
        };
    }
  };

  const trialTask = getTrialInstructions();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          {/* Backdrop Closer */}
          <div className="absolute inset-0 cursor-crosshair" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 500, damping: 32 }}
            className="relative z-10 w-full max-w-4xl border border-zinc-850 bg-black shadow-2xl rounded-none flex flex-col max-h-[95vh] sm:max-h-[90vh]"
            id="work-with-me-modal"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-850 px-6 py-4 shrink-0 bg-zinc-950">
              <div className="flex items-center gap-2">
                <Compass className="h-4 w-4 text-white" />
                <span className="font-mono text-xs text-white uppercase tracking-wider">
                  Partner Intake Matrix / Work with Geph
                </span>
              </div>
              <button
                onClick={onClose}
                className="font-mono text-xs uppercase text-zinc-500 hover:text-white transition-colors flex items-center gap-1"
              >
                [ ESC ] <X className="h-4 w-4 inline" />
              </button>
            </div>

            {/* Modal Body Container */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col lg:flex-row gap-8">
              
              {/* Left Column: Navigation Tracks (Desktop only) */}
              <div className="hidden lg:flex flex-col gap-2 w-48 shrink-0">
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block mb-2">Process Stages</span>
                
                <button
                  type="button"
                  onClick={() => status !== 'success' && setActiveTab('info')}
                  disabled={status === 'success'}
                  className={`text-left px-3 py-2 font-mono text-[11px] uppercase border transition-all ${
                    activeTab === 'info'
                      ? 'border-white text-white bg-zinc-900/40 font-semibold'
                      : 'border-transparent text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  01. Basic Info
                </button>
                <button
                  type="button"
                  onClick={() => status !== 'success' && setActiveTab('availability')}
                  disabled={status === 'success'}
                  className={`text-left px-3 py-2 font-mono text-[11px] uppercase border transition-all ${
                    activeTab === 'availability'
                      ? 'border-white text-white bg-zinc-900/40 font-semibold'
                      : 'border-transparent text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  02. Availability
                </button>
                <button
                  type="button"
                  onClick={() => status !== 'success' && setActiveTab('skills')}
                  disabled={status === 'success'}
                  className={`text-left px-3 py-2 font-mono text-[11px] uppercase border transition-all ${
                    activeTab === 'skills'
                      ? 'border-white text-white bg-zinc-900/40 font-semibold'
                      : 'border-transparent text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  03. Skills
                </button>
                <button
                  type="button"
                  onClick={() => status !== 'success' && setActiveTab('screening')}
                  disabled={status === 'success'}
                  className={`text-left px-3 py-2 font-mono text-[11px] uppercase border transition-all ${
                    activeTab === 'screening'
                      ? 'border-white text-white bg-zinc-900/40 font-semibold'
                      : 'border-transparent text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  04. Screening
                </button>
                <button
                  type="button"
                  onClick={() => status !== 'success' && setActiveTab('trial')}
                  disabled={status === 'success'}
                  className={`text-left px-3 py-2 font-mono text-[11px] uppercase border transition-all ${
                    activeTab === 'trial'
                      ? 'border-white text-white bg-zinc-900/40 font-semibold'
                      : 'border-transparent text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  05. Trial Task
                </button>

                {localApplications.length > 0 && (
                  <div className="mt-auto pt-6 border-t border-zinc-900">
                    <span className="font-mono text-[9px] text-zinc-600 uppercase block mb-1">Local Logs</span>
                    <span className="font-mono text-[10px] text-zinc-400">
                      {localApplications.length} Submission{localApplications.length > 1 ? 's' : ''} logged.
                    </span>
                  </div>
                )}
              </div>

              {/* Right Column: Form Fields */}
              <div className="flex-1">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 text-center py-12 px-4 border border-zinc-800 bg-zinc-950/20 max-w-lg mx-auto"
                  >
                    <div className="h-12 w-12 rounded-none border border-emerald-500 bg-emerald-950/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <Check className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans text-xl font-light text-white">Transmission Secured</h3>
                      <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                        Your strategic partner questionnaire has been successfully formatted and logged to our local storage database cache.
                      </p>
                    </div>

                    <div className="border-t border-b border-zinc-900 py-3 font-mono text-[11px] text-emerald-400">
                      <span>Geph will get back as soon as possible.</span>
                    </div>

                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={resetForm}
                        className="px-4 py-2 font-mono text-xs border border-zinc-800 hover:border-zinc-500 transition-colors text-white"
                      >
                        [ Submit Another ]
                      </button>
                      <button
                        onClick={onClose}
                        className="px-4 py-2 font-mono text-xs bg-white text-black font-semibold hover:bg-zinc-200 transition-colors"
                      >
                        [ Finish ]
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* STEP 1: BASIC INFO */}
                    {activeTab === 'info' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-4"
                      >
                        <div>
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">Section 01</span>
                            <span className="font-mono text-[10px] text-zinc-500 lg:hidden">[ 1 / 5 ]</span>
                          </div>
                          <h3 className="font-sans text-lg font-light text-white">Basic Identification</h3>
                          <p className="font-sans text-xs text-zinc-400">Let me know who is initiating contact.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="font-mono text-[10px] text-zinc-400 uppercase block">Full Name</label>
                            <input
                              type="text"
                              required
                              value={name}
                              placeholder="e.g. Liam Sterling"
                              onChange={(e) => setName(e.target.value)}
                              className="w-full rounded-none border border-zinc-800 bg-black p-3 font-sans text-xs text-white focus:border-zinc-500 focus:outline-none transition-colors"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1.5">
                              <label className="font-mono text-[10px] text-zinc-400 uppercase block">Age</label>
                              <input
                                type="number"
                                required
                                value={age}
                                placeholder="e.g. 19"
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full rounded-none border border-zinc-800 bg-black p-3 font-sans text-xs text-white focus:border-zinc-500 focus:outline-none transition-colors"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="font-mono text-[10px] text-zinc-400 uppercase block">School / Grade</label>
                              <input
                                type="text"
                                required
                                value={schoolGrade}
                                placeholder="e.g. College Yr 2"
                                onChange={(e) => setSchoolGrade(e.target.value)}
                                className="w-full rounded-none border border-zinc-800 bg-black p-3 font-sans text-xs text-white focus:border-zinc-500 focus:outline-none transition-colors"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="font-mono text-[10px] text-zinc-400 uppercase block">Instagram Handle</label>
                            <input
                              type="text"
                              required
                              value={instagram}
                              placeholder="e.g. @liam.shiptt"
                              onChange={(e) => setInstagram(e.target.value)}
                              className="w-full rounded-none border border-zinc-800 bg-black p-3 font-sans text-xs text-white focus:border-zinc-500 focus:outline-none transition-colors"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="font-mono text-[10px] text-zinc-400 uppercase block">How did you hear about Geph?</label>
                            <input
                              type="text"
                              required
                              value={heardFrom}
                              placeholder="e.g. Twitter / GitHub / Mutual friend"
                              onChange={(e) => setHeardFrom(e.target.value)}
                              className="w-full rounded-none border border-zinc-800 bg-black p-3 font-sans text-xs text-white focus:border-zinc-500 focus:outline-none transition-colors"
                            />
                          </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleNextTab('info')}
                            className="group flex items-center gap-1.5 bg-white px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-black hover:bg-zinc-200 transition-colors"
                          >
                            <span>Next: Availability</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: AVAILABILITY */}
                    {activeTab === 'availability' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-4"
                      >
                        <div>
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">Section 02</span>
                            <span className="font-mono text-[10px] text-zinc-500 lg:hidden">[ 2 / 5 ]</span>
                          </div>
                          <h3 className="font-sans text-lg font-light text-white">Resource & Time Allocation</h3>
                          <p className="font-sans text-xs text-zinc-400">Be extremely realistic with your schedule commitments.</p>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <label className="font-mono text-[10px] text-zinc-400 uppercase block">Hours per week you can commit</label>
                            <input
                              type="number"
                              required
                              value={hoursPerWeek}
                              placeholder="e.g. 15 (Minimum recommended: 10)"
                              onChange={(e) => setHoursPerWeek(e.target.value)}
                              className="w-full rounded-none border border-zinc-800 bg-black p-3 font-sans text-xs text-white focus:border-zinc-500 focus:outline-none transition-colors"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="font-mono text-[10px] text-zinc-400 uppercase block">Usual Free Days & Timeframes</label>
                            <input
                              type="text"
                              required
                              value={freeTimes}
                              placeholder="e.g. Mon-Fri evenings, Saturday afternoons"
                              onChange={(e) => setFreeTimes(e.target.value)}
                              className="w-full rounded-none border border-zinc-800 bg-black p-3 font-sans text-xs text-white focus:border-zinc-500 focus:outline-none transition-colors"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="font-mono text-[10px] text-zinc-400 uppercase block">Recurring Conflicts / Obligations (Optional)</label>
                            <textarea
                              rows={2}
                              value={conflicts}
                              placeholder="e.g. Sports practice Tue/Thu 4-6 PM, tuition prep on Sundays"
                              onChange={(e) => setConflicts(e.target.value)}
                              className="w-full rounded-none border border-zinc-800 bg-black p-3 font-sans text-xs text-white focus:border-zinc-500 focus:outline-none transition-colors"
                            />
                          </div>
                        </div>

                        <div className="pt-4 flex justify-between">
                          <button
                            type="button"
                            onClick={() => handlePrevTab('availability')}
                            className="px-4 py-2 font-mono text-xs border border-zinc-800 hover:border-zinc-500 transition-colors text-zinc-400 hover:text-white"
                          >
                            [ Back ]
                          </button>
                          <button
                            type="button"
                            onClick={() => handleNextTab('availability')}
                            className="group flex items-center gap-1.5 bg-white px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-black hover:bg-zinc-200 transition-colors"
                          >
                            <span>Next: Skills Matrix</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: SKILLS MATRIX */}
                    {activeTab === 'skills' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-4"
                      >
                        <div>
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">Section 03</span>
                            <span className="font-mono text-[10px] text-zinc-500 lg:hidden">[ 3 / 5 ]</span>
                          </div>
                          <h3 className="font-sans text-lg font-light text-white">Skills Matrix & Proof of Competence</h3>
                          <p className="font-sans text-xs text-zinc-400">Select what you can genuinely execute to high standards.</p>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="font-mono text-[10px] text-zinc-400 uppercase block mb-1">Select your specialties (Pick at least one):</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                              {([
                                { key: 'design', label: 'Design' },
                                { key: 'dev', label: 'Dev / Tech' },
                                { key: 'content', label: 'Content' },
                                { key: 'sales/outreach', label: 'Sales / Outreach' },
                                { key: 'ops/numbers', label: 'Ops / Numbers' }
                              ] as const).map((skill) => (
                                <button
                                  type="button"
                                  key={skill.key}
                                  onClick={() => toggleSkill(skill.key as SkillType)}
                                  className={`rounded-none border p-3 font-mono text-[10px] uppercase text-center tracking-wider transition-all ${
                                    selectedSkills.includes(skill.key as SkillType)
                                      ? 'bg-white border-white text-black font-semibold'
                                      : 'border-zinc-800 text-zinc-400 hover:border-zinc-700'
                                  }`}
                                >
                                  {selectedSkills.includes(skill.key as SkillType) && <Check className="h-3 w-3 inline mr-1 text-black shrink-0" />}
                                  {skill.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                              <label className="font-mono text-[10px] text-zinc-400 uppercase block">Proof of Past Work</label>
                              <span className="font-mono text-[9px] text-zinc-600">Links, repos, designs, posts, etc.</span>
                            </div>
                            <textarea
                              rows={4}
                              required
                              value={proofOfWork}
                              placeholder="Paste URLs to Google Drive, Figma drafts, Github repos, social posts, or describe your personal projects..."
                              onChange={(e) => setProofOfWork(e.target.value)}
                              className="w-full rounded-none border border-zinc-800 bg-black p-3 font-sans text-xs text-white focus:border-zinc-500 focus:outline-none transition-colors"
                            />
                          </div>

                          {/* File Drop area simulation */}
                          <div className="border border-dashed border-zinc-800 p-4 text-center bg-zinc-950/20">
                            <UploadCloud className="h-6 w-6 text-zinc-600 mx-auto mb-2" />
                            <span className="font-mono text-[10px] text-zinc-500 uppercase block">Simulate Screenshot/Resume Drop</span>
                            <span className="font-sans text-[10px] text-zinc-600 block mt-1">If you have file proof, describe or link it in the text area above.</span>
                          </div>
                        </div>

                        <div className="pt-4 flex justify-between">
                          <button
                            type="button"
                            onClick={() => handlePrevTab('skills')}
                            className="px-4 py-2 font-mono text-xs border border-zinc-800 hover:border-zinc-500 transition-colors text-zinc-400 hover:text-white"
                          >
                            [ Back ]
                          </button>
                          <button
                            type="button"
                            disabled={selectedSkills.length === 0}
                            onClick={() => handleNextTab('skills')}
                            className="group flex items-center gap-1.5 bg-white px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-black hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                          >
                            <span>Next: Screening</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 4: SCREENING QUESTIONS */}
                    {activeTab === 'screening' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-4"
                      >
                        <div>
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">Section 04</span>
                            <span className="font-mono text-[10px] text-zinc-500 lg:hidden">[ 4 / 5 ]</span>
                          </div>
                          <h3 className="font-sans text-lg font-light text-white">Algorithmic Screener</h3>
                          <p className="font-sans text-xs text-zinc-400">Strict structural filtering questions.</p>
                        </div>

                        <div className="space-y-4 h-[45vh] overflow-y-auto pr-2">
                          <div className="space-y-1.5">
                            <label className="font-sans text-xs font-medium text-white block">1. Why do you want to work with me, not just "make money"?</label>
                            <textarea
                              rows={2.5}
                              required
                              value={whyWork}
                              placeholder="Give me an organic reason showing you understand what we are building."
                              onChange={(e) => setWhyWork(e.target.value)}
                              className="w-full rounded-none border border-zinc-800 bg-black p-3 font-sans text-xs text-white focus:border-zinc-500 focus:outline-none transition-colors"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="font-sans text-xs font-medium text-white block">2. Describe a time you finished something hard without anyone pushing you.</label>
                            <textarea
                              rows={2.5}
                              required
                              value={finishHardThing}
                              placeholder="Show initiative. It could be learning an instrument, shipping a site, mastering a setup."
                              onChange={(e) => setFinishHardThing(e.target.value)}
                              className="w-full rounded-none border border-zinc-800 bg-black p-3 font-sans text-xs text-white focus:border-zinc-500 focus:outline-none transition-colors"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="font-sans text-xs font-medium text-white block">3. If I gave you a task with zero instructions, what's the first thing you'd do?</label>
                            <textarea
                              rows={2.5}
                              required
                              value={zeroInstructions}
                              placeholder="Walk me through your logical triage procedure."
                              onChange={(e) => setZeroInstructions(e.target.value)}
                              className="w-full rounded-none border border-zinc-800 bg-black p-3 font-sans text-xs text-white focus:border-zinc-500 focus:outline-none transition-colors"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div className="space-y-1.5 border border-zinc-800 p-3 bg-zinc-950/20">
                              <label className="font-sans text-xs font-semibold text-white block">Are you okay with pay/revenue split being fixed and non-negotiable?</label>
                              <div className="flex gap-4 mt-2">
                                <label className="flex items-center gap-2 cursor-pointer text-xs">
                                  <input
                                    type="radio"
                                    name="fixedPay"
                                    value="yes"
                                    checked={okayWithFixedPay === 'yes'}
                                    onChange={() => setOkayWithFixedPay('yes')}
                                    className="accent-white"
                                  />
                                  <span>Yes</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer text-xs">
                                  <input
                                    type="radio"
                                    name="fixedPay"
                                    value="no"
                                    checked={okayWithFixedPay === 'no'}
                                    onChange={() => setOkayWithFixedPay('no')}
                                    className="accent-white"
                                  />
                                  <span>No</span>
                                </label>
                              </div>
                            </div>

                            <div className="space-y-1.5 border border-zinc-800 p-3 bg-zinc-950/20">
                              <label className="font-sans text-xs font-semibold text-white block">Can you keep internal info confidential, even from friends?</label>
                              <div className="flex gap-4 mt-2">
                                <label className="flex items-center gap-2 cursor-pointer text-xs">
                                  <input
                                    type="radio"
                                    name="confidential"
                                    value="yes"
                                    checked={keepConfidential === 'yes'}
                                    onChange={() => setKeepConfidential('yes')}
                                    className="accent-white"
                                  />
                                  <span>Yes</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer text-xs">
                                  <input
                                    type="radio"
                                    name="confidential"
                                    value="no"
                                    checked={keepConfidential === 'no'}
                                    onChange={() => setKeepConfidential('no')}
                                    className="accent-white"
                                  />
                                  <span>No</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 flex justify-between">
                          <button
                            type="button"
                            onClick={() => handlePrevTab('screening')}
                            className="px-4 py-2 font-mono text-xs border border-zinc-800 hover:border-zinc-500 transition-colors text-zinc-400 hover:text-white"
                          >
                            [ Back ]
                          </button>
                          <button
                            type="button"
                            disabled={!whyWork || !finishHardThing || !zeroInstructions || !okayWithFixedPay || !keepConfidential}
                            onClick={() => handleNextTab('screening')}
                            className="group flex items-center gap-1.5 bg-white px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-black hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                          >
                            <span>Next: Practical Trial</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 5: TRIAL TASK */}
                    {activeTab === 'trial' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-4"
                      >
                        <div>
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">Section 05</span>
                            <span className="font-mono text-[10px] text-zinc-500 lg:hidden">[ 5 / 5 ]</span>
                          </div>
                          <h3 className="font-sans text-lg font-light text-white">Execution Trial Task</h3>
                          <p className="font-sans text-xs text-rose-400 font-semibold uppercase tracking-wider">
                            ★ This matters more than the interview answers
                          </p>
                        </div>

                        <div className="border border-zinc-800 bg-zinc-950/40 p-4 space-y-3">
                          <div className="flex items-center gap-2 font-mono text-xs text-white uppercase font-bold">
                            <FileText className="h-4 w-4 text-white shrink-0" />
                            <span>{trialTask.title}</span>
                          </div>
                          <p className="font-sans text-xs text-zinc-300 leading-relaxed">
                            {trialTask.instructions}
                          </p>
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-[10px] text-zinc-400 uppercase block">Submission Input / Link / Code Draft</label>
                          <textarea
                            rows={5}
                            required
                            value={trialSubmission}
                            placeholder={trialTask.placeholder}
                            onChange={(e) => setTrialSubmission(e.target.value)}
                            className="w-full rounded-none border border-zinc-800 bg-black p-3 font-mono text-xs text-white focus:border-zinc-500 focus:outline-none transition-colors"
                          />
                        </div>

                        {status === 'error' && (
                          <div className="p-3 border border-rose-950 bg-rose-950/20 text-rose-400 text-xs font-mono flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            <span>All fields must be fully completed to initiate connection protocol.</span>
                          </div>
                        )}

                        <div className="pt-4 flex justify-between">
                          <button
                            type="button"
                            onClick={() => handlePrevTab('trial')}
                            className="px-4 py-2 font-mono text-xs border border-zinc-800 hover:border-zinc-500 transition-colors text-zinc-400 hover:text-white"
                          >
                            [ Back ]
                          </button>
                          
                          <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="flex items-center justify-center gap-2 bg-white px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black hover:bg-zinc-200 transition-colors disabled:opacity-50"
                          >
                            {status === 'submitting' ? 'Transmitting application...' : 'Submit Partnership Application'}
                          </button>
                        </div>

                        <div className="pt-2 border-t border-zinc-900 text-center">
                          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                            Geph will get back as soon as possible
                          </span>
                        </div>
                      </motion.div>
                    )}

                  </form>
                )}
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
