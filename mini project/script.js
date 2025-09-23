// ----------------------
// THEME TOGGLE FEATURE
// ----------------------
window.onload = () => {
    const toggleBtn = document.getElementById("theme-toggle");

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");

            // Change button text dynamically
            if (document.body.classList.contains("light-mode")) {
                toggleBtn.textContent = "🌑 Dark Mode";
            } else {
                toggleBtn.textContent = "🌙 Light Mode";
            }
        });
    }

    // Fade-in animation on page load
    document.body.style.opacity = 0;
    setTimeout(() => {
        document.body.style.transition = "opacity 0.8s ease-in";
        document.body.style.opacity = 1;
    }, 50);

    // Run quiz unlock check if we are on index.html
    if (window.location.pathname.includes("index.html") || window.location.pathname.endsWith("/")) {
        checkLessonsAndUnlockQuiz();
    }

    // Mark current lesson as visited if we're on a lesson page
    if (window.location.pathname.includes("html-lesson.html")) {
        localStorage.setItem("lessonHTML", "true");
    }
    if (window.location.pathname.includes("css-lesson.html")) {
        localStorage.setItem("lessonCSS", "true");
    }
    if (window.location.pathname.includes("js-lesson.html")) {
        localStorage.setItem("lessonJS", "true");
    }

    // Quiz page form handling
    if (document.getElementById("quiz-form")) {
        document.getElementById("quiz-form").addEventListener("submit", handleQuizSubmit);
    }
};

// ----------------------
// LESSON PROGRESS + QUIZ UNLOCK
// ----------------------
function checkLessonsAndUnlockQuiz() {
    const htmlDone = localStorage.getItem("lessonHTML") === "true";
    const cssDone = localStorage.getItem("lessonCSS") === "true";
    const jsDone = localStorage.getItem("lessonJS") === "true";

    const quizLink = document.getElementById("quiz-link");
    if (!quizLink) return;

    if (htmlDone && cssDone && jsDone) {
        quizLink.classList.remove("disabled");
        quizLink.textContent = "✅ Final Quiz";
    }
}

// ----------------------
// QUIZ HANDLING
// ----------------------
function handleQuizSubmit(event) {
    event.preventDefault();

    const answers = {
        q1: "B", // <h1>
        q2: "B", // color
        q3: "A"  // alert()
    };

    let score = 0;
    for (let q in answers) {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        if (selected && selected.value === answers[q]) {
            score++;
        }
    }

    const result = document.getElementById("quiz-result");
    if (result) {
        result.style.fontWeight = "bold";
        result.style.marginTop = "20px";
        if (score === 3) {
            result.textContent = `🎉 Perfect! You scored ${score}/3.`;
            result.style.color = "limegreen";
        } else {
            result.textContent = `You scored ${score}/3. Try reviewing the lessons again!`;
            result.style.color = "orange";
        }
    }
}
