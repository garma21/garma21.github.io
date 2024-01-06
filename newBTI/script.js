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