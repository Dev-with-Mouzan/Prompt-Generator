import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Segmented } from './Segmented.jsx';
import { TextInput, AdvancedAccordion, PrimaryButton } from './ui.jsx';

const TASK_OPTIONS = [
  { value: 'Assignment', label: 'Assignment' },
  { value: 'Report', label: 'Report' },
  { value: 'Presentation', label: 'Presentation' },
  { value: 'Viva Preparation', label: 'Viva Prep' },
  { value: 'Coding Project', label: 'Coding' }
];

const LEVEL_OPTIONS = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' }
];

const POLICY_OPTIONS = [
  { value: 'Explain only', label: 'Explain only' },
  { value: 'Step-by-step', label: 'Step-by-step' },
  { value: 'No direct answers', label: 'No direct answers' }
];

export function Composer({ onGenerate, busy }) {
  const [subject, setSubject] = useState('');
  const [taskType, setTaskType] = useState('');
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('');
  const [aiPolicy, setAiPolicy] = useState('');
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [wordCount, setWordCount] = useState('');
  const [format, setFormat] = useState('');
  const [tone, setTone] = useState('Academic');
  const [citationStyle, setCitationStyle] = useState('');
  const [teacherRules, setTeacherRules] = useState('');

  const canSubmit = useMemo(
    () => subject.trim() && taskType && topic.trim() && level && aiPolicy,
    [subject, taskType, topic, level, aiPolicy]
  );

  const setters = {
    subject: setSubject,
    task_type: setTaskType,
    topic: setTopic,
    level: setLevel,
    ai_usage_policy: setAiPolicy,
    word_count: setWordCount,
    format: setFormat,
    tone: setTone,
    citation_style: setCitationStyle,
    teacher_rules: setTeacherRules
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit || busy) return;
    onGenerate({
      subject,
      task_type: taskType,
      topic,
      level,
      ai_usage_policy: aiPolicy,
      teacher_rules: teacherRules || 'None',
      word_count: wordCount || 'Not specified',
      format: format || 'Not specified',
      tone: tone || 'Academic',
      citation_style: citationStyle || 'None'
    });
  }

  function handleAdvanced(setter) {
    return (v) => setters[setter](v);
  }

  return (
    <motion.section
      className="card composer"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="card-head">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <h2 className="card-title">
            Compose
            <motion.em
              className="card-title-accent"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              your prompt
            </motion.em>
          </h2>
        </motion.div>
      </div>

      <form onSubmit={handleSubmit} noValidate={false}>
        <div className="composer-fields">
          <TextInput
            id="subject"
            label="Subject"
            hint="The discipline the prompt lives in"
            placeholder="e.g. Computer Science"
            value={subject}
            onChange={setSubject}
            required
          />

          <Segmented
            id="task_type"
            label="Task Type"
            hint="What the AI is being asked to produce"
            options={TASK_OPTIONS}
            value={taskType}
            onChange={setTaskType}
          />

          <TextInput
            id="topic"
            label="Topic / Question"
            hint="The specific thing you want covered"
            placeholder="What should the AI help you with?"
            value={topic}
            onChange={setTopic}
            required
          />

          <Segmented
            id="level"
            label="Difficulty Level"
            hint="Calibrate depth and prior knowledge"
            options={LEVEL_OPTIONS}
            value={level}
            onChange={setLevel}
          />

          <Segmented
            id="ai_usage_policy"
            label="AI Usage Policy"
            hint="How the AI is allowed to respond"
            options={POLICY_OPTIONS}
            value={aiPolicy}
            onChange={setAiPolicy}
          />

          <div className="field">
            <div className="field-head">
              <span className="field-label">Constraints</span>
            </div>
            <AdvancedAccordion
              open={advancedOpen}
              onToggle={() => setAdvancedOpen((v) => !v)}
              badge={
                advancedOpen
                  ? null
                  : String(
                      [wordCount, format, citationStyle, teacherRules.trim()].filter(Boolean).length +
                        (tone !== 'Academic' ? 1 : 0)
                    ) +
                    ' SET'
              }
            >
              <TextInput
                id="word_count"
                label="Word Count"
                placeholder="e.g. 500-800"
                value={wordCount}
                onChange={handleAdvanced('word_count')}
              />
              <TextInput
                id="format"
                label="Format"
                placeholder="e.g. Essay, Outline"
                value={format}
                onChange={handleAdvanced('format')}
              />
              <TextInput
                id="tone"
                label="Tone"
                placeholder="e.g. Academic"
                value={tone}
                onChange={handleAdvanced('tone')}
              />
              <TextInput
                id="citation_style"
                label="Citation Style"
                placeholder="e.g. APA, MLA"
                value={citationStyle}
                onChange={handleAdvanced('citation_style')}
              />
              <div className="field field--span">
                <div className="field-head">
                  <label className="field-label" htmlFor="teacher_rules">
                    Teacher Constraints
                  </label>
                </div>
                <textarea
                  id="teacher_rules"
                  className="input textarea"
                  rows={2}
                  placeholder="Any additional rules…"
                  value={teacherRules}
                  onChange={(e) => handleAdvanced('teacher_rules')(e.target.value)}
                />
              </div>
            </AdvancedAccordion>
          </div>
        </div>

        <div className="composer-foot">
          <PrimaryButton loading={busy} disabled={!canSubmit}>
            Generate prompt
          </PrimaryButton>
        </div>
      </form>
    </motion.section>
  );
}