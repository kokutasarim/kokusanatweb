<?php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $isim = $_POST['isim'];
    $email = $_POST['email'];
    $mesaj = $_POST['mesaj'];

    $to = "kokutasarim@gmail.com";
    $subject = "İletişim Formu Mesajı";
    $body = "İsim: $isim\nEmail: $email\nMesaj:\n$mesaj";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Mesajınız gönderildi. Teşekkürler!";
    } else {
        echo "Mesaj gönderilemedi. Lütfen tekrar deneyin.";
    }
}
?>