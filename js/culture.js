// 主彈窗處理
const stickers = document.querySelectorAll('.culture-stickers img');
const popup = document.getElementById('culture-popup');
const popupImg = document.querySelector('.culture-popup-img');
const popupClose = document.querySelector('.culture-popup-close');

// 回到頂部按鈕與其他相關元素
const backToTopButton = document.getElementById("backToTop");
const carousel = document.getElementById("carousel");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const carouselItems = document.querySelectorAll('.carousel-item');

// 滾動相關變數
let scrollAmount = 0;
let itemWidth = getItemWidth();
let autoScrollInterval;
let isPaused = false;

// 註冊貼紙點擊事件（主彈窗處理）
stickers.forEach((sticker) => {
    sticker.addEventListener('click', () => {
        const fullImgSrc = sticker.getAttribute('data-full');
        popupImg.src = fullImgSrc;
        popup.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        hideBackToTop();
    });
});

// 主彈窗關閉處理
popupClose.addEventListener('click', () => {
    popup.classList.add('hidden');
    popupImg.src = '';
    document.body.style.overflow = '';
    showBackToTop();
});

popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.classList.add('hidden');
        popupImg.src = '';
        document.body.style.overflow = '';
        showBackToTop();
    }
});

// 隱藏與顯示回到頂部按鈕
function hideBackToTop() {
    backToTopButton.style.visibility = 'hidden';
    backToTopButton.style.opacity = '0';
    backToTopButton.style.transition = 'opacity 0.3s ease';
}

function showBackToTop() {
    backToTopButton.style.visibility = 'visible';
    backToTopButton.style.opacity = '1';
    backToTopButton.style.transition = 'opacity 0.3s ease';
}

// 計算輪播項目寬度
function getItemWidth() {
    const carouselItem = carousel.querySelector('.carousel-item');
    const carouselStyle = window.getComputedStyle(carousel);
    const gap = parseInt(carouselStyle.gap) || 0;
    return carouselItem.offsetWidth + gap;
}

// 自動滾動控制
function startAutoScroll() {
    stopAutoScroll();
    autoScrollInterval = setInterval(() => {
        if (!isPaused) {
            moveRight();
        }
    }, 3000);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// 輪播向右滾動
function moveRight() {
    scrollAmount += itemWidth;

    if (scrollAmount >= carousel.scrollWidth - carousel.offsetWidth) {
        scrollAmount = carousel.scrollWidth - carousel.offsetWidth;
        carousel.style.transform = `translateX(-${scrollAmount}px)`;
        carousel.style.transition = "transform 0.3s ease-in-out";

        setTimeout(() => {
            scrollAmount = 0;
            carousel.style.transform = `translateX(0px)`;
            carousel.style.transition = "transform 0.3s ease-in-out";
        }, 2000);
    } else {
        carousel.style.transform = `translateX(-${scrollAmount}px)`;
        carousel.style.transition = "transform 0.3s ease-in-out";
    }
}

// 輪播向左滾動
function moveLeft() {
    scrollAmount -= itemWidth;
    if (scrollAmount < 0) {
        scrollAmount = carousel.scrollWidth - carousel.offsetWidth;
    }
    carousel.style.transform = `translateX(-${scrollAmount}px)`;
    carousel.style.transition = "transform 0.3s ease-in-out";
}

// 註冊輪播按鈕事件
leftBtn.addEventListener("click", () => {
    if (!isPaused) moveLeft();
});
rightBtn.addEventListener("click", () => {
    if (!isPaused) moveRight();
});

// 滑鼠進出輪播區域時停止與啟動自動滾動
carousel.addEventListener("mouseenter", stopAutoScroll);
carousel.addEventListener("mouseleave", () => {
    if (!isPaused) startAutoScroll();
});

// 點擊輪播項目開啟特定彈窗
carouselItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        const popupId = `culture-popup-${index + 1}`;
        const popup = document.getElementById(popupId);

        if (popup) {
            popup.classList.remove("hidden1");
            stopAutoScroll();
            isPaused = true;
            document.body.style.overflow = 'hidden';
            hideBackToTop();

            const closeBtn = popup.querySelector('.culture-popup1-close');
            closeBtn.addEventListener("click", () => closePopup(popup));
            popup.addEventListener("click", (e) => {
                if (e.target === popup) closePopup(popup);
            });
        }
    });
});

// 關閉彈窗處理
function closePopup(popup) {
    popup.classList.add("hidden1");
    isPaused = false;
    startAutoScroll();
    document.body.style.overflow = '';
    showBackToTop();
    carousel.style.transition = "transform 0.3s ease-in-out";
}

// 彈窗切換與控制邏輯
const popups = document.querySelectorAll('.culture-popup1');
let currentPopupIndex = 0;

function updatePopup(index) {
    popups.forEach((popup, i) => {
        if (i === index) {
            popup.classList.remove('hidden1');
        } else {
            popup.classList.add('hidden1');
        }
    });
    document.body.style.overflow = 'hidden';
}

popups.forEach((popup) => {
    popup.addEventListener('click', (e) => {
        if (e.target === popup) closePopup(popup);
    });
});

document.querySelectorAll('.culture-popup-prev').forEach((btn) => {
    btn.addEventListener('click', () => {
        currentPopupIndex = (currentPopupIndex - 1 + popups.length) % popups.length;
        updatePopup(currentPopupIndex);
    });
});

document.querySelectorAll('.culture-popup-next').forEach((btn) => {
    btn.addEventListener('click', () => {
        currentPopupIndex = (currentPopupIndex + 1) % popups.length;
        updatePopup(currentPopupIndex);
    });
});

document.querySelectorAll('.culture-popup1-close').forEach((btn) => {
    btn.addEventListener('click', () => {
        closePopup(popups[currentPopupIndex]);
    });
});

// 啟動輪播自動滾動
startAutoScroll();

// 調整視窗大小時重新計算項目寬度
window.addEventListener("resize", () => {
    itemWidth = getItemWidth();
});

// 點擊回到頂部按鈕時平滑滾動到頂部
backToTopButton.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});