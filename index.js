function showTab(tabId) {
  document.querySelectorAll(".tab-content").forEach((section) => {
    section.classList.remove("active");
  });

  document.getElementById(tabId).classList.add("active");

  // Initialize the appropriate game if it's not loaded yet
  if (tabId === "mcq" && !document.getElementById("mcq-app").hasChildNodes()) {
    initializeReactApp();
  } else if (
    tabId === "wordgame2" &&
    !document.getElementById("scramble-container").hasChildNodes()
  ) {
    initializeWordJumble();
  } else if (tabId === "wordgame3") {
    document.getElementById("wordsearch-frame").src = "./Nw/index.html";
  }
}

function initializeReactApp() {
  const TamilQuizApp = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [score, setScore] = React.useState(0);
    const [level, setLevel] = React.useState(1);
    const [isQuizOver, setIsQuizOver] = React.useState(false);

    const levels = {
      1: { questions: 3, points: 1 },
      2: { questions: 3, points: 2 },
      3: { questions: 4, points: 3 },
    };

    const questions = [
      {
        prompt: "year",
        tamil: "வருடம்",
        options: [
          { label: "காலம்", isCorrect: false },
          { label: "வருடம்", isCorrect: true },
          { label: "அருவி", isCorrect: false },
        ],
      },
      {
        prompt: "sun",
        tamil: "சூரியன்",
        options: [
          { label: "சூரியன்", isCorrect: true },
          { label: "நிலா", isCorrect: false },
          { label: "வானம்", isCorrect: false },
        ],
      },
      {
        prompt: "water",
        tamil: "நீர்",
        options: [
          { label: "மரம்", isCorrect: false },
          { label: "மலர்", isCorrect: false },
          { label: "நீர்", isCorrect: true },
        ],
      },
      {
        prompt: "moon",
        tamil: "நிலா",
        options: [
          { label: "நதி", isCorrect: false },
          { label: "நிலா", isCorrect: true },
          { label: "மரம்", isCorrect: false },
        ],
      },
      {
        prompt: "star",
        tamil: "நட்சத்திரம்",
        options: [
          { label: "விண்மீன்", isCorrect: false },
          { label: "நட்சத்திரம்", isCorrect: true },
          { label: "வானம்", isCorrect: false },
        ],
      },
      {
        prompt: "earth",
        tamil: "பூமி",
        options: [
          { label: "நிலா", isCorrect: false },
          { label: "வெயில்", isCorrect: false },
          { label: "பூமி", isCorrect: true },
        ],
      },
      {
        prompt: "sky",
        tamil: "வானம்",
        options: [
          { label: "கடல்", isCorrect: false },
          { label: "நதி", isCorrect: false },
          { label: "வானம்", isCorrect: true },
        ],
      },
      {
        prompt: "forest",
        tamil: "காடு",
        options: [
          { label: "பூமி", isCorrect: false },
          { label: "வானம்", isCorrect: false },
          { label: "காடு", isCorrect: true },
        ],
      },
      {
        prompt: "fire",
        tamil: "அக்னி",
        options: [
          { label: "அக்னி", isCorrect: true },
          { label: "நதி", isCorrect: false },
          { label: "வெள்ளம்", isCorrect: false },
        ],
      },
      {
        prompt: "book",
        tamil: "புத்தகம்",
        options: [
          { label: "புத்தகம்", isCorrect: true },
          { label: "கோப்பை", isCorrect: false },
          { label: "கைப்பு", isCorrect: false },
        ],
      },
      {
        prompt: "apple",
        tamil: "ஆப்பிள்",
        options: [
          { label: "ஆப்பிள்", isCorrect: true },
          { label: "நர்ஸ்", isCorrect: false },
          { label: "மாம்பழம்", isCorrect: false },
        ],
      },
      {
        prompt: "teacher",
        tamil: "ஆசிரியர்",
        options: [
          { label: "ஆசிரியர்", isCorrect: true },
          { label: "மாணவர்", isCorrect: false },
          { label: "கல்வி", isCorrect: false },
        ],
      },
    ];

    const levelStartIndex = { 1: 0, 2: 3, 3: 6 };

    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

    const currentLevelQuestions = questions.slice(
      levelStartIndex[level],
      levelStartIndex[level] + levels[level].questions
    );

    const handleOptionClick = (option) => {
      if (option.isCorrect)
        setScore((prevScore) => prevScore + levels[level].points);

      if (currentQuestionIndex < currentLevelQuestions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else if (level < 3) {
        setLevel((prevLevel) => prevLevel + 1);
        setCurrentQuestionIndex(0);
      } else {
        setIsQuizOver(true);
      }
    };

    const resetQuiz = () => {
      setScore(0);
      setLevel(1);
      setCurrentQuestionIndex(0);
      setIsQuizOver(false);
    };

    if (isQuizOver) {
      return React.createElement(
        "div",
        { className: "quiz-summary" },
        React.createElement("h2", {}, "பதிவு முடிந்தது!"),
        React.createElement("p", {}, `மொத்த புள்ளிகள்: ${score}`),
        React.createElement("button", { onClick: resetQuiz }, "மீட்டமை")
      );
    }

    const currentQuestion = currentLevelQuestions[currentQuestionIndex];
    const shuffledOptions = shuffleArray([...currentQuestion.options]);

    return React.createElement(
      "div",
      { className: "tamil-quiz" },
      React.createElement("h2", {}, `தமிழ் புலக்கி விளையாட்டு`),
      React.createElement("p", {}, `புள்ளிகள்: ${score}`),
      React.createElement("p", {}, `அடைவு: ${level}`),
      React.createElement(
        "h3",
        {},
        `Translate to Tamil: "${currentQuestion.prompt}"`
      ),
      React.createElement(
        "ul",
        { className: "options" },
        shuffledOptions.map((option, index) =>
          React.createElement(
            "li",
            {
              key: index,
              onClick: () => handleOptionClick(option),
              style: { cursor: "pointer", listStyle: "none" },
            },
            React.createElement("input", {
              type: "checkbox",
              checked: false,
              readOnly: true,
            }),
            ` ${option.label}`
          )
        )
      )
    );
  };

  ReactDOM.render(
    React.createElement(TamilQuizApp, null),
    document.getElementById("mcq-app")
  );
}


// Initialize the word search when the page loads
window.onload = () => {
  initializeWordSearch();
};
// Initialize the first tab
document.addEventListener("DOMContentLoaded", function () {
  showTab("mcq");
});
