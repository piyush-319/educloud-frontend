import { useState } from "react";
import "./ExtraCourseLesson.css";

export default function ExtraCourseLesson({
  lesson,
  courseId,
  completed,
  onComplete,
  isLastLesson,
}) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!lesson) return null;

  const examples = Array.isArray(lesson.examples)
    ? lesson.examples
    : Array.isArray(lesson.example)
      ? lesson.example
      : [];

  const quiz = Array.isArray(lesson.quiz) ? lesson.quiz : [];
  const score = quiz.reduce(
    (total, question, index) =>
      total + (answers[index] === question.answer ? 1 : 0),
    0
  );
  const passed = submitted && quiz.length > 0 && score >= Math.ceil(quiz.length * 0.8);
  const overview = lesson.overview || lesson.content || "";
  const courseName = courseId === 2 ? "LINUX & DEVOPS" : "PYTHON PROGRAMMING";
  const linuxIcons = ["🐧", "📁", "👥", "🌐", "⌨️", "🌿", "🐳", "🔄"];
  const icon = lesson.icon || (courseId === 2 ? linuxIcons[(Number(lesson.lesson_order) || 1) - 1] || "🐧" : "🐍");

  function submitQuiz(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  function retryQuiz() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <div className="extra-lesson-page">
      <section className={`extra-lesson-hero extra-lesson-hero-course-${courseId} extra-lesson-hero-lesson-${lesson.lesson_order}`}>
        <div className="extra-lesson-hero-icon">{icon}</div>
        <div>
          <span className="extra-lesson-kicker">{courseName} · LESSON {lesson.lesson_order}</span>
          <h4>{lesson.title}</h4>
          <p>{overview}</p>
          <div className="extra-lesson-tags">
            <span>📘 Practical learning</span>
            <span>⏱ {lesson.duration || "15–20 min"}</span>
            <span>❓ {quiz.length} quiz questions</span>
          </div>
        </div>
      </section>

      {Array.isArray(lesson.concepts) && lesson.concepts.length > 0 && (
        <section className="extra-lesson-section">
          <div className="extra-lesson-section-label">🧠 CORE CONCEPTS</div>
          <div className="extra-lesson-concepts">
            {lesson.concepts.map((concept, index) => (
              <article className="extra-lesson-concept" key={`${concept.title}-${index}`}>
                <span className="extra-lesson-concept-number">{String(index + 1).padStart(2, "0")}</span>
                <h5>{concept.title}</h5>
                <p>{concept.detail}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {examples.length > 0 && (
        <section className="extra-lesson-section">
          <div className="extra-lesson-section-label">💻 EXAMPLES TO TRY</div>
          <div className="extra-lesson-examples">
            {examples.map((example, index) => (
              <article className="extra-lesson-example" key={`${example.command || "example"}-${index}`}>
                <div className="extra-lesson-example-heading">
                  <span>EXAMPLE {index + 1}</span>
                  <span>▶</span>
                </div>
                <pre><code>{example.command || example.code || ""}</code></pre>
                {example.output && (
                  <div className="extra-lesson-output">
                    <span>EXPECTED OUTPUT</span>
                    <pre>{example.output}</pre>
                  </div>
                )}
                {example.explanation && <p>{example.explanation}</p>}
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="extra-lesson-mission">
        <div className="extra-lesson-section-label">🚀 YOUR HANDS-ON MISSION</div>
        <p>{lesson.mission}</p>
        {lesson.expectedOutput && (
          <div className="extra-lesson-expected">
            <strong>What to expect</strong>
            <p>{lesson.expectedOutput}</p>
          </div>
        )}
      </section>

      {quiz.length > 0 && (
        <section className="extra-lesson-section" id="extra-lesson-quiz">
          <div className="extra-lesson-section-label">🎯 KNOWLEDGE CHECK</div>
          <p className="extra-lesson-muted">Answer every question. You need at least 80% to pass.</p>
          <form onSubmit={submitQuiz} className="extra-lesson-quiz">
            {quiz.map((question, questionIndex) => (
              <fieldset className="extra-lesson-question" key={`${question.question}-${questionIndex}`}>
                <legend>{questionIndex + 1}. {question.question}</legend>
                <div className="extra-lesson-options">
                  {question.options.map((option, optionIndex) => {
                    const isCorrect = optionIndex === question.answer;
                    const isSelected = answers[questionIndex] === optionIndex;
                    const resultClass = submitted
                      ? isCorrect
                        ? " is-correct"
                        : isSelected
                          ? " is-incorrect"
                          : ""
                      : "";

                    return (
                      <label
                        className={`extra-lesson-option${isSelected ? " is-selected" : ""}${resultClass}`}
                        key={`${option}-${optionIndex}`}
                      >
                        <input
                          type="radio"
                          name={`extra-question-${questionIndex}`}
                          value={optionIndex}
                          checked={isSelected}
                          disabled={submitted}
                          onChange={() =>
                            setAnswers((previous) => ({
                              ...previous,
                              [questionIndex]: optionIndex,
                            }))
                          }
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>
                {submitted && (
                  <p className="extra-lesson-explanation">
                    {question.explanation || (answers[questionIndex] === question.answer ? "Correct answer." : "Review the correct option above.")}
                  </p>
                )}
              </fieldset>
            ))}

            {!submitted ? (
              <button className="btn btn-primary" type="submit" disabled={Object.keys(answers).length !== quiz.length}>
                Submit quiz →
              </button>
            ) : (
              <div className={`extra-lesson-result${passed ? " is-passed" : " is-failed"}`} role="status">
                <strong>{passed ? "🎉 Quiz passed!" : "Keep practising"}</strong>
                <p>You scored {score}/{quiz.length}. {passed ? "You can now complete this lesson." : "Review the explanations and try again."}</p>
                {!passed && (
                  <button className="btn btn-primary" type="button" onClick={retryQuiz}>
                    Try again
                  </button>
                )}
              </div>
            )}
          </form>
        </section>
      )}

      {Array.isArray(lesson.takeaways) && lesson.takeaways.length > 0 && (
        <section className="extra-lesson-section">
          <div className="extra-lesson-section-label">🏆 KEY TAKEAWAYS</div>
          <div className="extra-lesson-takeaways">
            {lesson.takeaways.map((takeaway, index) => (
              <div key={`${takeaway}-${index}`}>✓ {takeaway}</div>
            ))}
          </div>
        </section>
      )}

      {lesson.nextMission && (
        <section className="extra-lesson-next">
          <strong>UP NEXT: KEEP PRACTISING</strong>
          <p>{lesson.nextMission}</p>
        </section>
      )}

      <div className="extra-lesson-completion">
        {completed ? (
          <p className="extra-lesson-completed">✓ This lesson is completed.</p>
        ) : (
          <button
            className="btn btn-primary"
            type="button"
            disabled={!passed}
            onClick={() => { if (passed) onComplete(); }}
          >
            {isLastLesson ? "Complete Course ✓" : "Complete & Next →"}
          </button>
        )}
        {!passed && !completed && (
          <p className="extra-lesson-muted">Pass the quiz to unlock lesson completion.</p>
        )}
      </div>
    </div>
  );
}
