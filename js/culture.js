    const stickers = document.querySelectorAll('.culture-stickers img');
    const popup = document.getElementById('culture-popup');
    const popupImg = document.querySelector('.culture-popup-img');
    const popupClose = document.querySelector('.culture-popup-close');
    const backToTopButton = document.getElementById("backToTop");
    const carousel = document.getElementById("carousel");
    const leftBtn = document.getElementById("leftBtn");
    const rightBtn = document.getElementById("rightBtn");
    const carouselItems = document.querySelectorAll('.carousel-item');
    let scrollAmount = 0;
    let itemWidth = getItemWidth();
    let autoScrollInterval;
    let isPaused = false;

    stickers.forEach((sticker) => {
        sticker.addEventListener('click', () => {
            const fullImgSrc = sticker.getAttribute('data-full');
            popupImg.src = fullImgSrc;
            popup.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            hideBackToTop();
        });
    });

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

    function getItemWidth() {
        const carouselItem = carousel.querySelector('.carousel-item');
        const carouselStyle = window.getComputedStyle(carousel);
        const gap = parseInt(carouselStyle.gap) || 0;
        return carouselItem.offsetWidth + gap;
    }

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

    function moveLeft() {
        scrollAmount -= itemWidth;
        if (scrollAmount < 0) {
            scrollAmount = carousel.scrollWidth - carousel.offsetWidth;
        }
        carousel.style.transform = `translateX(-${scrollAmount}px)`;
        carousel.style.transition = "transform 0.3s ease-in-out";
    }

    leftBtn.addEventListener("click", () => {
        if (!isPaused) moveLeft();
    });
    rightBtn.addEventListener("click", () => {
        if (!isPaused) moveRight();
    });

    carousel.addEventListener("mouseenter", stopAutoScroll);
    carousel.addEventListener("mouseleave", () => {
        if (!isPaused) startAutoScroll();
    });

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
                closeBtn.addEventListener("click", () => closepopup(popup));
                popup.addEventListener("click", (e) => {
                    if (e.target === popup) closepopup(popup);
                });
            }
        });
    });

    function closepopup(popup) {
        popup.classList.add("hidden1");
        isPaused = false;
        startAutoScroll();
        document.body.style.overflow = '';
        showBackToTop();
        carousel.style.transition = "transform 0.3s ease-in-out";
    }

    startAutoScroll();

    window.addEventListener("resize", () => {
        itemWidth = getItemWidth();
    });

    backToTopButton.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
    const popups = document.querySelectorAll('.culture-popup1');
    let currentpopupIndex = 0;

    function updatepopup(index) {
        popups.forEach((popup, i) => {
            if (i === index) {
                popup.classList.remove('hidden1');
            } else {
                popup.classList.add('hidden1');
            }
        });
        document.body.style.overflow = 'hidden';
    }

    function closepopup(popup) {
        popup.classList.add('hidden1');
        document.body.style.overflow = '';
        isPaused = false;
        startAutoScroll();
    }

    popups.forEach((popup) => {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) closepopup(popup);
        });
    });

    document.querySelectorAll('.culture-popup-prev').forEach((btn) => {
        btn.addEventListener('click', () => {
            currentpopupIndex = (currentpopupIndex - 1 + popups.length) % popups.length;
            updatepopup(currentpopupIndex);
        });
    });

    document.querySelectorAll('.culture-popup-next').forEach((btn) => {
        btn.addEventListener('click', () => {
            currentpopupIndex = (currentpopupIndex + 1) % popups.length;
            updatepopup(currentpopupIndex);
        });
    });

    document.querySelectorAll('.culture-popup1-close').forEach((btn) => {
        btn.addEventListener('click', () => {
            closepopup(popups[currentpopupIndex]);
        });
    });