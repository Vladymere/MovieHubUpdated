<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user_auth";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE email  = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['email'] = $user['email'];
            header("Location: Dashboard.html");
            exit();
        } else {
            $_SESSION['error'] = "Invalid email or password.";
            header("Location: IT Elective.html");
            exit();
        }
    } else {
        $_SESSION['error'] = "Invalid email or password.";
        header("Location: IT Elective.html");
        exit();
    }

    $stmt->close();
}

$conn->close();
?>