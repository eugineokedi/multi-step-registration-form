document.addEventListener("DOMContentLoaded", () => {
    const formSteps = document.querySelectorAll(".form-step");
    const nextBtns = document.querySelectorAll(".next-btn");
    const prevBtns = document.querySelectorAll(".prev-btn");
    const progress = document.getElementById("progress");
    const stepIndicators = document.querySelectorAll(".step-indicator");
    const form = document.getElementById("multiStepForm");
  
    let currentStep = parseInt(localStorage.getItem("currentStep")) || 0;
  
    // Restore data from local storage
    formSteps.forEach((step, index) => {
      const inputs = step.querySelectorAll("input");
      inputs.forEach((input) => {
        const storedValue = localStorage.getItem(input.id);
        if (storedValue) input.value = storedValue;
      });
    });
  
    function updateProgressBar() {
      progress.style.width = `${(currentStep / (formSteps.length - 1)) * 100}%`;
      stepIndicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index <= currentStep);
      });
    }
  
    function showStep(step) {
      formSteps.forEach((stepElement, index) => {
        stepElement.classList.toggle("active", index === step);
      });
      updateProgressBar();
    }
  
    nextBtns.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        if (validateStep(index)) {
          currentStep++;
          showStep(currentStep);
          saveDataToLocalStorage();
        }
      });
    });
  
    prevBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        currentStep--;
        showStep(currentStep);
      });
    });
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("Form Submitted Successfully!");
      localStorage.clear();
      form.reset();
      currentStep = 0;
      showStep(currentStep);
    });
  
    function validateStep(step) {
      const inputs = formSteps[step].querySelectorAll("input");
      let isValid = true;
  
      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = "red";
        } else {
          input.style.borderColor = "#ddd";
        }
      });
  
      return isValid;
    }
  
    function saveDataToLocalStorage() {
      const activeStepInputs = formSteps[currentStep].querySelectorAll("input");
      activeStepInputs.forEach((input) => {
        localStorage.setItem(input.id, input.value);
      });
      localStorage.setItem("currentStep", currentStep);
    }
  
    showStep(currentStep);
  });
  