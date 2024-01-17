document.addEventListener("DOMContentLoaded", function () {
    var blackSquares = document.querySelectorAll('.blackSquare');

    blackSquares.forEach(function (square, index) {
        square.addEventListener('click', function () {
            var targetId = square.getAttribute('data-target');
            var expandableBlock = document.getElementById(targetId);

            // Перевірка, чи перехрестя вже обернуте на 45 градусів
            var isRotated = square.classList.contains('rotate45');

            if (expandableBlock.style.display === 'none') {
                expandableBlock.style.display = 'block';
                expandableBlock.classList.remove('hidden');
            } else {
                expandableBlock.classList.add('reverseSlideUp');

                setTimeout(function () {
                    expandableBlock.style.display = 'none';
                    expandableBlock.classList.remove('reverseSlideUp');
                }, 500);
            }

            // Додано логіку обертання на 45 градусів
            if (!isRotated) {
                square.classList.add('rotate45');
            } else {
                square.classList.remove('rotate45');
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Додати слухач події для кожної кнопки відкриття popup
    var openPopupButtons = document.querySelectorAll(".openPopupButton");
    openPopupButtons.forEach(function (button, index) {
        var popupContainer = document.getElementById("popupContainer" + (index + 1));
        var closePopupButton = document.getElementById("closePopupButton" + (index + 1));

        button.addEventListener("click", function (event) {
            event.preventDefault();
            openPopup(popupContainer, closePopupButton);
        });

        closePopupButton.addEventListener("click", function (event) {
            event.preventDefault();
            closePopup(popupContainer, closePopupButton);
        });
    });

    function openPopup(popupContainer, closePopupButton) {
        popupContainer.classList.add("active");
        popupContainer.classList.remove("hidden");
        overlay.classList.add("active");
        closePopupButton.classList.remove("hidden");
    }

    function closePopup(popupContainer, closePopupButton) {
        popupContainer.classList.remove("active");
        popupContainer.classList.add("hidden");
        overlay.classList.remove("active");
        closePopupButton.classList.add("hidden");
        closePopupButton.classList.remove("active");
    }
});
// testing
document.addEventListener("DOMContentLoaded", function () {
    var openPopupButtons = document.querySelectorAll(".openPopupButton");
    var overlay = document.getElementById("overlay");

    openPopupButtons.forEach(function (button, index) {
        var popupContainer = document.getElementById("popupContainerBlock" + (index + 1));
        var closePopupButton = document.getElementById("closePopupButtonBlock" + (index + 1));

        button.addEventListener("click", function (event) {
            event.preventDefault();
            openPopup(popupContainer, closePopupButton);
        });

        closePopupButton.addEventListener("click", function (event) {
            event.preventDefault();
            closePopup(popupContainer, closePopupButton);
        });
    });

    function openPopup(popupContainer, closePopupButton) {
        popupContainer.classList.add("active");
        overlay.classList.add("active");
        closePopupButton.classList.remove("hidden");
    }

    function closePopup(popupContainer, closePopupButton) {
        popupContainer.classList.remove("active");
        overlay.classList.remove("active");
        closePopupButton.classList.add("hidden");
        closePopupButton.classList.remove("active");
    }
});
// code slider
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;
    let currentIndex = 0;

    function showSlide(index) {
        if (index < 0) {
            currentIndex = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        const translateValue = -currentIndex * 100 + "%";
        slider.style.transform = "translateX(" + translateValue + ")";
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") {
            prevSlide();
        } else if (event.key === "ArrowRight") {
            nextSlide();
        }
    });

    slides.forEach(function (slide, index) {
        slide.addEventListener("click", function () {
            showSlide(index);
        });
    });

    setInterval(nextSlide, 5000); // автоматичне прокручування кожні 5 секунд
});
