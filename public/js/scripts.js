/**
 * FAQ toggle functionality
 *
 * This script enables the accordion-style toggle effect for FAQ questions.
 * When a user clicks on a question, the corresponding answer is revealed
 * or hidden. The answer's max-height is dynamically adjusted based on its
 * scroll height to allow smooth transitions.
 *
 * @function
 */
document.addEventListener("DOMContentLoaded", function () {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      question.classList.toggle("active");
      const answer = question.nextElementSibling;
      if (question.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
    });
  });
});
