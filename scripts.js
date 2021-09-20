"use strict"

check_theme();

function send_data(event) {
  event.preventDefault();

  let user_name = document.getElementById("input_name").value;
  let user_password = document.getElementById("input_password").value;
  let user_password_repeat = document.getElementById("input_password_repeat").value;
  let user_email = document.getElementById("input_email").value;

  // Проверка на совпадения введённых паролей.
  if (user_password != user_password_repeat) {
    alert("Ошибка клиента: пароли должны совпадать!");
  } else {
    let user_data = {
      name: user_name,
      password: user_password,
      email: user_email
    }
  
    //console.log(user_data);
    //console.log(JSON.stringify(user_data));
  
    // Обращение на сервер с которого была загружена страница. К обработчику register
    // Отлажено для собственного сервера запущенного на localhost
    fetch("/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      // отправляем объект упакованный в JSON
      body: JSON.stringify(user_data)
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log(data);
        // Анализ ответа сервера.
        // При успешной обработки данных редирект на страницу с сообщением об успехе.
        // Иначе сообщение об ошибке
        if (data.status == "success") {
          window.location.href = "./success.html";
  
        }
        else {
          alert("Ошибка сервера!");
        }
      })
      .catch(e => {
        // Перехват ошибки. Если страница открыта с локального диска срабатывает всегда.
        alert("Ошибка сервера: сервер недоступен.")
      })
  }

  //return false;
}

// Сменяет цветовую схему на проивоположную.
function swap_theme() {
  if (localStorage.getItem("color-theme") == "dark") {
    // Если была тёмная, стваим светлую.
    localStorage.setItem("color-theme", "light");
    document.body.classList.remove('dark-theme');
    document.getElementById("dark_theme_button").innerText = "Тёмная тема";
  } else {
    // Если была светлая, стваим тёмную.
    localStorage.setItem("color-theme", "dark");
    document.body.classList.toggle('dark-theme');
    document.getElementById("dark_theme_button").innerText = "Светлая тема";
  }
}

// Для сохранения темы после обновления страницы.
function check_theme() {
  // Если цвет ещё не переключали. То ставим светлую тему.
  if (localStorage.getItem("color-theme") === null) {
    // Добавляем переменную.
    localStorage.setItem("color-theme", "light");
    // Переимпеновываем кнопку.
    document.getElementById("dark_theme_button").innerText = "Тёмная тема";
  } else {
    if (localStorage.getItem("color-theme") == "dark") {
      // Если стояла тёмная, ставим тёмную.
      localStorage.setItem("color-theme", "dark");
      document.body.classList.add('dark-theme');
      document.getElementById("dark_theme_button").innerText = "Светлая тема";
    }
    else {
      // Если стояла светлая, ставим светлую.
      localStorage.setItem("color-theme", "light");
      document.getElementById("dark_theme_button").innerText = "Тёмная тема";
    }
  }
}