<?php
if (isset($_SERVER["REQUEST_METHOD"]) && $_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $description = htmlspecialchars($_POST["description"]);
    $material = htmlspecialchars($_POST["material"]);
    $quantity = htmlspecialchars($_POST["quantity"]);

    $to = "kiler3178@gmail.com";
    $subject = "Нове замовлення на 3D-друк";
    $message = "
    Ім'я: $name\n
    Електронна пошта: $email\n
    Телефон: $phone\n
    Матеріал: $material\n
    Кількість: $quantity\n
    Опис: $description\n
    ";

    $headers = "From: $email";

    if (mail($to, $subject, $message, $headers)) {
        echo "Замовлення успішно надіслано!";
    } else {
        echo "Сталася помилка під час відправки.";
    }
} else {
    echo "Доступ заборонено: форма має бути надіслана через POST-запит.";
}
