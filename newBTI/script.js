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
    var openPopupButton = document.getElementById("openPopupButton");
    var popupContainer = document.getElementById("popupContainer");
    var closePopupButton = document.getElementById("closePopupButton");
    var overlay = document.createElement('div');
    overlay.className = 'overlay';

    // Функція відкриття popup
    function openPopup() {
        popupContainer.classList.add("active");
        overlay.classList.add("active");
        closePopupButton.classList.remove("hidden");
    }

    // Функція закриття popup
    function closePopup() {
        popupContainer.classList.remove("active");
        overlay.classList.remove("active");
        closePopupButton.classList.add("hidden");
    }

    // Додати слухач події для кнопки відкриття popup
    openPopupButton.addEventListener("click", openPopup);

    // Додати слухач події для кнопки закриття popup
    closePopupButton.addEventListener("click", closePopup);

    // Додати overlay до body
    document.body.appendChild(overlay);

    // Додати слухач події для закриття popup при кліці на overlay
    overlay.addEventListener("click", closePopup);
});
