function t868_initPopup(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    rec.setAttribute('data-animationappear', 'off');
    rec.style.opacity = '1';
    var popup = rec.querySelector('.t-popup');
    if (!popup)
        return;
    var hook = popup.getAttribute('data-tooltip-hook');
    if (!hook)
        return;
    var analitics = popup.getAttribute('data-track-popup');
    var customCodeHTML = t868__readCustomCode(rec);
    var buttons = document.querySelectorAll('a[href="' + hook + '"]');
    Array.prototype.forEach.call(buttons, function (button) {
        button.addEventListener('click', function (event) {
            t868_showPopup(rec, customCodeHTML);
            t868_resizePopup(rec);
            event.preventDefault();
            if (!analitics)
                return;
            var virtTitle = hook;
            if (virtTitle.substring(0, 7) == '#popup:') {
                virtTitle = virtTitle.substring(7);
            }
            Tilda.sendEventToStatistics(analitics, virtTitle);
        });
    });
}
function t868__readCustomCode(rec) {
    var codeWrap = rec.querySelector('.t868 .t868__code-wrap');
    if (!codeWrap)
        return;
    var customCode = codeWrap.innerHTML;
    return customCode;
}
function t868_showPopup(rec) {
    var popup = rec.querySelector('.t-popup');
    if (!popup)
        return;
    var popupContainer = popup.querySelector('.t-popup__container');
    if (!popupContainer)
        return;
    var codeWrap = popup.querySelector('.t868__code-wrap');
    if (!codeWrap)
        return;
    popup.style.display = 'block';
    codeWrap.style.display = 'block';
    t868_setHeight(rec);
    setTimeout(function () {
        popupContainer.classList.add('t-popup__container-animated');
        popup.classList.add('t-popup_show');
    }, 100);
    document.body.classList.add('t-body_popupshowed');
    popup.addEventListener('click', function (event) {
        var container = event.target.closest('.t-popup__container');
        if (!container)
            t868_closePopup(rec);
    });
    var closeButton = rec.querySelector('.t-popup__close');
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            t868_closePopup(rec);
        });
    }
    var buttons = rec.querySelectorAll('a[href*="#"]');
    Array.prototype.forEach.call(buttons, function (button) {
        button.addEventListener('click', function () {
            var url = button.getAttribute('href');
            if (url.indexOf('#order') !== -1) {
                var popupContainer = rec.querySelector('.t-popup__container');
                setTimeout(function () {
                    while (popupContainer.firstChild) {
                        popupContainer.removeChild(popupContainer.firstChild);
                    }
                }, 600);
            }
            if (!url || url.substring(0, 7) !== '#price:') {
                t868_closePopup(rec);
                if (!url || url.substring(0, 7) === '#popup:') {
                    setTimeout(function () {
                        document.body.classList.add('t-body_popupshowed');
                    }, 300);
                }
            }
        });
    });
    document.addEventListener('keydown', function (event) {
        if (event.keyCode === 27) {
            t868_closePopup(rec);
        }
    });
}
function t868_closePopup(rec) {
    var popupContainer = rec.querySelector('.t-popup__container');
    var popup = rec.querySelector('.t-popup');
    var codeWrap = rec.querySelector('.t868 .t868__code-wrap');
    document.body.classList.remove('t-body_popupshowed');
    popup.classList.remove('t-popup_show');
    setTimeout(function () {
        if (!popup.classList.contains('.t-popup_show')) {
            popup.style.display = 'none';
            if (codeWrap) {
                codeWrap.style.display = 'none';
            }
        }
    }, 300);
}
function t868_setHeight(rec) {
    var videoCarier = rec.querySelector('.t868__video-carier');
    if (!videoCarier)
        return;
    var paddingLeft = parseInt(videoCarier.style.paddingLeft, 10) || 0;
    var paddingRight = parseInt(videoCarier.style.paddingRight, 10) || 0;
    var height = (videoCarier.clientWidth - (paddingLeft + paddingRight)) / (16 / 9);
    videoCarier.style.height = height;
    Array.prototype.forEach.call(videoCarier.closest, function (parent) {
        parent.style.height = height;
    });
}
function t868_resizePopup(rec) {
    var popupContainer = rec.querySelector('.t-popup__container');
    var paddingTop = parseInt(popupContainer.style.paddingTop, 10) || 0;
    var paddingBottom = parseInt(popupContainer.style.paddingBottom, 10) || 0;
    var popupContainerHeight = popupContainer.clientHeight - (paddingTop + paddingBottom);
    var viewPort = window.innerHeight;
    if (popupContainerHeight > viewPort) {
        popupContainer.classList.add('t-popup__container-static');
    } else {
        popupContainer.classList.remove('t-popup__container-static');
    }
}
