document.addEventListener('DOMContentLoaded',() => {
    // burger
    const iconMenu = document.querySelector('.menu_icon');
    if (iconMenu) {
        const MenuBody = document.querySelector('.menu_body');
        iconMenu.addEventListener("click", function(e) {
            document.body.classList.toggle('_lock');
            iconMenu.classList.toggle('_active_menu');
            MenuBody.classList.toggle('_active_menu')
        });
    }

    // Creating smooth scrolling to page blocks through the navigation menu

    const menuLinks = document.querySelectorAll('.menu_link[data-goto]');
    if (menuLinks.length > 0) {
        menuLinks.forEach(menuLink => {
            menuLink.addEventListener("click", onMenuLinkClick);        
        });

        function onMenuLinkClick(e) {
            const menuLink = e.target;
            if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth"
                });
                e.preventDefault();
            }
        }
    }

    // SWIPER
    $(document).ready(function(){
        $('.slider').slick({
            arrows: false,
            dots: true
        });
    });
     
    // Change of topic
    const themeSwithers = document.querySelectorAll('.change-theme');

    themeSwithers.forEach(switcher => {
        switcher.addEventListener('click', function() {
            applyTheme(this.dataset.theme);
            localStorage.setItem('theme', this.dataset.theme);
        });
    });

    function applyTheme(themeName) {
        let themeUrl = `style/${themeName}.css`;
        document.querySelector('[title="theme"]').setAttribute('href', themeUrl);
    }

    let activeTheme = localStorage.getItem('theme');

    if(activeTheme === null) {
        applyTheme('light');
    } else {
        applyTheme(activeTheme);
    }

    // Smooth appearance of content on scroll

    const animItems = document.querySelectorAll('._anim-items');

    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);
        function animOnScroll() {
            for (let index = 0; index < animItems.length; index++) {
                const animItem = animItems[index];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 4;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
                    animItem.classList.add('_active');
                } else {
                    if (!animItem.classList.contains('_anim-no-hide')) {
                        animItem.classList.remove('_active');
                    }
                }
            }
        }
        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
        } 
        setTimeout(()=> {
            animOnScroll();
        }, 300);
    };
}, false);

// PRELOADED
var
    images = document.images,
    images_total_count = images.length,
    images_loaded_count = 0,
    perc_display = document.getElementById('load_perc'),
    preloaded = document.getElementById('page-preloaded');

for (var i = 0; i < images_total_count; i++) 
{
    image_clone = new Image();
    image_clone.onload  = image_loaded; 
    image_clone.onerror = image_loaded; 
    image_clone.src     = images[i].src;
}

function image_loaded() {
    images_loaded_count++;

    perc_display.innerHTML = (( (100 / images_total_count) *  images_loaded_count ) << 0) + '%';

    if (images_loaded_count >= images_total_count)
    {
        setTimeout(function() {
            if( !preloaded.classList.contains('done'))
            {
                preloaded.classList.add('done');
            }
        }, 1000);
    }
}