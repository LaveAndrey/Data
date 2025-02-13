import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAo-ELIBWrABWbqlsynzARj1EhaGHD3jqo",
  authDomain: "datatest-1d44b.firebaseapp.com",
  databaseURL: "https://datatest-1d44b-default-rtdb.firebaseio.com",
  projectId: "datatest-1d44b",
  storageBucket: "datatest-1d44b.firebasestorage.app",
  messagingSenderId: "283214654661",
  appId: "1:283214654661:web:f2365882636c50c02e14ac"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Получаем элементы DOM
const clickButton = document.getElementById('clickButton');
const clickCountDisplay = document.getElementById('clickCount');

// Генерация уникального ID для пользователя
function generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
}

// Получаем userId из localStorage или создаем новый
let userId = localStorage.getItem('userId');
if (!userId) {
    userId = generateUserId();
    localStorage.setItem('userId', userId);
}

// Ссылка на данные пользователя в базе данных
const userRef = ref(database, 'users/' + userId);

// Загрузка данных при заходе на сайт
onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    if (data && data.clicks) {
        clickCountDisplay.textContent = data.clicks;
    } else {
        // Если данных нет, инициализируем нулевое значение
        clickCountDisplay.textContent = 0;
        set(userRef, { clicks: 0 });
    }
});

// Обработчик клика
clickButton.addEventListener('click', () => {
    let currentClicks = parseInt(clickCountDisplay.textContent);
    currentClicks += 1;
    clickCountDisplay.textContent = currentClicks;

    // Сохраняем клики в базу данных
    set(userRef, {
        clicks: currentClicks
    });
});